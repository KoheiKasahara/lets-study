import type { CategoryQuiz } from '../../types';
import { defaultDifficulties } from './difficulties';

/** かたちクイズ：自作SVGの形を見て名前を当てる問題と、身近なものの形の問題（12問） */
export const shapesQuiz: CategoryQuiz = {
  category: {
    id: 'shapes',
    name: 'かたち',
    icon: '⭐',
    color: '#e0f5f0',
    description: 'かたちの クイズ',
  },
  difficulties: defaultDifficulties,
  questions: [
    {
      question: 'この かたちは なあに？',
      image: 'shapes/circle.svg',
      choices: ['まる', 'さんかく', 'しかく', 'ほし'],
      answerIndex: 0,
      explanation: 'まんまるの かたちだね。ボールと おなじ かたちだよ。',
    },
    {
      question: 'この かたちは なあに？',
      image: 'shapes/triangle.svg',
      choices: ['まる', 'さんかく', 'しかく', 'ハート'],
      answerIndex: 1,
      explanation: 'かどが 3つ あるよ。おにぎりと おなじ かたちだね。',
    },
    {
      question: 'この かたちは なあに？',
      image: 'shapes/square.svg',
      choices: ['まる', 'さんかく', 'しかく', 'ながしかく'],
      answerIndex: 2,
      explanation: 'かどが 4つ。へんの ながさが そろっているよ。',
    },
    {
      question: 'この かたちは なあに？',
      image: 'shapes/rectangle.svg',
      choices: ['しかく', 'まる', 'だえん', 'ながしかく'],
      answerIndex: 3,
      explanation: 'よこに ながい しかくだね。本と おなじ かたちだよ。',
    },
    {
      question: 'この かたちは なあに？',
      image: 'shapes/star.svg',
      choices: ['ほし', 'ハート', 'まる', 'さんかく'],
      answerIndex: 0,
      explanation: 'よぞらで キラキラ ひかる ほしの かたちだね。',
    },
    {
      question: 'この かたちは なあに？',
      image: 'shapes/heart.svg',
      choices: ['ほし', 'ハート', 'まる', 'ひしがた'],
      answerIndex: 1,
      explanation: 'だいすきな きもちを あらわす かたちだね。',
    },
    {
      question: 'この かたちは なあに？',
      image: 'shapes/diamond.svg',
      choices: ['しかく', 'さんかく', 'ひしがた', 'まる'],
      answerIndex: 2,
      explanation: 'しかくを かたむけたような かたちだよ。',
    },
    {
      question: 'この かたちは なあに？',
      image: 'shapes/oval.svg',
      choices: ['まる', 'ながしかく', 'しかく', 'だえん'],
      answerIndex: 3,
      explanation: 'まるを すこし のばした かたち。たまごと おなじだね。',
    },
    {
      question: 'ボールの かたちは どれ？',
      choices: ['まる', 'しかく', 'さんかく', 'ほし'],
      answerIndex: 0,
      explanation: 'ボールは まんまるだね。コロコロ ころがるよ。',
    },
    {
      question: 'おにぎりの かたちは どれ？',
      choices: ['まる', 'さんかく', 'しかく', 'ハート'],
      answerIndex: 1,
      explanation: 'おにぎりは さんかくの かたちが おおいね。',
    },
    {
      question: 'タイヤの かたちは どれ？',
      choices: ['しかく', 'さんかく', 'まる', 'ひしがた'],
      answerIndex: 2,
      explanation: 'タイヤは まるいから ころがって すすめるんだね。',
    },
    {
      question: 'まどの かたちは どれ？',
      choices: ['まる', 'ほし', 'ハート', 'しかく'],
      answerIndex: 3,
      explanation: 'おうちの まどは しかくい かたちが おおいね。',
    },
  ],
};
