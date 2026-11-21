// @vitest-environment jsdom
import { act, cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, beforeAll, describe, expect, it, vi } from 'vitest';
import App from './App';
import { animalsQuiz } from './data/categories/animals';

// jsdom は scrollTo を実装していないので空の関数に差し替える
beforeAll(() => {
  window.scrollTo = () => {};
});

// 画面はテストごとに片付ける（前のテストのボタンが残ると名前で探すときに衝突する）
afterEach(() => {
  cleanup();
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

    // 残りのセットを解き切る（問題総数はデータから取得し、増減に追随する）
    const totalQuestions = animalsQuiz.questions.length;
    let answered = 10;
    for (let blockNumber = 2; answered < totalQuestions; blockNumber++) {
      expect(screen.getByText(new RegExp(`セット${blockNumber}`))).toBeTruthy();
      const inBlock = Math.min(10, totalQuestions - answered);
      for (let i = 0; i < inBlock; i++) answerOneQuestion();
      answered += inBlock;
      if (answered < totalQuestions) {
        fireEvent.click(screen.getByRole('button', { name: /つづけて あそぶ/ }));
      }
    }

    expect(screen.getByText('ぜんぶ おわった！')).toBeTruthy();
    expect(screen.getByText(new RegExp(`ぜんぶで ${totalQuestions}もんちゅう`))).toBeTruthy();
    expect(screen.getByRole('button', { name: /さいしょから あそぶ/ })).toBeTruthy();
  });

  it('モンスター：スターターを選ぶと一覧に出て、クイズ結果でXPがたまる', () => {
    localStorage.clear();
    render(<App />);

    // ホームから育成画面へ
    fireEvent.click(screen.getByRole('button', { name: /モンスターを そだてる/ }));
    expect(screen.getByText('スターターを えらんでね！')).toBeTruthy();

    // スターター（ひのこ）を選ぶと一覧に出る
    fireEvent.click(screen.getByRole('button', { name: /ひのこ/ }));
    expect(screen.getByText('レベル 1')).toBeTruthy();

    // ホームへ戻ってクイズを1セット解く
    fireEvent.click(screen.getByRole('button', { name: /もどる/ }));
    fireEvent.click(screen.getByRole('button', { name: /どうぶつ/ }));
    fireEvent.click(screen.getByRole('button', { name: /やさしい/ }));
    for (let i = 0; i < 10; i++) answerOneQuestion();

    // 結果画面：経験値がたまった表示とモンスターの姿が出る
    expect(screen.getByText(/XP たまった！/)).toBeTruthy();
    expect(screen.getByText(/ひのこ/)).toBeTruthy();
  });

  it('モンスター：配合で新しいモンスターが生まれ、たまごもかえる', () => {
    localStorage.clear();
    localStorage.setItem(
      'lets-study:monsters:v1',
      JSON.stringify({
        monsters: [
          {
            id: 'a',
            shapeSpeciesId: 'honoo',
            colorSpeciesId: 'honoo',
            name: 'ひのこ',
            xp: 0,
            generation: 1,
          },
          {
            id: 'b',
            shapeSpeciesId: 'mizu',
            colorSpeciesId: 'mizu',
            name: 'みずたま',
            xp: 0,
            generation: 1,
          },
        ],
        totalCorrect: 30,
        eggs: 1,
        trophies: 0,
        nextId: 3,
      }),
    );
    render(<App />);

    fireEvent.click(screen.getByRole('button', { name: /モンスターを そだてる/ }));

    // 2ひき選んで配合すると合成名の子が生まれる（ひのこ×みずたま→ひのたま）
    fireEvent.click(screen.getByRole('button', { name: /ひのこ/ }));
    fireEvent.click(screen.getByRole('button', { name: /みずたま/ }));
    fireEvent.click(screen.getByRole('button', { name: /ごうたい/ }));
    expect(screen.getByText(/ひのたまが うまれた！/)).toBeTruthy();

    // たまごをかえすと新しいモンスターが生まれる
    fireEvent.click(screen.getByRole('button', { name: /たまごを かえす/ }));
    expect(screen.getByText(/が うまれた！/)).toBeTruthy();
  });

  it('とうぎじょう：モンスターを選ぶとバトルが進んで結果が出る', () => {
    localStorage.clear();
    localStorage.setItem(
      'lets-study:monsters:v1',
      JSON.stringify({
        monsters: [
          {
            id: 'a',
            shapeSpeciesId: 'honoo',
            colorSpeciesId: 'honoo',
            name: 'ひのこ',
            xp: 0,
            generation: 1,
          },
        ],
        totalCorrect: 0,
        eggs: 0,
        trophies: 0,
        nextId: 2,
      }),
    );
    vi.useFakeTimers();
    try {
      render(<App />);
      fireEvent.click(screen.getByRole('button', { name: /とうぎじょう/ }));
      fireEvent.click(screen.getByRole('button', { name: /ひのこ/ }));

      // バトルが始まり、タイマーで自動的に進む
      expect(screen.getByText(/たたかい スタート！/)).toBeTruthy();
      for (let i = 0; i < 120 && !screen.queryByText(/かった！|がんばったね！/); i++) {
        act(() => {
          vi.advanceTimersByTime(1000);
        });
      }
      expect(screen.getByText(/かった！|がんばったね！/)).toBeTruthy();
      expect(screen.getByText(/XP たまった/)).toBeTruthy();
    } finally {
      vi.useRealTimers();
    }
  });

  it('とうぎじょう：パーティを組むとチーム戦になり、みんなにXPが入る', () => {
    localStorage.clear();
    localStorage.setItem(
      'lets-study:monsters:v1',
      JSON.stringify({
        monsters: [
          {
            id: 'a',
            shapeSpeciesId: 'honoo',
            colorSpeciesId: 'honoo',
            name: 'ひのこ',
            xp: 0,
            generation: 1,
          },
          {
            id: 'b',
            shapeSpeciesId: 'mizu',
            colorSpeciesId: 'mizu',
            name: 'みずたま',
            xp: 0,
            generation: 1,
          },
          {
            id: 'c',
            shapeSpeciesId: 'happa',
            colorSpeciesId: 'happa',
            name: 'はっぱん',
            xp: 0,
            generation: 1,
          },
        ],
        totalCorrect: 0,
        eggs: 0,
        trophies: 0,
        nextId: 4,
      }),
    );
    vi.useFakeTimers();
    try {
      render(<App />);

      // 育成画面で☆を押して2匹をパーティに入れる
      fireEvent.click(screen.getByRole('button', { name: /モンスターを そだてる/ }));
      fireEvent.click(screen.getAllByRole('button', { name: 'パーティに いれる' })[0]);
      fireEvent.click(screen.getAllByRole('button', { name: 'パーティに いれる' })[0]);
      expect(screen.getByText('きみの パーティ')).toBeTruthy();
      expect(screen.getByText('2ばんめ')).toBeTruthy();

      // 闘技場でパーティ戦を始める
      fireEvent.click(screen.getByRole('button', { name: /もどる/ }));
      fireEvent.click(screen.getByRole('button', { name: /とうぎじょう/ }));
      fireEvent.click(screen.getByRole('button', { name: /パーティで たたかう/ }));
      expect(screen.getByText(/たたかい スタート！/)).toBeTruthy();
      for (let i = 0; i < 400 && !screen.queryByText(/かった！|がんばったね！/); i++) {
        act(() => {
          vi.advanceTimersByTime(1000);
        });
      }
      expect(screen.getByText(/かった！|がんばったね！/)).toBeTruthy();
      // 参加したパーティ全員に経験値が入る表示
      expect(screen.getByText(/パーティ みんなに .* XP たまった/)).toBeTruthy();

      // 選び直さず同じパーティでもう一度戦える
      fireEvent.click(screen.getByRole('button', { name: /おなじ パーティで もういちど/ }));
      expect(screen.getByText(/たたかい スタート！/)).toBeTruthy();
    } finally {
      vi.useRealTimers();
    }
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
