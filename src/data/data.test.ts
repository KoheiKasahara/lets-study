import { describe, expect, it } from 'vitest';
import { allQuizzes, getQuizById } from './index';
import { REGIONS, countries, famousCountries } from './countries';
import { CHOICES_PER_QUESTION } from '../types';
import { toQuizDefinition } from '../quiz/adapter';
import { createSession, nextBlock } from '../quiz/foundation';

/** public/flags/ にあるSVGの国コード一覧（ファイルは読み込まず、パスだけ集める） */
const flagFileCodes = Object.keys(import.meta.glob('/public/flags/*.svg')).map((path) =>
  path.replace(/^.*\/([a-z]{2})\.svg$/, '$1'),
);

/** public/images/ にある画像ファイルのパス一覧（ファイルは読み込まず、パスだけ集める） */
const imageFilePaths = new Set([
  ...Object.keys(import.meta.glob('/public/images/**/*.jpg')),
  ...Object.keys(import.meta.glob('/public/images/**/*.svg')),
]);

describe('クイズデータの整合性', () => {
  it('カテゴリIDが重複していない', () => {
    const ids = allQuizzes.map((q) => q.category.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('各カテゴリは1セット（10問）以上ある', () => {
    for (const quiz of allQuizzes) {
      expect(quiz.questions.length, quiz.category.id).toBeGreaterThanOrEqual(10);
    }
  });

  it('各問題は選択肢が4つで重複なし、正解インデックスが範囲内', () => {
    for (const quiz of allQuizzes) {
      for (const q of quiz.questions) {
        expect(q.choices, `${quiz.category.id}: ${q.question}`).toHaveLength(CHOICES_PER_QUESTION);
        expect(q.answerIndex).toBeGreaterThanOrEqual(0);
        expect(q.answerIndex).toBeLessThan(CHOICES_PER_QUESTION);
        expect(new Set(q.choices).size, `${quiz.category.id}: ${q.question}`).toBe(
          CHOICES_PER_QUESTION,
        );
      }
    }
  });

  it('問題文がカテゴリ内で重複していない（国旗は国コードで一意）', () => {
    for (const quiz of allQuizzes) {
      if (quiz.category.id === 'flags') {
        const codes = quiz.questions.map((q) => q.flagCode);
        expect(new Set(codes).size).toBe(codes.length);
      } else {
        // 同じ問題文でも visual や image が違えば別問題として扱う
        const keys = quiz.questions.map((q) => `${q.question}|${q.visual ?? ''}|${q.image ?? ''}`);
        expect(new Set(keys).size).toBe(keys.length);
      }
    }
  });

  it('難易度を宣言したカテゴリはIDが一意で、選択肢数とプールタグが妥当', () => {
    for (const quiz of allQuizzes) {
      if (!quiz.difficulties) continue;
      const ids = quiz.difficulties.map((d) => d.id);
      expect(new Set(ids).size, quiz.category.id).toBe(ids.length);
      for (const d of quiz.difficulties) {
        if (d.choiceCount != null) {
          expect(d.choiceCount, `${quiz.category.id}/${d.id}`).toBeGreaterThanOrEqual(2);
          expect(d.choiceCount, `${quiz.category.id}/${d.id}`).toBeLessThanOrEqual(
            CHOICES_PER_QUESTION,
          );
        }
        if (d.poolTag != null) {
          const matched = quiz.questions.filter((q) => q.tags?.includes(d.poolTag!));
          expect(
            matched.length,
            `${quiz.category.id}/${d.id} poolTag=${d.poolTag}`,
          ).toBeGreaterThanOrEqual(1);
        }
      }
    }
  });

  it('image を指定した問題は public/images/ に対応ファイルが実在する', () => {
    for (const quiz of allQuizzes) {
      for (const q of quiz.questions) {
        if (q.image == null) continue;
        expect(
          imageFilePaths.has(`/public/images/${q.image}`),
          `${quiz.category.id}: ${q.image}`,
        ).toBe(true);
      }
    }
  });

  it('getQuizById で取得できる', () => {
    for (const quiz of allQuizzes) {
      expect(getQuizById(quiz.category.id)).toBe(quiz);
    }
    expect(getQuizById('no-such-id')).toBeUndefined();
  });
});

describe('国データと国旗SVG', () => {
  it('全195か国ある（国連加盟193＋バチカン・パレスチナ）', () => {
    expect(countries).toHaveLength(195);
    expect(getCountryCodes()).toContain('va');
    expect(getCountryCodes()).toContain('ps');
  });

  it('国コードが重複していない', () => {
    const codes = getCountryCodes();
    expect(new Set(codes).size).toBe(codes.length);
  });

  it('全ての国に名前・よみ・地域がある', () => {
    for (const country of countries) {
      expect(country.name.length, country.code).toBeGreaterThan(0);
      expect(country.yomi.length, country.code).toBeGreaterThan(0);
      expect(REGIONS, country.code).toContain(country.region);
    }
  });

  it('有名な国（やさしいプール）は24か国', () => {
    expect(famousCountries).toHaveLength(24);
  });

  it('全ての国コードに対応する国旗SVGファイルがあり、余分なファイルもない', () => {
    expect([...flagFileCodes].sort()).toEqual(getCountryCodes().sort());
  });

  it('国旗クイズの問題は全195か国ぶん生成されている', () => {
    const flags = getQuizById('flags')!;
    expect(flags.questions).toHaveLength(195);
    for (const q of flags.questions) {
      expect(q.flagCode, q.id).toBeTruthy();
      expect(q.group, q.id).toBeTruthy();
    }
  });
});

describe('国旗クイズの難易度', () => {
  const definition = toQuizDefinition(getQuizById('flags')!);
  const yomiToRegion = new Map(countries.map((c) => [c.yomi, c.region]));
  const famousYomi = new Set(famousCountries.map((c) => c.yomi));

  /** その難易度で全問を出題し終えるまでのブロックを集める */
  function allPrepared(difficultyId: string) {
    let session = createSession(definition, { difficultyId });
    const prepared = [];
    for (let next = nextBlock(session); next; next = nextBlock(session)) {
      prepared.push(...next.block);
      session = next.session;
    }
    return prepared;
  }

  it('やさしい：有名な国だけが出て、選択肢も有名な国の2択', () => {
    const prepared = allPrepared('easy');
    expect(prepared).toHaveLength(famousCountries.length);
    for (const q of prepared) {
      expect(q.choices).toHaveLength(2);
      for (const choice of q.choices) expect(famousYomi.has(choice), choice).toBe(true);
    }
  });

  it('ふつう：全ての国が出て3択', () => {
    const prepared = allPrepared('normal');
    expect(prepared).toHaveLength(countries.length);
    for (const q of prepared) expect(new Set(q.choices).size).toBe(3);
  });

  it('むずかしい：4択すべてが正解と同じ地域の国', () => {
    for (const q of allPrepared('hard')) {
      expect(new Set(q.choices).size).toBe(4);
      const region = yomiToRegion.get(q.choices[q.answerIndex]);
      for (const choice of q.choices) expect(yomiToRegion.get(choice), choice).toBe(region);
    }
  });
});

function getCountryCodes(): string[] {
  return countries.map((c) => c.code);
}
