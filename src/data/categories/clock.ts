import type { CategoryQuiz } from '../../types';
import { defaultDifficulties } from './difficulties';

/**
 * とけいクイズ：自作SVGの時計で時刻を読む問題（12問）と、
 * 時間・曜日のテキスト問題（8問）。
 * 時計の絵は「短い針＝時、長い針＝ちょうど0分」で、◯時ちょうどだけを扱う。
 */
export const clockQuiz: CategoryQuiz = {
  category: {
    id: 'clock',
    name: 'とけい',
    icon: '🕐',
    color: '#fff3e0',
    description: 'とけいの よみかたの クイズ',
  },
  difficulties: defaultDifficulties,
  questions: [
    {
      question: 'この とけいは なんじ？',
      image: 'clocks/1.svg',
      choices: ['1じ', '2じ', '12じ', '7じ'],
      answerIndex: 0,
      explanation: 'みじかい はりが 1を さして いるよ。1じだよ。',
    },
    {
      question: 'この とけいは なんじ？',
      image: 'clocks/2.svg',
      choices: ['3じ', '2じ', '10じ', '6じ'],
      answerIndex: 1,
      explanation: 'みじかい はりが 2を さして いるよ。2じだよ。',
    },
    {
      question: 'この とけいは なんじ？',
      image: 'clocks/3.svg',
      choices: ['9じ', '6じ', '3じ', '12じ'],
      answerIndex: 2,
      explanation: 'みじかい はりが 3を さして いるよ。3じは おやつの じかんだね。',
    },
    {
      question: 'この とけいは なんじ？',
      image: 'clocks/4.svg',
      choices: ['8じ', '2じ', '5じ', '4じ'],
      answerIndex: 3,
      explanation: 'みじかい はりが 4を さして いるよ。4じだよ。',
    },
    {
      question: 'この とけいは なんじ？',
      image: 'clocks/5.svg',
      choices: ['5じ', '11じ', '7じ', '1じ'],
      answerIndex: 0,
      explanation: 'みじかい はりが 5を さして いるよ。5じだよ。',
    },
    {
      question: 'この とけいは なんじ？',
      image: 'clocks/6.svg',
      choices: ['12じ', '6じ', '3じ', '9じ'],
      answerIndex: 1,
      explanation: 'みじかい はりが 6を さして いるよ。6じだよ。',
    },
    {
      question: 'この とけいは なんじ？',
      image: 'clocks/7.svg',
      choices: ['1じ', '5じ', '7じ', '11じ'],
      answerIndex: 2,
      explanation: 'みじかい はりが 7を さして いるよ。あさの 7じは おきる じかんかな？',
    },
    {
      question: 'この とけいは なんじ？',
      image: 'clocks/8.svg',
      choices: ['4じ', '10じ', '2じ', '8じ'],
      answerIndex: 3,
      explanation: 'みじかい はりが 8を さして いるよ。8じだよ。',
    },
    {
      question: 'この とけいは なんじ？',
      image: 'clocks/9.svg',
      choices: ['9じ', '3じ', '6じ', '12じ'],
      answerIndex: 0,
      explanation: 'みじかい はりが 9を さして いるよ。9じだよ。',
    },
    {
      question: 'この とけいは なんじ？',
      image: 'clocks/10.svg',
      choices: ['2じ', '10じ', '5じ', '8じ'],
      answerIndex: 1,
      explanation: 'みじかい はりが 10を さして いるよ。10じだよ。',
    },
    {
      question: 'この とけいは なんじ？',
      image: 'clocks/11.svg',
      choices: ['7じ', '1じ', '11じ', '4じ'],
      answerIndex: 2,
      explanation: 'みじかい はりが 11を さして いるよ。11じだよ。',
    },
    {
      question: 'この とけいは なんじ？',
      image: 'clocks/12.svg',
      choices: ['6じ', '9じ', '3じ', '12じ'],
      answerIndex: 3,
      explanation: 'はりが りょうほう 12を さして いるよ。12じだよ。おひるの 12じは ごはんだね。',
    },
    {
      question: 'あさ おきて、かおを あらうのは だいたい なんじごろ？',
      choices: ['あさの 7じごろ', 'よるの 11じ', 'おひるの 12じだけ', 'よるの 9じだけ'],
      answerIndex: 0,
      explanation: 'あさ おきる じかんは おうちで ちがうけど、7じごろの ことが おおいよ。',
    },
    {
      question: 'おひるごはんを たべるのは だいたい なんじごろ？',
      choices: ['よるの 10じ', 'おひるの 12じごろ', 'あさの 5じ', 'よるの 8じだけ'],
      answerIndex: 1,
      explanation: 'おひるの 12じごろが ランチの じかんだよ。',
    },
    {
      question: '1にちは なんじかん？',
      choices: ['12じかん', '10じかん', '24じかん', '100じかん'],
      answerIndex: 2,
      explanation: 'あさと よるで、とけいが 2しゅうして 24じかんだよ。',
    },
    {
      question: 'きょうの つぎの ひは なんと いう？',
      choices: ['きのう', 'おととい', 'せんしゅう', 'あした'],
      answerIndex: 3,
      explanation: 'あしたは あたらしい 1にちの はじまりだよ。',
    },
    {
      question: 'きょうの まえの ひは なんと いう？',
      choices: ['きのう', 'あした', 'あさって', 'らいしゅう'],
      answerIndex: 0,
      explanation: 'きのうの ことは おもいでに なるね。',
    },
    {
      question: '1しゅうかんは なんにち？',
      choices: ['5にち', '7にち', '10にち', '30にち'],
      answerIndex: 1,
      explanation: 'げつようびから にちようびまで 7にちだよ。',
    },
    {
      question: 'にちようびの つぎは なにようび？',
      choices: ['どようび', 'きんようび', 'げつようび', 'すいようび'],
      answerIndex: 2,
      explanation: 'しゅうのはじまりは げつようびだよ。',
    },
    {
      question: 'どようびと にちようびを あわせて なんと いう？',
      choices: ['へいじつ', 'しゅくじつだけ', 'たんじょうび', 'しゅうまつ'],
      answerIndex: 3,
      explanation: 'しゅうまつは おでかけが たのしいね。',
    },
  ],
};
