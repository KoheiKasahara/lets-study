import type { BlockResult } from '../quiz/foundation';
import { praiseFor } from '../quiz/praise';
import type { CategoryQuiz } from '../types';
import './ResultScreen.css';

interface Props {
  quiz: CategoryQuiz;
  /** 終わったセット（ブロック）の結果 */
  blockResult: BlockResult;
  /** セッション累計の正解数 */
  totalCorrect: number;
  /** セッション累計の回答数 */
  totalAnswered: number;
  /** まだ出題していない問題が残っているか（残っていなければ「ぜんぶおわった」） */
  canContinue: boolean;
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
  onContinue,
  onRestart,
  onHome,
}: Props) {
  const { correct, total } = blockResult;
  return (
    <div className="screen result">
      <div className="result__summary">
        <div className="result__emoji" aria-hidden="true">
          {quiz.category.icon}
        </div>
        <h2 className="screen-title">{canContinue ? 'おつかれさま！' : 'ぜんぶ おわった！'}</h2>
        <p className="result__stars" aria-hidden="true">
          {'⭐'.repeat(correct)}
          {'☆'.repeat(Math.max(0, total - correct))}
        </p>
        <p className="result__score">
          このセットは {total}もんちゅう <strong>{correct}もん</strong> せいかい！
        </p>
        <p className="result__total">
          ぜんぶで {totalAnswered}もんちゅう <strong>{totalCorrect}もん</strong> せいかい！
        </p>
        <p className="result__praise">{praiseFor(correct, total)}</p>
      </div>
      <div className="result__buttons">
        {canContinue ? (
          <button type="button" className="button" onClick={onContinue}>
            ▶ つづけて あそぶ
          </button>
        ) : (
          <button type="button" className="button" onClick={onRestart}>
            🔁 さいしょから あそぶ
          </button>
        )}
        <button type="button" className="button button--secondary" onClick={onHome}>
          🏠 カテゴリに もどる
        </button>
      </div>
    </div>
  );
}
