import type { CategoryQuiz } from '../../types';
import { defaultDifficulties } from './difficulties';

/** むかしあそびクイズ：伝統的な遊びのテキスト問題（12問） */
export const oldplayQuiz: CategoryQuiz = {
  category: {
    id: 'oldplay',
    name: 'むかしあそび',
    icon: '🪀',
    color: '#fff8e1',
    description: 'むかしの あそびの クイズ',
  },
  difficulties: defaultDifficulties,
  questions: [
    {
      question: 'ひもに ついた たまを、けんに いれる あそびは どれ？',
      choices: ['けんだま', 'おてだま', 'ビーだま', 'めんこ'],
      answerIndex: 0,
      explanation: 'けんだまは タイミングが だいじだよ。',
    },
    {
      question: 'ガラスの たまを はじいて あそぶのは どれ？',
      choices: ['けんだま', 'ビーだま', 'おはじきだけ', 'かるた'],
      answerIndex: 1,
      explanation: 'ビーだまは キラキラして きれいだね。',
    },
    {
      question: 'ゆびで はじく、まるい ガラスの あそびは どれ？',
      choices: ['めんこ', 'すごろく', 'おはじき', 'あやとり'],
      answerIndex: 2,
      explanation: 'おはじきは ゆびで ポンと はじくよ。',
    },
    {
      question: 'ひもを ゆびに かけて かたちを つくる あそびは どれ？',
      choices: ['けんだま', 'おてだま', 'ビーだま', 'あやとり'],
      answerIndex: 3,
      explanation: 'あやとりでは ホウキや ハシゴの かたちが つくれるよ。',
    },
    {
      question: 'ちいさな ふくろを なげて キャッチする あそびは どれ？',
      choices: ['おてだま', 'めんこ', 'かるた', 'すごろく'],
      answerIndex: 0,
      explanation: 'おてだまは おかあさんや おばあちゃんも あそんだよ。',
    },
    {
      question: 'えふだを たたいて、ひっくりかえす あそびは どれ？',
      choices: ['おはじき', 'めんこ', 'あやとり', 'けんだま'],
      answerIndex: 1,
      explanation: 'めんこは ちからと わざが いるよ。',
    },
    {
      question: 'よみふだを きいて、えふだを とる あそびは どれ？',
      choices: ['すごろく', 'ビーだま', 'かるた', 'おてだま'],
      answerIndex: 2,
      explanation: 'かるたは きく ちからが だいじだよ。',
    },
    {
      question: 'サイコロを ふって コマを すすめる あそびは どれ？',
      choices: ['めんこ', 'かるた', 'けんだま', 'すごろく'],
      answerIndex: 3,
      explanation: 'すごろくは ゴールを めざすよ。',
    },
    {
      question: 'かみを おって つくる、とぶ おもちゃは どれ？',
      choices: ['かみひこうき', 'かみでっぽう', 'おりづる', 'かみふうせん'],
      answerIndex: 0,
      explanation: 'かみひこうきは おかたが ポイントだよ。',
    },
    {
      question: 'こまを まわす あそびで つかうのは どれ？',
      choices: ['ひもと こま', 'サイコロ', 'ふだ', 'たまだけ'],
      answerIndex: 1,
      explanation: 'ひもを まいて、なげて まわすよ。',
    },
    {
      question: 'たけを わって つくる、たかく のぼれる どうぐは どれ？',
      choices: ['たけとんぼ', 'たけばし', 'たけうま', 'たけざいく'],
      answerIndex: 2,
      explanation: 'たけうまは バランスが だいじだよ。',
    },
    {
      question: 'プロペラを てで まわして とばすのは どれ？',
      choices: ['たけうま', 'こま', 'けんだま', 'たけとんぼ'],
      answerIndex: 3,
      explanation: 'たけとんぼは りょうてで こすって まわすよ。',
    },
  ],
};
