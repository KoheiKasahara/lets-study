import type { CategoryQuiz } from '../../types';
import { defaultDifficulties } from './difficulties';

/** かぞくクイズ：家族の呼び方や関わりのテキスト問題（14問） */
export const familyQuiz: CategoryQuiz = {
  category: {
    id: 'family',
    name: 'かぞく',
    icon: '👨‍👩‍👧',
    color: '#fce4ec',
    description: 'かぞくの クイズ',
  },
  difficulties: defaultDifficulties,
  questions: [
    {
      question: 'おかあさんの おかあさんは、なんと よぶ？',
      choices: ['おばあちゃん', 'おばさん', 'おねえさん', 'いとこ'],
      answerIndex: 0,
      explanation:
        'おかあさんの おかあさんは おばあちゃんだよ。おとうさんの おかあさんも おばあちゃんだね。',
    },
    {
      question: 'おとうさんの おとうさんは、なんと よぶ？',
      choices: ['おじさん', 'おじいちゃん', 'おにいさん', 'いとこ'],
      answerIndex: 1,
      explanation: 'おじいちゃんは かぞくの おおきな そんざいだね。',
    },
    {
      question: 'おかあさんの きょうだいの おんなの ひとは、なんと よぶ？',
      choices: ['おばあちゃん', 'いとこ', 'おばさん', 'おねえさん'],
      answerIndex: 2,
      explanation: 'おかあさんや おとうさんの きょうだいは、おばさん・おじさんと よぶよ。',
    },
    {
      question: 'おばさんの こどもは、なんと よぶ？',
      choices: ['きょうだい', 'おい', 'めい', 'いとこ'],
      answerIndex: 3,
      explanation: 'いとことは いっしょに あそぶと たのしいね。',
    },
    {
      question: 'じぶんより おおきい おとこの きょうだいは どれ？',
      choices: ['おにいさん', 'おとうと', 'いもうと', 'おじいちゃん'],
      answerIndex: 0,
      explanation: 'おおきい おとこの きょうだいは おにいさんだよ。',
    },
    {
      question: 'じぶんより ちいさい おんなの きょうだいは どれ？',
      choices: ['おねえさん', 'いもうと', 'おばあちゃん', 'いとこ'],
      answerIndex: 1,
      explanation: 'ちいさい おんなの きょうだいは いもうとだよ。',
    },
    {
      question: 'うまれた ばかりの こどもは どれ？',
      choices: ['おじいちゃん', 'せんせい', 'あかちゃん', 'おにいさん'],
      answerIndex: 2,
      explanation: 'あかちゃんは ミルクを のんで すくすく そだつよ。',
    },
    {
      question: 'かぞくで いちばん ちいさい ことが おおいのは だれ？',
      choices: ['おじいちゃん', 'おとうさん', 'おかあさん', 'あかちゃん'],
      answerIndex: 3,
      explanation: 'あかちゃんは みんなに まもられて そだつよ。',
    },
    {
      question: 'ペットの いぬは かぞく？',
      choices: ['かぞくの なかま', 'かぞくじゃない', 'おもちゃ', 'ともだちだけ'],
      answerIndex: 0,
      explanation: 'ペットも だいじな かぞくの なかまだよ。',
    },
    {
      question: 'かぞくの たんじょうびには なにを する？',
      choices: ['むしする', '「おめでとう」と いって おいわいする', 'かくれる', 'おこる'],
      answerIndex: 1,
      explanation: 'おいわいの ことばは うれしいね。',
    },
    {
      question: 'おじいちゃん・おばあちゃんの ひは いつ？',
      choices: ['こどもの ひ', 'クリスマス', 'けいろうの ひ', 'たなばた'],
      answerIndex: 2,
      explanation: 'けいろうの ひは 9がつに あるよ。ありがとうを つたえようね。',
    },
    {
      question: 'かぞくで ごはんを たべると たのしいのは なぜ？',
      choices: [
        'テレビが あるから',
        'はやく たべられるから',
        'おかわりが あるから',
        'みんなで たべると おいしいから',
      ],
      answerIndex: 3,
      explanation: 'みんなで かこむ しょくたくは たのしいね。',
    },
    {
      question: 'おとうさんや おかあさんに かんしゃを つたえる ことばは どれ？',
      choices: ['ありがとう', 'さようなら', 'おはよう', 'いただきますだけ'],
      answerIndex: 0,
      explanation: '「ありがとう」は かぞくにも つたえようね。',
    },
    {
      question: 'かぞくの しゃしんを かざる ばしょは どれ？',
      choices: ['れいぞうこの なか', 'へやの かべや アルバム', 'げんかんの そと', 'おふろ'],
      answerIndex: 1,
      explanation: 'しゃしんを みると、おもいでが よみがえるね。',
    },
  ],
};
