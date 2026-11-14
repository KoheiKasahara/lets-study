import type { CategoryQuiz, QuizDifficulty } from '../types';
import { shuffle, type DifficultyLevel, type QuizDefinition } from './foundation';

/**
 * レッツスタディのデータ（CategoryQuiz）をクイズ基盤（QuizDefinition）に変換するアダプタ。
 * 画面やセッション管理は基盤のAPIだけで行い、アプリ固有の語彙はここに閉じ込める。
 */

function toDifficultyLevel(difficulty: QuizDifficulty): DifficultyLevel {
  return {
    id: difficulty.id,
    label: difficulty.label,
    description: difficulty.description,
    choiceCount: difficulty.choiceCount,
    filter:
      difficulty.poolTag != null
        ? (q) => {
            const tags = q.meta?.tags;
            return Array.isArray(tags) && tags.includes(difficulty.poolTag!);
          }
        : undefined,
    pickDistractors: difficulty.sameGroupDistractors
      ? ({ question, pool, count, random }) => {
          const group = question.meta?.group;
          if (typeof group !== 'string') return [];
          const peers = pool.filter((p) => p !== question && p.meta?.group === group);
          return shuffle(peers, random)
            .slice(0, count)
            .map((p) => p.choices[p.answerIndex]);
        }
      : undefined,
  };
}

export function toQuizDefinition(quiz: CategoryQuiz): QuizDefinition {
  return {
    id: quiz.category.id,
    title: quiz.category.name,
    questions: quiz.questions.map((q, i) => ({
      id: q.id ?? `${quiz.category.id}-${i + 1}`,
      text: q.question,
      visual: q.visual,
      choices: q.choices,
      answerIndex: q.answerIndex,
      meta: {
        explanation: q.explanation,
        tags: q.tags ?? [],
        group: q.group,
        flagCode: q.flagCode,
      },
    })),
    difficulties: quiz.difficulties?.map(toDifficultyLevel),
  };
}
