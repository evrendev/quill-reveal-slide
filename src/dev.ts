// src/dev.ts
import Quill from "quill";
import { TagModule, TagBlot } from "./index";
import "./quill-reveal-slide.css";

Quill.register({
  "modules/tag": TagModule,
  "formats/tag": TagBlot,
});

const quill = new Quill("#editor", {
  theme: "snow",
  modules: {
    toolbar: false,
    tag: true,
  },
});

(window as any).quill = quill;
