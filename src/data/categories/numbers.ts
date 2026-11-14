import type { CategoryQuiz } from '../../types';
import { defaultDifficulties } from './difficulties';

/** かずクイズ：数を数える・数字の基本問題（12問） */
export const numbersQuiz: CategoryQuiz = {
  category: {
    id: 'numbers',
    name: 'かず',
    icon: '🔢',
    color: '#e8f7ff',
    description: 'かずを かぞえる クイズ',
  },
  difficulties: defaultDifficulties,
  questions: [
    {
      question: 'りんごは いくつ ある？',
      visual: '🍎🍎🍎',
      choices: ['3こ', '2こ', '4こ', '1こ'],
      answerIndex: 0,
      explanation: '1、2、3。3こ あるね。',
    },
    {
      question: 'いぬは いくつ ある？',
      visual: '🐶🐶',
      choices: ['2こ', '3こ', '1こ', '4こ'],
      answerIndex: 0,
      explanation: '1、2。2こ あるね。',
    },
    {
      question: '1の つぎの かずは なあに？',
      choices: ['2', '3', '1', '5'],
      answerIndex: 0,
      explanation: '1の つぎは 2だよ。',
    },
    {
      question: 'ほしは いくつ ある？',
      visual: '⭐⭐⭐⭐⭐',
      choices: ['5こ', '4こ', '6こ', '3こ'],
      answerIndex: 0,
      explanation: '1、2、3、4、5。5こ あるね。',
    },
    {
      question: 'いちごは いくつ ある？',
      visual: '🍓',
      choices: ['1こ', '2こ', '3こ', '0こ'],
      answerIndex: 0,
      explanation: '1こだけ あるね。',
    },
    {
      question: '5の つぎの かずは なあに？',
      choices: ['6', '4', '7', '10'],
      answerIndex: 0,
      explanation: '5の つぎは 6だよ。',
    },
    {
      question: 'ねこは いくつ ある？',
      visual: '🐱🐱🐱🐱',
      choices: ['4こ', '3こ', '5こ', '2こ'],
      answerIndex: 0,
      explanation: '1、2、3、4。4こ あるね。',
    },
    {
      question: '10は どれ？',
      choices: ['10', '1', '7', '100'],
      answerIndex: 0,
      explanation: '10は 1と 0で かくよ。',
    },
    {
      question: 'おはなは いくつ ある？',
      visual: '🌷🌷🌷🌷🌷🌷',
      choices: ['6こ', '5こ', '7こ', '8こ'],
      answerIndex: 0,
      explanation: '1、2、3、4、5、6。6こ あるね。',
    },
    {
      question: '3と 3を あわせると いくつ？',
      choices: ['6', '5', '33', '4'],
      answerIndex: 0,
      explanation: '3＋3＝6だよ。',
    },
    {
      question: 'バナナは いくつ ある？',
      visual: '🍌🍌🍌🍌🍌🍌🍌',
      choices: ['7こ', '6こ', '8こ', '5こ'],
      answerIndex: 0,
      explanation: '1、2、3、4、5、6、7。7こ あるね。',
    },
    {
      question: '1、2、3、4、つぎの かずは なあに？',
      choices: ['5', '6', '10', '4'],
      answerIndex: 0,
      explanation: 'つぎは 5だよ。',
    },
  ],
};
