/**
 * 国旗SVG（src/assets/flags/{code}.svg、flag-icons 由来）のURLマップ。
 * ビルド時に全ファイルを読み込み、国コードから引けるようにする。
 */
const flagModules = import.meta.glob<string>('../assets/flags/*.svg', {
  eager: true,
  query: '?url',
  import: 'default',
});

export const flagUrlByCode: Record<string, string> = {};
for (const [path, url] of Object.entries(flagModules)) {
  const code = path.split('/').pop()!.replace(/\.svg$/, '');
  flagUrlByCode[code] = url;
}

/** 国コードから国旗SVGのURLを返す（なければ undefined） */
export function getFlagUrl(code: string): string | undefined {
  return flagUrlByCode[code];
}
