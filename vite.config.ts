/**
 * Vite Configuration
 * 
 * This configuration supports two build modes:
 * 1. Library mode: Builds the npm package for distribution
 * 2. Demo mode: Builds the demo page for GitHub Pages
 * 
 * @author Evren Yeniev
 */

import { resolve, dirname } from "path";
import { fileURLToPath } from "url";
import { defineConfig } from "vite";

const __dirname = dirname(fileURLToPath(import.meta.url));

export default defineConfig(({ mode }) => {
  if (mode === "demo") {
    // Demo build configuration for GitHub Pages
    return {
      root: ".",
      base: "/quill-reveal-slide/", // GitHub Pages base path
      build: {
        outDir: "demo-dist",
        emptyOutDir: true,
        rollupOptions: {
          input: resolve(__dirname, "index.html"),
        },
      },
    };
  }

  // Library build configuration for npm package
  return {
    build: {
      lib: {
        entry: resolve(__dirname, "src/index.ts"),
        name: "QuillRevealSlide",
        fileName: (format) => `quill-reveal-slide.${format}.js`,
      },
      rollupOptions: {
        external: ["quill"], // Don't bundle Quill as it's a peer dependency
        output: {
          globals: {
            quill: "Quill", // Global variable name for Quill
          },
          assetFileNames: (assetInfo) => {
            // Rename style.css to maintain consistent naming
            if (assetInfo.name === "style.css") return "style.css";
            return assetInfo.name || "asset";
          },
        },
      },
      sourcemap: true, // Generate source maps for debugging
      emptyOutDir: true, // Clean output directory before build
    },
  };
});
