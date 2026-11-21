/**
 * モンスター育成システムの基本型。
 * ロジックは UI に依存しない純粋関数として src/monsters/ に置く。
 */

/** 乱数関数（0以上1未満を返す）。テストで固定できるよう引数で受け取る */
export type RandomFn = () => number;

/** 進化段階（1〜3） */
export type EvolutionStage = 1 | 2 | 3;

/** モンスターのステータス4種 */
export interface MonsterStats {
  hp: number;
  attack: number;
  defense: number;
  speed: number;
}

/**
 * 所持モンスター1匹。
 * 見た目は「形の由来の種族（shapeSpeciesId）」のピクセルマップを
 * 「色の由来の種族（colorSpeciesId）」のパレットで描く2要素モデル。
 * 純粋種は形と色が同じ種族、配合モンスターは組み合わせが変わる。
 */
export interface OwnedMonster {
  /** 一意なID */
  id: string;
  /** 形の由来の種族ID */
  shapeSpeciesId: string;
  /** 色の由来の種族ID */
  colorSpeciesId: string;
  /** 名前（配合モンスターは合成名。純粋種の表示名は段階ごとの名前を優先する） */
  name: string;
  /** 累計経験値（レベルはここから導出する） */
  xp: number;
  /** 世代（スターター・孵化は1、配合の子は親の最大世代＋1） */
  generation: number;
}

/** localStorage に保存する育成データ全体 */
export interface MonsterSave {
  monsters: OwnedMonster[];
  /** パーティに入っているモンスターのID（並び順＝闘技場で戦う順番、最大 PARTY_MAX_SIZE 匹） */
  partyIds: string[];
  /** 累計正解数（たまごの判定に使う） */
  totalCorrect: number;
  /** 持っているたまごの数 */
  eggs: number;
  /** 闘技場の勝利数（トロフィー） */
  trophies: number;
  /** 次に使うモンスターIDの番号 */
  nextId: number;
}
