import { defineConfig } from '@rsbuild/core';
import { pluginReact } from '@rsbuild/plugin-react';

export default defineConfig({
  source: {
    alias: {
      '@': './src',
    },
  },
  server: { port: 1420 },
  plugins: [pluginReact()],
});
