import { useState } from 'react';
import type { CategoryQuiz } from '../types';
import { isCorrect, type PreparedQuestion } from '../quiz/foundation';
import { getFlagUrl } from '../data/flagAssets';

interface Props {
  quiz: CategoryQuiz;
  /** このセット（ブロック）の問題 */
  block: PreparedQuestion[];
  /** 何セット目か（1始まり） */
  blockNumber: number;
  /** このセット開始時点までの累計正解数 */
  totalCorrectBefore: number;
  /** セットを終えたときに正解数を通知する */
  onFinishBlock: (correct: number) => void;
  onBack: () => void;
}

type Phase = 'answering' | 'feedback';

/** クイズ画面：1セット分の問題を1問ずつ出す（セッション管理はクイズ基盤） */
export function QuizScreen({
  quiz,
  block,
  blockNumber,
  totalCorrectBefore,
  onFinishBlock,
  onBack,
}: Props) {
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [phase, setPhase] = useState<Phase>('answering');
  const [score, setScore] = useState(0);

  const current = block[index];
  const correct = selected !== null && isCorrect(current, selected);
  const explanation =
    typeof current.meta?.explanation === 'string' ? current.meta.explanation : undefined;
  const flagCode = typeof current.meta?.flagCode === 'string' ? current.meta.flagCode : undefined;
  const flagUrl = flagCode ? getFlagUrl(flagCode) : undefined;
  const isLast = index + 1 >= block.length;

  const handleSelect = (choiceIndex: number) => {
    if (phase !== 'answering') return;
    setSelected(choiceIndex);
    setPhase('feedback');
    if (isCorrect(current, choiceIndex)) setScore((s) => s + 1);
  };

  const handleNext = () => {
    if (isLast) {
      onFinishBlock(score);
    } else {
      setIndex((i) => i + 1);
      setSelected(null);
      setPhase('answering');
    }
  };

  return (
    <div className="screen quiz">
      <div className="quiz-header">
        <button type="button" className="small-button" onClick={onBack}>
          ← もどる
        </button>
        <span className="quiz-progress">
          セット{blockNumber} ・ {index + 1} / {block.length} もんめ
        </span>
        <span className="quiz-category">
          {quiz.category.icon} {quiz.category.name}
        </span>
      </div>
      <p className="quiz-total-score">これまでの せいかい：{totalCorrectBefore + score}もん</p>

      <h2 className="quiz-question">{current.text}</h2>
      {flagUrl ? (
        <div className="quiz-flag">
          <img src={flagUrl} alt="国旗" className="quiz-flag-img" />
        </div>
      ) : (
        current.visual && (
          <div className="quiz-visual" aria-hidden="true">
            {current.visual}
          </div>
        )
      )}

      <div className="choices">
        {current.choices.map((choice, i) => {
          let className = 'choice-button';
          if (phase === 'feedback') {
            if (i === current.answerIndex) className += ' is-answer';
            else if (i === selected) className += ' is-wrong';
          }
          return (
            <button
              key={`${index}-${i}`}
              type="button"
              className={className}
              disabled={phase === 'feedback'}
              onClick={() => handleSelect(i)}
            >
              {choice}
            </button>
          );
        })}
      </div>

      {phase === 'feedback' && (
        <div className={`feedback ${correct ? 'is-correct' : 'is-incorrect'}`} role="status">
          <p className="feedback-title">
            {correct ? '⭕ せいかい！ すごいね！' : `❌ ざんねん… こたえは「${current.choices[current.answerIndex]}」だよ`}
          </p>
          {explanation && <p className="feedback-explanation">{explanation}</p>}
          <button type="button" className="big-button" onClick={handleNext} autoFocus>
            {isLast ? 'けっかを みる ▶' : 'つぎの もんだい ▶'}
          </button>
        </div>
      )}
    </div>
  );
}
