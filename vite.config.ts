// vite.config.ts
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";
import { defineConfig } from "vite";

const __dirname = dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, "src/index.ts"),
      name: "QuillRevealSlide",
      fileName: (format) => `quill-reveal-slide.${format}.js`,
    },
    rollupOptions: {
      external: ["quill"],
      output: {
        globals: {
          quill: "Quill",
        },
      },
    },
    sourcemap: true,
    emptyOutDir: true,
  },
});
