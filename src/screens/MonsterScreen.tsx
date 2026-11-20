import { useState } from 'react';
import { PixelMonster } from '../components/PixelMonster';
import { ScreenHeader } from '../components/ScreenHeader';
import {
  SPECIES,
  displayName,
  levelFromXp,
  levelProgress,
  stageOfMonster,
  statsFor,
  type MonsterSave,
  type OwnedMonster,
} from '../monsters';
import './MonsterScreen.css';

interface Props {
  save: MonsterSave;
  onBack: () => void;
  /** スターターを選んだとき */
  onChooseStarter: (speciesId: string) => void;
  /** たまごをかえす。孵ったモンスターを返す（たまごがなければ null） */
  onHatch: () => OwnedMonster | null;
  /** 配合する。生まれた子を返す（できなければ null） */
  onFuse: (parentAId: string, parentBId: string) => OwnedMonster | null;
}

/** モンスター育成画面：スターターえらび・一覧・たまご・配合 */
export function MonsterScreen({ save, onBack, onChooseStarter, onHatch, onFuse }: Props) {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [notice, setNotice] = useState<string | null>(null);
  const monsters = save.monsters;
  // 残っていないモンスターの選択は捨てる
  const selected = selectedIds.filter((id) => monsters.some((monster) => monster.id === id));

  const toggleSelect = (id: string) => {
    setNotice(null);
    setSelectedIds((prev) => {
      const current = prev.filter((selectedId) =>
        monsters.some((monster) => monster.id === selectedId),
      );
      if (current.includes(id)) return current.filter((selectedId) => selectedId !== id);
      if (current.length >= 2) return current;
      return [...current, id];
    });
  };

  const handleHatch = () => {
    const hatched = onHatch();
    if (hatched) {
      setNotice(`${displayName(hatched)}が うまれた！`);
    }
  };

  const handleFuse = () => {
    if (selected.length !== 2) return;
    const child = onFuse(selected[0], selected[1]);
    if (child) {
      setSelectedIds([]);
      setNotice(`${displayName(child)}が うまれた！`);
    }
  };

  return (
    <div className="screen monsters">
      <ScreenHeader title="モンスターを そだてる" onBack={onBack} />

      {notice && (
        <p className="monsters__notice" aria-live="polite">
          🎉 {notice}
        </p>
      )}

      {monsters.length === 0 ? (
        <section className="monsters__section">
          <h2 className="screen-title">スターターを えらんでね！</h2>
          <p className="monsters__lead">クイズに こたえると けいけんちが たまって そだつよ。</p>
          <div className="monsters__grid">
            {SPECIES.map((species) => (
              <button
                key={species.id}
                type="button"
                className="card-button monsters__card"
                onClick={() => onChooseStarter(species.id)}
              >
                <span className="monsters__figure">
                  <PixelMonster shapeSpeciesId={species.id} colorSpeciesId={species.id} stage={1} />
                </span>
                <span className="monsters__name">{species.stages[0].name}</span>
                <span className="monsters__desc">{species.name}の モンスター</span>
              </button>
            ))}
          </div>
        </section>
      ) : (
        <>
          <section className="monsters__section">
            <h2 className="screen-title">きみの モンスター</h2>
            <div className="monsters__grid">
              {monsters.map((monster) => {
                const level = levelFromXp(monster.xp);
                const stats = statsFor(monster);
                const isSelected = selected.includes(monster.id);
                return (
                  <button
                    key={monster.id}
                    type="button"
                    className={`card-button monsters__card${isSelected ? ' is-selected' : ''}`}
                    aria-pressed={isSelected}
                    onClick={() => toggleSelect(monster.id)}
                  >
                    <span className="monsters__figure">
                      <PixelMonster
                        shapeSpeciesId={monster.shapeSpeciesId}
                        colorSpeciesId={monster.colorSpeciesId}
                        stage={stageOfMonster(monster)}
                      />
                    </span>
                    <span className="monsters__name">
                      {displayName(monster)}
                      {monster.generation > 1 && (
                        <span className="monsters__generation">
                          （{monster.generation}せだいめ）
                        </span>
                      )}
                    </span>
                    <span className="monsters__level">レベル {level}</span>
                    <span className="monsters__xpbar" aria-hidden="true">
                      <span
                        className="monsters__xpbar-inner"
                        style={{ width: `${Math.round(levelProgress(monster.xp) * 100)}%` }}
                      />
                    </span>
                    <span className="monsters__stats">
                      HP {stats.hp} / こうげき {stats.attack} / ぼうぎょ {stats.defense} / すばやさ{' '}
                      {stats.speed}
                    </span>
                  </button>
                );
              })}
            </div>
          </section>

          {save.eggs > 0 && (
            <section className="monsters__section monsters__egg">
              <p className="monsters__lead">🥚 たまごが {save.eggs}こ あるよ！</p>
              <button type="button" className="button" onClick={handleHatch}>
                たまごを かえす
              </button>
            </section>
          )}

          {monsters.length >= 2 && (
            <section className="monsters__section monsters__fusion">
              <h2 className="screen-title">ごうたい させよう</h2>
              <p className="monsters__lead">
                モンスターを 2ひき えらんでね。あたらしい モンスターが うまれるよ。 おやは そのまま
                のこるよ。
              </p>
              <button
                type="button"
                className="button"
                disabled={selected.length !== 2}
                onClick={handleFuse}
              >
                💞 ごうたい！
              </button>
            </section>
          )}
        </>
      )}
    </div>
  );
}
