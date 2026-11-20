/**
 * モンスター育成システムの公開API。
 * ロジックはすべて UI に依存しない純粋関数（保存の読み書きを除く）。
 */
export type { EvolutionStage, MonsterSave, MonsterStats, OwnedMonster, RandomFn } from './types';
export type { Palette, Species, SpeciesStage } from './species';
export { PIXEL_SIZE, SPECIES, speciesById, stageOf } from './species';
export type { EvolutionInfo, GrowthReport } from './growth';
export {
  EGG_EVERY_CORRECT,
  MAX_LEVEL,
  STAGE2_LEVEL,
  STAGE3_LEVEL,
  XP_PER_CORRECT,
  XP_PER_WRONG,
  addXpToMonster,
  applyQuizResult,
  createPureMonster,
  displayName,
  levelFromXp,
  levelProgress,
  pickHatchSpecies,
  stageForLevel,
  stageOfMonster,
  xpGainForBlock,
  xpToReachLevel,
} from './growth';
export { statsFor } from './stats';
export { combineNames, fuseMonsters } from './fusion';
export type { BattleAction, BattleState, Combatant } from './battle';
export {
  BATTLE_LOSE_XP,
  BATTLE_WIN_XP,
  createBattle,
  createCpuMonster,
  damageFor,
  stepBattle,
} from './battle';
export type { StorageLike } from './storage';
export { MONSTER_STORAGE_KEY, emptyMonsterSave, loadMonsterSave, saveMonsterSave } from './storage';
