import { displayName, xpToReachLevel } from './growth';
import { SPECIES } from './species';
import { statsFor } from './stats';
import type { MonsterStats, OwnedMonster, RandomFn } from './types';

/**
 * 闘技場のターン制オートバトル（1対1〜3対3のチーム戦）。
 * すばやさの速い方から交互に攻撃し、HPが0になった方は
 * 「つかれて ねむった」ことにする（倒れる表現は使わない）。
 * チーム戦では、ねむったモンスターの次のメンバーが自動で出てくる。
 */

/** 勝ったときにもらえる経験値 */
export const BATTLE_WIN_XP = 20;
/** 負けても頑張った分もらえる経験値 */
export const BATTLE_LOSE_XP = 8;

/** バトル中の1匹ぶんの状態 */
export interface Combatant {
  monster: OwnedMonster;
  /** 表示名（進化段階を反映した名前） */
  name: string;
  stats: MonsterStats;
  hp: number;
  maxHp: number;
}

/** 1回の攻撃の記録 */
export interface BattleAction {
  attacker: 'player' | 'cpu';
  damage: number;
  /** 表示用メッセージ（ひらがな中心） */
  message: string;
}

/**
 * バトル全体の状態（stepBattle で1手ずつ進める）。
 * チーム戦：各チームの先頭から順に出場し、ねむったら次のメンバーが出てくる。
 * player / cpu は「いま出ている1匹」（チームの playerIndex / cpuIndex 番目）で、
 * 1対1のときはチーム長1のチーム戦として扱う。
 */
export interface BattleState {
  playerTeam: Combatant[];
  cpuTeam: Combatant[];
  /** プレイヤー側でいま出ているメンバーの位置 */
  playerIndex: number;
  /** CPU側でいま出ているメンバーの位置 */
  cpuIndex: number;
  /** いま出ているプレイヤーのモンスター（playerTeam[playerIndex] と同じ） */
  player: Combatant;
  /** いま出ているCPUのモンスター（cpuTeam[cpuIndex] と同じ） */
  cpu: Combatant;
  /** 次に攻撃する側 */
  next: 'player' | 'cpu';
  actions: BattleAction[];
  /** 直近の攻撃（アニメーション用） */
  lastAction: BattleAction | null;
  finished: boolean;
  winner: 'player' | 'cpu' | null;
}

function randInt(random: RandomFn, min: number, max: number): number {
  return min + Math.floor(random() * (max - min + 1));
}

function toCombatant(monster: OwnedMonster): Combatant {
  const stats = statsFor(monster);
  return { monster, name: displayName(monster), stats, hp: stats.hp, maxHp: stats.hp };
}

/** CPUモンスターを、プレイヤーと近いレベル帯からランダムに作る */
export function createCpuMonster(playerLevel: number, random: RandomFn): OwnedMonster {
  const species = SPECIES[Math.min(SPECIES.length - 1, Math.floor(random() * SPECIES.length))];
  const level = Math.max(1, Math.min(30, playerLevel + randInt(random, -1, 1)));
  return {
    id: 'cpu',
    shapeSpeciesId: species.id,
    colorSpeciesId: species.id,
    name: species.stages[0].name,
    xp: xpToReachLevel(level),
    generation: 1,
  };
}

/** CPUのチームを、基準レベルと近いレベル帯からランダムに作る */
export function createCpuTeam(baseLevel: number, count: number, random: RandomFn): OwnedMonster[] {
  return Array.from({ length: count }, (_, index) => ({
    ...createCpuMonster(baseLevel, random),
    id: `cpu-${index + 1}`,
  }));
}

/** チーム戦のバトル開始。先頭同士で比べて、すばやさが速い方が先攻（同点ならプレイヤー） */
export function createTeamBattle(playerTeam: OwnedMonster[], cpuTeam: OwnedMonster[]): BattleState {
  const playerCombatants = playerTeam.map(toCombatant);
  const cpuCombatants = cpuTeam.map(toCombatant);
  return {
    playerTeam: playerCombatants,
    cpuTeam: cpuCombatants,
    playerIndex: 0,
    cpuIndex: 0,
    player: playerCombatants[0],
    cpu: cpuCombatants[0],
    next: playerCombatants[0].stats.speed >= cpuCombatants[0].stats.speed ? 'player' : 'cpu',
    actions: [],
    lastAction: null,
    finished: false,
    winner: null,
  };
}

/** 1対1のバトル開始（チーム長1のチーム戦として扱う） */
export function createBattle(player: OwnedMonster, cpu: OwnedMonster): BattleState {
  return createTeamBattle([player], [cpu]);
}

/** ダメージ計算：こうげき − 相手ぼうぎょ÷2 ＋ 乱数の幅。最低1は入る */
export function damageFor(attack: number, defense: number, random: RandomFn): number {
  return Math.max(1, attack - Math.floor(defense / 2) + randInt(random, -2, 3));
}

function monsterName(combatant: Combatant): string {
  return combatant.name;
}

/**
 * 1手進める。終わっていたらそのまま返す。
 * 攻撃された方がねむったら、同じチームの次のメンバーが自動で出てくる。
 * 次のメンバーがいなければ、そのチームの負けでバトル終了。
 * 手番は今までどおり両チームで交互（ねむった側のチームが次の手番になる）。
 */
export function stepBattle(state: BattleState, random: RandomFn): BattleState {
  if (state.finished) return state;
  const attackerSide = state.next;
  const attacker = attackerSide === 'player' ? state.player : state.cpu;
  const defenderSide = attackerSide === 'player' ? 'cpu' : 'player';
  const defender = attackerSide === 'player' ? state.cpu : state.player;
  const damage = damageFor(attacker.stats.attack, defender.stats.defense, random);
  const defenderHp = Math.max(0, defender.hp - damage);
  const messages = [
    `${monsterName(attacker)}の こうげき！ ${monsterName(defender)}に ${damage}の ダメージ！`,
  ];

  // 攻撃された側のチームだけが変わる（HPの更新と、ねむったときの交代）
  const defenderTeam = (defenderSide === 'player' ? state.playerTeam : state.cpuTeam).map(
    (combatant, index) =>
      index === (defenderSide === 'player' ? state.playerIndex : state.cpuIndex)
        ? { ...combatant, hp: defenderHp }
        : combatant,
  );
  let defenderIndex = defenderSide === 'player' ? state.playerIndex : state.cpuIndex;
  let finished = false;
  let winner: BattleState['winner'] = null;
  if (defenderHp <= 0) {
    messages.push(`${monsterName(defender)}は つかれて ねむった。`);
    if (defenderIndex + 1 < defenderTeam.length) {
      defenderIndex += 1;
      messages.push(`${monsterName(defenderTeam[defenderIndex])}が でてきた！`);
    } else {
      finished = true;
      winner = attackerSide;
    }
  }
  const action: BattleAction = { attacker: attackerSide, damage, message: messages.join(' ') };
  const playerTeam = defenderSide === 'player' ? defenderTeam : state.playerTeam;
  const cpuTeam = defenderSide === 'cpu' ? defenderTeam : state.cpuTeam;
  const playerIndex = defenderSide === 'player' ? defenderIndex : state.playerIndex;
  const cpuIndex = defenderSide === 'cpu' ? defenderIndex : state.cpuIndex;
  return {
    playerTeam,
    cpuTeam,
    playerIndex,
    cpuIndex,
    player: playerTeam[playerIndex],
    cpu: cpuTeam[cpuIndex],
    next: defenderSide,
    actions: [...state.actions, action],
    lastAction: action,
    finished,
    winner,
  };
}
