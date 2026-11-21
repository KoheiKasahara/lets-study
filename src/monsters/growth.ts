import { SPECIES, speciesById, stageOf } from './species';
import type { EvolutionStage, MonsterSave, OwnedMonster, RandomFn } from './types';

/**
 * 経験値・レベル・進化・たまごのルール。
 * クイズに答えると全員のモンスターに経験値が入り、レベルが上がると進化する。
 */

/** 正解1問でもらえる経験値 */
export const XP_PER_CORRECT = 10;
/** まちがいでも頑張った分もらえる経験値 */
export const XP_PER_WRONG = 3;
/** レベルの上限 */
export const MAX_LEVEL = 30;
/** たまごがもらえる累計正解数の間隔 */
export const EGG_EVERY_CORRECT = 30;
/** 第2段階へ進化するレベル */
export const STAGE2_LEVEL = 5;
/** 第3段階へ進化するレベル */
export const STAGE3_LEVEL = 10;

/** そのレベルに到達するのに必要な累計経験値（レベルが上がるほど少しずつ増える単純式） */
export function xpToReachLevel(level: number): number {
  if (level <= 1) return 0;
  return 10 * level * (level - 1);
}

/** 累計経験値から現在のレベルを出す */
export function levelFromXp(xp: number): number {
  let level = 1;
  while (level < MAX_LEVEL && xp >= xpToReachLevel(level + 1)) {
    level += 1;
  }
  return level;
}

/** レベルから進化段階を出す */
export function stageForLevel(level: number): EvolutionStage {
  if (level >= STAGE3_LEVEL) return 3;
  if (level >= STAGE2_LEVEL) return 2;
  return 1;
}

/** モンスターの現在の進化段階 */
export function stageOfMonster(monster: OwnedMonster): EvolutionStage {
  return stageForLevel(levelFromXp(monster.xp));
}

/** 次のレベルまでの進み具合（0〜1）。最大レベルでは1 */
export function levelProgress(xp: number): number {
  const level = levelFromXp(xp);
  if (level >= MAX_LEVEL) return 1;
  const current = xpToReachLevel(level);
  const next = xpToReachLevel(level + 1);
  return (xp - current) / (next - current);
}

/** 次のレベルまであと何 XP か。最大レベルでは null */
export function xpUntilNextLevel(xp: number): number | null {
  const level = levelFromXp(xp);
  if (level >= MAX_LEVEL) return null;
  return xpToReachLevel(level + 1) - xp;
}

/** 次のたまごまであと何問正解すればいいか（ちょうど倍数のときは次の1つぶん丸ごと） */
export function correctUntilNextEgg(totalCorrect: number): number {
  return EGG_EVERY_CORRECT - (totalCorrect % EGG_EVERY_CORRECT);
}

/**
 * 表示名。純粋種（世代1）は進化に合わせて段階ごとの名前になり、
 * 配合モンスターは生まれたときの合成名のまま。
 */
export function displayName(monster: OwnedMonster): string {
  if (monster.generation === 1 && monster.shapeSpeciesId === monster.colorSpeciesId) {
    const species = speciesById(monster.shapeSpeciesId);
    if (species) {
      return stageOf(species, stageOfMonster(monster)).name;
    }
  }
  return monster.name;
}

/** 1セット（正解 correct 問 / 全 total 問）でもらえる経験値 */
export function xpGainForBlock(correct: number, total: number): number {
  const wrong = Math.max(0, total - correct);
  return correct * XP_PER_CORRECT + wrong * XP_PER_WRONG;
}

/** 純粋種のモンスターを作る（スターター・孵化の共通処理） */
export function createPureMonster(speciesId: string, id: string): OwnedMonster {
  const species = speciesById(speciesId);
  return {
    id,
    shapeSpeciesId: speciesId,
    colorSpeciesId: speciesId,
    name: species ? stageOf(species, 1).name : speciesId,
    xp: 0,
    generation: 1,
  };
}

/** たまごから孵る種族を乱数で選ぶ */
export function pickHatchSpecies(random: RandomFn): string {
  const index = Math.min(SPECIES.length - 1, Math.floor(random() * SPECIES.length));
  return SPECIES[index].id;
}

/** 進化したモンスターの報告 */
export interface EvolutionInfo {
  monsterId: string;
  /** 進化後の表示名 */
  name: string;
  fromStage: EvolutionStage;
  toStage: EvolutionStage;
}

/** クイズ1セット分の成長報告 */
export interface GrowthReport {
  xpGain: number;
  evolutions: EvolutionInfo[];
  eggsGained: number;
}

/**
 * クイズ1セットの結果を育成データへ反映する。
 * 経験値は所持モンスター全員へ入り、累計正解数が EGG_EVERY_CORRECT の
 * 倍数をまたぐたびに たまごが1つ増える。
 */
export function applyQuizResult(
  save: MonsterSave,
  correct: number,
  total: number,
): { save: MonsterSave; report: GrowthReport } {
  const xpGain = xpGainForBlock(correct, total);
  const evolutions: EvolutionInfo[] = [];
  const monsters = save.monsters.map((monster) => {
    const grown = { ...monster, xp: monster.xp + xpGain };
    const fromStage = stageOfMonster(monster);
    const toStage = stageOfMonster(grown);
    if (toStage > fromStage) {
      evolutions.push({
        monsterId: monster.id,
        name: displayName(grown),
        fromStage,
        toStage,
      });
    }
    return grown;
  });
  const totalCorrect = save.totalCorrect + correct;
  const eggsGained =
    Math.floor(totalCorrect / EGG_EVERY_CORRECT) -
    Math.floor(save.totalCorrect / EGG_EVERY_CORRECT);
  return {
    save: {
      ...save,
      monsters,
      totalCorrect,
      eggs: save.eggs + eggsGained,
    },
    report: { xpGain, evolutions, eggsGained },
  };
}

/** モンスター1匹だけに経験値を足す（闘技場の報酬用） */
export function addXpToMonster(save: MonsterSave, monsterId: string, xp: number): MonsterSave {
  return addXpToMonsters(save, [monsterId], xp);
}

/** 指定したモンスター全員に経験値を足す（闘技場のチーム戦の報酬用） */
export function addXpToMonsters(
  save: MonsterSave,
  monsterIds: readonly string[],
  xp: number,
): MonsterSave {
  const targets = new Set(monsterIds);
  return {
    ...save,
    monsters: save.monsters.map((monster) =>
      targets.has(monster.id) ? { ...monster, xp: monster.xp + xp } : monster,
    ),
  };
}
