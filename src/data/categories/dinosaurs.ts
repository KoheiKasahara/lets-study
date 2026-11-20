import type { CategoryQuiz } from '../../types';
import { defaultDifficulties } from './difficulties';

/** きょうりゅうクイズ：きょうりゅうの名前や特徴のテキスト問題（16問） */
export const dinosaursQuiz: CategoryQuiz = {
  category: {
    id: 'dinosaurs',
    name: 'きょうりゅう',
    icon: '🦕',
    color: '#e8f5e9',
    description: 'きょうりゅうの なまえや とくちょうの クイズ',
  },
  difficulties: defaultDifficulties,
  questions: [
    {
      question: 'くびが とっても ながい きょうりゅうは どれ？',
      choices: ['ティラノサウルス', 'トリケラトプス', 'ブラキオサウルス', 'ステゴサウルス'],
      answerIndex: 2,
      explanation: 'ブラキオサウルスは くびが ながくて、たかい きの はっぱを たべたよ。',
    },
    {
      question: 'あたまに 3ぼんの つのが ある きょうりゅうは どれ？',
      choices: ['ステゴサウルス', 'トリケラトプス', 'ディプロドクス', 'プテラノドン'],
      answerIndex: 1,
      explanation: 'トリケラトプスは 3ぼんの つので みを まもったよ。',
    },
    {
      question: 'せなかに いたのような ものが ある きょうりゅうは どれ？',
      choices: ['アンキロサウルス', 'ブラキオサウルス', 'ステゴサウルス', 'ティラノサウルス'],
      answerIndex: 2,
      explanation: 'ステゴサウルスの せなかには、さんかくに とがった いたが ならんで いたよ。',
    },
    {
      question: 'おおきな にくを たべる きょうりゅうは どれ？',
      choices: ['ティラノサウルス', 'ブラキオサウルス', 'トリケラトプス', 'アンキロサウルス'],
      answerIndex: 0,
      explanation: 'ティラノサウルスは おおきな はで にくを たべたよ。',
    },
    {
      question: 'そらを とぶ きょうりゅうの なかまは どれ？',
      choices: ['ディプロドクス', 'プテラノドン', 'ステゴサウルス', 'トリケラトプス'],
      answerIndex: 1,
      explanation: 'プテラノドンは おおきな つばさで そらを とんだよ。',
    },
    {
      question: 'からだに かたい よろいが ある きょうりゅうは どれ？',
      choices: ['ティラノサウルス', 'アンキロサウルス', 'プテラノドン', 'ブラキオサウルス'],
      answerIndex: 1,
      explanation:
        'アンキロサウルスは かたい からだで みを まもったよ。しっぽに こんぼうも あるよ。',
    },
    {
      question: 'あひるみたいな くちばしが ある きょうりゅうは どれ？',
      choices: ['パラサウロロフス', 'ティラノサウルス', 'ステゴサウルス', 'トリケラトプス'],
      answerIndex: 0,
      explanation: 'パラサウロロフスは あたまの うしろに とさかが あるよ。',
    },
    {
      question: 'しっぽが とっても ながい きょうりゅうは どれ？',
      choices: ['トリケラトプス', 'ティラノサウルス', 'ディプロドクス', 'アンキロサウルス'],
      answerIndex: 2,
      explanation: 'ディプロドクスは しっぽも くびも とっても ながかったよ。',
    },
    {
      question: 'はやく はしれる ちいさい きょうりゅうは どれ？',
      choices: ['ヴェロキラプトル', 'ブラキオサウルス', 'ステゴサウルス', 'アンキロサウルス'],
      answerIndex: 0,
      explanation: 'ヴェロキラプトルは ちいさいけど、はやく はしれたよ。',
    },
    {
      question: 'きょうりゅうは いまも いきている？',
      choices: ['いきている', 'いない', 'うみに いる', 'そらに いる'],
      answerIndex: 1,
      explanation:
        'きょうりゅうは とっても むかしに いなくなったよ。ほねが かせきに なって のこっているよ。',
    },
    {
      question: 'きょうりゅうの ほねが かたくなった ものは なに？',
      choices: ['かせき', 'たからもの', 'おもちゃ', 'すな'],
      answerIndex: 0,
      explanation: 'かせきを しらべると、きょうりゅうの ことが わかるよ。',
    },
    {
      question: 'ティラノサウルスが たべるのは どれ？',
      choices: ['にく', 'はっぱ', 'くだもの', 'はな'],
      answerIndex: 0,
      explanation: 'ティラノサウルスは にくを たべる きょうりゅうだよ。',
    },
    {
      question: 'ブラキオサウルスが たべるのは どれ？',
      choices: ['はっぱ', 'にく', 'さかな', 'むし'],
      answerIndex: 0,
      explanation: 'ブラキオサウルスは たかい きの はっぱを たべたよ。',
    },
    {
      question: 'トリケラトプスの つのが あるのは どこ？',
      choices: ['あたま', 'しっぽ', 'あし', 'せなか'],
      answerIndex: 0,
      explanation: 'トリケラトプスは あたまに 3ぼんの つのが あるよ。',
    },
    {
      question: 'ステゴサウルスの いたは どこに ある？',
      choices: ['しっぽ', 'あし', 'せなか', 'あたま'],
      answerIndex: 2,
      explanation: 'ステゴサウルスの せなかには いたが ならんで いたよ。',
    },
    {
      question: 'きょうりゅうが すんでいたのは いつ？',
      choices: ['とっても むかし', '100ねんまえ', 'きのう', 'あした'],
      answerIndex: 0,
      explanation: 'きょうりゅうは むかしむかし、とっても むかしに すんでいたよ。',
    },
  ],
};
