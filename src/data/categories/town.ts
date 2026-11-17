import type { CategoryQuiz } from '../../types';
import { defaultDifficulties } from './difficulties';

/** まちクイズ：町の建物や場所のテキスト問題（16問） */
export const townQuiz: CategoryQuiz = {
  category: {
    id: 'town',
    name: 'まち',
    icon: '🏘️',
    color: '#e2e8f0',
    description: 'まちの たてものや ばしょの クイズ',
  },
  difficulties: defaultDifficulties,
  questions: [
    {
      question: 'ほんを かりられる ばしょは どれ？',
      choices: ['としょかん', 'びょういん', 'えき', 'パンや'],
      answerIndex: 0,
      explanation: 'としょかんでは しずかに ほんを よもうね。',
    },
    {
      question: 'でんしゃに のる ばしょは どれ？',
      choices: ['くうこう', 'えき', 'みなと', 'こうえん'],
      answerIndex: 1,
      explanation: 'えきで きっぷを かって でんしゃに のるよ。',
    },
    {
      question: 'ひこうきに のる ばしょは どれ？',
      choices: ['えき', 'みなと', 'くうこう', 'がっこう'],
      answerIndex: 2,
      explanation: 'くうこうから そらへ しゅっぱつするよ。',
    },
    {
      question: 'ふねが とまる ばしょは どれ？',
      choices: ['くうこう', 'えき', 'としょかん', 'みなと'],
      answerIndex: 3,
      explanation: 'みなとには おおきな ふねが とまるよ。',
    },
    {
      question: 'さかなを みられる ばしょは どれ？',
      choices: ['すいぞくかん', 'どうぶつえん', 'びょういん', 'ゆうびんきょく'],
      answerIndex: 0,
      explanation: 'すいぞくかんでは いるかや ペンギンも みられるよ。',
    },
    {
      question: 'どうぶつを みられる ばしょは どれ？',
      choices: ['すいぞくかん', 'どうぶつえん', 'がっこう', 'えき'],
      answerIndex: 1,
      explanation: 'どうぶつえんには ぞうや ライオンが いるよ。',
    },
    {
      question: 'すべりだいや ブランコで あそぶ ばしょは どれ？',
      choices: ['びょういん', 'ゆうびんきょく', 'こうえん', 'ほんや'],
      answerIndex: 2,
      explanation: 'こうえんでは ルールを まもって あそぼうね。',
    },
    {
      question: 'てがみを だす ばしょは どれ？',
      choices: ['パンや', 'びょういん', 'えき', 'ゆうびんきょく'],
      answerIndex: 3,
      explanation: 'きってを はって、ポストに いれるよ。',
    },
    {
      question: 'およぐ れんしゅうを する ばしょは どれ？',
      choices: ['プール', 'こうえん', 'としょかん', 'えき'],
      answerIndex: 0,
      explanation: 'プールでは じゅんび うんどうを してから はいろうね。',
    },
    {
      question: 'おかねを あずける ばしょは どれ？',
      choices: ['ほんや', 'ぎんこう', 'パンや', 'びょういん'],
      answerIndex: 1,
      explanation: 'ぎんこうは おかねを あずかったり、おろしたり するよ。',
    },
    {
      question: 'かみを きって もらう ばしょは どれ？',
      choices: ['はなや', 'さかなや', 'びよういん', 'やおや'],
      answerIndex: 2,
      explanation: 'びよういんで かみを きれいに して もらうよ。',
    },
    {
      question: 'やさいを うる おみせは どれ？',
      choices: ['ほんや', 'はなや', 'びよういん', 'やおや'],
      answerIndex: 3,
      explanation: 'やおやさんには しんせんな やさいが ならぶよ。',
    },
    {
      question: 'ほんを かう おみせは どれ？',
      choices: ['ほんや', 'パンや', 'はなや', 'さかなや'],
      answerIndex: 0,
      explanation: 'ほんやさんには えほんも たくさん あるよ。',
    },
    {
      question: 'あまい パンを かう おみせは どれ？',
      choices: ['やおや', 'パンや', 'ほんや', 'びよういん'],
      answerIndex: 1,
      explanation: 'パンやさんは いい においが するね。',
    },
    {
      question: 'おはなを かう おみせは どれ？',
      choices: ['さかなや', 'やおや', 'はなや', 'ほんや'],
      answerIndex: 2,
      explanation: 'はなやさんには きれいな はなが いっぱいだよ。',
    },
    {
      question: 'けがを したら いく ばしょは どれ？',
      choices: ['がっこう', 'こうえん', 'えき', 'びょういん'],
      answerIndex: 3,
      explanation: 'びょういんで おいしゃさんに みて もらおうね。',
    },
  ],
};
