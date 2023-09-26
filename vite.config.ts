/// <reference types="vitest" />

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";
import vite_d_ts from "vite-plugin-dts";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), vite_d_ts()],
  build: {
    lib: {
      entry: path.resolve(__dirname, "lib/main.ts"),
      name: "componentsVue",
    },
    outDir: "components-vue",
    rollupOptions: {
      external: ["vue"],
      output: {
        globals: {
          vue: "Vue",
        },
      },
    },

  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "lib"),
      lib: path.resolve(__dirname, "lib"),
      test: path.resolve(__dirname, "test"),
      styles: path.resolve(__dirname, "lib/styles"),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
          @import "lib/styles/mixins.scss";
            `,
      },
    },
  },
  test: {
    globals: true,
    environment: 'jsdom',
    coverage: {
      exclude: ["src/**", "test/**"],
      reporter:["json-summary", "html"]
    },
  },
});
