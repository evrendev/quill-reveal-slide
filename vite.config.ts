// vite.config.ts
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";
import { defineConfig } from "vite";

const __dirname = dirname(fileURLToPath(import.meta.url));

export default defineConfig(({ mode }) => {
  if (mode === "demo") {
    // Demo build configuration
    return {
      root: ".",
      base: "/quill-reveal-slide/",
      build: {
        outDir: "demo-dist",
        emptyOutDir: true,
        rollupOptions: {
          input: resolve(__dirname, "index.html"),
        },
      },
    };
  }

  // Library build configuration
  return {
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
          assetFileNames: (assetInfo) => {
            if (assetInfo.name === "style.css") return "style.css";
            return assetInfo.name || "asset";
          },
        },
      },
      sourcemap: true,
      emptyOutDir: true,
    },
  };
});
