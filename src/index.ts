/**
 * Quill Reveal Slide - Main Entry Point
 * 
 * A custom Quill.js module for creating and managing reveal.js slide fragments.
 * This module allows users to mark text portions as fragments that can be revealed
 * progressively during presentations.
 * 
 * @author Evren Yeniev
 * @version 1.0.0
 */

// Import the main CSS styles for the module
import "./quill-reveal-slide.css";

// Import core components
import FragmentBlot from "./FragmentBlot";
import FragmentModule from "./FragmentModule";
import { RevealExporter } from "./RevealExporter";
import { i18n } from "./i18n";

// Export all public components for external use
export { FragmentBlot, FragmentModule, RevealExporter, i18n };
