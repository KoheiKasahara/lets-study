# AGENTS.md — AIエージェント向けガイド

このリポジトリで作業する AI（Muse / Claude / そのほか）は、作業の前に必ずこのファイルを読むこと。
人間向けの概要は [README.md](README.md)。

## このアプリは何か

保育園児向けの学習クイズ Web アプリ「レッツスタディ」。バックエンドなしの静的サイト
（React + TypeScript + Vite）で、GitHub Pages に公開する。使う端末は **PC・スマホ縦・スマホ横** のすべて。

## 守ること（優先度順）

1. **`npm run check` が通らない変更は出さない。** format → lint → 型チェック → テスト → ビルドを一括で回す。
   通らないときはテストやルールを消さず、原因を直す。
2. **頼まれたことだけをやる。** ついでのリファクタ・依存パッケージの追加・ファイルの大移動はしない。
   必要だと思ったら、やる前に提案する。
3. **置き場所のルール（下の「構成」）を守る。** 新しい置き場所を勝手に作らない。
4. **どの画面も 3 つの向きで確認する。** スマホ縦（375×667）・スマホ横（667×375）・PC（1440×900）で、
   横スクロールが出ないこと、主要なボタンがスクロールなしで押せること。
5. **main に直接 push しない。** ブランチ → プルリクエスト → CI 合格 → マージ。

## 構成

```
index.html              エントリ。viewport-fit=cover / manifest の指定
public/flags/{code}.svg 国旗SVG（195か国。JSに埋め込まずURLで読む）
src/
  main.tsx              起動。共通CSS → App の順に読み込む
  App.tsx               画面の切り替えとセッションの受け渡しだけを持つ
  types.ts              アプリのデータ型（Category / Question / QuizDifficulty / CategoryQuiz）
  styles/tokens.css     色・文字サイズ・余白の変数（デザイントークン）
  styles/base.css       リセット・アプリ枠・共通ボタン（.button / .card-button）
  components/           複数の画面で使う部品（ScreenHeader など）
  screens/              画面ごとに「XxxScreen.tsx + XxxScreen.css」
  data/index.ts         カテゴリ一覧（allQuizzes）
  data/categories/      カテゴリごとのクイズデータ
  data/countries.ts     国データ（コード・名前・よみ・地域）
  quiz/foundation/      クイズ基盤。UIにもアプリにも依存しない純粋関数（仕様: docs/quiz-foundation.md）
  quiz/adapter.ts       アプリのデータ → 基盤の型への変換。meta の読み書きはここだけ
  quiz/praise.ts        ほめ言葉
```

依存の向きは一方通行：`screens` → `components` / `quiz` / `data` → `types`。
`quiz/foundation/` は `src/` のほかの場所を import しない（他プロジェクトへコピーできる状態を保つ）。

## よくある作業

### カテゴリを足す

1. `src/data/categories/<id>.ts` に `CategoryQuiz` を書く（`animals.ts` を真似る）。
   問題は 10 問以上、選択肢は必ず 4 つで重複なし。
2. `src/data/index.ts` の `allQuizzes` に追加する。
3. 画面や基盤のコードは変えない。`src/data/data.test.ts` が整合性を自動チェックする。

### 画面を足す・変える

- `src/screens/XxxScreen.tsx` と同名の `.css` を作り、`App.tsx` の `Screen` 型と分岐に足す。
- 画面は props で受け取ったものを表示するだけにする。セッションの状態は `App.tsx` が持つ。
- 画面の先頭は `ScreenHeader`（もどるボタン）を使う。

### クイズの動きを変える

- 出題・採点・難易度のルールは `src/quiz/foundation/` にある。変えるときは
  `session.test.ts` にテストを足し、`docs/quiz-foundation.md` も合わせて直す。

## 書き方の決まり

### 文言（こどもが読む文字）

- ひらがな中心。文節のあいだに半角スペースを入れる（例：`すきな クイズを えらんでね！`）。
- 漢字は使わない（こっき ずかんで よみの下に添える国名だけは例外）。カタカナは外来語だけ。
- 否定的な言い方をしない。まちがえても励ます。

### CSS

- 色・文字サイズ・余白は `tokens.css` の変数を使う。生の `#333` や `16px` を画面のCSSに書かない。
- クラス名は BEM 風：`画面名__部品名`（例：`quiz__choice`）、状態は `is-xxx`。
- 幅の決め打ち（`width: 400px` など）をしない。`grid` / `flex` / `clamp()` / `min()` で伸び縮みさせる。
- 高さは `vh` ではなく `dvh`（スマホのアドレスバーに追従する）。
- 押せるものは高さ 48px 以上（`--tap-min`）。
- ブレークポイントは次の 3 つだけを使う：
  - `(min-width: 560px)` … 列を増やす
  - `(orientation: landscape) and (min-width: 560px)` … 横長用の 2 カラム配置
  - `(max-height: 480px)` … 横向きスマホ用に余白と飾りを詰める
- 端の余白は `.app` が safe-area 込みで持っている。画面側で端の余白を足さない。

### TypeScript / React

- `any` と `!`（non-null assertion）を使わない。型で表せないときは型を直す。
- 関数コンポーネント + hooks。状態管理ライブラリやルーターは入れない。
- 乱数は引数で受け取れるようにする（テストで固定するため）。`foundation` の関数は純粋関数のまま保つ。
- コメントは日本語で「なぜそうしたか」を書く。コードを読めば分かることは書かない。

### テスト

- ロジックは `*.test.ts`（node 環境）、画面の流れは `src/App.flow.test.tsx`（jsdom）。
- バグを直すときは、先にそのバグを再現するテストを足す。
- テストを通すためにテストを消したり `skip` したりしない。

## やってはいけないこと

- 国旗SVGを `src/` に置く・`import` する（JSバンドルに埋め込まれて重くなる）。
- `quiz/foundation/` にアプリ固有の語彙（国旗・カテゴリ名など）を持ち込む。
- 使っていないコード・ファイルを「念のため」残す。
- `package.json` の依存を断りなく増やす・バージョンを上げる。
- 秘密情報やAPIキーをコミットする（このアプリには不要）。

## 完了の条件

- [ ] `npm run check` が通った
- [ ] 画面を変えたなら 3 つの向きで確認した
- [ ] 振る舞いを変えたならテストを足した／直した
- [ ] README・docs の記述が実装とずれていない
