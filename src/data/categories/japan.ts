import type { CategoryQuiz } from '../../types';
import { defaultDifficulties } from './difficulties';

/** にほんクイズ：日本の山・場所・食べ物などのテキスト問題（22問） */
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
    {
      question: 'にほんで いちばん おおきな しまは どれ？',
      choices: ['ほんしゅう', 'ほっかいどう', 'きゅうしゅう', 'おきなわ'],
      answerIndex: 0,
      explanation: 'ほんしゅうは にほんで いちばん おおきい しまだよ。',
    },
    {
      question: 'にほんの おかねの たんいは なに？',
      choices: ['えん', 'ドル', 'ユーロ', 'ポンド'],
      answerIndex: 0,
      explanation: 'にほんでは「えん」を つかうよ。',
    },
    {
      question: 'おまつりで みる、そらに あがる ひかりは どれ？',
      choices: ['はなび', 'たいよう', 'つき', 'ほし'],
      answerIndex: 0,
      explanation: 'はなびは よるの そらに パッと ひろがるよ。',
    },
    {
      question: 'こいのぼりを あげるのは いつ？',
      choices: ['こどものひ', 'おしょうがつ', 'ハロウィン', 'クリスマス'],
      answerIndex: 0,
      explanation: 'こどものひは 5がつ5か。こいのぼりが そらを およぐよ。',
    },
    {
      question: 'たなばたは いつ？',
      choices: ['7がつ7か', '12がつ25にち', '1がつ1にち', '3がつ3か'],
      answerIndex: 0,
      explanation: 'たなばたは 7がつ7か。おりひめと ひこぼしの おはなしだよ。',
    },
    {
      question: 'ひなまつりは いつ？',
      choices: ['3がつ3か', '7がつ7か', '12がつ25にち', '1がつ1にち'],
      answerIndex: 0,
      explanation: 'ひなまつりは 3がつ3か。ひなにんぎょうを かざるよ。',
    },
    {
      question: 'せつぶんで まくのは なに？',
      choices: ['まめ', 'あめ', 'こめ', 'すな'],
      answerIndex: 0,
      explanation: '「おにわ そと！」と いって、まめを まくよ。',
    },
    {
      question: 'すもうで、どひょうに あがるのは だれ？',
      choices: ['りきし', 'せんせい', 'おいしゃさん', 'パイロット'],
      answerIndex: 0,
      explanation: 'りきしは どひょうで おしあいを するよ。',
    },
  ],
};
