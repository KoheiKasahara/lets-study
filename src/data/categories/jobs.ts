import type { CategoryQuiz } from '../../types';
import { defaultDifficulties } from './difficulties';

/** おしごとクイズ：まちで働く人たちの仕事のテキスト問題（18問） */
export const jobsQuiz: CategoryQuiz = {
  category: {
    id: 'jobs',
    name: 'おしごと',
    icon: '👩‍⚕️',
    color: '#f3e5f5',
    description: 'まちで はたらく ひとの クイズ',
  },
  difficulties: defaultDifficulties,
  questions: [
    {
      question: 'びょうきや けがを みて くれるのは だれ？',
      choices: ['おいしゃさん', 'パンやさん', 'うんてんしゅさん', 'せんせい'],
      answerIndex: 0,
      explanation: 'おいしゃさんは びょういんで みんなを みて くれるよ。',
    },
    {
      question: 'がっこうで べんきょうを おしえて くれるのは だれ？',
      choices: ['けいさつかん', 'せんせい', 'しょうぼうし', 'コックさん'],
      answerIndex: 1,
      explanation: 'せんせいは もじや かずを たのしく おしえて くれるよ。',
    },
    {
      question: 'まちの あんぜんを まもって くれるのは だれ？',
      choices: ['ゆうびんやさん', 'おはなやさん', 'けいさつかん', 'だいくさん'],
      answerIndex: 2,
      explanation: 'けいさつかんは こうばんで まちを まもるよ。',
    },
    {
      question: 'かじの とき みずで ひを けして くれるのは だれ？',
      choices: ['おいしゃさん', 'パンやさん', 'せんせい', 'しょうぼうし'],
      answerIndex: 3,
      explanation: 'しょうぼうしは しょうぼうしゃに のって かけつけるよ。',
    },
    {
      question: 'おいしい りょうりを つくるのは だれ？',
      choices: ['コックさん', 'けいさつかん', 'ゆうびんやさん', 'パイロット'],
      answerIndex: 0,
      explanation: 'コックさんは レストランで りょうりを つくるよ。',
    },
    {
      question: 'バスや でんしゃを うんてんするのは だれ？',
      choices: ['せんせい', 'うんてんしゅさん', 'おはなやさん', 'だいくさん'],
      answerIndex: 1,
      explanation: 'うんてんしゅさんは あんぜんに きを つけて うんてんするよ。',
    },
    {
      question: 'てがみや にもつを とどけて くれるのは だれ？',
      choices: ['おいしゃさん', 'コックさん', 'ゆうびんやさん', 'しょうぼうし'],
      answerIndex: 2,
      explanation: 'ゆうびんやさんは おうちまで とどけて くれるよ。',
    },
    {
      question: 'ひこうきを うんてんするのは だれ？',
      choices: ['せんちょう', 'うんてんしゅさん', 'えきいんさん', 'パイロット'],
      answerIndex: 3,
      explanation: 'パイロットは そらを とぶ ひこうきを うんてんするよ。',
    },
    {
      question: 'おうちを たてたり なおしたり するのは だれ？',
      choices: ['だいくさん', 'パンやさん', 'おいしゃさん', 'せんせい'],
      answerIndex: 0,
      explanation: 'だいくさんは きを つかって おうちを たてるよ。',
    },
    {
      question: 'パンを やいて うるのは だれ？',
      choices: ['おはなやさん', 'パンやさん', 'ゆうびんやさん', 'けいさつかん'],
      answerIndex: 1,
      explanation: 'パンやさんは あさ はやくから パンを やくよ。',
    },
    {
      question: 'きれいな はなを うるのは だれ？',
      choices: ['コックさん', 'しょうぼうし', 'おはなやさん', 'だいくさん'],
      answerIndex: 2,
      explanation: 'おはなやさんには いろいろな はなが ならぶよ。',
    },
    {
      question: 'びょういんで おいしゃさんを たすけるのは だれ？',
      choices: ['せんせい', 'パイロット', 'うんてんしゅさん', 'かんごしさん'],
      answerIndex: 3,
      explanation: 'かんごしさんは びょうきの ひとの おせわを するよ。',
    },
    {
      question: 'やさいや くだものを そだてるのは だれ？',
      choices: ['のうかさん', 'けいさつかん', 'えきいんさん', 'パンやさん'],
      answerIndex: 0,
      explanation: 'のうかさんは はたけで おいしい たべものを そだてるよ。',
    },
    {
      question: 'さかなを とるのは だれ？',
      choices: ['だいくさん', 'りょうしさん', 'おはなやさん', 'コックさん'],
      answerIndex: 1,
      explanation: 'りょうしさんは うみに ふねで でて さかなを とるよ。',
    },
    {
      question: 'でんしゃの えきで おしごとを するのは だれ？',
      choices: ['せんちょう', 'パイロット', 'えきいんさん', 'しょうぼうし'],
      answerIndex: 2,
      explanation: 'えきいんさんは きっぷや あんないの おてつだいを するよ。',
    },
    {
      question: 'ふねを うんてんするのは だれ？',
      choices: ['うんてんしゅさん', 'せんせい', 'ゆうびんやさん', 'せんちょう'],
      answerIndex: 3,
      explanation: 'せんちょうは ふねの リーダーだよ。',
    },
    {
      question: 'かみを きって くれるのは だれ？',
      choices: ['びようしさん', 'おいしゃさん', 'のうかさん', 'りょうしさん'],
      answerIndex: 0,
      explanation: 'びようしさんは かみを きれいに きって くれるよ。',
    },
    {
      question: 'ゴミを あつめて まちを きれいに してくれるのは だれ？',
      choices: ['パンやさん', 'せいそういんさん', 'けいさつかん', 'かんごしさん'],
      answerIndex: 1,
      explanation: 'せいそういんさんが いるから まちは きれいだよ。ありがとうだね。',
    },
  ],
};
