import type { EvolutionStage, MonsterStats } from './types';

/**
 * モンスターの種族データ。
 *
 * 見た目はピクセルマップ（文字列配列）で定義する。
 * 1文字が1ドットで、文字とパレットの対応は次のとおり：
 *   '.' とうめい / 'M' メイン / 'L' 明るい色（顔・おなか） / 'D' 濃い色（影）
 *   'A' アクセント / 'E' 目 / 'W' 目の光
 * パレットは種族ごとに持ち、配合では「形」と「色」を別々の種族から受け継ぐ。
 */

/** ピクセルマップの1文字に対応する色の集まり */
export interface Palette {
  M: string;
  L: string;
  D: string;
  A: string;
  E: string;
  W: string;
}

/** 進化段階ごとの姿 */
export interface SpeciesStage {
  /** この段階での名前（ひらがな・カタカナ） */
  name: string;
  /** 14×14 のピクセルマップ */
  pixels: string[];
}

/** 種族1種ぶんの定義 */
export interface Species {
  id: string;
  /** テーマ名（ほのお、みず、…） */
  name: string;
  palette: Palette;
  /** 第1段階の基礎ステータス */
  baseStats: MonsterStats;
  stages: [SpeciesStage, SpeciesStage, SpeciesStage];
}

/** ピクセルマップの大きさ（テストと描画で共有する） */
export const PIXEL_SIZE = 14;

const EYE = '#263238';
const SHINE = '#ffffff';

export const SPECIES: Species[] = [
  {
    id: 'honoo',
    name: 'ほのお',
    palette: { M: '#ff7043', L: '#ffcc80', D: '#d84315', A: '#ffd54f', E: EYE, W: SHINE },
    baseStats: { hp: 30, attack: 9, defense: 6, speed: 7 },
    stages: [
      {
        name: 'ひのこ',
        pixels: [
          '......A.......',
          '.....AMA......',
          '....AMMMA.....',
          '....MLLMMA....',
          '...MLLLLMMA...',
          '...MLEWELMD...',
          '...MLLLLMMD...',
          '..MMLLLLMMD...',
          '..MMMMMMMMD...',
          '...MMMMMMD....',
          '....DDDDD.....',
          '..............',
          '..............',
          '..............',
        ],
      },
      {
        name: 'ほのまる',
        pixels: [
          '.....A.A......',
          '....AMAAMA....',
          '....AMMMMA....',
          '...MMLLMMM....',
          '...MLLLLMM....',
          '..MLEWELMMD...',
          '..MLLLLLMMD...',
          '.AMMLLLLMMMD..',
          '.AMMMMMMMMD...',
          '..MMMMMMMD....',
          '...MM..MM.....',
          '...DD..DD.....',
          '..............',
          '..............',
        ],
      },
      {
        name: 'フレアドラ',
        pixels: [
          '...A..A..A....',
          '..AMAAMAAMA...',
          '..AMMMMMMMA...',
          '..MLLLLLLMM...',
          '.AMLEWELMMMD..',
          'AAMLLLLLMMMMD.',
          'AAMMMMMMMMMMD.',
          '.AMMMMMMMMMD..',
          '..MMMMMMMMD...',
          '...MMMMMMMD...',
          '...MM...MM....',
          '...DD...DD....',
          '..............',
          '..............',
        ],
      },
    ],
  },
  {
    id: 'mizu',
    name: 'みず',
    palette: { M: '#42a5f5', L: '#bbdefb', D: '#1565c0', A: '#4dd0e1', E: EYE, W: SHINE },
    baseStats: { hp: 32, attack: 7, defense: 7, speed: 8 },
    stages: [
      {
        name: 'みずたま',
        pixels: [
          '.......A......',
          '......AMA.....',
          '......AMA.....',
          '.....AMMMA....',
          '....MLLLLMA...',
          '....MLEWELM...',
          '...MLLLLLMD...',
          '...MMMMMMMD...',
          '....MMMMMD....',
          '.....DDDD.....',
          '..............',
          '..............',
          '..............',
          '..............',
        ],
      },
      {
        name: 'しずくん',
        pixels: [
          '.......A......',
          '......AMA.....',
          '.....AMMMA....',
          '....MLLLLMA...',
          '....MLLLLLM...',
          '...MLEWELMMD..',
          '...MLLLLLMMD..',
          '..MMLLLLMMMD..',
          '..MMMMMMMMMD..',
          '...MMMMMMMD...',
          '....DDDDDD....',
          '..............',
          '..............',
          '..............',
        ],
      },
      {
        name: 'ウェイブル',
        pixels: [
          '....A.A.A.....',
          '...AMAAAMA....',
          '....MMMMMA....',
          '..AMMLLLLMA...',
          '..AMLEWELMM...',
          '.AAMLLLLLMMMD.',
          '.AAMMMMMMMMD..',
          '..MMMMMMMMMD..',
          '..MMMMMMMMMD..',
          '...MMAMMMMD...',
          '...MM..MMMD...',
          '...DD..DDDD...',
          '..............',
          '..............',
        ],
      },
    ],
  },
  {
    id: 'happa',
    name: 'はっぱ',
    palette: { M: '#66bb6a', L: '#c8e6c9', D: '#2e7d32', A: '#aed581', E: EYE, W: SHINE },
    baseStats: { hp: 34, attack: 6, defense: 8, speed: 6 },
    stages: [
      {
        name: 'はっぱん',
        pixels: [
          '......AA......',
          '.....AAAA.....',
          '......MM......',
          '....MLLLLM....',
          '...MLLLLLMD...',
          '...MLEWELMD...',
          '...MLLLLLMD...',
          '....MMMMMD....',
          '.....DDDD.....',
          '..............',
          '..............',
          '..............',
          '..............',
          '..............',
        ],
      },
      {
        name: 'わかば',
        pixels: [
          '....AA..AA....',
          '...AAAA.AAAA..',
          '....MM..MM....',
          '...MMLLLLMM...',
          '..MLLLLLLLMD..',
          '..MLEWELLLMD..',
          '..MLLLLLLLMD..',
          '...MMMMMMMD...',
          '....MMMMMD....',
          '....DD.DD.....',
          '..............',
          '..............',
          '..............',
          '..............',
        ],
      },
      {
        name: 'リーファ',
        pixels: [
          '...AAA.AAA....',
          '..AAAAAAAAA...',
          '.....MMM......',
          '..A.MMMMMM.A..',
          '..AMMLLLLMMD..',
          '.AAMLEWELMMD..',
          '.AAMLLLLLMMD..',
          '..AMMMMMMMMD..',
          '...MMMMMMMD...',
          '....MM.MM.....',
          '....DD.DD.....',
          '..............',
          '..............',
          '..............',
        ],
      },
    ],
  },
  {
    id: 'denki',
    name: 'でんき',
    palette: { M: '#ffca28', L: '#fff9c4', D: '#f57f17', A: '#ffee58', E: EYE, W: SHINE },
    baseStats: { hp: 28, attack: 8, defense: 5, speed: 10 },
    stages: [
      {
        name: 'びりたま',
        pixels: [
          '.......A......',
          '......AA......',
          '.......M......',
          '....MLLLLM....',
          '...MLLLLLMD...',
          '...MLEWELMD...',
          '...MLLLLLMD...',
          '....MMMMMD....',
          '.....DDDD.....',
          '..............',
          '..............',
          '..............',
          '..............',
          '..............',
        ],
      },
      {
        name: 'でんまる',
        pixels: [
          '...A......A...',
          '...AA.....AA..',
          '....MMLLMM....',
          '...MLLLLLMD...',
          '..AMLEWELMMD..',
          '..AMLLLLLMMD..',
          '...MMMMMMMD...',
          '....MMMMMD....',
          '....MM..MM....',
          '....DD..DD....',
          '..............',
          '..............',
          '..............',
          '..............',
        ],
      },
      {
        name: 'ボルティ',
        pixels: [
          '..A........A..',
          '..AA......AA..',
          '...AAMMLLMAA..',
          '..AMMLLLLMMD..',
          '..AMLEWELMMD..',
          '.AAMLLLLLMMD..',
          '.AAMMMMMMMMDA.',
          '..MMMMMMMMMDA.',
          '...MMMMMMMD...',
          '....MM..MM....',
          '....DD..DD....',
          '..............',
          '..............',
          '..............',
        ],
      },
    ],
  },
  {
    id: 'iwa',
    name: 'いわ',
    palette: { M: '#a1887f', L: '#d7ccc8', D: '#5d4037', A: '#ffb74d', E: EYE, W: SHINE },
    baseStats: { hp: 38, attack: 7, defense: 10, speed: 4 },
    stages: [
      {
        name: 'いしころ',
        pixels: [
          '..............',
          '..............',
          '..............',
          '....MLLLM.....',
          '...MLLLLLMD...',
          '...MLEWELMD...',
          '..MMLLLLMMD...',
          '..MMMMMMMMD...',
          '...DDDDDDD....',
          '..............',
          '..............',
          '..............',
          '..............',
          '..............',
        ],
      },
      {
        name: 'ごろた',
        pixels: [
          '..............',
          '.....MLLM.....',
          '....MLLLLM....',
          '...MLLALLMD...',
          '...MLEWELMD...',
          '..MMLLLLMMD...',
          '..MMMMMMMMD...',
          '..MMMMMMMMD...',
          '...DDDDDDD....',
          '....DD..DD....',
          '..............',
          '..............',
          '..............',
          '..............',
        ],
      },
      {
        name: 'ロックン',
        pixels: [
          '....MLLLLM....',
          '...MLLLLLLM...',
          '...MLLALLLM...',
          '..MMLEWELMMD..',
          '..MMLLLLLMMD..',
          '.AMMMMMMMMMD..',
          '.AMMMMMMMMMD..',
          '.A.MMMMMMMMD..',
          '...MMMMMMMD...',
          '...MMM.MMM....',
          '...DDD.DDD....',
          '..............',
          '..............',
          '..............',
        ],
      },
    ],
  },
  {
    id: 'hoshi',
    name: 'ほし',
    palette: { M: '#ba68c8', L: '#f8bbd0', D: '#6a1b9a', A: '#ffd54f', E: EYE, W: SHINE },
    baseStats: { hp: 30, attack: 8, defense: 6, speed: 9 },
    stages: [
      {
        name: 'ほしっこ',
        pixels: [
          '.......A......',
          '......AAA.....',
          '.......M......',
          '....MLLLLM....',
          '...MLLLLLMD...',
          '...MLEWELMD...',
          '...MLLLLLMD...',
          '....MMMMMD....',
          '.....DDDD.....',
          '..............',
          '..............',
          '..............',
          '..............',
          '..............',
        ],
      },
      {
        name: 'きらら',
        pixels: [
          '.......A......',
          '......AAA.....',
          '.....AAMAA....',
          '..A.MLLLLM.A..',
          '...MLLLLLMD...',
          '..AMLEWELMMD..',
          '...MLLLLLMD...',
          '..A.MMMMMD.A..',
          '.....DDDD.....',
          '....A....A....',
          '..............',
          '..............',
          '..............',
          '..............',
        ],
      },
      {
        name: 'ステラ',
        pixels: [
          '..A....A....A.',
          '..AA..AAA..AA.',
          '....AAMAMAA...',
          '...MMLLLLMM...',
          '..AMLLLLLMMD..',
          '..AMLEWELMMD..',
          '...MLLLLLMD...',
          '..AMMMMMMMMD..',
          '.A..MMMMD..A..',
          '.....DDDD.....',
          '....A....A....',
          '..............',
          '..............',
          '..............',
        ],
      },
    ],
  },
];

/** 種族IDから種族を引く（見つからなければ undefined） */
export function speciesById(id: string): Species | undefined {
  return SPECIES.find((species) => species.id === id);
}

/** 段階（1〜3）からその段階の姿を引く */
export function stageOf(species: Species, stage: EvolutionStage): SpeciesStage {
  return species.stages[stage - 1];
}
