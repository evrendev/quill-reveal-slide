<!-- Vue component example for Quill Reveal Slide -->
<template>
  <div class="container">
    <div class="editor-wrapper">
      <h1 class="title">🎭 Vue Quill Reveal Slide</h1>
      <p class="subtitle">Create animated presentation fragments in Vue.js</p>

      <div class="instructions">
        <strong>How to use:</strong>
        <ol>
          <li>Select text in the editor</li>
          <li>Click the 🎭 Fragment button</li>
          <li>Choose effect and order in the modal</li>
          <li>Export to Reveal.js format</li>
        </ol>
      </div>

      <div ref="editor" class="editor"></div>

      <!-- Fragment List -->
      <div v-if="fragments.length > 0" class="fragments-list">
        <h3>Created Fragments:</h3>
        <ul>
          <li v-for="fragment in fragments" :key="fragment.id">
            <strong>{{ fragment.effect }}</strong>
            <span v-if="fragment.index"> (order: {{ fragment.index }})</span>:
            "{{ fragment.text.substring(0, 50) }}..."
          </li>
        </ul>
      </div>

      <!-- Export Section -->
      <div class="export-section">
        <h3>Export Options</h3>
        <div class="buttons">
          <button @click="exportSlide" class="btn btn-primary">
            Export Slide HTML
          </button>
          <button @click="exportPresentation" class="btn btn-success">
            Export Full Presentation
          </button>
          <button @click="clearEditor" class="btn btn-danger">
            Clear Editor
          </button>
        </div>

        <pre v-if="exportedHTML" class="output">{{ exportedHTML }}</pre>
      </div>
    </div>

    <!-- Fragment Creation Modal -->
    <div v-if="showModal" class="modal-overlay" @click="closeModal">
      <div class="modal-dialog" @click.stop>
        <h3>🎭 {{ $t("dialog.createFragment") }}</h3>
        <div class="form-group">
          <label>{{ $t("dialog.effect") }}:</label>
          <select v-model="selectedEffect" class="form-control">
            <option value="fade-in">fade-in</option>
            <option value="fade-up">fade-up</option>
            <option value="fade-down">fade-down</option>
            <option value="fade-left">fade-left</option>
            <option value="fade-right">fade-right</option>
            <option value="fade-out">fade-out</option>
            <option value="highlight-red">highlight-red</option>
            <option value="highlight-green">highlight-green</option>
            <option value="highlight-blue">highlight-blue</option>
            <option value="grow">grow</option>
            <option value="shrink">shrink</option>
            <option value="strike">strike</option>
          </select>
        </div>
        <div class="form-group">
          <label>{{ $t("dialog.order") }} ({{ $t("dialog.optional") }}):</label>
          <input
            v-model.number="selectedOrder"
            type="number"
            min="1"
            max="100"
            class="form-control"
          />
        </div>
        <div class="modal-buttons">
          <button @click="closeModal" class="btn btn-secondary">
            {{ $t("dialog.cancel") }}
          </button>
          <button @click="createFragment" class="btn btn-primary">
            {{ $t("dialog.create") }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Quill from "quill";
import { FragmentBlot, RevealExporter, i18n } from "quill-reveal-slide";
import "quill/dist/quill.snow.css";
import "quill-reveal-slide/style.css";

// Register the fragment format
Quill.register({
  "formats/fragment": FragmentBlot,
});

export default {
  name: "QuillFragmentEditor",
  data() {
    return {
      quill: null,
      showModal: false,
      selectedEffect: "fade-in",
      selectedOrder: null,
      currentSelection: null,
      fragments: [],
      exportedHTML: "",
      currentLanguage: "en",
    };
  },
  mounted() {
    this.initializeQuill();
  },
  beforeDestroy() {
    if (this.quill) {
      this.quill = null;
    }
  },
  methods: {
    initializeQuill() {
      this.quill = new Quill(this.$refs.editor, {
        theme: "snow",
        modules: {
          toolbar: {
            container: [
              ["bold", "italic", "underline"],
              ["link"],
              [{ list: "ordered" }, { list: "bullet" }],
              [{ fragment: "▣ Fragment" }],
            ],
            handlers: {
              fragment: () => this.handleFragmentCreation(),
            },
          },
        },
      });

      // Listen to fragment events
      this.quill.on("fragment-created", (data) => {
        console.log("Fragment created:", data);
      });

      // Add sample content
      this.quill.setText(`Welcome to Vue + Quill Reveal Slide!

This is a sample paragraph. Select this text and click the Fragment button to make it animated.

Vue.js integration makes it easy to handle events and manage state.

Try creating fragments with different effects and orders!`);
    },

    handleFragmentCreation() {
      const selection = this.quill.getSelection();
      if (!selection || selection.length === 0) {
        alert(i18n.t("error.noSelection"));
        return;
      }

      this.currentSelection = selection;
      this.showModal = true;
    },

    createFragment() {
      if (!this.currentSelection) return;

      const fragmentData = {
        effect: this.selectedEffect,
        index: this.selectedOrder || undefined,
      };

      this.quill.format("fragment", fragmentData);

      // Get selected text
      const selectedText = this.quill.getText(
        this.currentSelection.index,
        this.currentSelection.length
      );

      // Add to fragments list
      const newFragment = {
        id: `fragment-${Date.now()}`,
        text: selectedText,
        ...fragmentData,
      };

      this.fragments.push(newFragment);

      // Emit event
      this.quill.emitter.emit("fragment-created", newFragment);

      this.closeModal();
    },

    closeModal() {
      this.showModal = false;
      this.currentSelection = null;
      this.selectedEffect = "fade-in";
      this.selectedOrder = null;
    },

    exportSlide() {
      const contents = this.quill.getContents();
      const slideHTML = RevealExporter.generateRevealSlide(
        contents,
        "Vue Generated Slide"
      );
      this.exportedHTML = slideHTML;
    },

    exportPresentation() {
      const contents = this.quill.getContents();
      const slideHTML = RevealExporter.generateRevealSlide(
        contents,
        "Vue Generated Slide"
      );
      const presentationHTML = RevealExporter.generateCompletePresentation([
        slideHTML,
      ]);
      this.exportedHTML = presentationHTML;
    },

    clearEditor() {
      this.quill.setText("");
      this.fragments = [];
      this.exportedHTML = "";
    },

    $t(key) {
      return i18n.t(key);
    },
  },
};
</script>

<style scoped>
.container {
  max-width: 800px;
  margin: 40px auto;
  padding: 20px;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
}

.editor-wrapper {
  background: white;
  border-radius: 12px;
  padding: 30px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.title {
  color: #2c3e50;
  margin-bottom: 10px;
}

.subtitle {
  color: #7f8c8d;
  margin-bottom: 30px;
}

.instructions {
  background: #e8f5e8;
  border-left: 4px solid #27ae60;
  padding: 15px;
  margin-bottom: 20px;
  border-radius: 0 6px 6px 0;
}

.editor {
  height: 300px;
  margin-bottom: 20px;
}

.fragments-list {
  margin-bottom: 20px;
}

.fragments-list h3 {
  margin-bottom: 10px;
}

.fragments-list ul {
  list-style-type: disc;
  padding-left: 20px;
}

.fragments-list li {
  margin-bottom: 5px;
}

.export-section {
  margin-top: 30px;
  padding: 20px;
  background: #f8f9fa;
  border-radius: 8px;
}

.buttons {
  display: flex;
  gap: 10px;
  margin-bottom: 15px;
  flex-wrap: wrap;
}

.btn {
  padding: 8px 16px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 500;
  transition: background-color 0.2s;
}

.btn-primary {
  background: #3498db;
  color: white;
}

.btn-primary:hover {
  background: #2980b9;
}

.btn-success {
  background: #27ae60;
  color: white;
}

.btn-success:hover {
  background: #229954;
}

.btn-danger {
  background: #e74c3c;
  color: white;
}

.btn-danger:hover {
  background: #c0392b;
}

.btn-secondary {
  background: #95a5a6;
  color: white;
}

.btn-secondary:hover {
  background: #7f8c8d;
}

.output {
  background: #2c3e50;
  color: #ecf0f1;
  padding: 15px;
  border-radius: 6px;
  overflow: auto;
  max-height: 200px;
  font-size: 12px;
  margin-top: 15px;
}

/* Modal Styles */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10000;
}

.modal-dialog {
  background: white;
  padding: 30px;
  border-radius: 12px;
  max-width: 400px;
  width: 90%;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
}

.modal-dialog h3 {
  margin: 0 0 20px 0;
  color: #2c3e50;
}

.form-group {
  margin-bottom: 15px;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
  font-weight: 500;
}

.form-control {
  width: 100%;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
  box-sizing: border-box;
}

.modal-buttons {
  display: flex;
  gap: 10px;
  justify-content: flex-end;
  margin-top: 20px;
}
</style>
