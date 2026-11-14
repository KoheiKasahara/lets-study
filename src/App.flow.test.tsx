// @vitest-environment jsdom
import { fireEvent, render, screen } from '@testing-library/react';
import { beforeAll, describe, expect, it } from 'vitest';
import App from './App';

// jsdom は scrollTo を実装していないので空の関数に差し替える
beforeAll(() => {
  window.scrollTo = () => {};
});

/** 表示中の選択肢ボタンのうち最初のものを押し、フィードバックの「つぎへ」を押す */
function answerOneQuestion() {
  const feedbackButton = screen.queryByRole('button', { name: /つぎの もんだい|けっかを みる/ });
  expect(feedbackButton).toBeNull();
  const choiceButtons = screen
    .getAllByRole('button')
    .filter((b) => !(b as HTMLButtonElement).disabled && !b.textContent?.includes('もどる'));
  // 選択肢はフィードバック前だけ押せるボタン（もどる以外）
  fireEvent.click(choiceButtons[0]);
  fireEvent.click(screen.getByRole('button', { name: /つぎの もんだい|けっかを みる/ }));
}

describe('画面の基本フロー', () => {
  it('カテゴリ選択→難易度→出題→セット結果→つづける→ぜんぶおわった', () => {
    render(<App />);

    // ホーム：カテゴリを選ぶ
    fireEvent.click(screen.getByRole('button', { name: /どうぶつ/ }));

    // 難易度えらび画面が出る
    expect(screen.getByText('むずかしさを えらんでね')).toBeTruthy();
    fireEvent.click(screen.getByRole('button', { name: /やさしい/ }));

    // クイズ画面：セット表示と累計表示があり、やさしいは2択
    expect(screen.getByText(/セット1/)).toBeTruthy();
    expect(screen.getByText(/これまでの せいかい/)).toBeTruthy();
    expect(document.querySelectorAll('.quiz__choice')).toHaveLength(2);

    // 1セット目（10問）を解く
    for (let i = 0; i < 10; i++) answerOneQuestion();

    // セット結果：まだ問題が残っているので「つづけて あそぶ」が出る
    expect(screen.getByText(/このセットは 10もんちゅう/)).toBeTruthy();
    fireEvent.click(screen.getByRole('button', { name: /つづけて あそぶ/ }));

    // 2セット目（残り2問）を解くと使い切り
    expect(screen.getByText(/セット2/)).toBeTruthy();
    for (let i = 0; i < 2; i++) answerOneQuestion();

    expect(screen.getByText('ぜんぶ おわった！')).toBeTruthy();
    expect(screen.getByText(/ぜんぶで 12もんちゅう/)).toBeTruthy();
    expect(screen.getByRole('button', { name: /さいしょから あそぶ/ })).toBeTruthy();
  });

  it('こっき ずかんが開けて、地域フィルターと検索が効く', () => {
    render(<App />);

    fireEvent.click(screen.getByRole('button', { name: /こっき ずかん/ }));
    expect(screen.getByText('195かこく')).toBeTruthy();
    expect(screen.getByText('日本')).toBeTruthy();

    // 地域フィルター（アジアのみ）
    fireEvent.click(screen.getByRole('button', { name: 'アジア' }));
    expect(screen.getByText('日本')).toBeTruthy();
    expect(screen.queryByText('フランス')).toBeNull();

    // 名前検索
    fireEvent.change(screen.getByLabelText('くにの なまえで さがす'), {
      target: { value: 'かんこく' },
    });
    expect(screen.getByText('韓国')).toBeTruthy();
    expect(screen.queryByText('日本')).toBeNull();
  });
});
