import type { CategoryQuiz } from '../../types';
import { defaultDifficulties } from './difficulties';

/** おかねクイズ：お金の基本のテキスト問題（12問） */
export const moneyQuiz: CategoryQuiz = {
  category: {
    id: 'money',
    name: 'おかね',
    icon: '🪙',
    color: '#fff8e1',
    description: 'おかねの きほんの クイズ',
  },
  difficulties: defaultDifficulties,
  questions: [
    {
      question: '100えん玉は どんな かたち？',
      choices: ['まる', 'しかく', 'さんかく', 'ほし'],
      answerIndex: 0,
      explanation: 'こうかは まるい かたちだよ。',
    },
    {
      question: 'まんなかに あなが あいて いる こうかは どれ？',
      choices: ['100えん', '50えんと 5えん', '10えん', '500えん'],
      answerIndex: 1,
      explanation: '50えん玉と 5えん玉には あなが あるよ。',
    },
    {
      question: 'いちばん あたらしい、きんいろっぽい こうかは どれ？',
      choices: ['10えん', '100えん', '500えん', '1えん'],
      answerIndex: 2,
      explanation: '500えん玉は いちばん たかい こうかだよ。',
    },
    {
      question: 'おさつで いちばん たかいのは いくら？',
      choices: ['1000えん', '5000えん', '100えん', '10000えん'],
      answerIndex: 3,
      explanation: 'いちまんえんさつが いちばん たかいよ。',
    },
    {
      question: 'おかねを ためる ぶたさんの かたちは どれ？',
      choices: ['ちょきんばこ', 'ごみばこ', 'どうぐばこ', 'おべんとうばこ'],
      answerIndex: 0,
      explanation: 'ちょきんばこに すこしずつ ためようね。',
    },
    {
      question: 'おみせで ものを かうとき、おかねは どう する？',
      choices: ['にげる', 'おみせの ひとに わたす', 'かくす', 'なげる'],
      answerIndex: 1,
      explanation: 'おかねを わたして、ものを もらうよ。おつりも あるよ。',
    },
    {
      question: '100えんの おかしと 50えんの おかし、あわせて いくら？',
      choices: ['100えん', '120えん', '150えん', '200えん'],
      answerIndex: 2,
      explanation: '100と 50で 150えんだよ。',
    },
    {
      question: 'ほしいものが あるとき、どう すると いい？',
      choices: ['ないて ねだる', 'なんでも かう', 'おとなと そうだんする', 'かってに もつ'],
      answerIndex: 3,
      explanation: 'ほんとうに ひつようか、かんがえてから かおうね。',
    },
    {
      question: 'おかねは どこから くるの？',
      choices: ['はたらいて もらう', 'そらから ふる', 'きから なる', 'まほう'],
      answerIndex: 0,
      explanation: 'おとうさんや おかあさんが はたらいて もらうよ。かんしゃだね。',
    },
    {
      question: 'おつりとは なに？',
      choices: [
        'おかしの なまえ',
        'はらった おかねの あまった ぶん',
        'おみせの なまえ',
        'レシート',
      ],
      answerIndex: 1,
      explanation: 'おおく はらったら、さがくの おかねが かえって くるよ。',
    },
    {
      question: 'レシートは なんの ため？',
      choices: ['おりがみ', 'おえかき', 'なにを いくらで かったかの きろく', 'ラッピング'],
      answerIndex: 2,
      explanation: 'レシートを みると、おかいものが わかるよ。',
    },
    {
      question: 'おかねを たいせつに するとは、どう すること？',
      choices: ['なくす', 'すてる', 'なんでも かう', 'むだづかいを しない'],
      answerIndex: 3,
      explanation: 'おかねは かぎりが あるから、たいせつに つかおうね。',
    },
  ],
};
