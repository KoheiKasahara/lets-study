import { useMemo, useState } from 'react';
import { ScreenHeader } from '../components/ScreenHeader';
import { REGIONS, REGION_LABELS, countries, type Region } from '../data/countries';
import { getFlagUrl } from '../data/flagAssets';
import './FlagsGuideScreen.css';

interface Props {
  onBack: () => void;
}

type RegionFilter = Region | 'all';

const FILTERS: { value: RegionFilter; label: string }[] = [
  { value: 'all', label: 'ぜんぶ' },
  ...REGIONS.map((region) => ({ value: region, label: REGION_LABELS[region] })),
];

/** こっき ずかん：全195か国の国旗と国名を、地域フィルター＋名前検索で眺める画面 */
export function FlagsGuideScreen({ onBack }: Props) {
  const [region, setRegion] = useState<RegionFilter>('all');
  const [keyword, setKeyword] = useState('');

  const visible = useMemo(() => {
    const kw = keyword.trim();
    return countries.filter((country) => {
      if (region !== 'all' && country.region !== region) return false;
      if (kw && !country.name.includes(kw) && !country.yomi.includes(kw)) return false;
      return true;
    });
  }, [region, keyword]);

  return (
    <div className="screen guide">
      <ScreenHeader title="🚩 こっき ずかん" onBack={onBack} aside={`${visible.length}かこく`} />

      <div className="guide__filters">
        {FILTERS.map((filter) => (
          <button
            key={filter.value}
            type="button"
            className={`guide__chip${region === filter.value ? ' is-active' : ''}`}
            aria-pressed={region === filter.value}
            onClick={() => setRegion(filter.value)}
          >
            {filter.label}
          </button>
        ))}
      </div>

      <input
        type="search"
        className="guide__search"
        placeholder="くにの なまえで さがす"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        aria-label="くにの なまえで さがす"
      />

      {visible.length === 0 ? (
        <p className="guide__empty">みつからなかったよ</p>
      ) : (
        <div className="guide__grid">
          {visible.map((country) => (
            <figure key={country.code} className="guide__item">
              <img
                src={getFlagUrl(country.code)}
                alt=""
                className="guide__flag"
                loading="lazy"
                width={160}
                height={120}
              />
              <figcaption>
                <span className="guide__yomi">{country.yomi}</span>
                <span className="guide__name">{country.name}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      )}
    </div>
  );
}
