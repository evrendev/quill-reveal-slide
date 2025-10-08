// src/TagModule.ts
import Quill, { type Delta } from "quill";

class TagModule {
  private quill: Quill;

  constructor(quill: Quill) {
    this.quill = quill;
    this.quill.on("text-change", this.onTextChange.bind(this));
  }

  onTextChange(delta: Delta, _oldDelta: Delta, source: string) {
    if (source !== "user") return;

    const ops = delta.ops;
    if (!ops || ops.length !== 1 || !ops[0].insert) return;

    if (ops[0].insert === " ") {
      const selection = this.quill.getSelection();
      if (!selection || selection.length > 0) return;

      const [line] = this.quill.getLine(selection.index);
      if (!line) return;
      const text = line.domNode.textContent ?? "";
      const regex = /(#\S+)\s$/;
      const match = text.match(regex);

      if (match) {
        const matchedText = match[1]; // Sadece # ve metni al (#proje)
        const tagLength = matchedText.length;
        const startIndex = selection.index - tagLength - 1; // Boşluğu da hesaba kat

        this.quill.deleteText(startIndex, tagLength + 1, "api");

        this.quill.insertEmbed(
          startIndex,
          "tag",
          {
            id: matchedText.substring(1).toLowerCase(), // # olmadan ID
            text: matchedText,
          },
          "api"
        );

        this.quill.insertText(startIndex + 1, " ", "api");
        this.quill.setSelection(startIndex + 2, 0, "api");
      }
    }
  }
}

export default TagModule;
