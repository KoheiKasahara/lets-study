import { useEffect, useState } from 'react';
import type { CategoryQuiz, QuizDifficulty } from './types';
import { allQuizzes } from './data';
import { toQuizDefinition } from './quiz/adapter';
import {
  canContinue,
  createSession,
  hasDifficulties,
  nextBlock,
  recordBlockResult,
  type BlockResult,
  type PreparedQuestion,
  type QuizSession,
} from './quiz/foundation';
import {
  BATTLE_LOSE_XP,
  BATTLE_WIN_XP,
  addXpToMonster,
  applyQuizResult,
  createPureMonster,
  fuseMonsters,
  loadMonsterSave,
  pickHatchSpecies,
  saveMonsterSave,
  type GrowthReport,
  type MonsterSave,
  type OwnedMonster,
} from './monsters';
import { HomeScreen } from './screens/HomeScreen';
import { FlagsGuideScreen } from './screens/FlagsGuideScreen';
import { DifficultyScreen } from './screens/DifficultyScreen';
import { QuizScreen } from './screens/QuizScreen';
import { ResultScreen } from './screens/ResultScreen';
import { MonsterScreen } from './screens/MonsterScreen';
import { ArenaScreen } from './screens/ArenaScreen';

type Screen =
  | { name: 'home' }
  | { name: 'guide' }
  | { name: 'monsters' }
  | { name: 'arena' }
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
      growth: GrowthReport | null;
    };

export default function App() {
  const [screen, setScreen] = useState<Screen>({ name: 'home' });
  // モンスター育成データは App が持ち、変更のたびに localStorage へ保存する
  const [monsterSave, setMonsterSave] = useState<MonsterSave>(() => loadMonsterSave());

  const updateMonsterSave = (next: MonsterSave) => {
    setMonsterSave(next);
    saveMonsterSave(next);
  };

  // 画面が切り替わったら先頭から見せる（長い一覧をスクロールしたまま次の画面に行かない）
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [screen]);

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

  /** セット終了：結果をセッションに記録し、モンスターへ経験値を入れて結果画面へ */
  const finishBlock = (quiz: CategoryQuiz, session: QuizSession, correct: number) => {
    const recorded = recordBlockResult(session, correct);
    const blockResult = recorded.blockResults[recorded.blockResults.length - 1];
    const { save: grownSave, report } = applyQuizResult(monsterSave, correct, blockResult.total);
    updateMonsterSave(grownSave);
    setScreen({ name: 'result', quiz, session: recorded, blockResult, growth: report });
  };

  /** スターターを選ぶ */
  const chooseStarter = (speciesId: string) => {
    const monster = createPureMonster(speciesId, `monster-${monsterSave.nextId}`);
    updateMonsterSave({
      ...monsterSave,
      monsters: [...monsterSave.monsters, monster],
      nextId: monsterSave.nextId + 1,
    });
  };

  /** たまごをかえす。孵ったモンスターを返す */
  const hatchEgg = (): OwnedMonster | null => {
    if (monsterSave.eggs <= 0) return null;
    const monster = createPureMonster(
      pickHatchSpecies(Math.random),
      `monster-${monsterSave.nextId}`,
    );
    updateMonsterSave({
      ...monsterSave,
      monsters: [...monsterSave.monsters, monster],
      eggs: monsterSave.eggs - 1,
      nextId: monsterSave.nextId + 1,
    });
    return monster;
  };

  /** 配合する。生まれた子を返す */
  const fuse = (parentAId: string, parentBId: string): OwnedMonster | null => {
    const parentA = monsterSave.monsters.find((monster) => monster.id === parentAId);
    const parentB = monsterSave.monsters.find((monster) => monster.id === parentBId);
    if (!parentA || !parentB) return null;
    const child = fuseMonsters(parentA, parentB, `monster-${monsterSave.nextId}`);
    updateMonsterSave({
      ...monsterSave,
      monsters: [...monsterSave.monsters, child],
      nextId: monsterSave.nextId + 1,
    });
    return child;
  };

  /** 闘技場の報酬：勝敗どちらの経験値と、勝ったときのトロフィー */
  const handleBattleEnd = (monsterId: string, won: boolean) => {
    const withXp = addXpToMonster(monsterSave, monsterId, won ? BATTLE_WIN_XP : BATTLE_LOSE_XP);
    updateMonsterSave(won ? { ...withXp, trophies: withXp.trophies + 1 } : withXp);
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
          onOpenMonsters={() => setScreen({ name: 'monsters' })}
          onOpenArena={() => setScreen({ name: 'arena' })}
        />
      )}

      {screen.name === 'guide' && <FlagsGuideScreen onBack={() => setScreen({ name: 'home' })} />}

      {screen.name === 'monsters' && (
        <MonsterScreen
          save={monsterSave}
          onBack={() => setScreen({ name: 'home' })}
          onChooseStarter={chooseStarter}
          onHatch={hatchEgg}
          onFuse={fuse}
        />
      )}

      {screen.name === 'arena' && (
        <ArenaScreen
          monsters={monsterSave.monsters}
          trophies={monsterSave.trophies}
          onBack={() => setScreen({ name: 'home' })}
          onBattleEnd={handleBattleEnd}
        />
      )}

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
          monsters={monsterSave.monsters}
          growth={screen.growth}
          onContinue={() => continueSession(screen.quiz, screen.session)}
          onRestart={() => restartSession(screen.quiz, screen.session)}
          onHome={() => setScreen({ name: 'home' })}
        />
      )}
    </main>
  );
}
