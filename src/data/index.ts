import type { CategoryQuiz } from '../types';
import { flagsQuiz } from './flags';
import { animalsQuiz } from './animals';
import { foodsQuiz } from './foods';
import { colorsQuiz } from './colors';
import { numbersQuiz } from './numbers';
import { hiraganaQuiz } from './hiragana';

/**
 * 全カテゴリの一覧（スペース版と同じ6種）。
 * カテゴリを増やすときは、ここに CategoryQuiz を追加するだけ。
 */
export const allQuizzes: CategoryQuiz[] = [
  flagsQuiz,
  animalsQuiz,
  foodsQuiz,
  colorsQuiz,
  numbersQuiz,
  hiraganaQuiz,
];

export function getQuizById(id: string): CategoryQuiz | undefined {
  return allQuizzes.find((q) => q.category.id === id);
}
