# クイズ基盤（quiz foundation）仕様

レッツスタディのクイズの「動き」を切り出した、UIに依存しない共通基盤の仕様です。
他のプロジェクトでも**同じ動き**を再現できるよう、概念・設定の形・振る舞いのルールをまとめます。

実装は `src/quiz/foundation/`（TypeScript、外部依存なし）。
他プロジェクトへはフォルダごとコピーすれば使えます（アプリ固有の語彙は含みません）。

## 概念

| 概念 | 意味 |
| --- | --- |
| クイズ定義（QuizDefinition） | クイズ1つ分の設定。問題プールと任意の難易度宣言を持つ |
| 問題（QuizQuestion） | 問題文・選択肢・正解の最小形。アプリ固有の情報は `meta` に入れる（基盤は解釈しない） |
| セッション（QuizSession） | 1回のプレイ全体の状態。プールの残り・出題済み・累計スコアを持つ |
| ブロック | 1セット分の出題単位。既定は10問 |
| 難易度（DifficultyLevel） | 任意の仕組み。宣言したクイズでのみ難易度選択が有効になる |

## 振る舞いのルール

1. **10問ずつのセット（ブロック）**：出題はブロック単位。プールが10問未満なら残り全部が1ブロックになる。
2. **セット終了ごとに選べる**：ブロックを終えたら結果を表示し、「続ける／戻る」を利用者が選ぶ（UI側の責務。基盤は `canContinue` で継続可否を返す）。
3. **セッション内は重複出題しない**：一度出題した問題は、そのセッションでは二度と出ない。`nextBlock` が取り出した問題を出題済みとして記録する。
4. **プールが尽きたら終わり**：残り問題が0なら `nextBlock` は `null` を返し、`isExhausted` が true になる。最初から遊び直す場合はセッションを作り直す。
5. **累計スコア**：ブロックごとに `recordBlockResult` で結果を記録し、累計の回答数・正解数とブロック別結果を保持する。

## 設定の形（型定義）

```ts
interface QuizQuestion {
  id?: string;                 // 重複判定のキー（省略時は問題文を使う。付与推奨）
  text: string;                // 問題文
  visual?: string;             // 表示物（絵文字・画像キーなど任意）
  choices: readonly string[];  // 選択肢（2つ以上）
  answerIndex: number;         // 正解のインデックス
  meta?: Record<string, unknown>; // 解説・タグなど、アプリ固有の情報
}

interface DifficultyLevel {
  id: string;                  // 例: 'easy'
  label: string;               // 例: 'やさしい'
  description?: string;
  choiceCount?: number;        // 表示する選択肢数。省略時は問題本来の数
  filter?: (q: QuizQuestion) => boolean;              // プールの絞り込み
  pickDistractors?: (args: {   // 誤答の選び方の差し替え
    question: QuizQuestion;
    pool: readonly QuizQuestion[];
    count: number;
    random: () => number;
  }) => string[];
}

interface QuizDefinition {
  id: string;
  title: string;
  questions: readonly QuizQuestion[];
  difficulties?: DifficultyLevel[];  // 任意。省略＝難易度なし
  blockSize?: number;                // 省略時は10
}
```

### 難易度は任意

- `difficulties` を宣言しないクイズは、難易度選択なしでそのまま動く。
  基盤内部では単一の既定レベル（`FALLBACK_DIFFICULTY`）が割り当てられ、
  基盤の利用側は「難易度あり／なし」を分岐せず同じAPIで扱える。
  難易度選択画面を出すかどうかは `hasDifficulties(definition)` で判断する。
- `choiceCount` を宣言すると、出題時に「正解＋誤答の抽選」で選択肢を絞る。
  例：やさしい＝2択、ふつう＝3択、むずかしい＝4択。
- `filter` を宣言すると、そのレベルでは対象プール自体が絞られる。
  例：国旗クイズの「やさしい」で有名な国だけにする。
- `pickDistractors` を宣言すると、誤答の選び方を差し替えられる。
  例：国旗クイズの「むずかしい」で同じ地域の国を選択肢に混ぜる。
  返した誤答が不足する場合は、既定の抽選（問題自身の誤答から）で補われる。

## API（すべて純粋関数。状態はイミュータブル）

| 関数 | 役割 |
| --- | --- |
| `createSession(definition, { difficultyId?, blockSize?, random? })` | セッションを作る。プールを絞り込み＋シャッフル |
| `nextBlock(session, random?)` | 次のブロックを取り出す。戻り値 `{ session, block }`、残りがなければ `null` |
| `recordBlockResult(session, correctCount)` | 直近ブロックの正解数を記録し、累計を更新 |
| `canContinue(session)` / `remainingCount(session)` / `isExhausted(session)` | 継続可否・残り問題数・使い切り判定 |
| `isCorrect(prepared, choiceIndex)` / `countBlockCorrect(block, answers)` | 採点ヘルパ |
| `resolveDifficulty(definition, difficultyId?)` / `hasDifficulties(definition)` | 難易度の解決・有無の判定 |
| `prepareQuestion(question, difficulty, pool, random?)` | 1問を選択肢絞り込み済みの出題形に整形 |

乱数は引数で差し替え可能（テスト・再現性のため）。

## レッツスタディでの適用例

- アプリ側データ（`src/data/`）は、基盤の型をそのまま書く代わりに
  簡略形（`QuizDifficulty { choiceCount?, poolTag?, sameGroupDistractors? }`）で難易度を宣言し、
  `src/quiz/adapter.ts` が基盤の型へ変換している
  （`poolTag` → `filter`、`sameGroupDistractors` → `pickDistractors`、`explanation`/`tags`/`group`/`flagCode` → `meta`）。
- 国旗カテゴリでは「やさしい」に `poolTag: 'famous'` を付け、
  有名な24か国の問題（`tags: ['famous']`）だけにプールを絞っている。
  「むずかしい」は `sameGroupDistractors: true` で、問題の `group`（地域）が同じ国の正解を誤答候補として混ぜる。
- 画面の流れ：カテゴリ選択 →（難易度宣言がある場合のみ）難易度えらび → クイズ（セット数・累計表示）→ 結果（つづける／もどる）。
