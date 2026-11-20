import { useEffect, useRef, useState } from 'react';
import { PixelMonster } from '../components/PixelMonster';
import { ScreenHeader } from '../components/ScreenHeader';
import {
  BATTLE_LOSE_XP,
  BATTLE_WIN_XP,
  createBattle,
  createCpuMonster,
  displayName,
  levelFromXp,
  stageOfMonster,
  statsFor,
  stepBattle,
  type BattleState,
  type Combatant,
  type OwnedMonster,
} from '../monsters';
import './ArenaScreen.css';

interface Props {
  monsters: OwnedMonster[];
  trophies: number;
  onBack: () => void;
  /** バトル終了時に1回だけ呼ばれる（報酬の付与は App 側） */
  onBattleEnd: (monsterId: string, won: boolean) => void;
}

/** 1手ごとの間隔（ミリ秒） */
const STEP_INTERVAL_MS = 900;

function Fighter({
  combatant,
  side,
  battle,
}: {
  combatant: Combatant;
  side: 'player' | 'cpu';
  battle: BattleState;
}) {
  const percent = Math.max(0, Math.round((combatant.hp / combatant.maxHp) * 100));
  const isAttacking = battle.lastAction?.attacker === side;
  const isHit =
    battle.lastAction !== null && battle.lastAction.attacker !== side && !battle.finished;
  const isSleeping = battle.finished && battle.winner !== side;
  return (
    <div
      className={`arena__fighter${isAttacking ? ' is-attacking' : ''}${isHit ? ' is-hit' : ''}${
        isSleeping ? ' is-sleeping' : ''
      }`}
    >
      <span className="arena__figure">
        <PixelMonster
          shapeSpeciesId={combatant.monster.shapeSpeciesId}
          colorSpeciesId={combatant.monster.colorSpeciesId}
          stage={stageOfMonster(combatant.monster)}
        />
        {isSleeping && (
          <span className="arena__sleep" aria-hidden="true">
            💤
          </span>
        )}
      </span>
      <span className="arena__fighter-name">
        {combatant.name}（レベル {levelFromXp(combatant.monster.xp)}）
      </span>
      <span className="arena__hpbar" aria-hidden="true">
        <span
          className={`arena__hpbar-inner${percent <= 30 ? ' is-low' : ''}`}
          style={{ width: `${percent}%` }}
        />
      </span>
      <span className="arena__hp">
        HP {combatant.hp} / {combatant.maxHp}
      </span>
    </div>
  );
}

/** 闘技場画面：モンスターを選んで CPU とターン制オートバトル */
export function ArenaScreen({ monsters, trophies, onBack, onBattleEnd }: Props) {
  const [battle, setBattle] = useState<BattleState | null>(null);
  const reportedRef = useRef(false);

  // バトル中は一定間隔で自動的に1手進める
  useEffect(() => {
    if (!battle || battle.finished) return;
    const timer = setTimeout(() => {
      setBattle((current) => (current ? stepBattle(current, Math.random) : current));
    }, STEP_INTERVAL_MS);
    return () => clearTimeout(timer);
  }, [battle]);

  // 終わったら報酬付与を1回だけ知らせる
  useEffect(() => {
    if (battle?.finished && !reportedRef.current) {
      reportedRef.current = true;
      onBattleEnd(battle.player.monster.id, battle.winner === 'player');
    }
  }, [battle, onBattleEnd]);

  const startBattle = (monster: OwnedMonster) => {
    reportedRef.current = false;
    const cpu = createCpuMonster(levelFromXp(monster.xp), Math.random);
    setBattle(createBattle(monster, cpu));
  };

  const won = battle?.winner === 'player';

  return (
    <div className="screen arena">
      <ScreenHeader title="とうぎじょう" onBack={onBack} aside={<>🏆 {trophies}</>} />

      {!battle && (
        <>
          <h2 className="screen-title">たたかう モンスターを えらんでね</h2>
          {monsters.length === 0 ? (
            <p className="arena__lead">
              モンスターが いないよ。「モンスターを そだてる」で スターターを えらぼう！
            </p>
          ) : (
            <div className="arena__grid">
              {monsters.map((monster) => {
                const stats = statsFor(monster);
                return (
                  <button
                    key={monster.id}
                    type="button"
                    className="card-button arena__card"
                    onClick={() => startBattle(monster)}
                  >
                    <span className="arena__card-figure">
                      <PixelMonster
                        shapeSpeciesId={monster.shapeSpeciesId}
                        colorSpeciesId={monster.colorSpeciesId}
                        stage={stageOfMonster(monster)}
                      />
                    </span>
                    <span className="arena__card-name">{displayName(monster)}</span>
                    <span className="arena__card-stats">
                      レベル {levelFromXp(monster.xp)} / HP {stats.hp} / こうげき {stats.attack}
                    </span>
                  </button>
                );
              })}
            </div>
          )}
        </>
      )}

      {battle && (
        <>
          <div className="arena__stage" key={battle.actions.length}>
            <Fighter combatant={battle.player} side="player" battle={battle} />
            <span className="arena__vs" aria-hidden="true">
              VS
            </span>
            <Fighter combatant={battle.cpu} side="cpu" battle={battle} />
          </div>

          {!battle.finished ? (
            <p className="arena__log" aria-live="polite">
              {battle.lastAction ? battle.lastAction.message : 'たたかい スタート！'}
            </p>
          ) : (
            <div className="arena__result">
              <p className="arena__result-title">{won ? 'かった！ 🏆' : 'がんばったね！'}</p>
              <p className="arena__result-text">
                {won
                  ? `トロフィーが ${trophies}こに なったよ。${BATTLE_WIN_XP} XP たまった！`
                  : `まけちゃったけど ${BATTLE_LOSE_XP} XP たまったよ。`}
              </p>
              <div className="arena__result-buttons">
                <button type="button" className="button" onClick={() => setBattle(null)}>
                  もういちど たたかう
                </button>
                <button type="button" className="button button--secondary" onClick={onBack}>
                  🏠 もどる
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
