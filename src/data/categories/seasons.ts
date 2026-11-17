import type { CategoryQuiz } from '../../types';
import { defaultDifficulties } from './difficulties';

/** きせつとてんきクイズ：自作SVGの天気の絵と、季節のテキスト問題（20問） */
export const seasonsQuiz: CategoryQuiz = {
  category: {
    id: 'seasons',
    name: 'きせつと てんき',
    icon: '🌦️',
    color: '#e0f7fa',
    description: 'てんきや きせつの クイズ',
  },
  difficulties: defaultDifficulties,
  questions: [
    {
      question: 'この えの てんきは なあに？',
      image: 'weather/sunny.svg',
      choices: ['はれ', 'あめ', 'ゆき', 'くもり'],
      answerIndex: 0,
      explanation: 'たいようが でて あかるい ひだよ。',
    },
    {
      question: 'この えの てんきは なあに？',
      image: 'weather/cloudy.svg',
      choices: ['はれ', 'くもり', 'ゆき', 'かぜ'],
      answerIndex: 1,
      explanation: 'くもが そらを おおって いるよ。',
    },
    {
      question: 'この えの てんきは なあに？',
      image: 'weather/rainy.svg',
      choices: ['ゆき', 'はれ', 'あめ', 'くもり'],
      answerIndex: 2,
      explanation: 'あめの ひは かさを もって でかけようね。',
    },
    {
      question: 'この えの てんきは なあに？',
      image: 'weather/snowy.svg',
      choices: ['あめ', 'かぜ', 'はれ', 'ゆき'],
      answerIndex: 3,
      explanation: 'ゆきの ひは さむいから あたたかく してね。',
    },
    {
      question: 'この えの てんきは なあに？',
      image: 'weather/windy.svg',
      choices: ['かぜが つよい ひ', 'はれ', 'あめ', 'ゆき'],
      answerIndex: 0,
      explanation: 'かぜが ビュービュー ふくよ。ぼうしが とばないよう きをつけてね。',
    },
    {
      question: 'さくらが さいて、あったかく なる きせつは どれ？',
      choices: ['なつ', 'はる', 'あき', 'ふゆ'],
      answerIndex: 1,
      explanation: 'はるは はなが たくさん さく きせつだよ。',
    },
    {
      question: 'うみで およいだり、せみが なく きせつは どれ？',
      choices: ['はる', 'あき', 'なつ', 'ふゆ'],
      answerIndex: 2,
      explanation: 'なつは あつくて、うみや プールが たのしいね。',
    },
    {
      question: 'はっぱが あかく なって、さつまいもが おいしい きせつは どれ？',
      choices: ['はる', 'なつ', 'ふゆ', 'あき'],
      answerIndex: 3,
      explanation: 'あきは こうようが きれいで、たべものも おいしいよ。',
    },
    {
      question: 'ゆきが ふって、とても さむい きせつは どれ？',
      choices: ['ふゆ', 'はる', 'なつ', 'あき'],
      answerIndex: 0,
      explanation: 'ふゆは ゆきだるまが つくれるね。',
    },
    {
      question: 'あめの ひに もって いくものは どれ？',
      choices: ['すいとうだけ', 'かさ', 'ぼうしだけ', 'サングラス'],
      answerIndex: 1,
      explanation: 'かさを させば ぬれにくいよ。ながぐつも いいね。',
    },
    {
      question: 'あめの あと、そらに みえることが あるのは どれ？',
      choices: ['かみなりだけ', 'ゆき', 'にじ', 'つきだけ'],
      answerIndex: 2,
      explanation: 'にじは 7いろの アーチだよ。みえたら ラッキーだね。',
    },
    {
      question: 'かみなりが なったら どう する？',
      choices: [
        'きの したに かくれる',
        'うみで およぐ',
        'たかい ところに いく',
        'たてものの なかに はいる',
      ],
      answerIndex: 3,
      explanation: 'かみなりは あぶないから、たてものの なかに はいろうね。',
    },
    {
      question: 'はるに みられる むしは どれ？',
      choices: ['ちょうちょ', 'せみだけ', 'ほたるだけ', 'こおろぎだけ'],
      answerIndex: 0,
      explanation: 'はるは ちょうちょが はなの まわりを とぶよ。',
    },
    {
      question: 'なつの よるに ひかる むしは どれ？',
      choices: ['あり', 'ほたる', 'だんごむし', 'かたつむり'],
      answerIndex: 1,
      explanation: 'ほたるは なつの よるに ひかるよ。',
    },
    {
      question: 'あきに なく むしは どれ？',
      choices: ['せみ', 'ちょうちょ', 'すずむし', 'ほたる'],
      answerIndex: 2,
      explanation: 'すずむしは あきに すずしい こえで なくよ。',
    },
    {
      question: 'ふゆに そとへ いくとき 着るものは どれ？',
      choices: ['みずぎ', 'タンクトップ', 'サンダル', 'コートと てぶくろ'],
      answerIndex: 3,
      explanation: 'さむいから あたたかい ふくを きようね。',
    },
    {
      question: 'たいふうの ひは どう する？',
      choices: ['いえの なかで すごす', 'かわで あそぶ', 'テントを たてる', 'うみへ いく'],
      answerIndex: 0,
      explanation: 'かぜと あめが つよいから、いえの なかで あんぜんに すごそうね。',
    },
    {
      question: 'ゆきの ひに つくれるものは どれ？',
      choices: ['すなの しろ', 'ゆきだるま', 'プール', 'はなばたけ'],
      answerIndex: 1,
      explanation: 'ゆきを まるめて ゆきだるまが つくれるよ。',
    },
    {
      question: 'つゆの ころ よく ふるのは どれ？',
      choices: ['ゆき', 'ひょう', 'あめ', 'さくら'],
      answerIndex: 2,
      explanation: 'つゆは あめの おおい じきだよ。あじさいが きれいだね。',
    },
    {
      question: 'はれた ひに そらに みえるのは どれ？',
      choices: ['ゆきだけ', 'あめだけ', 'くもだけ', 'たいようと あおい そら'],
      answerIndex: 3,
      explanation: 'はれの ひは あおい そらと たいようが みえるよ。',
    },
  ],
};
