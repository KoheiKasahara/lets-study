import type { CategoryQuiz } from '../types';
import { abcQuiz } from './categories/abc';
import { animalsQuiz } from './categories/animals';
import { bodyQuiz } from './categories/body';
import { colorsQuiz } from './categories/colors';
import { flagsQuiz } from './categories/flags';
import { flowersQuiz } from './categories/flowers';
import { foodsQuiz } from './categories/foods';
import { hiraganaQuiz } from './categories/hiragana';
import { insectsQuiz } from './categories/insects';
import { jobsQuiz } from './categories/jobs';
import { katakanaQuiz } from './categories/katakana';
import { numbersQuiz } from './categories/numbers';
import { seaQuiz } from './categories/sea';
import { seasonsQuiz } from './categories/seasons';
import { shapesQuiz } from './categories/shapes';
import { spaceQuiz } from './categories/space';
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
  seaQuiz,
  insectsQuiz,
  flowersQuiz,
  spaceQuiz,
  seasonsQuiz,
  bodyQuiz,
  jobsQuiz,
  katakanaQuiz,
  abcQuiz,
];

export function getQuizById(id: string): CategoryQuiz | undefined {
  return allQuizzes.find((q) => q.category.id === id);
}
