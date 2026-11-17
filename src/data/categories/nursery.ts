import type { CategoryQuiz } from '../../types';
import { defaultDifficulties } from './difficulties';

/** ほいくえんクイズ：園生活のテキスト問題（14問） */
export const nurseryQuiz: CategoryQuiz = {
  category: {
    id: 'nursery',
    name: 'ほいくえん',
    icon: '🏫',
    color: '#e8f5e9',
    description: 'ほいくえんの せいかつの クイズ',
  },
  difficulties: defaultDifficulties,
  questions: [
    {
      question: 'ほいくえんで おせわを して くれる ひとは だれ？',
      choices: ['せんせい', 'おいしゃさん', 'うんてんしさん', 'パンやさん'],
      answerIndex: 0,
      explanation: 'せんせいは いつも みまもって くれるよ。',
    },
    {
      question: 'えんに ついたら まず なにを する？',
      choices: ['おひるね', 'あいさつを して かばんを しまう', 'おやつを たべる', 'かえる'],
      answerIndex: 1,
      explanation: '「おはようございます」の あいさつが だいじだよ。',
    },
    {
      question: 'おべんとうを たべる まえに することは どれ？',
      choices: ['かけっこ', 'おえかき', 'てを あらう', 'うたを うたうだけ'],
      answerIndex: 2,
      explanation: 'てを あらってから たべようね。',
    },
    {
      question: 'おひるごはんの あと、からだを やすめる じかんは どれ？',
      choices: ['おあそび', 'えんそく', 'うんどうかい', 'おひるね'],
      answerIndex: 3,
      explanation: 'おひるねで からだを やすめようね。',
    },
    {
      question: 'みんなで バスに のって おでかけするのは どれ？',
      choices: ['えんそく', 'おひるね', 'おかたづけ', 'てあらい'],
      answerIndex: 0,
      explanation: 'えんそくは おべんとうが たのしみだね。',
    },
    {
      question: 'かけっこや たまいれを する おおきな ぎょうじは どれ？',
      choices: ['にゅうえんしき', 'うんどうかい', 'おゆうぎかい', 'そつえんしき'],
      answerIndex: 1,
      explanation: 'うんどうかいは おうちの ひとが おうえんに くるよ。',
    },
    {
      question: 'おどりや うたを みせる ぎょうじは どれ？',
      choices: ['うんどうかい', 'えんそく', 'おゆうぎかい', 'おひるね'],
      answerIndex: 2,
      explanation: 'おゆうぎかいでは れんしゅうの せいかを みせるよ。',
    },
    {
      question: 'あそんだ あとは なにを する？',
      choices: ['そのまま かえる', 'ないて みせる', 'たべるだけ', 'おかたづけ'],
      answerIndex: 3,
      explanation: 'つぎの ひとも つかえるように、おかたづけを しようね。',
    },
    {
      question: 'おともだちと おもちゃの とりあいに なったら どう する？',
      choices: ['じゅんばんを きめる', 'うばう', 'たたく', 'かくす'],
      answerIndex: 0,
      explanation: '「かして」「いいよ」で じゅんばんこに つかおうね。',
    },
    {
      question: 'えんの おにわを なんと いう？',
      choices: ['こうえん', 'えんてい', 'にわだけ', 'グラウンドだけ'],
      answerIndex: 1,
      explanation: 'えんていでは すべりだいや すなばで あそべるよ。',
    },
    {
      question: 'そとから かえったら することは どれ？',
      choices: ['おやつだけ', 'ねる', 'てあらいと うがい', 'テレビ'],
      answerIndex: 2,
      explanation: 'てあらい・うがいで かぜを よぼうしようね。',
    },
    {
      question: 'かえりの じかんに いう あいさつは どれ？',
      choices: ['おはよう', 'こんにちは', 'いただきます', 'さようなら'],
      answerIndex: 3,
      explanation: '「さようなら、また あしたね」と いおうね。',
    },
    {
      question: 'えんで つかう、じぶんの コップや タオルは どこに しまう？',
      choices: ['じぶんの ロッカーや かばん', 'せんせいの つくえ', 'えんてい', 'トイレ'],
      answerIndex: 0,
      explanation: 'じぶんの ものは じぶんで かたづけようね。',
    },
    {
      question: 'たんじょうびの おともだちには なんと いう？',
      choices: ['しらない', 'おたんじょうび おめでとう', 'さようなら', 'ごめんなさい'],
      answerIndex: 1,
      explanation: 'みんなで うたって おいわいすると たのしいね。',
    },
  ],
};
