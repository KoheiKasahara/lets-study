import type { CategoryQuiz } from '../../types';
import { defaultDifficulties } from './difficulties';

/** あんぜんクイズ：交通安全や生活の安全のテキスト問題（14問） */
export const safetyQuiz: CategoryQuiz = {
  category: {
    id: 'safety',
    name: 'あんぜん',
    icon: '🚦',
    color: '#fff3e0',
    description: 'あんぜんの ルールの クイズ',
  },
  difficulties: defaultDifficulties,
  questions: [
    {
      question: 'どうろを わたるとき、わたる ばしょは どれ？',
      choices: ['おうだんほどう', 'くるまの うしろ', 'どうろの まんなか', 'ちゅうしゃじょう'],
      answerIndex: 0,
      explanation: 'おうだんほどうを わたろうね。しんごうも みようね。',
    },
    {
      question: 'あるく ひと用の しんごうが あおに なったら どう する？',
      choices: [
        'はしって わたる',
        'みぎと ひだりを みてから わたる',
        'めを つぶって わたる',
        'ボールを けりながら わたる',
      ],
      answerIndex: 1,
      explanation: 'あおでも、くるまが こないか たしかめようね。',
    },
    {
      question: 'しんごうが あかの ときは どう する？',
      choices: ['わたる', 'はしる', 'とまる', 'かくれる'],
      answerIndex: 2,
      explanation: 'あかは「とまれ」の あいずだよ。',
    },
    {
      question: 'おとなと いっしょに あるくとき、どう する？',
      choices: ['さきに はしる', 'ひとりで いく', 'かくれる', 'てを つなぐ'],
      answerIndex: 3,
      explanation: 'てを つなぐと あんしんだよ。',
    },
    {
      question: 'しらない ひとに「おかし あげるから ついておいで」と いわれたら？',
      choices: ['ついて いかない', 'ついて いく', 'おかしだけ もらう', 'くるまに のる'],
      answerIndex: 0,
      explanation: 'ついていかずに、おとなに おしえようね。',
    },
    {
      question: 'こうえんで あそぶとき、ちかくに いて ほしいのは だれ？',
      choices: ['しらない ひと', 'おうちの ひとや せんせい', 'いぬだけ', 'だれも いらない'],
      answerIndex: 1,
      explanation: 'おとなの みえる ところで あそぼうね。',
    },
    {
      question: 'ブランコに のっている ひとの まえを とおると どうなる？',
      choices: ['たのしい', 'あんぜん', 'ぶつかって あぶない', 'はやく なれる'],
      answerIndex: 2,
      explanation: 'ブランコの まえと うしろは あぶないよ。はなれて とおろうね。',
    },
    {
      question: 'すべりだいを すべるときの ルールは どれ？',
      choices: [
        'したから のぼる',
        'たって すべる',
        'ふたりで かさなる',
        'じゅんばんを まもって すわる',
      ],
      answerIndex: 3,
      explanation: 'じゅんばんを まもると、みんなが たのしいよ。',
    },
    {
      question: 'あつい やかんや なべは どう する？',
      choices: ['さわらない', 'さわって みる', 'もって あるく', 'ゆらす'],
      answerIndex: 0,
      explanation: 'あついものは やけどの もとだよ。おとなに まかせようね。',
    },
    {
      question: 'コンセントに ゆびや ものを いれると どうなる？',
      choices: ['たのしい', 'あぶない', 'あかるく なる', 'おとが するだけ'],
      answerIndex: 1,
      explanation: 'でんきは あぶないよ。いたずらしないでね。',
    },
    {
      question: 'おふろの まわりで はしると どうなる？',
      choices: ['はやく かわく', 'たのしい', 'すべって ころんで あぶない', 'きれいに なる'],
      answerIndex: 2,
      explanation: 'みずで すべりやすいよ。ゆっくり あるこうね。',
    },
    {
      question: 'じしんが きたら まず どう する？',
      choices: [
        'そとへ はしる',
        'エレベーターに のる',
        'まどに よる',
        'つくえの したに かくれて あたまを まもる',
      ],
      answerIndex: 3,
      explanation: 'あたまを まもって、おとなの いうことを きこうね。',
    },
    {
      question: 'かじを みつけたら どう する？',
      choices: [
        'おおきな こえで おとなに しらせる',
        'じぶんで けす',
        'かくれる',
        'しゃしんを とる',
      ],
      answerIndex: 0,
      explanation: '「かじだ！」と おとなに しらせようね。',
    },
    {
      question: 'くるまに のるとき、こども用の いすは どれ？',
      choices: ['うんてんせき', 'チャイルドシート', 'まえの せきだけ', 'トランク'],
      answerIndex: 1,
      explanation: 'チャイルドシートで あんぜんに のろうね。',
    },
  ],
};
