import type { CategoryQuiz, Question } from '../types';
import { countries } from './countries';

/**
 * こっき（国旗）クイズ：全195か国のデータ（countries.ts）から問題を生成する。
 * 旗は絵文字ではなく、src/assets/flags/ の正式なSVGを表示する（画面側で flagCode を参照）。
 * 選択肢は「よみ」（ひらがな）で出す。
 */

/** 誤答候補を決定的に選ぶためのオフセット（生成結果が毎回同じになるように） */
const DISTRACTOR_OFFSETS = [11, 47, 83];

function buildFlagQuestions(): Question[] {
  return countries.map((country, i) => {
    const distractors = DISTRACTOR_OFFSETS.map(
      (offset) => countries[(i + offset) % countries.length].yomi,
    );
    return {
      id: `flag-${country.code}`,
      question: 'これは どこの くにの はた？',
      choices: [country.yomi, ...distractors] as [string, string, string, string],
      answerIndex: 0,
      explanation: `${country.name}の はただよ。${country.region}にある くにだよ。`,
      tags: country.famous ? ['famous'] : [],
      group: country.region,
      flagCode: country.code,
    };
  });
}

export const flagsQuiz: CategoryQuiz = {
  category: {
    id: 'flags',
    name: 'こっき',
    icon: '🚩',
    color: '#ffe3e3',
    description: 'せかい 195か国の はたの クイズ',
  },
  difficulties: [
    {
      id: 'easy',
      label: 'やさしい',
      description: 'ゆうめいな 24か国だけ、えらぶのは 2つ',
      choiceCount: 2,
      poolTag: 'famous',
    },
    { id: 'normal', label: 'ふつう', description: 'ぜんぶの くに、えらぶのは 3つ', choiceCount: 3 },
    {
      id: 'hard',
      label: 'むずかしい',
      description: 'おなじ ちいきの くにが まざるよ、えらぶのは 4つ',
      choiceCount: 4,
      sameGroupDistractors: true,
    },
  ],
  questions: buildFlagQuestions(),
};
