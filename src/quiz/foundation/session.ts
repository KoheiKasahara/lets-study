import { DEFAULT_BLOCK_SIZE, filterPool, resolveDifficulty } from './difficulty';
import {
  questionKeyOf,
  type DifficultyLevel,
  type QuizDefinition,
  type QuizQuestion,
  type RandomFn,
} from './types';

/** 配列をシャッフルした新しい配列を返す（元の配列は変更しない） */
export function shuffle<T>(items: readonly T[], random: RandomFn = Math.random): T[] {
  const result = [...items];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

/** 出題用に整形した問題（選択肢の絞り込み・シャッフル済み） */
export interface PreparedQuestion {
  /** 重複判定キー（元の問題と対応づく） */
  key: string;
  /** 問題文 */
  text: string;
  /** 問題に添える表示物（任意） */
  visual?: string;
  /** 表示する選択肢（難易度で絞り込み済み） */
  choices: string[];
  /** 絞り込み後の正解インデックス */
  answerIndex: number;
  /** 元の問題の付加情報（任意） */
  meta?: Readonly<Record<string, unknown>>;
  /** 元の問題 */
  source: QuizQuestion;
}

/** 1ブロック分の結果 */
export interface BlockResult {
  /** 何セット目か（1始まり） */
  blockNumber: number;
  /** そのブロックの問題数 */
  total: number;
  /** そのブロックの正解数 */
  correct: number;
}

/**
 * クイズセッションの状態（イミュータブル）。
 * 関数はいずれも状態を変更せず、新しい状態を返す純粋関数。
 *
 * セッションのルール：
 * - 問題はブロック（既定10問）単位で出題する
 * - 一度出題した問題は、そのセッション内では二度と出ない
 * - ブロックごとに結果を記録し、累計スコアを保持する
 */
export interface QuizSession {
  /** クイズ定義のID */
  definitionId: string;
  /** 適用中の難易度レベル（難易度なしクイズでは既定レベル） */
  difficulty: DifficultyLevel;
  /** 1ブロックあたりの問題数 */
  blockSize: number;
  /** 難易度で絞り込んだ後のプール総数 */
  poolSize: number;
  /** まだ出題していない問題（シャッフル済みのキュー） */
  remaining: readonly QuizQuestion[];
  /** 出題済み問題のキー一覧 */
  usedKeys: readonly string[];
  /** ブロックごとの結果 */
  blockResults: readonly BlockResult[];
  /** 直近に取り出したブロックの問題数（結果記録用） */
  currentBlockTotal: number;
  /** 累計の回答数 */
  totalAnswered: number;
  /** 累計の正解数 */
  totalCorrect: number;
}

export interface CreateSessionOptions {
  /** 使用する難易度レベルのID（難易度なしクイズでは無視される） */
  difficultyId?: string;
  /** 1ブロックあたりの問題数（定義の blockSize より優先） */
  blockSize?: number;
  /** 乱数（テスト用に差し替え可能） */
  random?: RandomFn;
}

/** セッションを作る。難易度でプールを絞り込み、順番をシャッフルする */
export function createSession(
  definition: QuizDefinition,
  options: CreateSessionOptions = {},
): QuizSession {
  const random = options.random ?? Math.random;
  const difficulty = resolveDifficulty(definition, options.difficultyId);
  const pool = filterPool(definition.questions, difficulty);
  return {
    definitionId: definition.id,
    difficulty,
    blockSize: options.blockSize ?? definition.blockSize ?? DEFAULT_BLOCK_SIZE,
    poolSize: pool.length,
    remaining: shuffle(pool, random),
    usedKeys: [],
    blockResults: [],
    currentBlockTotal: 0,
    totalAnswered: 0,
    totalCorrect: 0,
  };
}

/**
 * 次のブロックを取り出す。
 * 取り出した問題は usedKeys に記録され、セッション内では再出題されない。
 * 残り問題がなければ null を返す。
 */
export function nextBlock(
  session: QuizSession,
  random: RandomFn = Math.random,
): { session: QuizSession; block: PreparedQuestion[] } | null {
  if (session.remaining.length === 0) return null;
  const taken = session.remaining.slice(0, session.blockSize);
  const rest = session.remaining.slice(taken.length);
  const pool = [...taken, ...rest];
  const block = taken.map((q) => prepareQuestion(q, session.difficulty, pool, random));
  return {
    session: {
      ...session,
      remaining: rest,
      usedKeys: [...session.usedKeys, ...taken.map(questionKeyOf)],
      currentBlockTotal: taken.length,
    },
    block,
  };
}

/**
 * 直近ブロックの正解数を記録し、累計スコアを更新する。
 * 記録するブロックがない（currentBlockTotal が 0）場合はそのまま返す。
 */
export function recordBlockResult(session: QuizSession, correctCount: number): QuizSession {
  if (session.currentBlockTotal <= 0) return session;
  const total = session.currentBlockTotal;
  const correct = Math.min(Math.max(0, correctCount), total);
  const result: BlockResult = {
    blockNumber: session.blockResults.length + 1,
    total,
    correct,
  };
  return {
    ...session,
    blockResults: [...session.blockResults, result],
    totalAnswered: session.totalAnswered + total,
    totalCorrect: session.totalCorrect + correct,
    currentBlockTotal: 0,
  };
}

/** まだ続けられる（未出題の問題が残っている）かどうか */
export function canContinue(session: QuizSession): boolean {
  return session.remaining.length > 0;
}

/** 残り問題数 */
export function remainingCount(session: QuizSession): number {
  return session.remaining.length;
}

/** 出題済み問題数 */
export function usedCount(session: QuizSession): number {
  return session.usedKeys.length;
}

/** プールを使い切ったかどうか */
export function isExhausted(session: QuizSession): boolean {
  return session.remaining.length === 0;
}

/** その選択肢が正解かどうか */
export function isCorrect(question: PreparedQuestion, choiceIndex: number): boolean {
  return choiceIndex === question.answerIndex;
}

/** ブロック内の回答一覧から正解数を数える（未回答は不正解扱い） */
export function countBlockCorrect(
  block: readonly PreparedQuestion[],
  answers: readonly (number | null)[],
): number {
  return block.reduce(
    (sum, q, i) => sum + (answers[i] != null && isCorrect(q, answers[i]!) ? 1 : 0),
    0,
  );
}

/**
 * 1問を出題用に整形する。
 * 難易度の choiceCount が問題本来の選択肢数より小さい場合は、
 * 正解＋誤答（pickDistractors があればそれ、なければ問題自身の誤答から抽選）に絞る。
 */
export function prepareQuestion(
  question: QuizQuestion,
  difficulty: DifficultyLevel,
  pool: readonly QuizQuestion[],
  random: RandomFn = Math.random,
): PreparedQuestion {
  const answer = question.choices[question.answerIndex];
  const target = Math.min(
    difficulty.choiceCount ?? question.choices.length,
    question.choices.length,
  );

  let choices: string[];
  if (target >= question.choices.length) {
    choices = shuffle(question.choices, random);
  } else {
    const needed = Math.max(0, target - 1);
    let distractors: string[] = [];
    if (difficulty.pickDistractors) {
      const picked = difficulty.pickDistractors({ question, pool, count: needed, random });
      // 正解と重複するもの・問題に存在しない選択肢は除外し、不足分は既定の抽選で補う
      distractors = [...new Set(picked)].filter((c) => c !== answer);
    }
    if (distractors.length < needed) {
      const others = question.choices.filter((_, i) => i !== question.answerIndex);
      const extra = shuffle(
        others.filter((c) => !distractors.includes(c)),
        random,
      );
      distractors = [...distractors, ...extra].slice(0, needed);
    } else {
      distractors = distractors.slice(0, needed);
    }
    choices = shuffle([answer, ...distractors], random);
  }

  return {
    key: questionKeyOf(question),
    text: question.text,
    visual: question.visual,
    choices,
    answerIndex: choices.indexOf(answer),
    meta: question.meta,
    source: question,
  };
}
