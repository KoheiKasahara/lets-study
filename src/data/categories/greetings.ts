import type { CategoryQuiz } from '../../types';
import { defaultDifficulties } from './difficulties';

/** あいさつクイズ：場面に合った挨拶や言葉を選ぶテキスト問題（14問） */
export const greetingsQuiz: CategoryQuiz = {
  category: {
    id: 'greetings',
    name: 'あいさつ',
    icon: '👋',
    color: '#f1f8e9',
    description: 'あいさつや ことばの クイズ',
  },
  difficulties: defaultDifficulties,
  questions: [
    {
      question: 'あさ おきたら なんと いう？',
      choices: ['おはよう', 'おやすみ', 'さようなら', 'いただきます'],
      answerIndex: 0,
      explanation: 'あさの あいさつは「おはよう」だよ。',
    },
    {
      question: 'ごはんを たべる まえに いうのは どれ？',
      choices: ['ごちそうさま', 'いただきます', 'おかえり', 'いってきます'],
      answerIndex: 1,
      explanation: 'たべものに かんしゃして「いただきます」と いうよ。',
    },
    {
      question: 'ごはんを たべおわったら いうのは どれ？',
      choices: ['いただきます', 'おはよう', 'ごちそうさま', 'ただいま'],
      answerIndex: 2,
      explanation: '「ごちそうさま」は おいしかったの あいずだよ。',
    },
    {
      question: 'よる ねる まえに いうのは どれ？',
      choices: ['おはよう', 'こんにちは', 'いってきます', 'おやすみ'],
      answerIndex: 3,
      explanation: '「おやすみ」といって ねようね。',
    },
    {
      question: 'おうちを でるとき いうのは どれ？',
      choices: ['いってきます', 'ただいま', 'おかえり', 'ごめんなさい'],
      answerIndex: 0,
      explanation: 'でかけるときは「いってきます」だよ。',
    },
    {
      question: 'おうちに かえって きたとき いうのは どれ？',
      choices: ['いってきます', 'ただいま', 'さようなら', 'ありがとう'],
      answerIndex: 1,
      explanation: 'かえったら「ただいま」と いおうね。',
    },
    {
      question: 'かえって きた ひとに いうのは どれ？',
      choices: ['ただいま', 'いってらっしゃい', 'おかえり', 'おやすみ'],
      answerIndex: 2,
      explanation: '「おかえり」は まって いた ひとの ことばだよ。',
    },
    {
      question: 'ものを もらったら なんと いう？',
      choices: ['ごめんなさい', 'さようなら', 'くださいだけ', 'ありがとう'],
      answerIndex: 3,
      explanation: '「ありがとう」は うれしい きもちを つたえるよ。',
    },
    {
      question: 'あやまるとき いうのは どれ？',
      choices: ['ごめんなさい', 'ありがとう', 'おはよう', 'いただきます'],
      answerIndex: 0,
      explanation: 'あやまるときは「ごめんなさい」と いおうね。',
    },
    {
      question: 'わかれる とき いうのは どれ？',
      choices: ['おかえり', 'さようなら', 'ただいま', 'ごちそうさま'],
      answerIndex: 1,
      explanation: 'また あおうね、の きもちで「さようなら」だよ。',
    },
    {
      question: 'ひるま あいさつを するときは どれ？',
      choices: ['おやすみ', 'おはよう', 'こんにちは', 'いただきます'],
      answerIndex: 2,
      explanation: 'ひるは「こんにちは」と あいさつするよ。',
    },
    {
      question: 'たすけて もらいたい ときは なんと いう？',
      choices: ['しらない', 'かしてだけ', 'どいて', 'たすけて ください'],
      answerIndex: 3,
      explanation: 'こまったら「たすけてください」と おとなに いおうね。',
    },
    {
      question: 'おともだちを さそう ときは なんと いう？',
      choices: ['いっしょに あそぼう', 'あっちいって', 'しらない', 'やめてだけ'],
      answerIndex: 0,
      explanation: '「いっしょに あそぼう」は たのしい おさそいだよ。',
    },
    {
      question: 'じゅんばんを ゆずって もらったら なんと いう？',
      choices: ['とうぜん', 'ありがとう', 'ごめんなさいだけ', 'さようなら'],
      answerIndex: 1,
      explanation: 'ゆずって くれたら「ありがとう」と いおうね。',
    },
  ],
};
