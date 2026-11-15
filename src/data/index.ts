import type { CategoryQuiz } from '../types';
import { animalsQuiz } from './categories/animals';
import { colorsQuiz } from './categories/colors';
import { flagsQuiz } from './categories/flags';
import { foodsQuiz } from './categories/foods';
import { hiraganaQuiz } from './categories/hiragana';
import { numbersQuiz } from './categories/numbers';
import { shapesQuiz } from './categories/shapes';
import { vehiclesQuiz } from './categories/vehicles';

/**
 * 全カテゴリの一覧（ホーム画面にこの順で並ぶ）。
 * カテゴリを増やすときは、src/data/categories/ にファイルを足してここに追加するだけ。
 */
export const allQuizzes: CategoryQuiz[] = [
  flagsQuiz,
  animalsQuiz,
  foodsQuiz,
  vehiclesQuiz,
  colorsQuiz,
  shapesQuiz,
  numbersQuiz,
  hiraganaQuiz,
];

export function getQuizById(id: string): CategoryQuiz | undefined {
  return allQuizzes.find((q) => q.category.id === id);
}
