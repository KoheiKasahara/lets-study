import type { Question } from '../types';

/** 1回のクイズで出題する問題数 */
export const QUESTIONS_PER_ROUND = 5;

/** 配列をシャッフルした新しい配列を返す（元の配列は変更しない） */
export function shuffle<T>(items: readonly T[], random: () => number = Math.random): T[] {
  const result = [...items];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

/** 出題用に整形した問題（選択肢シャッフル済み） */
export interface PreparedQuestion {
  question: string;
  visual?: string;
  choices: string[];
  answerIndex: number;
  explanation?: string;
}

/**
 * 問題集から1回分のクイズを用意する。
 * - 問題の順番をシャッフルして先頭から count 問を取り出す
 * - 各問題の選択肢もシャッフルし、正解インデックスを付け替える
 */
export function prepareQuestions(
  questions: readonly Question[],
  count: number = QUESTIONS_PER_ROUND,
  random: () => number = Math.random,
): PreparedQuestion[] {
  const picked = shuffle(questions, random).slice(0, Math.max(0, count));
  return picked.map((q) => {
    const order = shuffle(
      q.choices.map((_, i) => i),
      random,
    );
    return {
      question: q.question,
      visual: q.visual,
      choices: order.map((i) => q.choices[i]),
      answerIndex: order.indexOf(q.answerIndex),
      explanation: q.explanation,
    };
  });
}

/** その選択肢が正解かどうか */
export function isCorrect(question: PreparedQuestion, choiceIndex: number): boolean {
  return choiceIndex === question.answerIndex;
}

/** 回答一覧（選んだインデックスの配列）から正解数を数える */
export function countCorrect(
  questions: readonly PreparedQuestion[],
  answers: readonly (number | null)[],
): number {
  return questions.reduce((sum, q, i) => sum + (answers[i] != null && isCorrect(q, answers[i]!) ? 1 : 0), 0);
}

/** 結果画面のほめ言葉を返す */
export function praiseFor(score: number, total: number): string {
  if (total <= 0) return '';
  if (score === total) return 'かんぺき！ ぜんぶ せいかい、すごいね！';
  if (score >= Math.ceil(total * 0.6)) return 'よくできました！ とっても じょうずだね！';
  if (score >= 1) return 'がんばったね！ もういちど やってみよう！';
  return 'だいじょうぶ！ やれば できるよ、もういちど！';
}
