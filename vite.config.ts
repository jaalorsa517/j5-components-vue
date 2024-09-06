/// <reference types="vitest" />

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";
import vite_d_ts from "vite-plugin-dts";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vite_d_ts({
      tsconfigPath: "tsconfig.build.json",
      copyDtsFiles: true,
    }),
  ],
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
      lib: path.resolve(__dirname, "lib"),
      src: path.resolve(__dirname, "src"),
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
    environment: "jsdom",
    typecheck: {
      enabled: true,
      tsconfig: path.resolve(__dirname, "tsconfig.test.json"),
    },
    coverage: {
      provider: "v8",
      all: true,
      enabled: true,
      exclude: [
        "src/**",
        "test/**",
        "lib/shared/types/**",
        "components-vue/**",
        "test/**",
        "vite.config.ts",
      ],
      reporter: ["json-summary", "html"],
      thresholds: {
        statements: 100,
        branches: 100,
        functions: 100,
        lines: 100,
      },
    },
  },
});
