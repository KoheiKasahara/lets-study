import { displayName } from './growth';
import type { OwnedMonster } from './types';

/**
 * 配合（融合）：モンスター2匹から新しいモンスターが1匹生まれる。
 * 親は残る（子どもが悲しまない設計）。
 * 子は「親Aの形 × 親Bの色」を受け継ぎ、名前は親2匹の合成名になる。
 * 配合モンスター同士でも配合でき、形と色の2要素モデルで一貫する。
 */

/** 名前の合成：Aの前半分＋Bの後半分 */
export function combineNames(nameA: string, nameB: string): string {
  const a = [...nameA];
  const b = [...nameB];
  const head = a.slice(0, Math.ceil(a.length / 2)).join('');
  const tail = b.slice(Math.floor(b.length / 2)).join('');
  return head + tail;
}

/** 配合で生まれる子を作る（親はどちらも残る） */
export function fuseMonsters(
  parentA: OwnedMonster,
  parentB: OwnedMonster,
  id: string,
): OwnedMonster {
  return {
    id,
    shapeSpeciesId: parentA.shapeSpeciesId,
    colorSpeciesId: parentB.colorSpeciesId,
    name: combineNames(displayName(parentA), displayName(parentB)),
    xp: 0,
    generation: Math.max(parentA.generation, parentB.generation) + 1,
  };
}
