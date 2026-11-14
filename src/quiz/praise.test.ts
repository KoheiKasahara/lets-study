import { describe, expect, it } from 'vitest';
import { praiseFor } from './praise';

describe('praiseFor', () => {
  it('全問正解なら かんぺき', () => {
    expect(praiseFor(10, 10)).toContain('かんぺき');
  });

  it('6割以上なら よくできました', () => {
    expect(praiseFor(6, 10)).toContain('よくできました');
  });

  it('0点でも励ましの言葉を返す', () => {
    expect(praiseFor(0, 10).length).toBeGreaterThan(0);
  });

  it('問題数が0なら空文字', () => {
    expect(praiseFor(0, 0)).toBe('');
  });
});
