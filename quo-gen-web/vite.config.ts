import { resolve } from "path";
import { defineConfig } from "vite";

const root = resolve(__dirname);
const outDir = resolve(__dirname, "dist");

export default defineConfig({
  build: {
    outDir,
    emptyOutDir: true,
    rollupOptions: {
      input: {
        index: resolve(root, "./index.html"),
        register: resolve(root, "src/register", "./index.html"),
        login: resolve(root, "src/login", "./index.html"),
      },
    },
  },
});
