import type { CategoryQuiz } from '../../types';
import { defaultDifficulties } from './difficulties';

/** おもちゃクイズ：おもちゃの名前や遊び方のテキスト問題（16問） */
export const toysQuiz: CategoryQuiz = {
  category: {
    id: 'toys',
    name: 'おもちゃ',
    icon: '🧸',
    color: '#fce4ec',
    description: 'おもちゃの なまえや あそびかたの クイズ',
  },
  difficulties: defaultDifficulties,
  questions: [
    {
      question: 'つみきを つんで つくるのは どれ？',
      choices: ['タワー', 'ごはん', 'くつ', 'かさ'],
      answerIndex: 0,
      explanation: 'つみきを つんで、たかい タワーを つくって あそぼう。',
    },
    {
      question: 'ボールで あそぶのは どれ？',
      choices: ['キャッチボール', 'おえかき', 'おままごと', 'おりがみ'],
      answerIndex: 0,
      explanation: 'ボールを なげて、キャッチするよ。',
    },
    {
      question: 'ぎゅっと だっこする おもちゃは どれ？',
      choices: ['つみき', 'ぬいぐるみ', 'パズル', 'なわとび'],
      answerIndex: 1,
      explanation: 'ぬいぐるみは ふわふわで、だっこすると あんしんするね。',
    },
    {
      question: 'ブロックを くっつけて つくるのは どれ？',
      choices: ['おうちや くるま', 'ごはん', 'くつ', 'かみ'],
      answerIndex: 0,
      explanation: 'ブロックは くっつけたり はずしたり できるよ。',
    },
    {
      question: 'パズルで する ことは どれ？',
      choices: ['ピースを あわせる', 'ボールを ける', 'うたを うたう', 'おえかきを する'],
      answerIndex: 0,
      explanation: 'ピースを あわせると、1まいの えに なるよ。',
    },
    {
      question: 'おえかきに つかうのは どれ？',
      choices: ['クレヨン', 'なわとび', 'ボール', 'つみき'],
      answerIndex: 0,
      explanation: 'クレヨンで いろいろな いろを ぬれるよ。',
    },
    {
      question: 'シャボン玉を とばすには どうする？',
      choices: ['ストローで ふく', 'たたく', 'なげる', 'かむ'],
      answerIndex: 0,
      explanation: 'ゆっくり ふくと、おおきな シャボン玉が とぶよ。',
    },
    {
      question: 'なわとびで する ことは どれ？',
      choices: ['なわを とんで くぐる', 'なわを たべる', 'なわで えを かく', 'なわを きる'],
      answerIndex: 0,
      explanation: 'なわが あしに あたらないように ジャンプするよ。',
    },
    {
      question: 'こまを まわすには どうする？',
      choices: ['ひもを ひく', 'みずを かける', 'うたを うたう', 'ねる'],
      answerIndex: 0,
      explanation: 'ひもを ひくと、こまが くるくる まわるよ。',
    },
    {
      question: 'けん玉で する ことは どれ？',
      choices: ['たまを うけとる', 'たまを たべる', 'たまを かくす', 'たまを きる'],
      answerIndex: 0,
      explanation: 'たまを ひょいと あげて、さらで うけとるよ。',
    },
    {
      question: 'おままごとで つくるのは どれ？',
      choices: ['ごはん', 'くつ', 'かさ', 'タワー'],
      answerIndex: 0,
      explanation: 'おなべで ごはんを つくる まねを するよ。',
    },
    {
      question: 'すなあそびに つかうのは どれ？',
      choices: ['スコップ', 'クレヨン', 'なわとび', 'ボール'],
      answerIndex: 0,
      explanation: 'スコップで すなを すくって、やまを つくるよ。',
    },
    {
      question: 'でんしゃの おもちゃが はしるのは どこ？',
      choices: ['レール', 'そら', 'うみ', 'やま'],
      answerIndex: 0,
      explanation: 'レールの うえを でんしゃが はしるよ。',
    },
    {
      question: 'おもちゃの くるまは どうやって うごくの？',
      choices: ['てで おす', 'みずを かける', 'うたう', 'ねる'],
      answerIndex: 0,
      explanation: 'てで おすと、くるまが はしるよ。',
    },
    {
      question: 'かくれんぼで する ことは どれ？',
      choices: ['かくれる', 'たべる', 'ねる', 'うたう'],
      answerIndex: 0,
      explanation: 'みつからないように かくれて、おにが さがすよ。',
    },
    {
      question: 'おもちゃを あそんだあとは どうする？',
      choices: ['かたづける', 'おいたままにする', 'なげる', 'かくす'],
      answerIndex: 0,
      explanation: 'あそんだあとは かたづけると、つぎも きもちよく あそべるよ。',
    },
  ],
};
