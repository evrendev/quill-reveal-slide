# Quill Reveal Slide

A powerful Quill.js module that creates **Reveal.js-compatible fragments** with an intuitive toolbar interface and multi-language support. Transform any selected text into animated presentation fragments with just a few clicks.

![Version](https://img.shields.io/badge/version-0.0.8-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)
![Languages](https://img.shields.io/badge/languages-5-orange.svg)

## 🎭 Features

- ✅ **Visual Fragment Creation** - Select text and click toolbar button
- ✅ **13+ Animation Effects** - All Reveal.js fragment animations supported
- ✅ **Fragment Ordering** - Control appearance sequence with data-fragment-index
- ✅ **Multi-language Support** - Turkish, English, Spanish, French, German
- ✅ **Reveal.js Export** - Direct export to Reveal.js slide format
- ✅ **Event System** - Listen to fragment creation events for database integration
- ✅ **TypeScript Support** - Full type definitions included
- ✅ **Visual Preview** - See fragments styled in the editor

## 🚀 Installation

```bash
npm install quill-reveal-slide
```

## 📖 Basic Usage

### Setup

```javascript
import Quill from "quill";
import { FragmentBlot } from "quill-reveal-slide";
import "quill/dist/quill.snow.css";
import "quill-reveal-slide/style.css";

// Register the fragment format
Quill.register({
  "formats/fragment": FragmentBlot,
});

// Initialize Quill with custom toolbar
const quill = new Quill("#editor", {
  theme: "snow",
  modules: {
    toolbar: {
      container: [
        ["bold", "italic"],
        ["link"],
        [{ fragment: "Fragment" }], // Fragment button
      ],
      handlers: {
        fragment: function () {
          handleFragmentCreation(this.quill);
        },
      },
    },
  },
});
```

### Creating Fragments

1. **Select text** in the editor
2. **Click the ▣ fragment button** in the toolbar
3. **Choose animation effect** from the dialog
4. **Set order** (optional) for fragment appearance sequence
5. **Click "Create Fragment"**

### Export to Reveal.js

```javascript
import { RevealExporter } from "quill-reveal-slide";

// Export current editor content
const contents = quill.getContents();
const slideHTML = RevealExporter.generateRevealSlide(
  contents,
  "My Slide Title"
);

// Generate complete presentation
const slides = [slideHTML];
const presentationHTML = RevealExporter.generateCompletePresentation(slides);
```

## 🎨 Animation Effects

| Effect             | Description                    |
| ------------------ | ------------------------------ |
| `fade-in`          | Default fade in animation      |
| `fade-up`          | Slide up while fading in       |
| `fade-down`        | Slide down while fading in     |
| `fade-left`        | Slide left while fading in     |
| `fade-right`       | Slide right while fading in    |
| `fade-out`         | Start visible, fade out        |
| `fade-in-then-out` | Fade in, then out on next step |
| `highlight-red`    | Turn text red                  |
| `highlight-green`  | Turn text green                |
| `highlight-blue`   | Turn text blue                 |
| `grow`             | Scale up                       |
| `shrink`           | Scale down                     |
| `strike`           | Strike through                 |

## 🌐 Multi-language Support

Built-in support for 5 languages with automatic browser detection:

- 🇹🇷 **Turkish** (Türkçe)
- 🇺🇸 **English**
- 🇪🇸 **Spanish** (Español)
- 🇫🇷 **French** (Français)
- 🇩🇪 **German** (Deutsch)

```javascript
import { i18n } from "quill-reveal-slide";

// Change language
i18n.setLanguage("en");

// Get current language
const currentLang = i18n.getCurrentLanguage();

// Get translation
const text = i18n.t("dialog.createFragment");
```

## 📝 Output Format

Fragments are exported as Reveal.js-compatible HTML:

```html
<section>
  <div>
    <p>Regular paragraph text</p>
    <p class="fragment fade-up" data-fragment-index="1">First fragment</p>
    <p class="fragment highlight-red" data-fragment-index="2">
      Second fragment
    </p>
  </div>
</section>
```

## 🔧 Events & Database Integration

Listen to fragment creation events for database storage:

```javascript
quill.on("fragment-created", (fragmentData) => {
  console.log("Fragment created:", fragmentData);
  // {
  //   id: 'fragment-1234567890',
  //   text: 'Selected text',
  //   effect: 'fade-up',
  //   index: 1
  // }

  // Save to your database
  saveFragmentToDatabase(fragmentData);
});
```

## 🎯 Framework Examples

### React Component

```jsx
import React, { useEffect, useRef } from "react";
import Quill from "quill";
import { FragmentBlot } from "quill-reveal-slide";
import "quill/dist/quill.snow.css";
import "quill-reveal-slide/style.css";

function FragmentEditor() {
  const editorRef = useRef(null);
  const quillRef = useRef(null);

  useEffect(() => {
    if (editorRef.current && !quillRef.current) {
      Quill.register("formats/fragment", FragmentBlot);

      quillRef.current = new Quill(editorRef.current, {
        theme: "snow",
        modules: {
          toolbar: {
            container: [["bold", "italic"], [{ fragment: "Fragment" }]],
            handlers: {
              fragment: () => handleFragmentCreation(quillRef.current),
            },
          },
        },
      });

      // Listen to fragment events
      quillRef.current.on("fragment-created", (data) => {
        console.log("Fragment created:", data);
        // Save to your backend
      });
    }
  }, []);

  return <div ref={editorRef} style={{ height: "300px" }} />;
}
```

### Vue.js Component

```vue
<template>
  <div ref="editor" style="height: 300px;"></div>
</template>

<script>
import Quill from "quill";
import { FragmentBlot } from "quill-reveal-slide";

export default {
  mounted() {
    Quill.register("formats/fragment", FragmentBlot);

    this.quill = new Quill(this.$refs.editor, {
      theme: "snow",
      modules: {
        toolbar: {
          container: [["bold", "italic"], [{ fragment: "Fragment" }]],
          handlers: {
            fragment: () => this.handleFragment(),
          },
        },
      },
    });
  },

  methods: {
    handleFragment() {
      // Fragment creation logic
    },
  },
};
</script>
```

## 🛠️ API Reference

### FragmentBlot

Main fragment format for Quill.js editor.

```javascript
import { FragmentBlot } from "quill-reveal-slide";
Quill.register("formats/fragment", FragmentBlot);
```

### RevealExporter

Utility class for exporting to Reveal.js format.

#### `generateRevealSlide(quillContents, slideTitle?)`

- **quillContents**: Quill Delta contents
- **slideTitle**: Optional slide title
- **Returns**: HTML string for single slide

#### `generateCompletePresentation(slides)`

- **slides**: Array of slide HTML strings
- **Returns**: Complete Reveal.js presentation HTML

#### `getOrderedFragments(fragments)`

- **fragments**: Array of fragment data
- **Returns**: Fragments sorted by index

### i18n

Internationalization support.

#### `setLanguage(lang)`

- **lang**: Language code ('tr', 'en', 'es', 'fr', 'de')

#### `getCurrentLanguage()`

- **Returns**: Current language code

#### `t(key)`

- **key**: Translation key
- **Returns**: Translated text

## 🎨 Customization

### Custom Fragment Styles

```css
.fragment.custom-effect {
  /* Your custom styles */
  transform: scale(0.8);
  opacity: 0.3;
}

.fragment.custom-effect.visible {
  transform: scale(1);
  opacity: 1;
  transition: all 0.3s ease;
}
```

### Adding New Languages

```javascript
// Extend i18n with new language
const customTranslations = {
  "dialog.createFragment": {
    it: "🎭 Crea Frammento",
  },
};

// Merge with existing translations
```

## 🔧 Development

```bash
# Clone repository
git clone https://github.com/yourusername/quill-reveal-slide.git

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Run tests
npm test
```

## 📋 Requirements

- **Quill.js** ^2.0.0
- **Modern browsers** with ES6+ support
- **Node.js** 16+ (for development)

## 🤝 Contributing

Contributions are welcome! Please read our [Contributing Guide](CONTRIBUTING.md) for details.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📜 License

MIT License - see [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Quill.js](https://quilljs.com/) - Rich text editor framework
- [Reveal.js](https://revealjs.com/) - HTML presentation framework
- Contributors and community members

## 📞 Support

- 📧 **Email**: support@example.com
- 🐛 **Issues**: [GitHub Issues](https://github.com/yourusername/quill-reveal-slide/issues)
- 📖 **Documentation**: [Wiki](https://github.com/yourusername/quill-reveal-slide/wiki)
- 💬 **Discussions**: [GitHub Discussions](https://github.com/yourusername/quill-reveal-slide/discussions)

---

**Made with ❤️ for the presentation community**
