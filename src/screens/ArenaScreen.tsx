import { useEffect, useRef, useState } from 'react';
import { PixelMonster } from '../components/PixelMonster';
import { ScreenHeader } from '../components/ScreenHeader';
import {
  BATTLE_LOSE_XP,
  BATTLE_WIN_XP,
  createBattle,
  createCpuMonster,
  createCpuTeam,
  createTeamBattle,
  displayName,
  levelFromXp,
  partyMonstersFromIds,
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
  /** パーティのID並び（並び順＝戦う順番） */
  partyIds: string[];
  trophies: number;
  onBack: () => void;
  /** バトル終了時に1回だけ呼ばれる（報酬の付与は App 側）。参加した全員のIDを渡す */
  onBattleEnd: (monsterIds: string[], won: boolean) => void;
}

/** パーティ戦で CPU が連れてくるモンスターの数 */
const CPU_TEAM_SIZE = 3;

type Speed = 'normal' | 'fast';

/** 速さごとの1手の間隔（ミリ秒） */
const SPEED_INTERVAL_MS: Record<Speed, number> = { normal: 900, fast: 300 };

type BattleMode = 'party' | 'single';

function Fighter({
  combatant,
  side,
  battle,
  team,
  activeIndex,
}: {
  combatant: Combatant;
  side: 'player' | 'cpu';
  battle: BattleState;
  team: Combatant[];
  activeIndex: number;
}) {
  const percent = Math.max(0, Math.round((combatant.hp / combatant.maxHp) * 100));
  const isAttacking = battle.lastAction?.attacker === side;
  const isHit =
    battle.lastAction !== null && battle.lastAction.attacker !== side && !battle.finished;
  const isSleeping = combatant.hp <= 0;
  // 出番を待っている（または もう ねむった）仲間たち
  const bench = team.filter((_, index) => index !== activeIndex);
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
      {bench.length > 0 && (
        <span className="arena__bench">
          {bench.map((member) => (
            <span
              key={member.monster.id}
              className={`arena__bench-member${member.hp <= 0 ? ' is-sleeping' : ''}`}
            >
              <PixelMonster
                shapeSpeciesId={member.monster.shapeSpeciesId}
                colorSpeciesId={member.monster.colorSpeciesId}
                stage={stageOfMonster(member.monster)}
              />
              {member.hp <= 0 && (
                <span className="arena__bench-sleep" aria-hidden="true">
                  💤
                </span>
              )}
            </span>
          ))}
        </span>
      )}
    </div>
  );
}

/** 闘技場画面：パーティのチーム戦（パーティが空なら1匹選んで1対1） */
export function ArenaScreen({ monsters, partyIds, trophies, onBack, onBattleEnd }: Props) {
  const [battle, setBattle] = useState<BattleState | null>(null);
  const [mode, setMode] = useState<BattleMode>('single');
  const [speed, setSpeed] = useState<Speed>('normal');
  const reportedRef = useRef(false);

  const party = partyMonstersFromIds(partyIds, monsters);

  // バトル中は一定間隔で自動的に1手進める（速さ切り替えで間隔が変わる）
  useEffect(() => {
    if (!battle || battle.finished) return;
    const timer = setTimeout(() => {
      setBattle((current) => (current ? stepBattle(current, Math.random) : current));
    }, SPEED_INTERVAL_MS[speed]);
    return () => clearTimeout(timer);
  }, [battle, speed]);

  // 終わったら報酬付与を1回だけ知らせる（参加したパーティ全員ぶん）
  useEffect(() => {
    if (battle?.finished && !reportedRef.current) {
      reportedRef.current = true;
      onBattleEnd(
        battle.playerTeam.map((combatant) => combatant.monster.id),
        battle.winner === 'player',
      );
    }
  }, [battle, onBattleEnd]);

  const startPartyBattle = (team: OwnedMonster[]) => {
    reportedRef.current = false;
    setMode('party');
    // CPUも3匹のチーム。レベル帯はパーティ先頭のメンバー基準
    const cpuTeam = createCpuTeam(levelFromXp(team[0].xp), CPU_TEAM_SIZE, Math.random);
    setBattle(createTeamBattle(team, cpuTeam));
  };

  const startSingleBattle = (monster: OwnedMonster) => {
    reportedRef.current = false;
    setMode('single');
    const cpu = createCpuMonster(levelFromXp(monster.xp), Math.random);
    setBattle(createBattle(monster, cpu));
  };

  /** 選び直さず、同じパーティ（モンスター）でもう一度戦う */
  const rematch = () => {
    if (!battle) return;
    // 報酬で経験値が増えた後の最新状態で組み直す
    const team = battle.playerTeam.map(
      (combatant) =>
        monsters.find((monster) => monster.id === combatant.monster.id) ?? combatant.monster,
    );
    if (mode === 'party') {
      startPartyBattle(team);
    } else if (team[0]) {
      startSingleBattle(team[0]);
    }
  };

  const won = battle?.winner === 'player';
  const teamBattle = battle !== null && battle.playerTeam.length > 1;

  return (
    <div className="screen arena">
      <ScreenHeader title="とうぎじょう" onBack={onBack} aside={<>🏆 {trophies}</>} />

      {!battle && monsters.length === 0 && (
        <p className="arena__lead">
          モンスターが いないよ。「モンスターを そだてる」で スターターを えらぼう！
        </p>
      )}

      {!battle && monsters.length > 0 && party.length > 0 && (
        <>
          <h2 className="screen-title">パーティで たたかおう！</h2>
          <div className="arena__party-row">
            {party.map((monster, index) => (
              <div key={monster.id} className="arena__party-member">
                <span className="arena__party-order">{index + 1}ばんめ</span>
                <span className="arena__party-figure">
                  <PixelMonster
                    shapeSpeciesId={monster.shapeSpeciesId}
                    colorSpeciesId={monster.colorSpeciesId}
                    stage={stageOfMonster(monster)}
                  />
                </span>
                <span className="arena__party-name">{displayName(monster)}</span>
              </div>
            ))}
          </div>
          <p className="arena__lead">
            あいても {CPU_TEAM_SIZE}ひきの チームで くるよ。パーティの じゅんばんで たたかうよ！
          </p>
          <div className="arena__start">
            <button type="button" className="button" onClick={() => startPartyBattle(party)}>
              ⚔️ パーティで たたかう！
            </button>
          </div>
          <p className="arena__lead">パーティは「モンスターを そだてる」で かえられるよ。</p>
        </>
      )}

      {!battle && monsters.length > 0 && party.length === 0 && (
        <>
          <h2 className="screen-title">たたかう モンスターを えらんでね</h2>
          <p className="arena__lead">
            「モンスターを そだてる」で ☆を おすと パーティが くめて、チームで たたかえるよ。
          </p>
          <div className="arena__grid">
            {monsters.map((monster) => {
              const stats = statsFor(monster);
              return (
                <button
                  key={monster.id}
                  type="button"
                  className="card-button arena__card"
                  onClick={() => startSingleBattle(monster)}
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
        </>
      )}

      {battle && (
        <>
          <div className="arena__stage" key={battle.actions.length}>
            <Fighter
              combatant={battle.player}
              side="player"
              battle={battle}
              team={battle.playerTeam}
              activeIndex={battle.playerIndex}
            />
            <span className="arena__vs" aria-hidden="true">
              VS
            </span>
            <Fighter
              combatant={battle.cpu}
              side="cpu"
              battle={battle}
              team={battle.cpuTeam}
              activeIndex={battle.cpuIndex}
            />
          </div>

          {!battle.finished && (
            <div className="arena__speed">
              <button
                type="button"
                className="button button--small"
                aria-pressed={speed === 'fast'}
                onClick={() => setSpeed(speed === 'fast' ? 'normal' : 'fast')}
              >
                はやさ： {speed === 'fast' ? 'はやい' : 'ふつう'}
              </button>
            </div>
          )}

          {!battle.finished ? (
            <p className="arena__log" aria-live="polite">
              {battle.lastAction ? battle.lastAction.message : 'たたかい スタート！'}
            </p>
          ) : (
            <div className="arena__result">
              <p className="arena__result-title">{won ? 'かった！ 🏆' : 'がんばったね！'}</p>
              <p className="arena__result-text">
                {won
                  ? `トロフィーが ${trophies}こに なったよ。${teamBattle ? 'パーティ みんなに ' : ''}${BATTLE_WIN_XP} XP たまった！`
                  : `まけちゃったけど ${teamBattle ? 'パーティ みんなに ' : ''}${BATTLE_LOSE_XP} XP たまったよ。`}
              </p>
              <div className="arena__result-buttons">
                <button type="button" className="button" onClick={rematch}>
                  {mode === 'party'
                    ? 'おなじ パーティで もういちど'
                    : 'おなじ モンスターで もういちど'}
                </button>
                <button
                  type="button"
                  className="button button--secondary"
                  onClick={() => setBattle(null)}
                >
                  えらびなおす
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
