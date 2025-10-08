# Examples - Quill Reveal Slide

This directory contains comprehensive examples showing how to integrate **Quill Reveal Slide** with different frameworks and environments.

## 📁 Available Examples

### 🌐 [vanilla-example.html](./vanilla-example.html)

**Pure JavaScript implementation** - Perfect for getting started

- ✅ Complete HTML page with embedded JavaScript
- ✅ Advanced modal dialog for fragment creation
- ✅ Real-time export to Reveal.js format
- ✅ Modern responsive design
- ✅ Multi-language support demonstration

**Features:**

- Effect preview in dialog
- Language selector
- Live export functionality
- Beautiful UI with gradients and animations

### ⚛️ [react-example.jsx](./react-example.jsx)

**React component integration** - For React applications

- ✅ Functional component with hooks
- ✅ Fragment state management
- ✅ Export functionality with preview
- ✅ Event handling for database integration
- ✅ TypeScript compatible

**Features:**

- React state management
- Fragment list display
- Export options (slide/presentation)
- Modern React patterns

### 🟢 [vue-example.vue](./vue-example.vue)

**Vue.js component** - Complete Vue integration

- ✅ Vue 3 composition API ready
- ✅ Advanced modal system
- ✅ Reactive data binding
- ✅ Beautiful scoped CSS styling
- ✅ Event emission system

**Features:**

- Vue reactive system
- Custom modal component
- Scoped styling
- Vue event handling

### 🚀 [nextjs-example.tsx](./nextjs-example.tsx)

**Next.js integration** - Server-side rendering compatible

- ✅ SSR/SSG compatible
- ✅ Dynamic imports to avoid hydration issues
- ✅ TypeScript support
- ✅ App Router compatible
- ✅ Production optimized

**Features:**

- Server-side rendering support
- Code splitting
- TypeScript definitions
- Next.js optimization patterns

### 🎨 [complete-demo.html](./complete-demo.html)

**Full-featured demo** - Showcase all capabilities

- ✅ Complete interactive experience
- ✅ Statistics dashboard
- ✅ Fragment management panel
- ✅ Live presentation preview
- ✅ Professional UI/UX design

**Features:**

- Real-time statistics (words, characters, fragments)
- Interactive fragment management
- Live preview in new window
- Language switching
- Professional design system
- Effect descriptions and previews

## 🚀 Quick Start

### 1. Vanilla JavaScript

```bash
# Just open the HTML file in your browser
open vanilla-example.html
```

### 2. React

```bash
npm install quill quill-reveal-slide
# Copy react-example.jsx to your React project
```

### 3. Vue.js

```bash
npm install quill quill-reveal-slide
# Copy vue-example.vue to your Vue project
```

### 4. Next.js

```bash
npm install next react react-dom react-quill quill quill-reveal-slide
# Copy nextjs-example.tsx to your Next.js project
# Add configuration to next.config.js
```

## 📖 Usage Patterns

### Basic Fragment Creation

```javascript
// Select text and create fragment
const selection = quill.getSelection();
quill.format("fragment", {
  effect: "fade-up",
  index: 1,
});
```

### Event Listening

```javascript
// Listen to fragment creation events
quill.on("fragment-created", (fragmentData) => {
  console.log("New fragment:", fragmentData);
  // Save to database, update UI, etc.
});
```

### Export to Reveal.js

```javascript
// Export single slide
const contents = quill.getContents();
const slideHTML = RevealExporter.generateRevealSlide(contents, "My Slide");

// Export complete presentation
const presentationHTML = RevealExporter.generateCompletePresentation([
  slideHTML,
]);
```

## 🎨 Fragment Effects

All examples support these fragment animations:

| Effect             | Description              | Use Case               |
| ------------------ | ------------------------ | ---------------------- |
| `fade-in`          | Default fade animation   | General content reveal |
| `fade-up`          | Slide up while fading    | Bottom-to-top reveals  |
| `fade-down`        | Slide down while fading  | Top-to-bottom reveals  |
| `fade-left`        | Slide left while fading  | Right-to-left movement |
| `fade-right`       | Slide right while fading | Left-to-right movement |
| `fade-out`         | Fade out effect          | Remove content         |
| `fade-in-then-out` | Appear then disappear    | Temporary highlights   |
| `highlight-red`    | Red highlight effect     | Error states, warnings |
| `highlight-green`  | Green highlight effect   | Success states         |
| `highlight-blue`   | Blue highlight effect    | Information highlights |
| `grow`             | Scale up animation       | Emphasis, importance   |
| `shrink`           | Scale down animation     | De-emphasis            |
| `strike`           | Strike-through effect    | Corrections, deletions |

## 🌐 Multi-language Support

All examples include internationalization for:

- 🇹🇷 **Turkish** (Türkçe)
- 🇺🇸 **English**
- 🇪🇸 **Spanish** (Español)
- 🇫🇷 **French** (Français)
- 🇩🇪 **German** (Deutsch)

```javascript
// Change language
i18n.setLanguage("tr");

// Get translated text
const text = i18n.t("dialog.createFragment");
```

## 🔧 Customization

### Custom Toolbar

```javascript
const toolbar = [
  ["bold", "italic"],
  [{ "custom-fragment": "▣ Fragment" }], // Custom fragment button
];
```

### Custom Effects

```css
.fragment.custom-effect {
  transform: scale(0.8);
  opacity: 0.3;
}

.fragment.custom-effect.visible {
  transform: scale(1);
  opacity: 1;
  transition: all 0.3s ease;
}
```

### Event Integration

```javascript
// Database integration example
quill.on("fragment-created", async (fragmentData) => {
  try {
    await fetch("/api/fragments", {
      method: "POST",
      body: JSON.stringify(fragmentData),
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Failed to save fragment:", error);
  }
});
```

## 📱 Framework Integration Notes

### React

- Use `useEffect` for initialization
- Store fragments in component state
- Handle events with callback functions
- Use `useRef` for Quill instance

### Vue.js

- Initialize in `mounted()` lifecycle
- Use reactive data for fragments
- Handle events with Vue methods
- Clean up in `beforeDestroy()`

### Next.js

- Use dynamic imports to avoid SSR issues
- Configure webpack for Quill compatibility
- Use `'use client'` directive for client components
- Handle hydration correctly

## 🎯 Best Practices

1. **Performance**: Only load Quill on client-side for SSR frameworks
2. **State Management**: Keep fragment data in sync with editor content
3. **Error Handling**: Always validate selections before creating fragments
4. **Accessibility**: Provide keyboard shortcuts and screen reader support
5. **Mobile**: Test on mobile devices for touch interactions

## 🐛 Troubleshooting

### Common Issues

**SSR Hydration Errors (Next.js)**

```javascript
// Use dynamic imports
const QuillEditor = dynamic(() => import("./QuillEditor"), { ssr: false });
```

**Module Not Found Errors**

```bash
# Install all required dependencies
npm install quill quill-reveal-slide
```

**CSS Not Loading**

```javascript
// Import CSS in your component
import "quill/dist/quill.snow.css";
import "quill-reveal-slide/style.css";
```

**Fragment Not Creating**

```javascript
// Ensure text is selected
const selection = quill.getSelection();
if (!selection || selection.length === 0) {
  alert("Please select text first!");
  return;
}
```

## 🤝 Contributing

Found an issue with the examples? Want to add a new framework integration?

1. Fork the repository
2. Create your example
3. Test thoroughly
4. Submit a pull request

## 📜 License

All examples are provided under the MIT License - feel free to use them in your projects!

---

**Happy coding with Quill Reveal Slide! 🎭✨**
