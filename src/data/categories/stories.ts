import type { CategoryQuiz } from '../../types';
import { defaultDifficulties } from './difficulties';

/** むかしばなしクイズ：昔話や童話の内容のテキスト問題（26問） */
export const storiesQuiz: CategoryQuiz = {
  category: {
    id: 'stories',
    name: 'むかしばなし',
    icon: '📖',
    color: '#efebe9',
    description: 'むかしばなしの クイズ',
  },
  difficulties: defaultDifficulties,
  questions: [
    {
      question: 'ももから うまれた おとこのこは だれ？',
      choices: ['ももたろう', 'うらしまたろう', 'きんたろう', 'いっすんぼうし'],
      answerIndex: 0,
      explanation: 'ももたろうは おにを たいじに いったよ。',
    },
    {
      question: 'ももたろうの なかまは どれ？',
      choices: ['ねこ・ねずみ・とり', 'いぬ・さる・きじ', 'うま・うし・ぶた', 'かめ・さかな・たこ'],
      answerIndex: 1,
      explanation: 'きびだんごを あげて、なかまに なったよ。',
    },
    {
      question: 'かめに のって りゅうぐうじょうへ いったのは だれ？',
      choices: ['ももたろう', 'かぐやひめ', 'うらしまたろう', 'はなさかじいさん'],
      answerIndex: 2,
      explanation: 'うらしまたろうは いじめた かめを たすけたよ。',
    },
    {
      question: 'うらしまたろうが もらった、ひらくと けむりが でる はこは どれ？',
      choices: ['たからばこ', 'おべんとうばこ', 'どうぐばこ', 'たまてばこ'],
      answerIndex: 3,
      explanation: '「あけては いけない」と いわれた たまてばこだよ。',
    },
    {
      question: 'たけから うまれた おひめさまは だれ？',
      choices: ['かぐやひめ', 'おとひめ', 'しらゆきひめ', 'シンデレラ'],
      answerIndex: 0,
      explanation: 'かぐやひめは つきへ かえって いったよ。',
    },
    {
      question: 'はなを さかせる おじいさんが まいたのは どれ？',
      choices: ['すな', 'はい', 'ゆき', 'はなびら'],
      answerIndex: 1,
      explanation: 'はなさかじいさんは、かれた きに はなを さかせたよ。',
    },
    {
      question: 'さるかにがっせんで、かにを たすけたのは どれ？',
      choices: ['さる', 'かき', 'うす・はち・くり', 'きつね'],
      answerIndex: 2,
      explanation: 'うすや はちや くりが、かにの かたきを うったよ。',
    },
    {
      question: 'うさぎと かけっこで しょうぶした どうぶつは どれ？',
      choices: ['かえる', 'いぬ', 'ねこ', 'かめ'],
      answerIndex: 3,
      explanation: 'かめは ゆっくりでも、あきらめずに すすんだよ。',
    },
    {
      question: '「かちかちやま」で たぬきを こらしめたのは どれ？',
      choices: ['うさぎ', 'さる', 'きつね', 'たぬき'],
      answerIndex: 0,
      explanation: 'うさぎは おばあさんの かたきを うったよ。',
    },
    {
      question: 'シンデレラが おしろへ いくとき のったのは どれ？',
      choices: ['うましゃ', 'かぼちゃの ばしゃ', 'そらとぶ じゅうたん', 'ふね'],
      answerIndex: 1,
      explanation: 'まほうで かぼちゃが ばしゃに なったよ。',
    },
    {
      question: 'シンデレラが おしろに おとして いったのは どれ？',
      choices: ['ぼうし', 'てぶくろ', 'ガラスの くつ', 'かさ'],
      answerIndex: 2,
      explanation: '12じの まほうが とけて、あわてて かえったよ。',
    },
    {
      question: 'あかずきんちゃんが おばあさんの いえで であったのは どれ？',
      choices: ['くま', 'さる', 'きつね', 'おおかみ'],
      answerIndex: 3,
      explanation: 'おおかみが おばあさんに へんそうして いたよ。',
    },
    {
      question: '3びきの こぶたで、レンガの いえを たてたのは なんばんめの こぶた？',
      choices: ['3ばんめ', '1ばんめ', '2ばんめ', 'ぜんいん'],
      answerIndex: 0,
      explanation: 'レンガの いえは おおかみにも こわせなかったよ。',
    },
    {
      question: 'ジャックが まめを かって のぼったのは どれ？',
      choices: ['やま', 'おおきな まめの き', 'タワー', 'はしごだけ'],
      answerIndex: 1,
      explanation: 'そらまで とどく まめの きを のぼったよ。',
    },
    {
      question: 'アリと キリギリスで、なつに はたらいたのは どれ？',
      choices: ['キリギリス', 'ちょう', 'アリ', 'かまきり'],
      answerIndex: 2,
      explanation: 'アリは ふゆの ために たべものを あつめたよ。',
    },
    {
      question: 'きたかぜと たいようで、たびびとの コートを ぬがせたのは どれ？',
      choices: ['きたかぜ', 'あめ', 'ゆき', 'たいよう'],
      answerIndex: 3,
      explanation: 'たいようの あたたかさで、たびびとは コートを ぬいだよ。',
    },
    {
      question: 'きんたろうが やまで なかよく した どうぶつは どれ？',
      choices: ['くま', 'とら', 'ぞう', 'らいおん'],
      answerIndex: 0,
      explanation: 'きんたろうは くまと すもうを とったよ。',
    },
    {
      question: 'いっすんぼうしが のったのは どれ？',
      choices: ['おわん', 'ふね', 'かご', 'たる'],
      answerIndex: 0,
      explanation: 'いっすんぼうしは おわんに のって、かわを のぼったよ。',
    },
    {
      question: 'しらゆきひめを たすけた 7にんは だれ？',
      choices: ['7にんの こびと', '7ひきの おおかみ', '7にんの おうじ', '7ひきの くま'],
      answerIndex: 0,
      explanation: '7にんの こびとは しらゆきひめを かくまって くれたよ。',
    },
    {
      question: 'ヘンゼルと グレーテルが みつけた いえは どんな いえ？',
      choices: ['おかしの いえ', 'レンガの いえ', 'きの いえ', 'ゆきの いえ'],
      answerIndex: 0,
      explanation: 'おかしの いえは まじょの いえだったよ。',
    },
    {
      question: 'ピノキオは うそを つくと どうなる？',
      choices: ['はなが のびる', 'みみが のびる', 'あしが のびる', 'かみが のびる'],
      answerIndex: 0,
      explanation: 'ピノキオは うそを つくと、はなが ぐんぐん のびちゃうよ。',
    },
    {
      question: 'おおきな かぶを ひっぱったのは だれ？',
      choices: ['おじいさん ひとり', 'みんなで いっしょに', 'かぶ ひとりで', 'とりだけ'],
      answerIndex: 1,
      explanation: 'おじいさんも おばあさんも、みんなで ひっぱって ぬけたよ。',
    },
    {
      question: 'したきりすずめで、おじいさんが えらんだのは どれ？',
      choices: ['おおきい つづら', 'ちいさい つづら', 'おかねの やま', 'おべんとう'],
      answerIndex: 1,
      explanation:
        'おじいさんは ちいさい つづらを えらんだよ。なかには たからものが はいって いたよ。',
    },
    {
      question: 'かさじぞうで、おじいさんが かさを かぶせたのは だれ？',
      choices: ['おじぞうさま', 'おに', 'かめ', 'とり'],
      answerIndex: 0,
      explanation: 'おじいさんは ゆきの なかの おじぞうさまに かさを かぶせたよ。',
    },
    {
      question: 'ブレーメンの おんがくたいの なかまは どれ？',
      choices: [
        'ろば・いぬ・ねこ・にわとり',
        'うま・うし・ぶた・ひつじ',
        'くま・とら・ぞう・らいおん',
        'さる・きつね・たぬき・ねずみ',
      ],
      answerIndex: 0,
      explanation: 'ろばと いぬと ねこと にわとりが、ブレーメンを めざしたよ。',
    },
    {
      question: 'ねむりひめは どれくらい ねむった？',
      choices: ['100ねん', '1にち', '1しゅうかん', '1かげつ'],
      answerIndex: 0,
      explanation: 'ねむりひめは 100ねん ねむって、おうじさまに おこされたよ。',
    },
  ],
};
