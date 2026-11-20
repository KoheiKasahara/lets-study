import type { CategoryQuiz } from '../../types';
import { defaultDifficulties } from './difficulties';

/** きもちクイズ：場面から気持ちを考えるテキスト問題（14問） */
export const feelingsQuiz: CategoryQuiz = {
  category: {
    id: 'feelings',
    name: 'きもち',
    icon: '😊',
    color: '#fff9c4',
    description: 'きもちを かんがえる クイズ',
  },
  difficulties: defaultDifficulties,
  questions: [
    {
      question: 'たんじょうびに プレゼントを もらった。どんな きもち？',
      choices: ['うれしい', 'かなしい', 'おこる', 'ねむい'],
      answerIndex: 0,
      explanation: 'うれしいときは ニコニコに なるね。',
    },
    {
      question: 'だいすきな おもちゃが こわれた。どんな きもち？',
      choices: ['うれしい', 'かなしい', 'たのしい', 'びっくり'],
      answerIndex: 1,
      explanation: 'かなしいときは、なみだが でることも あるよ。',
    },
    {
      question: 'おともだちに おもちゃを とられた。どんな きもち？',
      choices: ['うれしい', 'たのしい', 'いやな きもち', 'ねむい'],
      answerIndex: 2,
      explanation: 'いやなときは「やめて」と ことばで つたえようね。',
    },
    {
      question: 'くらくて おおきな おとが した。どんな きもち？',
      choices: ['うれしい', 'たのしい', 'わくわく', 'こわい'],
      answerIndex: 3,
      explanation: 'こわいときは、おとなの そばに いこうね。',
    },
    {
      question: 'かけっこで 1ばんに なった。どんな きもち？',
      choices: ['やったー！と うれしい', 'かなしい', 'こわい', 'ねむい'],
      answerIndex: 0,
      explanation: 'がんばった あとは、とっても うれしいね。',
    },
    {
      question: 'おともだちと ケンカした。なかなおり するには どう する？',
      choices: ['たたく', '「ごめんね」と いう', 'ないて にげるだけ', 'むしする'],
      answerIndex: 1,
      explanation: 'ごめんねが いえると、なかなおり できるよ。',
    },
    {
      question: 'はじめての えんそく。どんな きもち？',
      choices: ['かなしい', 'こわいだけ', 'ワクワク たのしみ', 'ねむい'],
      answerIndex: 2,
      explanation: 'たのしみな ことは ワクワクするね。',
    },
    {
      question: 'よる おそくまで あそんだ。からだは どう？',
      choices: ['げんきいっぱい', 'うれしい', 'びっくり', 'ねむい'],
      answerIndex: 3,
      explanation: 'ねむいときは、はやめに ねようね。',
    },
    {
      question: 'おともだちが ないている。どう して あげる？',
      choices: ['「だいじょうぶ？」と きく', 'わらう', 'むしする', 'にげる'],
      answerIndex: 0,
      explanation: 'やさしい ことばが、おともだちを たすけるよ。',
    },
    {
      question: 'じぶんの さくひんを ほめられた。どんな きもち？',
      choices: ['かなしい', 'はずかしいけど うれしい', 'おこる', 'こわい'],
      answerIndex: 1,
      explanation: 'ほめられると、はずかしいけど うれしいね。',
    },
    {
      question: 'おかあさんが かぜで ねている。どう する？',
      choices: ['さわぐ', 'おおきな こえを だす', 'しずかに して やすませる', 'おもちゃを なげる'],
      answerIndex: 2,
      explanation: 'しずかに すると、ゆっくり やすめるよ。',
    },
    {
      question: 'だいすきな ひとに あえた。どんな きもち？',
      choices: ['かなしい', 'こわい', 'ねむい', 'うれしい'],
      answerIndex: 3,
      explanation: 'あいたかった ひとに あえると うれしいね。',
    },
    {
      question: 'テストじゃなくても、まちがえたら どう する？',
      choices: ['もういちど やって みる', 'やめる', 'ないて ばかりいる', 'ひとの せいに する'],
      answerIndex: 0,
      explanation: 'まちがえても、もういちど ちょうせん できるよ。',
    },
    {
      question: 'おともだちが たのしそうに あそんでいる。いっしょに あそびたいときは？',
      choices: ['おもちゃを うばう', '「いれて」と いう', 'じゃまを する', 'ないて みせる'],
      answerIndex: 1,
      explanation: '「いれて」と いえば、いっしょに あそべるかも しれないね。',
    },
  ],
};
