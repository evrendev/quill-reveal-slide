// src/FragmentBlot.ts
import Quill from "quill";

const Inline: any = Quill.import("blots/inline");

interface FragmentValue {
  id: string;
  text: string;
  effect?: string; // fade-in, fade-up, highlight-red, etc.
  index?: number; // data-fragment-index
}

class FragmentBlot extends Inline {
  static create(value: FragmentValue) {
    const node = super.create() as HTMLElement;
    node.setAttribute("data-id", value.id);
    node.setAttribute("data-text", value.text);

    // Reveal.js fragment classes
    node.classList.add("fragment");

    // Fragment effect (default: fade-in)
    const effect = value.effect || "fade-in";
    if (effect !== "fade-in") {
      node.classList.add(effect);
    }

    // Fragment index for ordering
    if (value.index !== undefined) {
      node.setAttribute("data-fragment-index", value.index.toString());
    }

    // Make it non-editable
    node.setAttribute("contenteditable", "false");

    // Display text with fragment indicator
    node.innerHTML = `<span class="fragment-indicator">🎭</span> ${value.text}`;

    return node;
  }

  static formats(node: HTMLElement): FragmentValue {
    return {
      id: node.getAttribute("data-id") || "",
      text: node.getAttribute("data-text") || "",
      effect: node.classList.contains("fade-up")
        ? "fade-up"
        : node.classList.contains("highlight-red")
        ? "highlight-red"
        : node.classList.contains("fade-out")
        ? "fade-out"
        : "fade-in",
      index: node.getAttribute("data-fragment-index")
        ? parseInt(node.getAttribute("data-fragment-index")!)
        : undefined,
    };
  }

  static value(node: HTMLElement): FragmentValue {
    return FragmentBlot.formats(node);
  }
}

FragmentBlot.blotName = "fragment";
FragmentBlot.tagName = "SPAN";

export default FragmentBlot;
