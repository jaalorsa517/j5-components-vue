import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";
import vite_d_ts from "vite-plugin-dts";
import { fileURLToPath } from "node:url";

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
    //   external: ["vue"],
    //   output: {
    //     globals: {
    //       vue: "Vue",
    //     },
    //   },
    },

  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "lib"),
      lib: path.resolve(__dirname, "lib"),
      src: path.resolve(__dirname, "src"),
    },
  },
});
