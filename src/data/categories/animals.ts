import type { CategoryQuiz } from '../../types';
import { defaultDifficulties } from './difficulties';

/** どうぶつクイズ：名前・鳴き声・特徴の易しい問題（12問） */
export const animalsQuiz: CategoryQuiz = {
  category: {
    id: 'animals',
    name: 'どうぶつ',
    icon: '🐶',
    color: '#e3f6e3',
    description: 'どうぶつの なまえや なきごえの クイズ',
  },
  difficulties: defaultDifficulties,
  questions: [
    {
      question: 'この どうぶつは なあに？',
      visual: '🐶',
      choices: ['いぬ', 'ねこ', 'うさぎ', 'ぞう'],
      answerIndex: 0,
      explanation: '「ワンワン」と なくよ。',
    },
    {
      question: 'ねこは どう なく？',
      choices: ['ワンワン', 'ニャーニャー', 'モーモー', 'パオーン'],
      answerIndex: 1,
      explanation: 'ねこは「ニャーニャー」と なくよ。',
    },
    {
      question: 'はなが ながーい どうぶつは どれ？',
      choices: ['🐘', '🐰', '🐱', '🐷'],
      answerIndex: 0,
      explanation: 'ぞうの はなは とっても ながいよ。',
    },
    {
      question: 'うさぎが だいすきな たべものは どれ？',
      choices: ['🥕', '🐟', '🍖', '🍌'],
      answerIndex: 0,
      explanation: 'うさぎは にんじんが だいすきだよ。',
    },
    {
      question: 'この どうぶつは なあに？',
      visual: '🦁',
      choices: ['らいおん', 'とら', 'くま', 'きりん'],
      answerIndex: 0,
      explanation: 'たてがみが あって「ガオー」と なくよ。',
    },
    {
      question: 'ペンギンは なにが とくい？',
      choices: ['そらを とぶ', 'およぐ', 'きに のぼる', 'つちを ほる'],
      answerIndex: 1,
      explanation: 'ペンギンは とべないけど、およぐのが とっても じょうずだよ。',
    },
    {
      question: 'くびが ながーい どうぶつは どれ？',
      choices: ['🦒', '🦓', '🐴', '🐮'],
      answerIndex: 0,
      explanation: 'きりんの くびは とっても ながいよ。',
    },
    {
      question: 'この どうぶつは なあに？',
      visual: '🐼',
      choices: ['ぱんだ', 'くま', 'こあら', 'たぬき'],
      answerIndex: 0,
      explanation: 'しろと くろの もようが めじるしだよ。',
    },
    {
      question: 'かえるは どう なく？',
      choices: ['ケロケロ', 'ワンワン', 'ニャーニャー', 'ブーブー'],
      answerIndex: 0,
      explanation: 'かえるは「ケロケロ」と なくよ。',
    },
    {
      question: 'この どうぶつは なあに？',
      visual: '🐵',
      choices: ['さる', 'ごりら', 'うま', 'ひつじ'],
      answerIndex: 0,
      explanation: 'きに のぼるのが じょうずだよ。',
    },
    {
      question: 'あしが はやい どうぶつは どれ？',
      choices: ['チーター', 'かめ', 'なまけもの', 'かたつむり'],
      answerIndex: 0,
      explanation: 'チーターは せかいで いちばん あしが はやいよ。',
    },
    {
      question: 'この どうぶつは なあに？',
      visual: '🐢',
      choices: ['かめ', 'かえる', 'へび', 'かに'],
      answerIndex: 0,
      explanation: 'かたい こうらを せおっているよ。',
    },
  ],
};
