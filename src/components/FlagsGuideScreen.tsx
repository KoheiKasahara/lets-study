import { useMemo, useState } from 'react';
import { REGIONS, countries, type Region } from '../data/countries';
import { getFlagUrl } from '../data/flagAssets';

interface Props {
  onBack: () => void;
}

type RegionFilter = Region | 'ぜんぶ';

/** こっき ずかん：全195か国の国旗と国名を、地域フィルター＋名前検索で眺める画面 */
export function FlagsGuideScreen({ onBack }: Props) {
  const [region, setRegion] = useState<RegionFilter>('ぜんぶ');
  const [keyword, setKeyword] = useState('');

  const visible = useMemo(() => {
    const kw = keyword.trim();
    return countries.filter((country) => {
      if (region !== 'ぜんぶ' && country.region !== region) return false;
      if (kw && !country.name.includes(kw) && !country.yomi.includes(kw)) return false;
      return true;
    });
  }, [region, keyword]);

  return (
    <div className="screen guide">
      <div className="quiz-header">
        <button type="button" className="small-button" onClick={onBack}>
          ← もどる
        </button>
        <span className="quiz-category">🚩 こっき ずかん</span>
        <span />
      </div>

      <div className="guide-filters">
        {(['ぜんぶ', ...REGIONS] as RegionFilter[]).map((r) => (
          <button
            key={r}
            type="button"
            className={`guide-chip${region === r ? ' is-active' : ''}`}
            onClick={() => setRegion(r)}
          >
            {r}
          </button>
        ))}
      </div>

      <input
        type="search"
        className="guide-search"
        placeholder="くにの なまえで さがす"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        aria-label="くにの なまえで さがす"
      />

      <p className="guide-count">{visible.length}か国</p>

      <div className="guide-grid">
        {visible.map((country) => (
          <figure key={country.code} className="guide-item">
            <img
              src={getFlagUrl(country.code)}
              alt={`${country.name}の国旗`}
              className="guide-flag"
              loading="lazy"
            />
            <figcaption className="guide-name">{country.name}</figcaption>
            <figcaption className="guide-yomi">{country.yomi}</figcaption>
          </figure>
        ))}
      </div>

      {visible.length === 0 && <p className="guide-empty">みつからなかったよ</p>}
    </div>
  );
}
