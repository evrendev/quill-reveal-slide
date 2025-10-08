// src/dev.ts
import Quill from "quill";
import "quill/dist/quill.snow.css";
import { TagModule, TagBlot } from "./index";
import "./quill-reveal-slide.css";

try {
  Quill.register({
    "modules/tag": TagModule,
    "formats/tag": TagBlot,
  });

  const quill = new Quill("#editor", {
    theme: "snow",
    modules: {
      toolbar: [["bold", "italic"], ["link"]],
      tag: true,
    },
  });

  (window as any).quill = quill;
} catch (error) {
  console.error("Error initializing Quill:", error);
}
