import type { CategoryQuiz } from '../../types';
import { defaultDifficulties } from './difficulties';

/** おうちのものクイズ：家にある物の名前と使い道のテキスト問題（16問） */
export const homeQuiz: CategoryQuiz = {
  category: {
    id: 'home',
    name: 'おうちの もの',
    icon: '🏠',
    color: '#efebe9',
    description: 'おうちに ある ものの クイズ',
  },
  difficulties: defaultDifficulties,
  questions: [
    {
      question: 'ごはんを たべるとき すわるのは どれ？',
      choices: ['いす', 'ベッド', 'テレビ', 'せんたくき'],
      answerIndex: 0,
      explanation: 'いすに すわって、テーブルで たべるよ。',
    },
    {
      question: 'よる ねるとき つかうのは どれ？',
      choices: ['かさ', 'ベッド', 'じてんしゃ', 'ほうき'],
      answerIndex: 1,
      explanation: 'ベッドや おふとんで ねるよ。',
    },
    {
      question: 'せんたくものを あらう きかいは どれ？',
      choices: ['れいぞうこ', 'そうじき', 'せんたくき', 'でんしレンジ'],
      answerIndex: 2,
      explanation: 'せんたくきが ぐるぐる まわして きれいに して くれるよ。',
    },
    {
      question: 'たべものを つめたく たもつのは どれ？',
      choices: ['オーブン', 'テレビ', 'とけい', 'れいぞうこ'],
      answerIndex: 3,
      explanation: 'れいぞうこの なかは つめたくて、たべものが いたみにくいよ。',
    },
    {
      question: 'へやの ゴミを すいとる きかいは どれ？',
      choices: ['そうじき', 'せんたくき', 'ドライヤー', 'アイロン'],
      answerIndex: 0,
      explanation: 'そうじきで おへやを きれいに しようね。',
    },
    {
      question: 'あめの ひに さすのは どれ？',
      choices: ['ぼうし', 'かさ', 'めがね', 'てぶくろ'],
      answerIndex: 1,
      explanation: 'かさを させば、あめに ぬれにくいよ。',
    },
    {
      question: 'じかんを しるための ものは どれ？',
      choices: ['かがみ', 'カレンダーだけ', 'とけい', 'クッション'],
      answerIndex: 2,
      explanation: 'とけいで いま なんじか わかるよ。',
    },
    {
      question: 'はを みがくときに つかうのは どれ？',
      choices: ['くし', 'スプーン', 'タオル', 'はぶらし'],
      answerIndex: 3,
      explanation: 'はぶらしに はみがきこを つけて みがくよ。',
    },
    {
      question: 'あつい たべものを あたためる きかいは どれ？',
      choices: ['でんしレンジ', 'れいぞうこ', 'せんたくき', 'そうじき'],
      answerIndex: 0,
      explanation: 'チンと なったら あたたまった あいずだよ。',
    },
    {
      question: 'おふろで からだを あらうときに つかうのは どれ？',
      choices: ['シャンプーと せっけん', 'はぶらし', 'ほうき', 'ドライヤーだけ'],
      answerIndex: 1,
      explanation: 'あわで やさしく あらおうね。',
    },
    {
      question: 'かみを かわかす きかいは どれ？',
      choices: ['アイロン', 'そうじき', 'ドライヤー', 'せんぷうき'],
      answerIndex: 2,
      explanation: 'ドライヤーは あたたかい かぜが でるよ。',
    },
    {
      question: 'くらい へやを あかるく するのは どれ？',
      choices: ['カーテン', 'クッション', 'かがみ', 'でんき'],
      answerIndex: 3,
      explanation: 'でんきを つけると へやが あかるく なるよ。',
    },
    {
      question: 'ごはんを よそう おわんは どこに ある？',
      choices: ['しょっきだな', 'げんかん', 'おふろ', 'ベランダ'],
      answerIndex: 0,
      explanation: 'おさらや おわんは しょっきだなに しまうよ。',
    },
    {
      question: 'くつを ぬぐ ばしょは どれ？',
      choices: ['だいどころ', 'げんかん', 'おふろ', 'にわ'],
      answerIndex: 1,
      explanation: 'げんかんで くつを ぬいで、おうちに あがるよ。',
    },
    {
      question: 'てがみが とどくのは どこ？',
      choices: ['れいぞうこ', 'せんたくき', 'ポスト', 'テレビ'],
      answerIndex: 2,
      explanation: 'ゆうびんやさんが ポストに いれて くれるよ。',
    },
    {
      question: 'さむい ひに からだを あたためる きかいは どれ？',
      choices: ['せんぷうき', 'エアコンだけ', 'れいぞうこ', 'ストーブ'],
      answerIndex: 3,
      explanation: 'ストーブの ちかくでは あそばないでね。あたたかく すごそうね。',
    },
  ],
};
