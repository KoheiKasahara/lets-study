import type { ReactNode } from 'react';
import { PIXEL_SIZE, speciesById, stageOf } from '../monsters';
import type { EvolutionStage, Palette } from '../monsters';
import './PixelMonster.css';

/** パレットのキー一覧（ピクセルマップの文字と対応） */
const PALETTE_KEYS: (keyof Palette)[] = ['M', 'L', 'D', 'A', 'E', 'W'];

interface Props {
  /** 形の由来の種族ID */
  shapeSpeciesId: string;
  /** 色の由来の種族ID */
  colorSpeciesId: string;
  /** 進化段階（1〜3） */
  stage: EvolutionStage;
  /** 読み上げ用の名前 */
  label?: string;
}

/**
 * ドット絵モンスターを SVG の rect で描く。
 * 形は shapeSpeciesId の種族のピクセルマップ、色は colorSpeciesId の
 * 種族のパレットを使う（配合モンスターは組み合わせで見た目が変わる）。
 */
export function PixelMonster({ shapeSpeciesId, colorSpeciesId, stage, label }: Props) {
  const shape = speciesById(shapeSpeciesId);
  const color = speciesById(colorSpeciesId);
  if (!shape || !color) return null;
  const pixels = stageOf(shape, stage).pixels;
  const palette = color.palette;
  const rects: ReactNode[] = [];
  pixels.forEach((row, y) => {
    [...row].forEach((ch, x) => {
      const key = PALETTE_KEYS.find((paletteKey) => paletteKey === ch);
      if (!key) return;
      rects.push(
        <rect key={`${x}-${y}`} x={x} y={y} width={1.05} height={1.05} fill={palette[key]} />,
      );
    });
  });
  return (
    <svg
      className="pixel-monster"
      viewBox={`0 0 ${PIXEL_SIZE} ${PIXEL_SIZE}`}
      shapeRendering="crispEdges"
      role="img"
      aria-label={label}
      aria-hidden={label ? undefined : true}
    >
      {rects}
    </svg>
  );
}
