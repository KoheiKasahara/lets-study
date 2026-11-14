import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
// 共通スタイルを先に読み込む（あとから読み込む各画面のCSSが上書きできるように）
import './styles/tokens.css';
import './styles/base.css';
import App from './App';

const root = document.getElementById('root');
if (!root) throw new Error('#root が index.html に見つかりません');

createRoot(root).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
