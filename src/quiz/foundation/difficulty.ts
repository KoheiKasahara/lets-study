import type { DifficultyLevel, QuizDefinition, QuizQuestion } from './types';

/** 1ブロック（1セット）あたりの問題数の既定値 */
export const DEFAULT_BLOCK_SIZE = 10;

/**
 * 難易度を宣言しないクイズに使う既定レベル。
 * 基盤は「難易度あり／なし」を意識せず、常にレベル経由で処理できるよう、
 * 難易度なしクイズにはこの単一レベルを割り当てる。
 */
export const FALLBACK_DIFFICULTY: DifficultyLevel = {
  id: 'standard',
  label: 'standard',
};

/** クイズが難易度を宣言しているかどうか */
export function hasDifficulties(definition: QuizDefinition): boolean {
  return definition.difficulties != null && definition.difficulties.length > 0;
}

/**
 * 使用する難易度レベルを決める。
 * - 難易度を宣言しないクイズ：FALLBACK_DIFFICULTY
 * - difficultyId 指定あり：一致するレベル（なければ先頭のレベル）
 * - difficultyId 未指定：先頭のレベル
 */
export function resolveDifficulty(
  definition: QuizDefinition,
  difficultyId?: string,
): DifficultyLevel {
  if (!hasDifficulties(definition)) return FALLBACK_DIFFICULTY;
  const levels = definition.difficulties!;
  if (difficultyId != null) {
    return levels.find((level) => level.id === difficultyId) ?? levels[0];
  }
  return levels[0];
}

/** 難易度レベルの filter で問題プールを絞り込む（filter がなければ全問題） */
export function filterPool(
  questions: readonly QuizQuestion[],
  difficulty: DifficultyLevel,
): QuizQuestion[] {
  if (!difficulty.filter) return [...questions];
  return questions.filter((q) => difficulty.filter!(q));
}
