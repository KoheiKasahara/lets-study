import { describe, expect, it } from 'vitest';
import {
  FALLBACK_DIFFICULTY,
  canContinue,
  countBlockCorrect,
  createSession,
  hasDifficulties,
  isExhausted,
  nextBlock,
  recordBlockResult,
  resolveDifficulty,
  type QuizDefinition,
  type QuizQuestion,
} from './index';

/** 決定的な疑似乱数（テスト用） */
function seededRandom(seed: number) {
  let s = seed;
  return () => {
    s = (s * 1103515245 + 12345) % 2147483648;
    return s / 2147483648;
  };
}

function makeQuestions(count: number): QuizQuestion[] {
  return Array.from({ length: count }, (_, i) => ({
    id: `q${i + 1}`,
    text: `もんだい${i + 1}`,
    choices: ['a', 'b', 'c', 'd'],
    answerIndex: i % 4,
  }));
}

const plainDefinition: QuizDefinition = {
  id: 'plain',
  title: '難易度なしクイズ',
  questions: makeQuestions(25),
};

const difficultyDefinition: QuizDefinition = {
  id: 'with-difficulty',
  title: '難易度ありクイズ',
  questions: makeQuestions(25),
  difficulties: [
    { id: 'easy', label: 'やさしい', choiceCount: 2 },
    { id: 'normal', label: 'ふつう', choiceCount: 3 },
    { id: 'hard', label: 'むずかしい', choiceCount: 4 },
  ],
};

describe('ブロック分割と重複なし', () => {
  it('25問を既定の10問ずつに分け、端数ブロックも出す', () => {
    let session = createSession(plainDefinition, { random: seededRandom(1) });
    const sizes: number[] = [];
    const seenKeys = new Set<string>();

    for (let i = 0; i < 3; i++) {
      const next = nextBlock(session, seededRandom(10 + i));
      expect(next).not.toBeNull();
      session = next!.session;
      sizes.push(next!.block.length);
      for (const q of next!.block) {
        expect(seenKeys.has(q.key), `重複出題: ${q.key}`).toBe(false);
        seenKeys.add(q.key);
      }
    }

    expect(sizes).toEqual([10, 10, 5]);
    expect(seenKeys.size).toBe(25);
    expect(isExhausted(session)).toBe(true);
    expect(canContinue(session)).toBe(false);
    expect(nextBlock(session)).toBeNull();
  });

  it('プールがブロックサイズ未満なら1ブロックで出し切る', () => {
    const def: QuizDefinition = { id: 'small', title: '小さいクイズ', questions: makeQuestions(6) };
    const session0 = createSession(def, { random: seededRandom(2) });
    const next = nextBlock(session0, seededRandom(3));
    expect(next!.block).toHaveLength(6);
    expect(canContinue(next!.session)).toBe(false);
  });

  it('ブロックサイズは定義とオプションで変更できる', () => {
    const def: QuizDefinition = {
      id: 'custom',
      title: 'カスタム',
      questions: makeQuestions(12),
      blockSize: 4,
    };
    const session = createSession(def, { random: seededRandom(4) });
    expect(session.blockSize).toBe(4);
    expect(nextBlock(session, seededRandom(5))!.block).toHaveLength(4);

    const session2 = createSession(def, { blockSize: 3, random: seededRandom(4) });
    expect(session2.blockSize).toBe(3);
  });
});

describe('累計スコア', () => {
  it('ブロックごとの結果が累計に積み上がる', () => {
    let session = createSession(plainDefinition, { random: seededRandom(6) });

    const first = nextBlock(session, seededRandom(7))!;
    session = recordBlockResult(first.session, 8);
    expect(session.blockResults).toEqual([{ blockNumber: 1, total: 10, correct: 8 }]);
    expect(session.totalAnswered).toBe(10);
    expect(session.totalCorrect).toBe(8);

    const second = nextBlock(session, seededRandom(8))!;
    session = recordBlockResult(second.session, 5);
    expect(session.blockResults).toHaveLength(2);
    expect(session.blockResults[1]).toEqual({ blockNumber: 2, total: 10, correct: 5 });
    expect(session.totalAnswered).toBe(20);
    expect(session.totalCorrect).toBe(13);
  });

  it('ブロックを取り出さずに記録しても何も起きない', () => {
    const session = createSession(plainDefinition, { random: seededRandom(9) });
    const recorded = recordBlockResult(session, 10);
    expect(recorded.blockResults).toHaveLength(0);
    expect(recorded.totalCorrect).toBe(0);
  });

  it('countBlockCorrect が回答から正解数を数える', () => {
    const session = createSession(plainDefinition, { random: seededRandom(11) });
    const { block } = nextBlock(session, seededRandom(12))!;
    const allCorrect = block.map((q) => q.answerIndex);
    expect(countBlockCorrect(block, allCorrect)).toBe(block.length);
    const allWrong = block.map((q) => (q.answerIndex + 1) % q.choices.length);
    expect(countBlockCorrect(block, allWrong)).toBe(0);
  });
});

describe('難易度（任意）', () => {
  it('難易度を宣言しないクイズは既定レベルで動き、選択肢は絞られない', () => {
    expect(hasDifficulties(plainDefinition)).toBe(false);
    expect(resolveDifficulty(plainDefinition)).toBe(FALLBACK_DIFFICULTY);

    const session = createSession(plainDefinition, { random: seededRandom(13) });
    expect(session.difficulty).toBe(FALLBACK_DIFFICULTY);
    const { block } = nextBlock(session, seededRandom(14))!;
    for (const q of block) {
      expect(q.choices).toHaveLength(4);
      expect(q.choices[q.answerIndex]).toBe(q.source.choices[q.source.answerIndex]);
    }
  });

  it('難易度を宣言したクイズはIDでレベルを選べる', () => {
    expect(hasDifficulties(difficultyDefinition)).toBe(true);
    expect(resolveDifficulty(difficultyDefinition).id).toBe('easy');
    expect(resolveDifficulty(difficultyDefinition, 'hard').id).toBe('hard');
    // 存在しないIDは先頭レベルにフォールバック
    expect(resolveDifficulty(difficultyDefinition, 'no-such').id).toBe('easy');
  });

  it('choiceCount で選択肢が絞られ、正解が必ず含まれる', () => {
    const session = createSession(difficultyDefinition, {
      difficultyId: 'easy',
      random: seededRandom(15),
    });
    const { block } = nextBlock(session, seededRandom(16))!;
    for (const q of block) {
      expect(q.choices).toHaveLength(2);
      expect(q.choices[q.answerIndex]).toBe(q.source.choices[q.source.answerIndex]);
    }
  });

  it('filter で問題プールが絞り込まれる', () => {
    const questions: QuizQuestion[] = makeQuestions(10).map((q, i) => ({
      ...q,
      meta: { tags: i < 4 ? ['famous'] : [] },
    }));
    const def: QuizDefinition = {
      id: 'filtered',
      title: '絞り込み',
      questions,
      difficulties: [
        {
          id: 'easy',
          label: 'やさしい',
          filter: (q) => {
            const tags = q.meta?.tags;
            return Array.isArray(tags) && tags.includes('famous');
          },
        },
        { id: 'all', label: 'ぜんぶ' },
      ],
    };

    const easySession = createSession(def, { difficultyId: 'easy', random: seededRandom(17) });
    expect(easySession.poolSize).toBe(4);
    const { block } = nextBlock(easySession, seededRandom(18))!;
    expect(block).toHaveLength(4);
    for (const q of block) {
      expect((q.source.meta?.tags as string[])).toContain('famous');
    }

    const allSession = createSession(def, { difficultyId: 'all', random: seededRandom(17) });
    expect(allSession.poolSize).toBe(10);
  });

  it('pickDistractors が宣言されれば誤答の選び方を差し替えられる', () => {
    const def: QuizDefinition = {
      id: 'custom-distractors',
      title: 'カスタム誤答',
      questions: [
        { id: 'x1', text: 't1', choices: ['せいかい', 'w1', 'w2', 'w3'], answerIndex: 0 },
        { id: 'x2', text: 't2', choices: ['せいかい2', 'w1', 'w2', 'w3'], answerIndex: 0 },
      ],
      difficulties: [
        {
          id: 'custom',
          label: 'カスタム',
          choiceCount: 2,
          pickDistractors: ({ question }) => [`${question.text}の誤答`],
        },
      ],
    };
    const session = createSession(def, { difficultyId: 'custom', random: seededRandom(19) });
    const { block } = nextBlock(session, seededRandom(20))!;
    for (const q of block) {
      expect(q.choices).toHaveLength(2);
      expect(q.choices).toContain(`${q.source.text}の誤答`);
      expect(q.choices[q.answerIndex]).toBe(q.source.choices[0]);
    }
  });
});
