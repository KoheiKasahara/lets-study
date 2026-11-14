/**
 * クイズ基盤（quiz foundation）の公開API。
 * 仕様は `docs/quiz-foundation.md` を参照。
 * このフォルダは他プロジェクトへコピーして使う前提で、アプリ固有の語彙を持たない。
 */
export type {
  DifficultyLevel,
  QuizDefinition,
  QuizQuestion,
  RandomFn,
} from './types';
export { questionKeyOf } from './types';
export {
  DEFAULT_BLOCK_SIZE,
  FALLBACK_DIFFICULTY,
  filterPool,
  hasDifficulties,
  resolveDifficulty,
} from './difficulty';
export type { BlockResult, CreateSessionOptions, PreparedQuestion, QuizSession } from './session';
export {
  canContinue,
  countBlockCorrect,
  createSession,
  isCorrect,
  isExhausted,
  nextBlock,
  prepareQuestion,
  recordBlockResult,
  remainingCount,
  shuffle,
  usedCount,
} from './session';
