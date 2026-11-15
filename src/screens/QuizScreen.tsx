import { useState } from 'react';
import { ScreenHeader } from '../components/ScreenHeader';
import { getFlagUrl } from '../data/flagAssets';
import { getImageUrl } from '../data/imageAssets';
import { metaOf } from '../quiz/adapter';
import { isCorrect, type PreparedQuestion } from '../quiz/foundation';
import type { CategoryQuiz } from '../types';
import './QuizScreen.css';

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
  /** 選んだ選択肢。null のあいだは回答待ち、選ぶと答え合わせ表示になる */
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);

  const current = block[index];
  const answered = selected !== null;
  const correct = answered && isCorrect(current, selected);
  const { explanation, flagCode, image } = metaOf(current);
  const isLast = index + 1 >= block.length;

  const handleSelect = (choiceIndex: number) => {
    if (answered) return;
    setSelected(choiceIndex);
    if (isCorrect(current, choiceIndex)) setScore((s) => s + 1);
  };

  const handleNext = () => {
    if (isLast) {
      onFinishBlock(score);
      return;
    }
    setIndex((i) => i + 1);
    setSelected(null);
    window.scrollTo(0, 0);
  };

  return (
    <div className={`screen quiz${answered ? ' is-answered' : ''}`}>
      <ScreenHeader
        title={`${quiz.category.icon} ${quiz.category.name}`}
        onBack={onBack}
        aside={`${index + 1} / ${block.length} もんめ`}
      />
      <p className="quiz__status">
        <span>セット{blockNumber}</span>
        <span>これまでの せいかい：{totalCorrectBefore + score}もん</span>
      </p>

      <div className="quiz__body">
        <div className="quiz__prompt">
          <h2 className="screen-title">{current.text}</h2>
          {flagCode ? (
            <img src={getFlagUrl(flagCode)} alt="こっき" className="quiz__flag" />
          ) : image ? (
            <img src={getImageUrl(image)} alt="クイズの がぞう" className="quiz__image" />
          ) : (
            current.visual && (
              <div className="quiz__visual" aria-hidden="true">
                {current.visual}
              </div>
            )
          )}
        </div>

        <div className="quiz__choices">
          {current.choices.map((choice, i) => {
            let className = 'quiz__choice';
            if (answered) {
              if (i === current.answerIndex) className += ' is-answer';
              else if (i === selected) className += ' is-wrong';
            }
            return (
              <button
                key={`${index}-${i}`}
                type="button"
                className={className}
                disabled={answered}
                onClick={() => handleSelect(i)}
              >
                <span className="quiz__choice-text">{choice}</span>
              </button>
            );
          })}
        </div>
      </div>

      {answered && (
        <div className={`quiz__feedback ${correct ? 'is-correct' : 'is-incorrect'}`} role="status">
          <div className="quiz__feedback-text">
            <p className="quiz__feedback-title">
              {correct
                ? '⭕ せいかい！ すごいね！'
                : `❌ ざんねん… こたえは「${current.choices[current.answerIndex]}」だよ`}
            </p>
            {explanation && <p className="quiz__feedback-explanation">{explanation}</p>}
          </div>
          <button type="button" className="button" onClick={handleNext} autoFocus>
            {isLast ? 'けっかを みる ▶' : 'つぎの もんだい ▶'}
          </button>
        </div>
      )}
    </div>
  );
}
