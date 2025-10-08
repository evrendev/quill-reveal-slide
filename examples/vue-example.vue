<!-- Vue component example -->
<template>
  <div>
    <h2>My Editor with Tags</h2>
    <div ref="editor" style="height: 300px"></div>
    <p>Type #hashtag and press space to create tags!</p>
  </div>
</template>

<script>
import Quill from "quill";
import { TagModule, TagBlot } from "quill-reveal-slide";
import "quill/dist/quill.snow.css";
import "quill-reveal-slide/style.css";

// Register the modules
Quill.register({
  "modules/tag": TagModule,
  "formats/tag": TagBlot,
});

export default {
  name: "QuillEditor",
  mounted() {
    this.quill = new Quill(this.$refs.editor, {
      theme: "snow",
      modules: {
        toolbar: [
          ["bold", "italic", "underline"],
          ["link"],
          [{ list: "ordered" }, { list: "bullet" }],
        ],
        tag: true, // Enable tag module
      },
    });
  },
  beforeDestroy() {
    if (this.quill) {
      this.quill = null;
    }
  },
};
</script>
