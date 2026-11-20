import { displayName, xpToReachLevel } from './growth';
import { SPECIES } from './species';
import { statsFor } from './stats';
import type { MonsterStats, OwnedMonster, RandomFn } from './types';

/**
 * 闘技場のターン制オートバトル。
 * すばやさの速い方から交互に攻撃し、HPが0になった方は
 * 「つかれて ねむった」ことにする（倒れる表現は使わない）。
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

/** バトル全体の状態（stepBattle で1手ずつ進める） */
export interface BattleState {
  player: Combatant;
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

/** バトル開始。すばやさが速い方が先攻（同点ならプレイヤー） */
export function createBattle(player: OwnedMonster, cpu: OwnedMonster): BattleState {
  const playerCombatant = toCombatant(player);
  const cpuCombatant = toCombatant(cpu);
  return {
    player: playerCombatant,
    cpu: cpuCombatant,
    next: playerCombatant.stats.speed >= cpuCombatant.stats.speed ? 'player' : 'cpu',
    actions: [],
    lastAction: null,
    finished: false,
    winner: null,
  };
}

/** ダメージ計算：こうげき − 相手ぼうぎょ÷2 ＋ 乱数の幅。最低1は入る */
export function damageFor(attack: number, defense: number, random: RandomFn): number {
  return Math.max(1, attack - Math.floor(defense / 2) + randInt(random, -2, 3));
}

function monsterName(combatant: Combatant): string {
  return combatant.name;
}

/** 1手進める。終わっていたらそのまま返す */
export function stepBattle(state: BattleState, random: RandomFn): BattleState {
  if (state.finished) return state;
  const attackerSide = state.next;
  const attacker = attackerSide === 'player' ? state.player : state.cpu;
  const defenderSide = attackerSide === 'player' ? 'cpu' : 'player';
  const defender = attackerSide === 'player' ? state.cpu : state.player;
  const damage = damageFor(attacker.stats.attack, defender.stats.defense, random);
  const defenderHp = Math.max(0, defender.hp - damage);
  const finished = defenderHp <= 0;
  const messages = [
    `${monsterName(attacker)}の こうげき！ ${monsterName(defender)}に ${damage}の ダメージ！`,
  ];
  if (finished) {
    messages.push(`${monsterName(defender)}は つかれて ねむった。`);
  }
  const action: BattleAction = { attacker: attackerSide, damage, message: messages.join(' ') };
  const nextDefender: Combatant = { ...defender, hp: defenderHp };
  return {
    player: defenderSide === 'player' ? nextDefender : state.player,
    cpu: defenderSide === 'cpu' ? nextDefender : state.cpu,
    next: defenderSide,
    actions: [...state.actions, action],
    lastAction: action,
    finished,
    winner: finished ? attackerSide : null,
  };
}
