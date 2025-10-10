/**
 * FragmentModule - Quill Module for Fragment Management
 * 
 * This module provides the toolbar functionality and user interaction handlers
 * for creating and managing reveal.js fragments within the Quill editor.
 * It integrates with Quill's toolbar system to provide fragment creation capabilities.
 */

import Quill from "quill";

// Import base Module class from Quill
const Module = Quill.import("core/module");

/**
 * FragmentModule class - Handles fragment creation and toolbar integration
 */
class FragmentModule extends Module {
  /**
   * Initialize the fragment module
   * @param quill - The Quill editor instance
   * @param options - Module configuration options
   */
  constructor(quill: any, options: any) {
    super(quill, options);

    // Add fragment handler to the Quill toolbar
    this.addFragmentHandler();
  }

  /**
   * Integrates the fragment handler with Quill's toolbar system
   * This method adds a custom fragment button handler and sets up event listeners
   */
  addFragmentHandler() {
    const toolbar = this.quill.getModule("toolbar") as any;
    if (toolbar) {
      // Get existing toolbar handlers
      const handlers = toolbar.handlers || {};

      // Add custom fragment handler to the handlers collection
      handlers["custom-fragment"] = () => {
        this.handleFragment();
      };

      // Reassign the updated handlers back to toolbar
      toolbar.handlers = handlers;

      // Add click event listener to the fragment button
      // Using setTimeout to ensure DOM elements are fully rendered
      setTimeout(() => {
        const button = toolbar.container?.querySelector(".ql-custom-fragment");
        if (button && !button.onclick) {
          button.onclick = () => {
            this.handleFragment();
          };
        }
      }, 100);
    }
  }

  /**
   * Handles the fragment creation process
   * This method is called when the user clicks the fragment button in the toolbar
   * It converts the selected text into a reveal.js fragment
   */
  handleFragment() {
    // Get the current text selection in the editor
    const range = this.quill.getSelection(true);
    if (range == null || range.length === 0) return;

    // Extract the selected text
    const text = this.quill.getText(range.index, range.length);
    if (!text.trim()) return;

    // Create fragment configuration object
    const fragmentValue = {
      id: `fragment-${Date.now()}`,    // Generate unique ID using timestamp
      text: text.trim(),               // Clean up whitespace from selected text
      effect: "fade-in",               // Default animation effect
    };

    // Apply fragment formatting to the selected text range
    this.quill.formatText(range.index, range.length, "fragment", fragmentValue);
    
    // Move cursor to the end of the newly created fragment
    this.quill.setSelection(range.index + range.length);
  }
}

export default FragmentModule;
