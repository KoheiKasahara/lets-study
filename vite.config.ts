import react from '@vitejs/plugin-react';
import { defineConfig } from 'vitest/config';

// https://vite.dev/config/
export default defineConfig({
  // GitHub Pages 用ビルドでは deploy ワークフローが VITE_BASE=/lets-study/ を指定する。
  // 通常ビルド（ローカル・プレビュー）は '/' のまま。
  base: process.env.VITE_BASE ?? '/',
  plugins: [react()],
  test: {
    // 既定は node。画面のテストだけファイル先頭の `// @vitest-environment jsdom` で切り替える
    environment: 'node',
    include: ['src/**/*.test.{ts,tsx}'],
  },
});
