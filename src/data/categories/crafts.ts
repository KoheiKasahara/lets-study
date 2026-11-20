import type { CategoryQuiz } from '../../types';
import { defaultDifficulties } from './difficulties';

/** こうさくクイズ：折り紙や工作のテキスト問題（12問） */
export const craftsQuiz: CategoryQuiz = {
  category: {
    id: 'crafts',
    name: 'こうさく',
    icon: '✂️',
    color: '#fce4ec',
    description: 'おりがみや こうさくの クイズ',
  },
  difficulties: defaultDifficulties,
  questions: [
    {
      question: 'おりがみで いちばん ゆうめいな とりは どれ？',
      choices: ['つる', 'すずめ', 'からす', 'ペンギン'],
      answerIndex: 0,
      explanation: 'おりづるは せんばづるにも なるよ。',
    },
    {
      question: 'かみを きるとき つかう どうぐは どれ？',
      choices: ['のり', 'はさみ', 'えんぴつ', 'クレヨン'],
      answerIndex: 1,
      explanation: 'はさみの はは、あぶないから きを つけようね。',
    },
    {
      question: 'かみと かみを くっつけるのは どれ？',
      choices: ['はさみ', 'けしゴム', 'のり', 'ものさし'],
      answerIndex: 2,
      explanation: 'のりは つけすぎないのが コツだよ。',
    },
    {
      question: 'おりがみを おるとき、だいじなのは どれ？',
      choices: ['はやく おる', 'てきとうに おる', 'ななめに おる', 'かどを そろえて おる'],
      answerIndex: 3,
      explanation: 'かどを そろえると きれいに できるよ。',
    },
    {
      question: 'ねんどで つくれるのは どれ？',
      choices: ['おだんごや どうぶつ', 'でんき', 'みず', 'かぜ'],
      answerIndex: 0,
      explanation: 'ねんどは こねて かたちを つくるよ。',
    },
    {
      question: 'えを かくとき、カラフルな せんが ひけるのは どれ？',
      choices: ['のり', 'クレヨン', 'はさみ', 'セロテープ'],
      answerIndex: 1,
      explanation: 'クレヨンは こい いろが でるよ。',
    },
    {
      question: 'まっすぐな せんを ひくときに たすけて くれるのは どれ？',
      choices: ['けしゴム', 'はさみ', 'ものさし', 'のり'],
      answerIndex: 2,
      explanation: 'ものさしを あてて せんを ひくよ。',
    },
    {
      question: 'まちがえた えんぴつの せんを けすのは どれ？',
      choices: ['のり', 'クレヨン', 'はさみ', 'けしゴム'],
      answerIndex: 3,
      explanation: 'けしゴムで やさしく こすろうね。',
    },
    {
      question: 'おりがみで かぶれるものは どれ？',
      choices: ['かぶと', 'くつ', 'ぼうしだけ', 'てぶくろ'],
      answerIndex: 0,
      explanation: 'しんぶんしで かぶとを つくることも あるよ。',
    },
    {
      question: 'ふうせんのように ふくらむ おりがみは どれ？',
      choices: ['つる', 'かみふうせん', 'ひこうき', 'はこ'],
      answerIndex: 1,
      explanation: 'かみふうせんは あなから いきを いれるよ。',
    },
    {
      question: 'どんぐりや まつぼっくりで できるのは どれ？',
      choices: ['でんしゃ', 'テレビ', 'おもちゃや かざり', 'おかね'],
      answerIndex: 2,
      explanation: 'しぜんの ものも こうさくの ざいりょうだよ。',
    },
    {
      question: 'こうさくの あと、へやを どう する？',
      choices: ['そのまま', 'ちらかしたまま', 'ねる', 'かたづけて てを あらう'],
      answerIndex: 3,
      explanation: 'かたづけまでが こうさくだよ。てあらいも わすれずにね。',
    },
  ],
};
