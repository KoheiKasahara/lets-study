/**
 * レッツスタディの基本型定義。
 *
 * 新しいカテゴリを増やすときは、この型に沿ったデータを
 * src/data/ に追加するだけでよい（エンジンや画面の変更は不要）。
 */

/** クイズのカテゴリ */
export interface Category {
  /** URLやキーに使う一意なID（英数字とハイフン） */
  id: string;
  /** 表示名（ひらがな中心） */
  name: string;
  /** カードに表示する絵文字アイコン */
  icon: string;
  /** カードの背景色（CSSカラー） */
  color: string;
  /** カードに表示する短い説明（ひらがな中心） */
  description: string;
}

/** 4択クイズの1問 */
export interface Question {
  /** 問題の一意なID（任意。重複出題の判定に使うので付与を推奨） */
  id?: string;
  /** 問題文（ひらがな中心） */
  question: string;
  /** 問題文の下に大きく表示する絵文字（旗・動物など） */
  visual?: string;
  /** 選択肢は必ず4つ */
  choices: [string, string, string, string];
  /** 正解の選択肢のインデックス（0〜3） */
  answerIndex: number;
  /** 答え合わせのあとに表示する短い解説・豆知識（任意） */
  explanation?: string;
  /** 問題のタグ（任意）。難易度のプール絞り込み（poolTag）で使う */
  tags?: string[];
  /**
   * 問題のグループ（任意。例：国旗クイズの地域）。
   * 難易度の sameGroupDistractors と組み合わせて使う。
   */
  group?: string;
  /** 国旗SVGの国コード（任意）。国旗クイズの生成問題でのみ使う */
  flagCode?: string;
}

/**
 * アプリ側の難易度宣言（任意）。
 * クイズ基盤の DifficultyLevel に対応する、データ記述用のシンプルな形。
 * CategoryQuiz に付けなければ難易度なしでそのまま動く。
 */
export interface QuizDifficulty {
  /** レベルの一意なID（例: 'easy' | 'normal' | 'hard'） */
  id: string;
  /** 表示名（例: 'やさしい'） */
  label: string;
  /** 難易度えらび画面に出す短い説明（任意） */
  description?: string;
  /** 1問あたり表示する選択肢の数（任意。省略時は4つ） */
  choiceCount?: number;
  /**
   * 問題プールの絞り込みタグ（任意）。
   * 指定すると、このタグが付いた問題だけが出題対象になる。
   */
  poolTag?: string;
  /**
   * 誤答を同じグループの問題から選ぶ（任意）。
   * 例：国旗クイズの「むずかしい」で、同じ地域の国を選択肢に混ぜる。
   */
  sameGroupDistractors?: boolean;
}

/** カテゴリとその問題集のセット */
export interface CategoryQuiz {
  category: Category;
  questions: Question[];
  /** 難易度レベルの配列（任意）。省略＝難易度なし */
  difficulties?: QuizDifficulty[];
}
