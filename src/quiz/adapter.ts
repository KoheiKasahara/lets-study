import type { CategoryQuiz, QuizDifficulty } from '../types';
import {
  shuffle,
  type DifficultyLevel,
  type PreparedQuestion,
  type QuizDefinition,
} from './foundation';

/**
 * レッツスタディのデータ（CategoryQuiz）をクイズ基盤（QuizDefinition）に変換するアダプタ。
 * 画面やセッション管理は基盤のAPIだけで行い、アプリ固有の語彙はここに閉じ込める。
 */

/** 基盤の meta に載せる、アプリ固有の付加情報 */
export interface AppQuestionMeta {
  explanation?: string;
  tags: readonly string[];
  group?: string;
  flagCode?: string;
}

/** 出題用の問題からアプリ固有の付加情報を取り出す（meta を書くのはこのアダプタだけ） */
export function metaOf(question: { meta?: PreparedQuestion['meta'] }): AppQuestionMeta {
  return (question.meta ?? { tags: [] }) as unknown as AppQuestionMeta;
}

function toPickDistractors(
  mode: QuizDifficulty['distractors'],
): DifficultyLevel['pickDistractors'] {
  if (mode == null || mode === 'own') return undefined;
  return ({ question, pool, count, random }) => {
    const group = metaOf(question).group;
    const peers = pool.filter(
      (p) => p !== question && (mode === 'pool' || (group != null && metaOf(p).group === group)),
    );
    return shuffle(peers, random)
      .slice(0, count)
      .map((p) => p.choices[p.answerIndex]);
  };
}

function toDifficultyLevel(difficulty: QuizDifficulty): DifficultyLevel {
  const { poolTag } = difficulty;
  return {
    id: difficulty.id,
    label: difficulty.label,
    description: difficulty.description,
    choiceCount: difficulty.choiceCount,
    filter: poolTag != null ? (q) => metaOf(q).tags.includes(poolTag) : undefined,
    pickDistractors: toPickDistractors(difficulty.distractors),
  };
}

export function toQuizDefinition(quiz: CategoryQuiz): QuizDefinition {
  return {
    id: quiz.category.id,
    title: quiz.category.name,
    questions: quiz.questions.map((q, i) => {
      const meta: AppQuestionMeta = {
        explanation: q.explanation,
        tags: q.tags ?? [],
        group: q.group,
        flagCode: q.flagCode,
      };
      return {
        id: q.id ?? `${quiz.category.id}-${i + 1}`,
        text: q.question,
        visual: q.visual,
        choices: q.choices,
        answerIndex: q.answerIndex,
        meta: { ...meta },
      };
    }),
    difficulties: quiz.difficulties?.map(toDifficultyLevel),
  };
}
