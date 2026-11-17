import type { CategoryQuiz } from '../../types';
import { defaultDifficulties } from './difficulties';

/** がっきクイズ：写真で名前を当てる問題と、音の出し方のテキスト問題（18問） */
export const instrumentsQuiz: CategoryQuiz = {
  category: {
    id: 'instruments',
    name: 'がっき',
    icon: '🎹',
    color: '#ede7f6',
    description: 'がっきの なまえや おとの クイズ',
  },
  difficulties: defaultDifficulties,
  questions: [
    {
      question: 'この がっきは なあに？',
      image: 'instruments/piano.jpg',
      choices: ['ピアノ', 'オルガン', 'ギター', 'たいこ'],
      answerIndex: 0,
      explanation: 'しろと くろの けんばんを ゆびで おして ならすよ。',
    },
    {
      question: 'この がっきは なあに？',
      image: 'instruments/taiko.jpg',
      choices: ['トランペット', 'たいこ', 'バイオリン', 'フルート'],
      answerIndex: 1,
      explanation: 'バチで たたいて ならすよ。おまつりでも かつやくするね。',
    },
    {
      question: 'この がっきは なあに？',
      image: 'instruments/guitar.jpg',
      choices: ['バイオリン', 'ハープ', 'ギター', 'ウクレレ'],
      answerIndex: 2,
      explanation: 'げんを ゆびで はじいて ならすよ。',
    },
    {
      question: 'この がっきは なあに？',
      image: 'instruments/violin.jpg',
      choices: ['ギター', 'チェロ', 'たいこ', 'バイオリン'],
      answerIndex: 3,
      explanation: 'ゆみで げんを こすって ならすよ。しゃしんは バイオリンの おみせだよ。',
    },
    {
      question: 'この がっきは なあに？',
      image: 'instruments/trumpet.jpg',
      choices: ['トランペット', 'フルート', 'クラリネット', 'ホルン'],
      answerIndex: 0,
      explanation: 'くちで いきを ふきこんで ならす、キラキラの がっきだよ。',
    },
    {
      question: 'この がっきは なあに？',
      image: 'instruments/flute.jpg',
      choices: ['トランペット', 'フルート', 'ハーモニカ', 'リコーダー'],
      answerIndex: 1,
      explanation: 'よこに もって、いきを ふいて ならすよ。',
    },
    {
      question: 'この がっきは なあに？',
      image: 'instruments/tambourine.jpg',
      choices: ['たいこ', 'カスタネット', 'タンバリン', 'マラカス'],
      answerIndex: 2,
      explanation:
        'ふったり たたいたり すると、まわりの すずが シャンシャン なるよ。えの がっきだよ。',
    },
    {
      question: 'この がっきは なあに？',
      image: 'instruments/castanets.jpg',
      choices: ['タンバリン', 'トライアングル', 'すず', 'カスタネット'],
      answerIndex: 3,
      explanation: 'てに もって、カチカチと あわせて ならすよ。',
    },
    {
      question: 'この がっきは なあに？',
      image: 'instruments/triangle.jpg',
      choices: ['トライアングル', 'タンバリン', 'もっきん', 'たいこ'],
      answerIndex: 0,
      explanation: 'さんかくの てつを、ぼうで たたいて キーンと ならすよ。',
    },
    {
      question: 'この がっきは なあに？',
      image: 'instruments/harmonica.jpg',
      choices: ['フルート', 'ハーモニカ', 'リコーダー', 'オカリナ'],
      answerIndex: 1,
      explanation: 'くちに あてて、いきを すったり はいたり して ならすよ。',
    },
    {
      question: 'この がっきは なあに？',
      image: 'instruments/xylophone.jpg',
      choices: ['ピアノ', 'たいこ', 'もっきん', 'ギター'],
      answerIndex: 2,
      explanation:
        'きの いたを バチで たたくと、コロコロと いい おとが するよ。しゃしんは こどもたちが えんそうして いるよ。',
    },
    {
      question: 'この がっきは なあに？',
      image: 'instruments/maracas.jpg',
      choices: ['タンバリン', 'カスタネット', 'すず', 'マラカス'],
      answerIndex: 3,
      explanation: 'ふると シャカシャカと おとが するよ。なかに たねなどが はいって いるよ。',
    },
    {
      question: 'ピアノは どうやって おとを だす？',
      choices: ['けんばんを ゆびで おす', 'ふる', 'いきを ふく', 'げんを ゆみで こする'],
      answerIndex: 0,
      explanation: 'けんばんを おすと、なかの ハンマーが げんを たたいて おとが でるよ。',
    },
    {
      question: 'たいこは どうやって おとを だす？',
      choices: ['いきを ふく', 'バチや てで たたく', 'ゆびで はじく', 'ふる'],
      answerIndex: 1,
      explanation: 'かわを たたくと、ドンドンと おとが ひびくよ。',
    },
    {
      question: 'すずは どうやって おとを だす？',
      choices: ['たたく', 'ふく', 'ふる', 'こする'],
      answerIndex: 2,
      explanation: 'ふると リンリンと かわいい おとが するよ。',
    },
    {
      question: 'リコーダーは どうやって おとを だす？',
      choices: ['たたく', 'ふる', 'はじく', 'いきを ふきこむ'],
      answerIndex: 3,
      explanation: 'あなを ゆびで ふさぎながら、いきを ふくと おとが かわるよ。',
    },
    {
      question: 'おおきな こえで うたうとき、からだの どこを つかう？',
      choices: ['くちと おなか', 'あし', 'みみ', 'かみ'],
      answerIndex: 0,
      explanation: 'おなかから こえを だすと、よく ひびくよ。',
    },
    {
      question: 'がっきを えんそうする ひとたちが あつまるのは どれ？',
      choices: ['サッカー', 'オーケストラ', 'すいえい', 'えんげきだけ'],
      answerIndex: 1,
      explanation: 'オーケストラは、たくさんの がっきで いっしょに えんそうするよ。',
    },
  ],
};
