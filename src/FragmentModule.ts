// src/FragmentModule.ts
import Quill from "quill";

const Module = Quill.import("core/module");

class FragmentModule extends Module {
  constructor(quill: any, options: any) {
    super(quill, options);

    // Handler'ı doğrudan Quill'in toolbar module'üne ekle
    this.addFragmentHandler();
  }

  addFragmentHandler() {
    const toolbar = this.quill.getModule("toolbar") as any;
    if (toolbar) {
      // Mevcut handlers'ı al
      const handlers = toolbar.handlers || {};

      // Custom fragment handler'ı ekle
      handlers["custom-fragment"] = () => {
        this.handleFragment();
      };

      // Handlers'ı geri ata
      toolbar.handlers = handlers;

      // Button'a click event listener ekle
      setTimeout(() => {
        const button = toolbar.container?.querySelector(".ql-custom-fragment");
        if (button && !button.onclick) {
          button.onclick = () => {
            this.handleFragment();
          };
        }
      }, 100);
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

    // Inline format olarak fragment uygula
    this.quill.formatText(range.index, range.length, "fragment", fragmentValue);
    this.quill.setSelection(range.index + range.length);
  }
}

export default FragmentModule;
