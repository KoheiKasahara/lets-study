import { describe, expect, it } from 'vitest';
import { allQuizzes, getQuizById } from './index';
import { REGIONS, countries, famousCountries } from './countries';
import { flagUrlByCode } from './flagAssets';

describe('クイズデータの整合性', () => {
  it('カテゴリはスペース版と同じ6種', () => {
    expect(allQuizzes.map((q) => q.category.id)).toEqual([
      'flags',
      'animals',
      'foods',
      'colors',
      'numbers',
      'hiragana',
    ]);
  });

  it('カテゴリIDが重複していない', () => {
    const ids = allQuizzes.map((q) => q.category.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('国旗以外の各カテゴリは12問ある', () => {
    for (const quiz of allQuizzes) {
      if (quiz.category.id === 'flags') continue;
      expect(quiz.questions.length, quiz.category.id).toBe(12);
    }
  });

  it('各問題は選択肢が4つで重複なし、正解インデックスが範囲内', () => {
    for (const quiz of allQuizzes) {
      for (const q of quiz.questions) {
        expect(q.choices, `${quiz.category.id}: ${q.question}`).toHaveLength(4);
        expect(q.answerIndex).toBeGreaterThanOrEqual(0);
        expect(q.answerIndex).toBeLessThan(4);
        expect(new Set(q.choices).size, `${quiz.category.id}: ${q.question}`).toBe(4);
      }
    }
  });

  it('問題文がカテゴリ内で重複していない（国旗は国コードで一意）', () => {
    for (const quiz of allQuizzes) {
      if (quiz.category.id === 'flags') {
        const codes = quiz.questions.map((q) => q.flagCode);
        expect(new Set(codes).size).toBe(codes.length);
      } else {
        // 同じ問題文でも visual が違えば別問題として扱う
        const keys = quiz.questions.map((q) => `${q.question}|${q.visual ?? ''}`);
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
          expect(d.choiceCount, `${quiz.category.id}/${d.id}`).toBeLessThanOrEqual(4);
        }
        if (d.poolTag != null) {
          const matched = quiz.questions.filter((q) => q.tags?.includes(d.poolTag!));
          expect(matched.length, `${quiz.category.id}/${d.id} poolTag=${d.poolTag}`).toBeGreaterThanOrEqual(1);
        }
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

  it('全ての国コードに対応する国旗SVGファイルがある', () => {
    // flagAssets は src/assets/flags/*.svg を glob で読み込むため、
    // ここにコードが存在する＝SVGファイルが同梱されていることになる
    expect(Object.keys(flagUrlByCode)).toHaveLength(195);
    for (const country of countries) {
      expect(flagUrlByCode[country.code], `missing flag svg: ${country.code}`).toBeTruthy();
    }
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

function getCountryCodes(): string[] {
  return countries.map((c) => c.code);
}
