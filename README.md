# Quill Reveal Slide

A custom Quill.js module that automatically converts hashtag text (`#hashtag`) into styled tags when you press space.

## Installation

```bash
npm install quill-reveal-slide
```

## Usage

### Basic Setup

```javascript
import Quill from "quill";
import { TagModule, TagBlot } from "quill-reveal-slide";
import "quill-reveal-slide/style.css";

// Register the module and format
Quill.register({
  "modules/tag": TagModule,
  "formats/tag": TagBlot,
});

// Initialize Quill with the tag module
const quill = new Quill("#editor", {
  theme: "snow",
  modules: {
    toolbar: [["bold", "italic"], ["link"]],
    tag: true, // Enable the tag module
  },
});
```

### How it works

1. Type any text starting with `#` (e.g., `#hello`, `#world`, `#javascript`)
2. Press the space bar
3. The hashtag text automatically converts into a styled, non-editable tag

### Example

```
Type: #awesome + space
Result: [#awesome] (styled as a tag)
```

## Features

- ✅ Automatic hashtag detection
- ✅ Converts `#text` to styled tags on space press
- ✅ Tags are non-editable once created
- ✅ Customizable styling via CSS
- ✅ TypeScript support
- ✅ Works with Quill 2.0+

## Customization

You can customize the tag appearance by overriding the CSS:

```css
.ql-tag {
  background-color: #your-color;
  border-radius: 8px;
  padding: 4px 12px;
  font-weight: bold;
  color: #your-text-color;
}
```

## Requirements

- Quill ^2.0.0
- Modern browser with ES6+ support

## License

MIT

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
