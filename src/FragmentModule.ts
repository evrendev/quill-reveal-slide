// src/FragmentModule.ts
import Quill from "quill";

const Module = Quill.import("core/module");

class FragmentModule extends Module {
  constructor(quill: any, options: any) {
    super(quill, options);

    // Toolbar'a handler ekle
    const toolbar = quill.getModule("toolbar");
    if (toolbar && toolbar.addHandler) {
      toolbar.addHandler("custom-fragment", this.handleFragment.bind(this));
    }
  }

  handleFragment() {
    const range = this.quill.getSelection(true);
    if (range == null || range.length === 0) return;

    const text = this.quill.getText(range.index, range.length);
    if (!text.trim()) return;

    const fragmentValue = {
      id: `fragment-${Date.now()}`,
      text: text.trim(),
      effect: "fade-in",
    };

    this.quill.deleteText(range.index, range.length);
    this.quill.insertEmbed(range.index, "fragment", fragmentValue);
    this.quill.setSelection(range.index + 1);
  }
}

export default FragmentModule;
