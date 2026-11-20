import type { CategoryQuiz } from '../../types';
import { defaultDifficulties } from './difficulties';

/** スポーツクイズ：運動や外遊びのテキスト問題（16問） */
export const sportsQuiz: CategoryQuiz = {
  category: {
    id: 'sports',
    name: 'スポーツ',
    icon: '⚽',
    color: '#e0f2f1',
    description: 'うんどうや そとあそびの クイズ',
  },
  difficulties: defaultDifficulties,
  questions: [
    {
      question: 'ボールを けって ゴールに いれる スポーツは どれ？',
      choices: ['サッカー', 'やきゅう', 'すいえい', 'スキー'],
      answerIndex: 0,
      explanation: 'サッカーは あしで ボールを けるよ。てで もつのは キーパーだけだよ。',
    },
    {
      question: 'バットで ボールを うつ スポーツは どれ？',
      choices: ['サッカー', 'やきゅう', 'テニス', 'バスケットボール'],
      answerIndex: 1,
      explanation: 'やきゅうは バットで うって、るいを まわるよ。',
    },
    {
      question: 'みずの なかを すすむ スポーツは どれ？',
      choices: ['スキー', 'スケート', 'すいえい', 'なわとび'],
      answerIndex: 2,
      explanation: 'すいえいは プールや うみで およぐよ。',
    },
    {
      question: 'ゆきの さかを すべる スポーツは どれ？',
      choices: ['サッカー', 'すいえい', 'なわとび', 'スキー'],
      answerIndex: 3,
      explanation: 'スキーは ゆきの うえを シューッと すべるよ。',
    },
    {
      question: 'なわを まわして とぶ あそびは どれ？',
      choices: ['なわとび', 'かけっこ', 'おにごっこ', 'かくれんぼ'],
      answerIndex: 0,
      explanation: 'なわとびは タイミングよく ジャンプするよ。',
    },
    {
      question: 'リングに ボールを いれる スポーツは どれ？',
      choices: ['やきゅう', 'バスケットボール', 'サッカー', 'テニス'],
      answerIndex: 1,
      explanation: 'バスケットボールは たかい リングを ねらうよ。',
    },
    {
      question: 'ラケットで ボールを うつ スポーツは どれ？',
      choices: ['すいえい', 'スキー', 'テニス', 'なわとび'],
      answerIndex: 2,
      explanation: 'テニスは ネットの うえを ボールを うちあうよ。',
    },
    {
      question: 'こおりの うえを すべる スポーツは どれ？',
      choices: ['サッカー', 'やきゅう', 'すいえい', 'スケート'],
      answerIndex: 3,
      explanation: 'スケートは こおりの うえを すべるよ。てぶくろを しようね。',
    },
    {
      question: 'うんどうかいで はやさを きそうのは どれ？',
      choices: ['かけっこ', 'おえかき', 'うた', 'ほんよみ'],
      answerIndex: 0,
      explanation: '「よーい ドン」で スタートするよ。',
    },
    {
      question: 'てつぼうで できる わざは どれ？',
      choices: ['すいえい', 'さかあがり', 'スキー', 'なわとび'],
      answerIndex: 1,
      explanation: 'さかあがりが できると うれしいね。れんしゅうしようね。',
    },
    {
      question: 'おにが おいかける あそびは どれ？',
      choices: ['かくれんぼ', 'おえかき', 'おにごっこ', 'つみき'],
      answerIndex: 2,
      explanation: 'おにごっこは タッチされたら つぎの おにだよ。',
    },
    {
      question: 'かくれて みつける あそびは どれ？',
      choices: ['かけっこ', 'なわとび', 'サッカー', 'かくれんぼ'],
      answerIndex: 3,
      explanation: '「もういいかい？」と きいて あそぶよ。',
    },
    {
      question: 'うんどうの まえに すると いいのは どれ？',
      choices: ['じゅんび うんどう', 'おやつだけ たべる', 'ねる', 'テレビを みる'],
      answerIndex: 0,
      explanation: 'からだを あたためると、けがを しにくいよ。',
    },
    {
      question: 'あつい ひの うんどうで だいじなのは どれ？',
      choices: [
        'みずを のまない',
        'みずを こまめに のむ',
        'ぼうしを かぶらない',
        'はやく ねるだけ',
      ],
      answerIndex: 1,
      explanation: 'すいぶんを とって、つかれたら やすもうね。',
    },
    {
      question: 'ボールを なげる とき ねらうのは どれ？',
      choices: ['そらだけ', 'ともだちの かお', 'まと', 'じめんだけ'],
      answerIndex: 2,
      explanation: 'ひとが いない ほうに なげようね。あんぜんが だいいちだよ。',
    },
    {
      question: 'じてんしゃに のるとき かぶるものは どれ？',
      choices: ['ぼうしだけ', 'サングラス', 'マフラー', 'ヘルメット'],
      answerIndex: 3,
      explanation: 'ヘルメットで あたまを まもろうね。',
    },
    {
      question: 'おすもうさんは どこで たたかう？',
      choices: ['どひょう', 'リング', 'コート', 'プール'],
      answerIndex: 0,
      explanation: 'どひょうは まるい わの なかだよ。',
    },
    {
      question: 'じゅうどうで なげる わざを つかう スポーツは どれ？',
      choices: ['じゅうどう', 'けんどう', 'からて', 'すもう'],
      answerIndex: 0,
      explanation: 'じゅうどうは あいてを なげたり おさえたり するよ。',
    },
    {
      question: 'しな（たけの けん）で たたかう スポーツは どれ？',
      choices: ['けんどう', 'じゅうどう', 'からて', 'ボクシング'],
      answerIndex: 0,
      explanation: 'けんどうは めんを つけて おこなうよ。',
    },
    {
      question: 'からてで つかうのは どれ？',
      choices: ['てや あしの わざ', 'ボール', 'ラケット', 'バット'],
      answerIndex: 0,
      explanation: 'からては かた（かたち）の れんしゅうも するよ。',
    },
    {
      question: 'バレーボールは ネットの うえに なにを する？',
      choices: ['ボールを うちかえす', 'ボールを ける', 'ボールを なげいれる', 'ボールを もつ'],
      answerIndex: 0,
      explanation: 'バレーボールは 3かいまで タッチできるよ。',
    },
    {
      question: 'ドッジボールで あたると どう なる？',
      choices: ['そとに でる', 'ゴールに なる', 'つづけられる', 'ポイントが はいる'],
      answerIndex: 0,
      explanation: 'そとから なげることも できるよ。',
    },
    {
      question: 'ながい きょりを はしる レースは どれ？',
      choices: ['マラソン', 'かけっこ', 'リレー', 'たかとび'],
      answerIndex: 0,
      explanation: 'マラソンは 42キロも はしるよ。すごいね。',
    },
    {
      question: 'リレーで つぎの ひとに わたすのは どれ？',
      choices: ['バトン', 'ボール', 'なわ', 'ふだ'],
      answerIndex: 0,
      explanation: 'バトンを おとさないように わたそうね。',
    },
  ],
};
