import { describe, expect, it } from 'vitest';
import type { Question } from '../types';
import { countCorrect, isCorrect, praiseFor, prepareQuestions, shuffle } from './engine';

/** 決定的な乱数（テスト用）：0.99, 0.5, 0.0, ... のような値を順に返す代わりに単純な疑似乱数を使う */
function seededRandom(seed: number) {
  let s = seed;
  return () => {
    s = (s * 1103515245 + 12345) % 2147483648;
    return s / 2147483648;
  };
}

const sampleQuestions: Question[] = [
  { question: 'q1', choices: ['a', 'b', 'c', 'd'], answerIndex: 0 },
  { question: 'q2', choices: ['a', 'b', 'c', 'd'], answerIndex: 1 },
  { question: 'q3', choices: ['a', 'b', 'c', 'd'], answerIndex: 2 },
  { question: 'q4', choices: ['a', 'b', 'c', 'd'], answerIndex: 3 },
  { question: 'q5', choices: ['a', 'b', 'c', 'd'], answerIndex: 0 },
  { question: 'q6', choices: ['a', 'b', 'c', 'd'], answerIndex: 1 },
];

describe('shuffle', () => {
  it('元の配列を変更しない', () => {
    const original = [1, 2, 3, 4, 5];
    shuffle(original, seededRandom(42));
    expect(original).toEqual([1, 2, 3, 4, 5]);
  });

  it('要素の集合は変わらない', () => {
    const shuffled = shuffle([1, 2, 3, 4, 5], seededRandom(7));
    expect([...shuffled].sort()).toEqual([1, 2, 3, 4, 5]);
  });
});

describe('prepareQuestions', () => {
  it('指定した問題数だけ取り出す', () => {
    const prepared = prepareQuestions(sampleQuestions, 5, seededRandom(1));
    expect(prepared).toHaveLength(5);
  });

  it('問題数より多くは取り出さない', () => {
    const prepared = prepareQuestions(sampleQuestions.slice(0, 3), 5, seededRandom(1));
    expect(prepared).toHaveLength(3);
  });

  it('選択肢をシャッフルしても正解の文字列は一致する', () => {
    const prepared = prepareQuestions(sampleQuestions, 6, seededRandom(3));
    for (const p of prepared) {
      const original = sampleQuestions.find((q) => q.question === p.question)!;
      expect(p.choices).toHaveLength(4);
      expect([...p.choices].sort()).toEqual([...original.choices].sort());
      expect(p.choices[p.answerIndex]).toBe(original.choices[original.answerIndex]);
    }
  });

  it('visual と explanation を引き継ぐ', () => {
    const questions: Question[] = [
      { question: 'qx', visual: '🇯🇵', choices: ['a', 'b', 'c', 'd'], answerIndex: 2, explanation: 'exp' },
    ];
    const [prepared] = prepareQuestions(questions, 1, seededRandom(5));
    expect(prepared.visual).toBe('🇯🇵');
    expect(prepared.explanation).toBe('exp');
  });
});

describe('isCorrect / countCorrect', () => {
  it('正解インデックスと一致すれば正解', () => {
    const q = { question: 'q', choices: ['a', 'b', 'c', 'd'], answerIndex: 2 };
    expect(isCorrect(q, 2)).toBe(true);
    expect(isCorrect(q, 0)).toBe(false);
  });

  it('正解数を数える（未回答は不正解扱い）', () => {
    const questions = [
      { question: 'q1', choices: ['a', 'b', 'c', 'd'], answerIndex: 0 },
      { question: 'q2', choices: ['a', 'b', 'c', 'd'], answerIndex: 1 },
      { question: 'q3', choices: ['a', 'b', 'c', 'd'], answerIndex: 2 },
    ];
    expect(countCorrect(questions, [0, 0, null])).toBe(1);
    expect(countCorrect(questions, [0, 1, 2])).toBe(3);
  });
});

describe('praiseFor', () => {
  it('全問正解なら かんぺき', () => {
    expect(praiseFor(5, 5)).toContain('かんぺき');
  });

  it('0点でも励ましの言葉を返す', () => {
    expect(praiseFor(0, 5).length).toBeGreaterThan(0);
  });
});
