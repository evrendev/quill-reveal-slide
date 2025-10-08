// src/RevealExporter.ts

interface FragmentData {
  id: string;
  text: string;
  effect: string;
  index?: number;
}

export class RevealExporter {
  /**
   * Quill Delta formatından Reveal.js HTML formatına dönüştürür
   */
  static convertQuillToRevealSlide(quillContents: any): string {
    const ops = quillContents.ops || [];
    let html = "";
    let currentParagraph = "";

    ops.forEach((op: any) => {
      if (typeof op.insert === "string") {
        // Normal text - paragraph'lara ayır
        const lines = op.insert.split("\n");

        lines.forEach((line: string, index: number) => {
          if (index === 0) {
            // İlk satır mevcut paragraph'a ekle
            currentParagraph += line;
          } else {
            // Yeni satır bulundu, mevcut paragraph'ı kapat
            if (currentParagraph.trim()) {
              html += `<p>${currentParagraph.trim()}</p>\n`;
            }
            currentParagraph = line;
          }
        });
      } else if (op.insert.fragment) {
        // Fragment - mevcut paragraph'ı kapat ve fragment ekle
        if (currentParagraph.trim()) {
          html += `<p>${currentParagraph.trim()}</p>\n`;
          currentParagraph = "";
        }

        const fragment = op.insert.fragment;
        html += this.createFragmentHTML(fragment);
      } else if (op.insert.tag) {
        // Regular tag
        const tag = op.insert.tag;
        currentParagraph += `<span class="tag">${tag.text}</span>`;
      }
    });

    // Son paragraph'ı ekle
    if (currentParagraph.trim()) {
      html += `<p>${currentParagraph.trim()}</p>\n`;
    }

    return html.trim();
  }

  /**
   * Fragment HTML'i oluşturur
   */
  private static createFragmentHTML(fragment: FragmentData): string {
    let classes = "fragment";

    // Effect ekle (default fade-in değilse)
    if (fragment.effect && fragment.effect !== "fade-in") {
      classes += ` ${fragment.effect}`;
    }

    // Fragment index ekle
    const indexAttr =
      fragment.index !== undefined
        ? ` data-fragment-index="${fragment.index}"`
        : "";

    return `<p class="${classes}"${indexAttr}>${fragment.text}</p>`;
  }

  /**
   * Tüm Quill içeriğini Reveal.js slide formatına dönüştürür
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
   * Fragment'ları sıralı bir şekilde döndürür
   */
  static getOrderedFragments(fragments: FragmentData[]): FragmentData[] {
    return fragments.sort((a, b) => {
      const indexA = a.index !== undefined ? a.index : 999;
      const indexB = b.index !== undefined ? b.index : 999;
      return indexA - indexB;
    });
  }

  /**
   * Reveal.js sunumu için complete HTML template
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
    Reveal.initialize({
      hash: true,
      transition: 'slide'
    });
  </script>
</body>
</html>`.trim();
  }
}
