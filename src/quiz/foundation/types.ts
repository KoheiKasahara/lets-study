/**
 * クイズ基盤（quiz foundation）の型定義。
 *
 * このモジュールは特定のアプリに依存しない汎用設計になっている。
 * 他のプロジェクトへは `src/quiz/foundation/` フォルダごとコピーして使える。
 * 仕様は `docs/quiz-foundation.md` を参照。
 */

/** 乱数関数の型（テストで差し替えられるよう注入可能にしている） */
export type RandomFn = () => number;

/**
 * クイズの1問（最小形）。
 * アプリ固有の情報は `meta` に入れる。基盤は meta の中身を解釈しない。
 */
export interface QuizQuestion {
  /** 問題の一意なID。省略時は問題文が重複判定のキーになる（id の付与を推奨） */
  id?: string;
  /** 問題文 */
  text: string;
  /** 問題に添える表示物（絵文字・画像キーなど。任意） */
  visual?: string;
  /** 選択肢（2つ以上） */
  choices: readonly string[];
  /** 正解の選択肢のインデックス */
  answerIndex: number;
  /** 任意の付加情報（解説・タグ・分類など）。基盤は中身を解釈しない */
  meta?: Readonly<Record<string, unknown>>;
}

/**
 * 難易度レベル。
 * クイズ定義が `difficulties` を宣言した場合だけ難易度選択が有効になる。
 * 宣言しないクイズは難易度なしでそのまま動く（基盤が単一の既定レベルで扱う）。
 */
export interface DifficultyLevel {
  /** レベルの一意なID（例: 'easy' | 'normal' | 'hard'） */
  id: string;
  /** 表示名（例: 'やさしい'） */
  label: string;
  /** 補足説明（任意） */
  description?: string;
  /**
   * 1問あたり表示する選択肢の数（任意）。
   * 省略した場合は問題本来の選択肢数をそのまま使う。
   * 問題本来の数より小さい場合、正解＋誤答を抽選して絞り込む。
   */
  choiceCount?: number;
  /**
   * 問題プールの絞り込み（任意）。
   * true を返した問題だけがこのレベルの出題対象になる。
   * 例：国旗クイズの「やさしい」で有名な国だけに絞る。
   */
  filter?: (question: QuizQuestion) => boolean;
  /**
   * 誤答選択肢の選び方カスタマイズ（任意）。
   * 既定では問題自身の誤答からランダムに選ぶ。
   * 例：国旗クイズの「むずかしい」で、同じ地域の国の選択肢を混ぜる。
   */
  pickDistractors?: (args: {
    question: QuizQuestion;
    pool: readonly QuizQuestion[];
    count: number;
    random: RandomFn;
  }) => string[];
}

/** クイズ全体の定義 */
export interface QuizDefinition {
  /** クイズの一意なID */
  id: string;
  /** 表示名 */
  title: string;
  /** 問題プール（全問題） */
  questions: readonly QuizQuestion[];
  /** 難易度レベルの配列（任意）。省略＝難易度なし */
  difficulties?: readonly DifficultyLevel[];
  /** 1ブロック（1セット）あたりの問題数。省略時は既定値（10問） */
  blockSize?: number;
}

/** 重複判定に使う問題のキー */
export function questionKeyOf(question: QuizQuestion): string {
  return question.id ?? question.text;
}
