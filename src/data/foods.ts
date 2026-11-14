import type { CategoryQuiz } from '../types';
import { defaultDifficulties } from './difficulties';

/** たべものクイズ：食べ物の名前の基本問題（12問） */
export const foodsQuiz: CategoryQuiz = {
  category: {
    id: 'foods',
    name: 'たべもの',
    icon: '🍎',
    color: '#fff3d6',
    description: 'たべものの なまえの クイズ',
  },
  difficulties: defaultDifficulties,
  questions: [
    {
      question: 'この たべものは なあに？',
      visual: '🍎',
      choices: ['りんご', 'みかん', 'バナナ', 'ぶどう'],
      answerIndex: 0,
      explanation: 'あかくて まるい くだものだよ。',
    },
    {
      question: 'この たべものは なあに？',
      visual: '🍌',
      choices: ['バナナ', 'りんご', 'もも', 'すいか'],
      answerIndex: 0,
      explanation: 'きいろくて ながい くだものだよ。',
    },
    {
      question: 'あさごはんに のむ しろい のみものは どれ？',
      choices: ['ぎゅうにゅう', 'ジュース', 'おちゃ', 'みず'],
      answerIndex: 0,
      explanation: 'うしの おちちが ぎゅうにゅうだよ。',
    },
    {
      question: 'この たべものは なあに？',
      visual: '🍓',
      choices: ['いちご', 'さくらんぼ', 'りんご', 'トマト'],
      answerIndex: 0,
      explanation: 'あかくて あまい くだものだよ。',
    },
    {
      question: 'さかなを のせた ごはんの たべものは どれ？',
      choices: ['おすし', 'ピザ', 'ハンバーガー', 'パン'],
      answerIndex: 0,
      explanation: 'おすしは にっぽんの たべものだよ。',
    },
    {
      question: 'この たべものは なあに？',
      visual: '🥕',
      choices: ['にんじん', 'だいこん', 'ごぼう', 'さつまいも'],
      answerIndex: 0,
      explanation: 'オレンジいろの やさいだよ。うさぎも だいすきだね。',
    },
    {
      question: 'あまくて つめたい なつの おやつは どれ？',
      choices: ['アイスクリーム', 'せんべい', 'おにぎり', 'みそしる'],
      answerIndex: 0,
      explanation: 'アイスクリームは つめたくて あまいね。',
    },
    {
      question: 'この たべものは なあに？',
      visual: '🍇',
      choices: ['ぶどう', 'いちご', 'もも', 'なし'],
      answerIndex: 0,
      explanation: 'むらさきいろの まるい くだものだよ。',
    },
    {
      question: 'あかい まるい やさいは どれ？',
      choices: ['トマト', 'きゅうり', 'なす', 'だいこん'],
      answerIndex: 0,
      explanation: 'トマトは あかくて まるい やさいだよ。',
    },
    {
      question: 'この たべものは なあに？',
      visual: '🍞',
      choices: ['パン', 'ケーキ', 'クッキー', 'ドーナツ'],
      answerIndex: 0,
      explanation: 'あさごはんに よく たべるね。',
    },
    {
      question: 'しろい ごはんを にぎった たべものは どれ？',
      choices: ['おにぎり', 'ケーキ', 'プリン', 'クッキー'],
      answerIndex: 0,
      explanation: 'おにぎりは ごはんを にぎって つくるよ。',
    },
    {
      question: 'この たべものは なあに？',
      visual: '🍰',
      choices: ['ケーキ', 'パン', 'おもち', 'せんべい'],
      answerIndex: 0,
      explanation: 'たんじょうびに たべる あまい おやつだよ。',
    },
  ],
};
