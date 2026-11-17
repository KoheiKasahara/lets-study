import type { CategoryQuiz } from '../types';
import { abcQuiz } from './categories/abc';
import { animalsQuiz } from './categories/animals';
import { birdsQuiz } from './categories/birds';
import { bodyQuiz } from './categories/body';
import { clockQuiz } from './categories/clock';
import { colorsQuiz } from './categories/colors';
import { familyQuiz } from './categories/family';
import { feelingsQuiz } from './categories/feelings';
import { flagsQuiz } from './categories/flags';
import { flowersQuiz } from './categories/flowers';
import { foodsQuiz } from './categories/foods';
import { greetingsQuiz } from './categories/greetings';
import { hiraganaQuiz } from './categories/hiragana';
import { homeQuiz } from './categories/home';
import { insectsQuiz } from './categories/insects';
import { instrumentsQuiz } from './categories/instruments';
import { japanQuiz } from './categories/japan';
import { jobsQuiz } from './categories/jobs';
import { katakanaQuiz } from './categories/katakana';
import { numbersQuiz } from './categories/numbers';
import { nurseryQuiz } from './categories/nursery';
import { safetyQuiz } from './categories/safety';
import { seaQuiz } from './categories/sea';
import { seasonsQuiz } from './categories/seasons';
import { shapesQuiz } from './categories/shapes';
import { spaceQuiz } from './categories/space';
import { sportsQuiz } from './categories/sports';
import { townQuiz } from './categories/town';
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
  birdsQuiz,
  instrumentsQuiz,
  homeQuiz,
  townQuiz,
  sportsQuiz,
  clockQuiz,
  feelingsQuiz,
  greetingsQuiz,
  japanQuiz,
  familyQuiz,
  nurseryQuiz,
  safetyQuiz,
];

export function getQuizById(id: string): CategoryQuiz | undefined {
  return allQuizzes.find((q) => q.category.id === id);
}
