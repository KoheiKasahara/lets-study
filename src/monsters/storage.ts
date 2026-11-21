import { sanitizePartyIds } from './party';
import { speciesById } from './species';
import type { MonsterSave, OwnedMonster } from './types';

/**
 * 育成データの localStorage 保存。
 * 壊れたJSONや想定外の形でも落ちないよう、読み込み時に検証して
 * おかしい部分は捨て、空のデータで始められるようにする。
 */

export const MONSTER_STORAGE_KEY = 'lets-study:monsters:v1';

/** localStorage と同じ最小インターフェース（テストで差し替えられるように） */
export interface StorageLike {
  getItem: (key: string) => string | null;
  setItem: (key: string, value: string) => void;
}

/** 空の育成データ */
export function emptyMonsterSave(): MonsterSave {
  return { monsters: [], partyIds: [], totalCorrect: 0, eggs: 0, trophies: 0, nextId: 1 };
}

function defaultStorage(): StorageLike | undefined {
  try {
    return globalThis.localStorage;
  } catch {
    return undefined;
  }
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null;
}

function toNonNegativeInt(value: unknown, fallback: number): number {
  return typeof value === 'number' && Number.isFinite(value) && value >= 0
    ? Math.floor(value)
    : fallback;
}

/** 保存された1匹ぶんを検証する。おかしければ undefined */
function parseMonster(value: unknown): OwnedMonster | undefined {
  if (!isRecord(value)) return undefined;
  const { id, shapeSpeciesId, colorSpeciesId, name, xp, generation } = value;
  if (typeof id !== 'string' || id === '') return undefined;
  if (typeof shapeSpeciesId !== 'string' || !speciesById(shapeSpeciesId)) return undefined;
  if (typeof colorSpeciesId !== 'string' || !speciesById(colorSpeciesId)) return undefined;
  if (typeof name !== 'string' || name === '') return undefined;
  return {
    id,
    shapeSpeciesId,
    colorSpeciesId,
    name,
    xp: toNonNegativeInt(xp, 0),
    generation: Math.max(1, toNonNegativeInt(generation, 1)),
  };
}

/** 育成データを読み込む。失敗したら空のデータを返す */
export function loadMonsterSave(storage: StorageLike | undefined = defaultStorage()): MonsterSave {
  if (!storage) return emptyMonsterSave();
  try {
    const raw = storage.getItem(MONSTER_STORAGE_KEY);
    if (!raw) return emptyMonsterSave();
    const parsed: unknown = JSON.parse(raw);
    if (!isRecord(parsed)) return emptyMonsterSave();
    const monsters = Array.isArray(parsed.monsters)
      ? parsed.monsters
          .map(parseMonster)
          .filter((monster): monster is OwnedMonster => monster !== undefined)
      : [];
    const fallbackNextId = monsters.length + 1;
    // 旧セーブには partyIds がないので空パーティとして読み込む（後方互換）。
    // 存在しないモンスターや重複は sanitizePartyIds が取り除く
    const partyIds = Array.isArray(parsed.partyIds)
      ? sanitizePartyIds(
          parsed.partyIds.filter((id): id is string => typeof id === 'string'),
          monsters,
        )
      : [];
    return {
      monsters,
      partyIds,
      totalCorrect: toNonNegativeInt(parsed.totalCorrect, 0),
      eggs: toNonNegativeInt(parsed.eggs, 0),
      trophies: toNonNegativeInt(parsed.trophies, 0),
      nextId: Math.max(fallbackNextId, toNonNegativeInt(parsed.nextId, fallbackNextId)),
    };
  } catch {
    return emptyMonsterSave();
  }
}

/** 育成データを保存する。保存に失敗しても画面は止めない */
export function saveMonsterSave(
  save: MonsterSave,
  storage: StorageLike | undefined = defaultStorage(),
): void {
  if (!storage) return;
  try {
    storage.setItem(MONSTER_STORAGE_KEY, JSON.stringify(save));
  } catch {
    // 保存できない環境（容量不足など）では何もしない
  }
}
