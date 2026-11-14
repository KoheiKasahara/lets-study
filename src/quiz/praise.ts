/** 結果画面のほめ言葉を返す（正解数に応じて変える。0問でも必ず励ます） */
export function praiseFor(score: number, total: number): string {
  if (total <= 0) return '';
  if (score === total) return 'かんぺき！ ぜんぶ せいかい、すごいね！';
  if (score >= Math.ceil(total * 0.6)) return 'よくできました！ とっても じょうずだね！';
  if (score >= 1) return 'がんばったね！ もういちど やってみよう！';
  return 'だいじょうぶ！ やれば できるよ、もういちど！';
}
