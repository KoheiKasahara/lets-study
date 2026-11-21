import { useState } from 'react';
import { PixelMonster } from '../components/PixelMonster';
import { ScreenHeader } from '../components/ScreenHeader';
import {
  PARTY_MAX_SIZE,
  SPECIES,
  correctUntilNextEgg,
  displayName,
  levelFromXp,
  levelProgress,
  partyMonstersOf,
  stageOfMonster,
  statsFor,
  xpUntilNextLevel,
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
  /** パーティへの出し入れ */
  onToggleParty: (monsterId: string) => void;
}

/** モンスター育成画面：スターターえらび・パーティ・一覧・たまご・配合 */
export function MonsterScreen({
  save,
  onBack,
  onChooseStarter,
  onHatch,
  onFuse,
  onToggleParty,
}: Props) {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [notice, setNotice] = useState<string | null>(null);
  const monsters = save.monsters;
  // 残っていないモンスターの選択は捨てる
  const selected = selectedIds.filter((id) => monsters.some((monster) => monster.id === id));
  const party = partyMonstersOf(save);
  const partyFull = party.length >= PARTY_MAX_SIZE;

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

  const fusionStatus =
    selected.length === 0
      ? 'モンスターを 2ひき えらんでね'
      : selected.length === 1
        ? 'あと 1ひき えらんでね'
        : '2ひき えらんだよ！';

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
          <section className="monsters__section monsters__party">
            <h2 className="screen-title">きみの パーティ</h2>
            <p className="monsters__lead">
              とうぎじょうでは パーティの じゅんばんで たたかうよ。 まえの モンスターが ねむったら
              つぎの モンスターが でてくるよ。
            </p>
            {party.length === 0 ? (
              <p className="monsters__lead">
                カードの ☆を おすと パーティに はいるよ（{PARTY_MAX_SIZE}ひきまで）。
              </p>
            ) : (
              <>
                <div className="monsters__party-row">
                  {party.map((monster, index) => (
                    <div key={monster.id} className="monsters__party-slot">
                      <span className="monsters__party-order">{index + 1}ばんめ</span>
                      <span className="monsters__party-figure">
                        <PixelMonster
                          shapeSpeciesId={monster.shapeSpeciesId}
                          colorSpeciesId={monster.colorSpeciesId}
                          stage={stageOfMonster(monster)}
                        />
                      </span>
                      <span className="monsters__party-name">{displayName(monster)}</span>
                    </div>
                  ))}
                </div>
                {partyFull && (
                  <p className="monsters__lead">
                    パーティは {PARTY_MAX_SIZE}ひきで いっぱいだよ。かえたい ときは カードの ★を
                    おして はずしてね。
                  </p>
                )}
              </>
            )}
          </section>

          <section className="monsters__section">
            <h2 className="screen-title">きみの モンスター</h2>
            <div className="monsters__grid">
              {monsters.map((monster) => {
                const level = levelFromXp(monster.xp);
                const stats = statsFor(monster);
                const isSelected = selected.includes(monster.id);
                const partyIndex = party.findIndex((member) => member.id === monster.id);
                const inParty = partyIndex >= 0;
                const nextLevelXp = xpUntilNextLevel(monster.xp);
                return (
                  <div key={monster.id} className="monsters__card-wrap">
                    <button
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
                      <span className="monsters__next-level">
                        {nextLevelXp === null
                          ? 'レベル さいこう！'
                          : `つぎの レベルまで あと ${nextLevelXp} XP`}
                      </span>
                      <span className="monsters__stats">
                        HP {stats.hp} / こうげき {stats.attack} / ぼうぎょ {stats.defense} /
                        すばやさ {stats.speed}
                      </span>
                      {inParty && (
                        <span className="monsters__party-badge">
                          ⭐ パーティの {partyIndex + 1}ばんめ
                        </span>
                      )}
                    </button>
                    {/* ☆はカードの外（兄弟要素）に置く。カード本体のタップ（配合用えらび）と混ざらないため */}
                    <button
                      type="button"
                      className={`monsters__star${inParty ? ' is-in-party' : ''}`}
                      aria-label={inParty ? 'パーティから はずす' : 'パーティに いれる'}
                      aria-pressed={inParty}
                      disabled={!inParty && partyFull}
                      onClick={() => onToggleParty(monster.id)}
                    >
                      {inParty ? '★' : '☆'}
                    </button>
                  </div>
                );
              })}
            </div>
          </section>

          <section className="monsters__section monsters__egg">
            {save.eggs > 0 ? (
              <>
                <p className="monsters__lead">🥚 たまごが {save.eggs}こ あるよ！</p>
                <button type="button" className="button" onClick={handleHatch}>
                  たまごを かえす
                </button>
              </>
            ) : (
              <p className="monsters__lead">
                🥚 あと {correctUntilNextEgg(save.totalCorrect)}問 せいかいすると たまごが
                もらえるよ！
              </p>
            )}
          </section>

          {monsters.length >= 2 && (
            <section className="monsters__section monsters__fusion">
              <h2 className="screen-title">ごうたい させよう</h2>
              <p className="monsters__lead">
                あたらしい モンスターが うまれるよ。 おやは そのまま のこるよ。
              </p>
            </section>
          )}

          {monsters.length >= 2 && (
            <div className="monsters__fusion-bar">
              <p className="monsters__fusion-status" aria-live="polite">
                💞 {fusionStatus}
              </p>
              <button
                type="button"
                className="button"
                disabled={selected.length !== 2}
                onClick={handleFuse}
              >
                💞 ごうたい！
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
