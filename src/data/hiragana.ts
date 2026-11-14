import type { CategoryQuiz } from '../types';
import { defaultDifficulties } from './difficulties';

/** ひらがなクイズ：文字と、ことばの最初の文字の問題（12問） */
export const hiraganaQuiz: CategoryQuiz = {
  category: {
    id: 'hiragana',
    name: 'ひらがな',
    icon: 'あ',
    color: '#f3e8ff',
    description: 'ひらがなの クイズ',
  },
  difficulties: defaultDifficulties,
  questions: [
    {
      question: 'これは なんの もじ？',
      visual: 'あ',
      choices: ['あ', 'い', 'う', 'え'],
      answerIndex: 0,
      explanation: '「あ」だよ。あめの あ。',
    },
    {
      question: 'これは なんの もじ？',
      visual: 'き',
      choices: ['き', 'さ', 'ち', 'ぬ'],
      answerIndex: 0,
      explanation: '「き」だよ。きの き。',
    },
    {
      question: '「りんご」の さいしょの もじは どれ？',
      choices: ['り', 'ん', 'ご', 'あ'],
      answerIndex: 0,
      explanation: 'りんごは「り」から はじまるよ。',
    },
    {
      question: '「いぬ」の さいしょの もじは どれ？',
      choices: ['い', 'ぬ', 'う', 'ね'],
      answerIndex: 0,
      explanation: 'いぬは「い」から はじまるよ。',
    },
    {
      question: '「さくら」の さいしょの もじは どれ？',
      choices: ['さ', 'く', 'ら', 'か'],
      answerIndex: 0,
      explanation: 'さくらは「さ」から はじまるよ。',
    },
    {
      question: '「あ」から はじまる ことばは どれ？',
      choices: ['あさ', 'よる', 'ひる', 'ばん'],
      answerIndex: 0,
      explanation: 'あさは「あ」から はじまるね。',
    },
    {
      question: '「か」から はじまる ことばは どれ？',
      choices: ['かぜ', 'あめ', 'ゆき', 'つき'],
      answerIndex: 0,
      explanation: 'かぜは「か」から はじまるね。',
    },
    {
      question: '「とり」の さいしょの もじは どれ？',
      choices: ['と', 'り', 'ど', 'こ'],
      answerIndex: 0,
      explanation: 'とりは「と」から はじまるよ。',
    },
    {
      question: 'これは なんの もじ？',
      visual: 'す',
      choices: ['す', 'む', 'ぬ', 'ふ'],
      answerIndex: 0,
      explanation: '「す」だよ。すいかの す。',
    },
    {
      question: '「もも」の さいしょの もじは どれ？',
      choices: ['も', 'の', 'ほ', 'ま'],
      answerIndex: 0,
      explanation: 'ももは「も」から はじまるよ。',
    },
    {
      question: '「ゆき」の さいしょの もじは どれ？',
      choices: ['ゆ', 'き', 'よ', 'ら'],
      answerIndex: 0,
      explanation: 'ゆきは「ゆ」から はじまるよ。',
    },
    {
      question: 'これは なんの もじ？',
      visual: 'わ',
      choices: ['わ', 'れ', 'ね', 'を'],
      answerIndex: 0,
      explanation: '「わ」だよ。わにの わ。',
    },
  ],
};
