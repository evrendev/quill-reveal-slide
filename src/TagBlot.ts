// src/TagBlot.ts
import Quill from "quill";

const Inline: any = Quill.import("blots/inline");

class TagBlot extends Inline {
  static create(value: { id: string; text: string }) {
    const node = super.create() as HTMLElement;
    node.setAttribute("data-id", value.id);
    node.innerText = value.text;
    node.classList.add("ql-tag");
    node.setAttribute("contenteditable", "false");
    return node;
  }

  static formats(node: HTMLElement) {
    return {
      id: node.getAttribute("data-id"),
      text: node.innerText,
    };
  }

  static value(node: HTMLElement) {
    return {
      id: node.getAttribute("data-id"),
      text: node.innerText,
    };
  }
}

TagBlot.blotName = "tag";
TagBlot.tagName = "SPAN";

export default TagBlot;
