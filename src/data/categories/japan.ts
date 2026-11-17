import type { CategoryQuiz } from '../../types';
import { defaultDifficulties } from './difficulties';

/** にほんクイズ：日本の山・場所・食べ物などのテキスト問題（14問） */
export const japanQuiz: CategoryQuiz = {
  category: {
    id: 'japan',
    name: 'にほん',
    icon: '🗾',
    color: '#ffebee',
    description: 'にほんの ことの クイズ',
  },
  difficulties: defaultDifficulties,
  questions: [
    {
      question: 'にほんで いちばん たかい やまは どれ？',
      choices: ['ふじさん', 'つるぎだけ', 'えべれすと', 'あそさん'],
      answerIndex: 0,
      explanation: 'ふじさんは にほんで いちばん たかい やまだよ。',
    },
    {
      question: 'にほんの しゅとは どこ？',
      choices: ['おおさか', 'とうきょう', 'きょうと', 'さっぽろ'],
      answerIndex: 1,
      explanation: 'とうきょうは にほんの しゅとだよ。',
    },
    {
      question: 'にほんの こっきは どんな もよう？',
      choices: ['ほし', 'つき', 'まる', 'しかく'],
      answerIndex: 2,
      explanation: 'しろい ぬのの まんなかに、あかい まるが あるよ。ひのまるだね。',
    },
    {
      question: 'とうきょうで いちばん ゆうめいな タワーは どれ？',
      choices: [
        'スカイツリーと とうきょうタワー',
        'えっふぇるとう',
        'ピサの しゃとう',
        'ビッグベン',
      ],
      answerIndex: 0,
      explanation: 'スカイツリーは せかいで たかい タワーの ひとつだよ。',
    },
    {
      question: 'おすしに のせる さかなで、オレンジいろの にくが ゆうめいなのは どれ？',
      choices: ['たい', 'さーもん', 'あじ', 'いわし'],
      answerIndex: 1,
      explanation: 'さーもんは オレンジいろで、おすしでも にんきだよ。',
    },
    {
      question: 'ごはんを にぎった たべものは どれ？',
      choices: ['パン', 'パスタ', 'おにぎり', 'ピザ'],
      answerIndex: 2,
      explanation: 'おにぎりは のりを まくことが おおいよ。',
    },
    {
      question: 'はるに さく、にほんで ゆうめいな はなは どれ？',
      choices: ['ひまわり', 'チューリップ', 'バラ', 'さくら'],
      answerIndex: 3,
      explanation: 'さくらを みる「おはなみ」は はるの たのしみだよ。',
    },
    {
      question: 'にほんの おかねで、いちばん おおきな おさつは いくら？',
      choices: ['いちまんえん', 'ごせんえん', 'せんえん', 'ひゃくえん'],
      answerIndex: 0,
      explanation: 'いちまんえんさつが いちばん おおきいよ。',
    },
    {
      question: 'しんかんせんで はやいのは どれ？',
      choices: ['じてんしゃ', 'はやぶさ', 'バス', 'ふね'],
      answerIndex: 1,
      explanation: 'はやぶさは とうほくへ いく はやい しんかんせんだよ。',
    },
    {
      question: 'ゆきまつりで ゆうめいな まちは どれ？',
      choices: ['おきなわ', 'ふくおか', 'さっぽろ', 'なごや'],
      answerIndex: 2,
      explanation: 'さっぽろ ゆきまつりでは おおきな ゆきの ぞうが みられるよ。',
    },
    {
      question: 'おしょうがつに たべる、もちが はいった しるものは どれ？',
      choices: ['みそしる', 'スープ', 'カレー', 'おぞうに'],
      answerIndex: 3,
      explanation: 'おぞうには お正月の たべものだよ。',
    },
    {
      question: 'たたみの へやで はくものは どれ？',
      choices: ['なにも はかない', 'くつ', 'スリッパだけ', 'ブーツ'],
      answerIndex: 0,
      explanation: 'わしつでは くつを ぬいで はいるよ。',
    },
    {
      question: 'おふろの あとに きる、うすい きものは どれ？',
      choices: ['コート', 'ゆかた', 'セーター', 'ジャケット'],
      answerIndex: 1,
      explanation: 'ゆかたは なつの おまつりでも きるよ。',
    },
    {
      question: 'にほんの でんとうてきな おんがくの がっきは どれ？',
      choices: ['ピアノ', 'ギター', 'しゃみせん', 'バイオリン'],
      answerIndex: 2,
      explanation: 'しゃみせんは 3ほんの げんを はじいて ならすよ。',
    },
  ],
};
