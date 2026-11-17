import type { CategoryQuiz } from '../../types';
import { defaultDifficulties } from './difficulties';

/** からだクイズ：体の部分の名前と働きのテキスト問題（20問） */
export const bodyQuiz: CategoryQuiz = {
  category: {
    id: 'body',
    name: 'からだ',
    icon: '🖐️',
    color: '#fff8e1',
    description: 'からだの なまえや はたらきの クイズ',
  },
  difficulties: defaultDifficulties,
  questions: [
    {
      question: 'めは なにを する ところ？',
      choices: ['ものを みる', 'おとを きく', 'においを かぐ', 'あじを みる'],
      answerIndex: 0,
      explanation: 'めで いろや かたちを みるよ。',
    },
    {
      question: 'みみは なにを する ところ？',
      choices: ['あるく', 'おとを きく', 'ものを たべる', 'においを かぐ'],
      answerIndex: 1,
      explanation: 'みみで こえや おとを きくよ。',
    },
    {
      question: 'はなは なにを する ところ？',
      choices: ['ものを みる', 'おとを きく', 'においを かぐ', 'ものを つかむ'],
      answerIndex: 2,
      explanation: 'はなで いい においや、たべものの においを かぐよ。',
    },
    {
      question: 'くちは なにを する ところ？',
      choices: ['およぐ', 'とぶ', 'あるく', 'たべたり はなしたり する'],
      answerIndex: 3,
      explanation: 'くちで たべものを たべて、ことばを はなすよ。',
    },
    {
      question: 'ては なにを する ところ？',
      choices: ['ものを つかむ', 'おとを きく', 'ものを みる', 'においを かぐ'],
      answerIndex: 0,
      explanation: 'てで ものを もったり、つかんだり するよ。',
    },
    {
      question: 'あしは なにを する ところ？',
      choices: ['たべる', 'あるいたり はしったり する', 'うたう', 'ねむるだけ'],
      answerIndex: 1,
      explanation: 'あしで あるいて、はしって、ジャンプするよ。',
    },
    {
      question: 'はは なにを する ところ？',
      choices: ['ものを みる', 'おとを きく', 'たべものを かむ', 'においを かぐ'],
      answerIndex: 2,
      explanation: 'はで たべものを よく かんで たべようね。',
    },
    {
      question: 'したは なにを かんじる ところ？',
      choices: ['いろ', 'おと', 'におい', 'あじ'],
      answerIndex: 3,
      explanation: 'したで あまい、しょっぱいなどの あじが わかるよ。',
    },
    {
      question: 'かみは どこに ある？',
      choices: ['あたま', 'あし', 'おなか', 'せなか'],
      answerIndex: 0,
      explanation: 'かみは あたまに あるよ。',
    },
    {
      question: 'しんぞうは どんな おと？',
      choices: ['ピーピー', 'ドキドキ', 'ザーザー', 'ポロポロ'],
      answerIndex: 1,
      explanation: 'むねに てを あてると、ドキドキ きこえるよ。',
    },
    {
      question: 'ほねは なにを して いる？',
      choices: ['うたって いる', 'およいで いる', 'からだを ささえて いる', 'ねて いる'],
      answerIndex: 2,
      explanation: 'ほねが からだを ささえて、かたちを つくるよ。',
    },
    {
      question: 'おなかが すいたときの おとは どれ？',
      choices: ['ドキドキ', 'ゴロゴロ', 'ピカピカ', 'グーグー'],
      answerIndex: 3,
      explanation: 'おなかが グーグー なったら、ごはんの じかんかも しれないね。',
    },
    {
      question: 'ゆびは てと あし あわせて なんぼん？',
      choices: ['20ぽん', '10ぽん', '5ぽん', '8ぽん'],
      answerIndex: 0,
      explanation: 'てに 10ぽん、あしに 10ぽん、あわせて 20ぽんだよ。',
    },
    {
      question: 'ひざは どこに ある？',
      choices: ['あたま', 'あしの まんなか', 'うで', 'おなか'],
      answerIndex: 1,
      explanation: 'ひざは あしの まんなかで、まげたり のばしたり できるよ。',
    },
    {
      question: 'せなかは どこ？',
      choices: ['おなかの まえ', 'あしの うら', 'からだの うしろ', 'あたまの うえ'],
      answerIndex: 2,
      explanation: 'せなかは からだの うしろがわだよ。',
    },
    {
      question: 'つめは どこに ある？',
      choices: ['みみの さき', 'はなの さき', 'くちの なか', 'ゆびの さき'],
      answerIndex: 3,
      explanation: 'つめは ゆびの さきに あるよ。のびたら きろうね。',
    },
    {
      question: 'ねつが あるとき、どこで はかる？',
      choices: ['わきの した', 'あしの うら', 'かみの さき', 'おしりだけ'],
      answerIndex: 0,
      explanation: 'たいおんけいを わきの したに はさんで はかるよ。',
    },
    {
      question: 'くしゃみが でるのは どこから？',
      choices: ['みみ', 'はなと くち', 'あし', 'おなか'],
      answerIndex: 1,
      explanation: 'はなが ムズムズすると、くしゃみが でるよ。',
    },
    {
      question: 'まばたきは どこが する？',
      choices: ['はな', 'くち', 'まぶた', 'みみ'],
      answerIndex: 2,
      explanation: 'まぶたが めを まもって、まばたきを するよ。',
    },
    {
      question: 'ごはんを たべたあと、はを どう する？',
      choices: ['そのまま', 'あらわない', 'ねるだけ', 'みがく'],
      answerIndex: 3,
      explanation: 'はみがきを して、はを きれいに しようね。',
    },
  ],
};
