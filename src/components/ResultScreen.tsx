import type { CategoryQuiz } from '../types';
import type { BlockResult } from '../quiz/foundation';
import { praiseFor } from '../quiz/engine';

interface Props {
  quiz: CategoryQuiz;
  /** 終わったセット（ブロック）の結果 */
  blockResult: BlockResult;
  /** セッション累計の正解数 */
  totalCorrect: number;
  /** セッション累計の回答数 */
  totalAnswered: number;
  /** まだ出題していない問題が残っているか */
  canContinue: boolean;
  /** プールを使い切ったか（「ぜんぶおわった」表示） */
  exhausted: boolean;
  /** 次のセットへ進む */
  onContinue: () => void;
  /** 最初から遊び直す（問題プールをリセット） */
  onRestart: () => void;
  onHome: () => void;
}

/** 結果画面：セットの結果と累計を表示し、「つづける／もどる」を選べる */
export function ResultScreen({
  quiz,
  blockResult,
  totalCorrect,
  totalAnswered,
  canContinue,
  exhausted,
  onContinue,
  onRestart,
  onHome,
}: Props) {
  const { correct, total } = blockResult;
  return (
    <div className="screen result">
      <div className="result-emoji" aria-hidden="true">
        {quiz.category.icon}
      </div>
      <h2 className="result-title">{exhausted ? 'ぜんぶ おわった！' : 'おつかれさま！'}</h2>
      <p className="result-stars" aria-hidden="true">
        {'⭐'.repeat(correct)}
        {'☆'.repeat(Math.max(0, total - correct))}
      </p>
      <p className="result-score">
        このセットは {total}もん中 <strong>{correct}もん</strong> せいかい！
      </p>
      <p className="result-total">
        ぜんぶで {totalAnswered}もん中 <strong>{totalCorrect}もん</strong> せいかい！
      </p>
      <p className="result-praise">{praiseFor(correct, total)}</p>
      <div className="result-buttons">
        {canContinue ? (
          <button type="button" className="big-button" onClick={onContinue}>
            ▶ つづけて あそぶ
          </button>
        ) : (
          <button type="button" className="big-button" onClick={onRestart}>
            🔁 さいしょから あそぶ
          </button>
        )}
        <button type="button" className="big-button secondary" onClick={onHome}>
          🏠 カテゴリに もどる
        </button>
      </div>
    </div>
  );
}
