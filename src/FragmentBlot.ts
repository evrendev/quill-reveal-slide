/**
 * FragmentBlot - Custom Quill Blot for Reveal.js Fragments
 * 
 * This class defines a custom inline blot that represents reveal.js fragments.
 * Fragments are portions of content that can be revealed progressively during
 * presentations using reveal.js animations and effects.
 */

import Quill from "quill";

// Import the base Inline blot class from Quill
const Inline: any = Quill.import("blots/inline");

/**
 * Interface defining the structure of fragment data
 */
interface FragmentValue {
  id: string;        // Unique identifier for the fragment
  text: string;      // The text content of the fragment
  effect?: string;   // Animation effect (fade-in, fade-up, highlight-red, etc.)
  index?: number;    // Fragment order index for reveal.js (data-fragment-index)
}

/**
 * FragmentBlot class - Extends Quill's Inline blot to create fragment elements
 */
class FragmentBlot extends Inline {
  /**
   * Creates a new fragment DOM element with the specified properties
   * @param value - Fragment configuration object
   * @returns HTML element representing the fragment
   */
  static create(value: FragmentValue) {
    const node = super.create() as HTMLElement;
    
    // Set unique identifier and text content as data attributes
    node.setAttribute("data-id", value.id);
    node.setAttribute("data-text", value.text);

    // Add reveal.js fragment class for basic functionality
    node.classList.add("fragment");

    // Apply fragment effect (default: fade-in if not specified)
    const effect = value.effect || "fade-in";
    if (effect !== "fade-in") {
      node.classList.add(effect);
    }

    // Set fragment index for controlling reveal order
    if (value.index !== undefined) {
      node.setAttribute("data-fragment-index", value.index.toString());
    }

    // Make the fragment non-editable to prevent accidental modifications
    node.setAttribute("contenteditable", "false");

    // Display text with visual indicator showing it's a fragment
    node.innerHTML = `<span class="fragment-indicator">▣</span> ${value.text}`;

    return node;
  }

  /**
   * Extracts fragment configuration from an existing DOM element
   * @param node - HTML element to extract data from
   * @returns Fragment configuration object
   */
  static formats(node: HTMLElement): FragmentValue {
    return {
      id: node.getAttribute("data-id") || "",
      text: node.getAttribute("data-text") || "",
      // Detect the applied effect by checking CSS classes
      effect: node.classList.contains("fade-up")
        ? "fade-up"
        : node.classList.contains("highlight-red")
        ? "highlight-red"
        : node.classList.contains("fade-out")
        ? "fade-out"
        : "fade-in",
      // Parse fragment index from data attribute
      index: node.getAttribute("data-fragment-index")
        ? parseInt(node.getAttribute("data-fragment-index")!)
        : undefined,
    };
  }

  /**
   * Gets the value of a fragment element (alias for formats)
   * @param node - HTML element to get value from
   * @returns Fragment configuration object
   */
  static value(node: HTMLElement): FragmentValue {
    return FragmentBlot.formats(node);
  }
}

// Configure the blot name and HTML tag for Quill registration
FragmentBlot.blotName = "fragment";
FragmentBlot.tagName = "SPAN";

export default FragmentBlot;
