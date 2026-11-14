import type { QuizDifficulty } from '../types';

/** 多くのカテゴリで共通に使う難易度3段階（選択肢の数で調整） */
export const defaultDifficulties: QuizDifficulty[] = [
  { id: 'easy', label: 'やさしい', description: 'えらぶのは 2つ', choiceCount: 2 },
  { id: 'normal', label: 'ふつう', description: 'えらぶのは 3つ', choiceCount: 3 },
  { id: 'hard', label: 'むずかしい', description: 'えらぶのは 4つ', choiceCount: 4 },
];
