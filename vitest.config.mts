import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [tsconfigPaths({ projects: ['tsconfig.json'] }), react()],
  test: {
    // setupFiles: ['./vitest.setup.ts'],
    coverage: {
      // v8은 import도 branch로 판단하는 등 매우 보수적인 coverage 판단을 한다.
      // 예를들면 `import React from 'react';`와 같은 import line도 branch가 된다.
      // provider: 'v8',
      provider: 'istanbul',
      exclude: [
        '.next/**',
        'next.config.ts',
        'postcss.config.mjs',
        'eslint.config.mjs',
        'eslint.config.custom.mjs',
      ],
    },
    browser: {
      enabled: true,
      instances: [
        {
          browser: 'chromium',
          screenshotFailures: false,
        },
      ],
      headless: true,
      provider: 'playwright',
      //
    },
  },
});

// browser를 chromium으로 하면 브라우저가 뜨니까, headless browser인 puppeteer 같은 것으로 바꾸거나
// 그게 아니면 다른 것으로 바꾸는 것을 조사해보자
