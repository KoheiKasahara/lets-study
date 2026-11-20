import type { CategoryQuiz } from '../../types';
import { defaultDifficulties } from './difficulties';

/** けんこうクイズ：健康習慣のテキスト問題（14問） */
export const healthQuiz: CategoryQuiz = {
  category: {
    id: 'health',
    name: 'けんこう',
    icon: '💪',
    color: '#e8f5e9',
    description: 'けんこうの しゅうかんの クイズ',
  },
  difficulties: defaultDifficulties,
  questions: [
    {
      question: 'ごはんの まえに することは どれ？',
      choices: ['てを あらう', 'ねる', 'テレビを みる', 'おもちゃで あそぶ'],
      answerIndex: 0,
      explanation: 'せっけんで てを あらおうね。',
    },
    {
      question: 'そとから かえったら、てあらいと もう ひとつは どれ？',
      choices: ['おやつ', 'うがい', 'かけっこ', 'おえかき'],
      answerIndex: 1,
      explanation: 'うがいで のども きれいに しようね。',
    },
    {
      question: 'はみがきは いつ する？',
      choices: ['あさだけ', 'ねるまえだけ', 'ごはんの あとと ねるまえ', 'しなくて いい'],
      answerIndex: 2,
      explanation: 'むしばに ならないように みがこうね。',
    },
    {
      question: 'あさごはんを たべると どう なる？',
      choices: [
        'ねむく なる',
        'おなかが いたく なる',
        'げんきが でない',
        'げんきいっぱいに あそべる',
      ],
      answerIndex: 3,
      explanation: 'あさごはんは 1にちの エネルギーだよ。',
    },
    {
      question: 'よるは どう するのが いい？',
      choices: ['はやく ねる', 'おそくまで あそぶ', 'テレビを みつづける', 'おかしを たべつづける'],
      answerIndex: 0,
      explanation: 'たくさん ねると、からだも こころも げんきに なるよ。',
    },
    {
      question: 'やさいを たべると どう なる？',
      choices: ['かぜに なる', 'からだに いい', 'ねむく なるだけ', 'せが のびない'],
      answerIndex: 1,
      explanation: 'やさいには ビタミンが いっぱいだよ。すききらいなく たべようね。',
    },
    {
      question: 'くしゃみを するとき、どう する？',
      choices: ['てで おさえない', 'ひとに むける', 'てや そでで くちを おさえる', 'がまんする'],
      answerIndex: 2,
      explanation: 'しぶきが とばないように しようね。',
    },
    {
      question: 'あせを かいたら どう する？',
      choices: ['そのまま', 'ねる', 'おかしを たべる', 'みずを のんで タオルで ふく'],
      answerIndex: 3,
      explanation: 'すいぶんを とることが だいじだよ。',
    },
    {
      question: 'めが つかれたら どう する？',
      choices: [
        'とおくを みて めを やすめる',
        'もっと がめんを みる',
        'めを こする',
        'くらい へやで みる',
      ],
      answerIndex: 0,
      explanation: 'がめんを みる じかんは みじかめに しようね。',
    },
    {
      question: 'すがた（しせい）を よく すると どう なる？',
      choices: ['つかれる', 'せなかが まっすぐに なる', 'はやく はしれない', 'めが わるく なる'],
      answerIndex: 1,
      explanation: 'しせいが いいと、からだも つかれにくいよ。',
    },
    {
      question: 'おなかが いたいときは どう する？',
      choices: ['がまんする', 'はしる', 'おとなに いう', 'つめたいものを のむ'],
      answerIndex: 2,
      explanation: 'からだの ちょうしが わるいときは、おとなに つたえようね。',
    },
    {
      question: 'ねつが あるときは どう する？',
      choices: ['そとで あそぶ', 'プールに はいる', 'かけっこ', 'おうちで ゆっくり やすむ'],
      answerIndex: 3,
      explanation: 'やすむことが いちばんの くすりだよ。',
    },
    {
      question: 'つめが のびたら どう する？',
      choices: ['きって もらう', 'かむ', 'のばしつづける', 'かくす'],
      answerIndex: 0,
      explanation: 'つめが みじかいと、てが きれいに たもてるよ。',
    },
    {
      question: 'まいあさ かおを あらうと どう なる？',
      choices: ['ねむく なる', 'さっぱりして めが さめる', 'おなかが すく', 'かぜを ひく'],
      answerIndex: 1,
      explanation: 'さっぱりすると、1にちが きもちよく はじまるよ。',
    },
  ],
};
