/**
 * 国旗SVG（public/flags/{code}.svg、flag-icons 由来）のURLを返す。
 * public 配下に置くことで JS バンドルに埋め込まれず、表示するときだけ読み込まれる。
 * BASE_URL は GitHub Pages では '/lets-study/'、ローカルでは '/'。
 */
export function getFlagUrl(code: string): string {
  return `${import.meta.env.BASE_URL}flags/${code}.svg`;
}
