import type { MonsterSave, OwnedMonster } from './types';

/**
 * パーティ編成のルール。
 * パーティはお気に入りの最大3匹で、並び順がそのまま闘技場で戦う順番になる。
 * 保存データでは ID の並び（partyIds）だけを持ち、実体は monsters から引く。
 */

/** パーティに入れられる最大数 */
export const PARTY_MAX_SIZE = 3;

/**
 * パーティの ID 並びを正す：重複と存在しないモンスターを除き、
 * 先頭から最大数までに切り詰める（読み込み時の検証に使う）。
 */
export function sanitizePartyIds(
  partyIds: readonly string[],
  monsters: readonly OwnedMonster[],
): string[] {
  const knownIds = new Set(monsters.map((monster) => monster.id));
  const result: string[] = [];
  for (const id of partyIds) {
    if (result.length >= PARTY_MAX_SIZE) break;
    if (typeof id !== 'string' || !knownIds.has(id) || result.includes(id)) continue;
    result.push(id);
  }
  return result;
}

/**
 * パーティへの出し入れ。入っているモンスターは外れ、
 * 入っていないモンスターは空きがあれば末尾に加わる（満杯ならそのまま）。
 */
export function togglePartyMember(partyIds: readonly string[], monsterId: string): string[] {
  if (partyIds.includes(monsterId)) {
    return partyIds.filter((id) => id !== monsterId);
  }
  if (partyIds.length >= PARTY_MAX_SIZE) {
    return [...partyIds];
  }
  return [...partyIds, monsterId];
}

/** IDの並びからモンスターを並び順に取り出す（見つからないIDは飛ばす） */
export function partyMonstersFromIds(
  partyIds: readonly string[],
  monsters: readonly OwnedMonster[],
): OwnedMonster[] {
  return partyIds
    .map((id) => monsters.find((monster) => monster.id === id))
    .filter((monster): monster is OwnedMonster => monster !== undefined);
}

/** パーティのモンスターを並び順に取り出す */
export function partyMonstersOf(save: MonsterSave): OwnedMonster[] {
  return partyMonstersFromIds(save.partyIds, save.monsters);
}
