import { levelFromXp, stageForLevel } from './growth';
import { speciesById } from './species';
import type { MonsterStats, OwnedMonster } from './types';

/**
 * ステータスの算出。
 * 基礎値は「形の種族」と「色の種族」の平均（＝配合では両親の平均になる）。
 * そこへ進化段階の倍率とレベル成長をかけ、配合モンスターには
 * 世代ぶんのボーナスを足す。すべてモンスターの保存内容から導出できる。
 */

/** 進化段階ごとの倍率 */
const STAGE_MULTIPLIERS = [1, 1.5, 2.2] as const;

/** 世代1つぶん（配合で深くなるほど）のボーナス */
const GENERATION_BONUS = 2;

/** レベル1つぶんの成長量 */
const LEVEL_GROWTH: MonsterStats = { hp: 3, attack: 2, defense: 2, speed: 1 };

function statValue(
  averageBase: number,
  stageMultiplier: number,
  level: number,
  growth: number,
  bonus: number,
): number {
  return Math.round(averageBase * stageMultiplier) + (level - 1) * growth + bonus;
}

/** モンスターの現在ステータスを計算する */
export function statsFor(monster: OwnedMonster): MonsterStats {
  const shape = speciesById(monster.shapeSpeciesId);
  const color = speciesById(monster.colorSpeciesId);
  const level = levelFromXp(monster.xp);
  const multiplier = STAGE_MULTIPLIERS[stageForLevel(level) - 1];
  const bonus = (monster.generation - 1) * GENERATION_BONUS;
  const average = (key: keyof MonsterStats): number => {
    const a = shape ? shape.baseStats[key] : 0;
    const b = color ? color.baseStats[key] : 0;
    return (a + b) / 2;
  };
  return {
    hp: statValue(average('hp'), multiplier, level, LEVEL_GROWTH.hp, bonus),
    attack: statValue(average('attack'), multiplier, level, LEVEL_GROWTH.attack, bonus),
    defense: statValue(average('defense'), multiplier, level, LEVEL_GROWTH.defense, bonus),
    speed: statValue(average('speed'), multiplier, level, LEVEL_GROWTH.speed, bonus),
  };
}
