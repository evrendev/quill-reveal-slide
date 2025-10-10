/**
 * RevealExporter - Converts Quill content to Reveal.js presentation format
 * 
 * This class provides utilities to export Quill editor content containing
 * fragments into reveal.js compatible HTML slides. It handles the conversion
 * of Quill Delta operations to properly formatted reveal.js presentation slides.
 */

/**
 * Interface defining the structure of fragment data
 */
interface FragmentData {
  id: string;       // Unique identifier for the fragment
  text: string;     // Text content of the fragment
  effect: string;   // Animation effect (fade-in, fade-up, etc.)
  index?: number;   // Optional fragment order index
}

/**
 * RevealExporter class - Main export functionality for reveal.js presentations
 */
export class RevealExporter {
  /**
   * Converts Quill Delta format to Reveal.js HTML format
   * Processes Quill operations and transforms them into reveal.js compatible HTML
   * 
   * @param quillContents - Quill editor contents in Delta format
   * @returns HTML string formatted for reveal.js slides
   */
  static convertQuillToRevealSlide(quillContents: any): string {
    const ops = quillContents.ops || [];
    let html = "";
    let currentParagraph = "";

    ops.forEach((op: any) => {
      if (typeof op.insert === "string") {
        // Handle normal text content - split into paragraphs
        const lines = op.insert.split("\n");

        lines.forEach((line: string, index: number) => {
          if (index === 0) {
            // First line: append to current paragraph
            currentParagraph += line;
          } else {
            // New line found: close current paragraph and start new one
            if (currentParagraph.trim()) {
              html += `<p>${currentParagraph.trim()}</p>\n`;
            }
            currentParagraph = line;
          }
        });
      } else if (op.insert.fragment) {
        // Handle fragment insertion - close current paragraph and add fragment
        if (currentParagraph.trim()) {
          html += `<p>${currentParagraph.trim()}</p>\n`;
          currentParagraph = "";
        }

        const fragment = op.insert.fragment;
        html += this.createFragmentHTML(fragment);
      } else if (op.insert.tag) {
        // Handle regular tags (if any)
        const tag = op.insert.tag;
        currentParagraph += `<span class="tag">${tag.text}</span>`;
      }
    });

    // Add the final paragraph if it has content
    if (currentParagraph.trim()) {
      html += `<p>${currentParagraph.trim()}</p>\n`;
    }

    return html.trim();
  }

  /**
   * Creates HTML markup for a reveal.js fragment
   * 
   * @param fragment - Fragment data object containing text and configuration
   * @returns HTML string for the fragment element
   */
  private static createFragmentHTML(fragment: FragmentData): string {
    let classes = "fragment";

    // Add animation effect if it's not the default fade-in
    if (fragment.effect && fragment.effect !== "fade-in") {
      classes += ` ${fragment.effect}`;
    }

    // Add fragment index attribute for ordering if specified
    const indexAttr =
      fragment.index !== undefined
        ? ` data-fragment-index="${fragment.index}"`
        : "";

    return `<p class="${classes}"${indexAttr}>${fragment.text}</p>`;
  }

  /**
   * Generates a complete reveal.js slide from Quill contents
   * 
   * @param quillContents - Quill editor contents in Delta format
   * @param slideTitle - Optional title for the slide
   * @returns Complete HTML slide section for reveal.js
   */
  static generateRevealSlide(quillContents: any, slideTitle?: string): string {
    const content = this.convertQuillToRevealSlide(quillContents);

    return `
<section>
  ${slideTitle ? `<h2>${slideTitle}</h2>` : ""}
  <div>
    ${content}
  </div>
</section>`.trim();
  }

  /**
   * Returns fragments sorted by their index in the correct reveal order
   * 
   * @param fragments - Array of fragment data objects
   * @returns Sorted array of fragments by index (fragments without index go last)
   */
  static getOrderedFragments(fragments: FragmentData[]): FragmentData[] {
    return fragments.sort((a, b) => {
      // Fragments without index get value 999 to appear last
      const indexA = a.index !== undefined ? a.index : 999;
      const indexB = b.index !== undefined ? b.index : 999;
      return indexA - indexB;
    });
  }

  /**
   * Generates a complete reveal.js presentation HTML template
   * Creates a full HTML document with reveal.js dependencies and slides
   * 
   * @param slides - Array of slide HTML strings
   * @returns Complete HTML document for reveal.js presentation
   */
  static generateCompletePresentation(slides: string[]): string {
    return `
<!DOCTYPE html>
<html>
<head>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/reveal.js@4.3.1/dist/reveal.css">
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/reveal.js@4.3.1/dist/theme/white.css">
</head>
<body>
  <div class="reveal">
    <div class="slides">
      ${slides.join("\n      ")}
    </div>
  </div>
  
  <script src="https://cdn.jsdelivr.net/npm/reveal.js@4.3.1/dist/reveal.js"></script>
  <script>
    // Initialize reveal.js with basic configuration
    Reveal.initialize({
      hash: true,
      transition: 'slide'
    });
  </script>
</body>
</html>`.trim();
  }
}
