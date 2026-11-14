import type { ReactNode } from 'react';
import './ScreenHeader.css';

interface Props {
  /** 中央に出す見出し（カテゴリ名など） */
  title: ReactNode;
  onBack: () => void;
  /** 右側に出す補足（進み具合など。任意） */
  aside?: ReactNode;
}

/** 各画面共通のヘッダー：「もどる」ボタン＋見出し＋補足 */
export function ScreenHeader({ title, onBack, aside }: Props) {
  return (
    <header className="screen-header">
      <button type="button" className="button button--small" onClick={onBack}>
        ← もどる
      </button>
      <span className="screen-header__title">{title}</span>
      <span className="screen-header__aside">{aside}</span>
    </header>
  );
}
