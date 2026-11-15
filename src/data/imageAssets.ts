/**
 * 問題用の画像（public/images/{カテゴリ}/{名前}）のURLを返す。
 * 国旗と同じく public 配下に置き、表示するときだけ読み込まれるようにする。
 * 画像の出典・ライセンスは docs/image-credits.md に記録している。
 */
export function getImageUrl(name: string): string {
  return `${import.meta.env.BASE_URL}images/${name}`;
}
