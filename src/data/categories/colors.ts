import type { CategoryQuiz } from '../../types';
import { defaultDifficulties } from './difficulties';

/** いろクイズ：色の基本問題（12問） */
export const colorsQuiz: CategoryQuiz = {
  category: {
    id: 'colors',
    name: 'いろ',
    icon: '🌈',
    color: '#e3ecff',
    description: 'いろの クイズ',
  },
  difficulties: defaultDifficulties,
  questions: [
    {
      question: 'この まるは なにいろ？',
      visual: '🔴',
      choices: ['あか', 'あお', 'きいろ', 'みどり'],
      answerIndex: 0,
      explanation: 'りんごと おなじ あかい いろだね。',
    },
    {
      question: 'あおい しかくは どれ？',
      choices: ['🟥', '🟦', '🟨', '🟩'],
      answerIndex: 1,
      explanation: 'うみや そらの いろが あおだよ。',
    },
    {
      question: 'バナナは なにいろ？',
      visual: '🍌',
      choices: ['あか', 'あお', 'きいろ', 'むらさき'],
      answerIndex: 2,
      explanation: 'バナナは きいろい たべものだよ。',
    },
    {
      question: 'この まるは なにいろ？',
      visual: '🟢',
      choices: ['みどり', 'あか', 'くろ', 'しろ'],
      answerIndex: 0,
      explanation: 'はっぱと おなじ みどりいろだね。',
    },
    {
      question: 'そらは なにいろ？',
      choices: ['あお', 'あか', 'きいろ', 'くろ'],
      answerIndex: 0,
      explanation: 'はれたひの そらは あおいよ。',
    },
    {
      question: 'みかんは なにいろ？',
      visual: '🍊',
      choices: ['だいだいいろ', 'あお', 'むらさき', 'しろ'],
      answerIndex: 0,
      explanation: 'みかんは だいだいいろ（オレンジいろ）だよ。',
    },
    {
      question: 'ゆきは なにいろ？',
      choices: ['しろ', 'くろ', 'あか', 'みどり'],
      answerIndex: 0,
      explanation: 'ゆきは まっしろだね。',
    },
    {
      question: 'この まるは なにいろ？',
      visual: '⚫',
      choices: ['くろ', 'しろ', 'きいろ', 'ピンク'],
      answerIndex: 0,
      explanation: 'よるの そらみたいに くろいよ。',
    },
    {
      question: 'さくらの はなは なにいろ？',
      choices: ['ピンク', 'あお', 'みどり', 'くろ'],
      answerIndex: 0,
      explanation: 'さくらは うすい ピンクいろだね。',
    },
    {
      question: 'この まるは なにいろ？',
      visual: '🟣',
      choices: ['むらさき', 'あか', 'あお', 'きいろ'],
      answerIndex: 0,
      explanation: 'ぶどうと おなじ むらさきいろだよ。',
    },
    {
      question: 'くさは なにいろ？',
      choices: ['みどり', 'あか', 'しろ', 'くろ'],
      answerIndex: 0,
      explanation: 'のはらの くさは みどりいろだね。',
    },
    {
      question: 'この まるは なにいろ？',
      visual: '🟠',
      choices: ['オレンジ', 'あお', 'みどり', 'むらさき'],
      answerIndex: 0,
      explanation: 'みかんと おなじ オレンジいろだよ。',
    },
  ],
};
