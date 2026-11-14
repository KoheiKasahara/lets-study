import { useState } from 'react';
import type { CategoryQuiz, QuizDifficulty } from './types';
import { allQuizzes } from './data';
import { toQuizDefinition } from './quiz/adapter';
import {
  canContinue,
  createSession,
  hasDifficulties,
  isExhausted,
  nextBlock,
  recordBlockResult,
  type BlockResult,
  type PreparedQuestion,
  type QuizSession,
} from './quiz/foundation';
import { HomeScreen } from './components/HomeScreen';
import { FlagsGuideScreen } from './components/FlagsGuideScreen';
import { DifficultyScreen } from './components/DifficultyScreen';
import { QuizScreen } from './components/QuizScreen';
import { ResultScreen } from './components/ResultScreen';
import './App.css';

type Screen =
  | { name: 'home' }
  | { name: 'guide' }
  | { name: 'difficulty'; quiz: CategoryQuiz }
  | {
      name: 'quiz';
      quiz: CategoryQuiz;
      session: QuizSession;
      block: PreparedQuestion[];
      blockNumber: number;
    }
  | {
      name: 'result';
      quiz: CategoryQuiz;
      session: QuizSession;
      blockResult: BlockResult;
    };

export default function App() {
  const [screen, setScreen] = useState<Screen>({ name: 'home' });

  /** セッションを作って最初のセットを開始する */
  const startSession = (quiz: CategoryQuiz, difficultyId?: string) => {
    const definition = toQuizDefinition(quiz);
    const session = createSession(definition, { difficultyId });
    const next = nextBlock(session);
    if (!next) {
      setScreen({ name: 'home' });
      return;
    }
    setScreen({ name: 'quiz', quiz, session: next.session, block: next.block, blockNumber: 1 });
  };

  const selectCategory = (quiz: CategoryQuiz) => {
    // 難易度を宣言したクイズだけ難易度えらび画面を挟む。なければそのまま開始
    if (hasDifficulties(toQuizDefinition(quiz))) {
      setScreen({ name: 'difficulty', quiz });
    } else {
      startSession(quiz);
    }
  };

  const selectDifficulty = (quiz: CategoryQuiz, difficulty: QuizDifficulty) => {
    startSession(quiz, difficulty.id);
  };

  /** セット終了：結果をセッションに記録して結果画面へ */
  const finishBlock = (quiz: CategoryQuiz, session: QuizSession, correct: number) => {
    const recorded = recordBlockResult(session, correct);
    const blockResult = recorded.blockResults[recorded.blockResults.length - 1];
    setScreen({ name: 'result', quiz, session: recorded, blockResult });
  };

  /** 結果画面で「つづけて あそぶ」：未出題の問題から次のセットを取り出す */
  const continueSession = (quiz: CategoryQuiz, session: QuizSession) => {
    const next = nextBlock(session);
    if (!next) return;
    setScreen({
      name: 'quiz',
      quiz,
      session: next.session,
      block: next.block,
      blockNumber: session.blockResults.length + 1,
    });
  };

  /** 「さいしょから あそぶ」：同じ難易度でセッションを作り直す */
  const restartSession = (quiz: CategoryQuiz, session: QuizSession) => {
    startSession(quiz, session.difficulty.id);
  };

  return (
    <main className="app">
      {screen.name === 'home' && (
        <HomeScreen
          quizzes={allQuizzes}
          onSelect={selectCategory}
          onOpenGuide={() => setScreen({ name: 'guide' })}
        />
      )}

      {screen.name === 'guide' && <FlagsGuideScreen onBack={() => setScreen({ name: 'home' })} />}

      {screen.name === 'difficulty' && (
        <DifficultyScreen
          quiz={screen.quiz}
          onSelect={(difficulty) => selectDifficulty(screen.quiz, difficulty)}
          onBack={() => setScreen({ name: 'home' })}
        />
      )}

      {screen.name === 'quiz' && (
        <QuizScreen
          key={`${screen.quiz.category.id}-${screen.blockNumber}`}
          quiz={screen.quiz}
          block={screen.block}
          blockNumber={screen.blockNumber}
          totalCorrectBefore={screen.session.totalCorrect}
          onFinishBlock={(correct) => finishBlock(screen.quiz, screen.session, correct)}
          onBack={() => setScreen({ name: 'home' })}
        />
      )}

      {screen.name === 'result' && (
        <ResultScreen
          quiz={screen.quiz}
          blockResult={screen.blockResult}
          totalCorrect={screen.session.totalCorrect}
          totalAnswered={screen.session.totalAnswered}
          canContinue={canContinue(screen.session)}
          exhausted={isExhausted(screen.session)}
          onContinue={() => continueSession(screen.quiz, screen.session)}
          onRestart={() => restartSession(screen.quiz, screen.session)}
          onHome={() => setScreen({ name: 'home' })}
        />
      )}
    </main>
  );
}
