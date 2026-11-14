import type { CategoryQuiz, Question } from '../../types';
import { REGION_LABELS, countries } from '../countries';

/**
 * こっき（国旗）クイズ：全195か国のデータ（countries.ts）から問題を生成する。
 * 旗は絵文字ではなく public/flags/ のSVGを表示する（画面側で flagCode を参照）。
 * 選択肢は「よみ」（ひらがな）で出す。
 *
 * 誤答は難易度の distractors 指定により出題のたびにプールから抽選される。
 * ここで作る choices の誤答3つは、抽選で足りないときの予備。
 */

/** 予備の誤答を決定的に選ぶためのオフセット（生成結果が毎回同じになるように） */
const FALLBACK_DISTRACTOR_OFFSETS = [11, 47, 83];

function buildFlagQuestions(): Question[] {
  return countries.map((country, i) => {
    const [d1, d2, d3] = FALLBACK_DISTRACTOR_OFFSETS.map(
      (offset) => countries[(i + offset) % countries.length].yomi,
    );
    return {
      id: `flag-${country.code}`,
      question: 'これは どこの くにの はた？',
      choices: [country.yomi, d1, d2, d3],
      answerIndex: 0,
      explanation: `「${country.yomi}」の はただよ。${REGION_LABELS[country.region]}に ある くにだよ。`,
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
    description: 'せかいの はたの クイズ',
  },
  difficulties: [
    {
      id: 'easy',
      label: 'やさしい',
      description: 'ゆうめいな くにだけ、えらぶのは 2つ',
      choiceCount: 2,
      poolTag: 'famous',
      distractors: 'pool',
    },
    {
      id: 'normal',
      label: 'ふつう',
      description: 'ぜんぶの くに、えらぶのは 3つ',
      choiceCount: 3,
      distractors: 'pool',
    },
    {
      id: 'hard',
      label: 'むずかしい',
      description: 'ちかくの くにが まざるよ、えらぶのは 4つ',
      choiceCount: 4,
      distractors: 'same-group',
    },
  ],
  questions: buildFlagQuestions(),
};
