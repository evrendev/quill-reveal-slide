/**
 * Development and Demo Module
 * 
 * This module provides development utilities and demo functionality for the
 * Quill Reveal Slide plugin. It handles the initialization of the editor,
 * fragment creation dialogs, and integration with the demo interface.
 * 
 * This file is primarily used for testing and demonstration purposes.
 */

import Quill from "quill";
import "quill/dist/quill.snow.css";
import { FragmentBlot, RevealExporter } from "./index";
import { i18n } from "./i18n";
import "./quill-reveal-slide.css";

/**
 * Handles the fragment button click in the toolbar
 * Shows fragment creation dialog for selected text
 * 
 * @param quill - The Quill editor instance
 */
function handleFragmentButton(quill: Quill) {
  const selection = quill.getSelection();
  if (!selection || selection.length === 0) {
    alert(i18n.t("ui.selectText"));
    return;
  }

  const selectedText = quill.getText(selection.index, selection.length);
  showFragmentDialog(selectedText, (fragmentData) => {
    // Replace selected text with fragment
    quill.deleteText(selection.index, selection.length);
    quill.insertEmbed(selection.index, "fragment", fragmentData);

    // Emit fragment created event for listeners
    quill.emitter.emit("fragment-created", fragmentData);
  });
}

/**
 * Display fragment creation dialog with configuration options
 * 
 * @param selectedText - The text that will become a fragment
 * @param onConfirm - Callback function when fragment is confirmed
 */
function showFragmentDialog(
  selectedText: string,
  onConfirm: (data: any) => void
) {
  // Create modal HTML structure
  const modalHTML = `
    <div id="fragment-modal" style="
      position: fixed; top: 0; left: 0; width: 100%; height: 100%; 
      background: rgba(0,0,0,0.5); z-index: 10000; display: flex; 
      align-items: center; justify-content: center;
    ">
      <div style="
        background: white; padding: 20px; border-radius: 8px; 
        min-width: 400px; box-shadow: 0 4px 12px rgba(0,0,0,0.3);
      ">
        <h3>${i18n.t("dialog.createFragment")}</h3>
        <p><strong>${i18n.t(
          "dialog.selectedText"
        )}</strong> "${selectedText}"</p>
        
        <div style="margin: 15px 0;">
          <label><strong>${i18n.t(
            "dialog.animationEffect"
          )}</strong></label><br>
          <select id="fragment-effect" style="width: 100%; padding: 8px; margin-top: 5px;">
            <option value="fade-in">${i18n.t("effect.fadeIn")}</option>
            <option value="fade-up">${i18n.t("effect.fadeUp")}</option>
            <option value="fade-down">${i18n.t("effect.fadeDown")}</option>
            <option value="fade-left">${i18n.t("effect.fadeLeft")}</option>
            <option value="fade-right">${i18n.t("effect.fadeRight")}</option>
            <option value="fade-out">Fade Out</option>
            <option value="fade-in-then-out">Fade In Then Out</option>
            <option value="highlight-red">${i18n.t(
              "effect.highlightRed"
            )}</option>
            <option value="highlight-green">${i18n.t(
              "effect.highlightGreen"
            )}</option>
            <option value="highlight-blue">${i18n.t(
              "effect.highlightBlue"
            )}</option>
            <option value="grow">Grow</option>
            <option value="shrink">Shrink</option>
            <option value="strike">Strike</option>
          </select>
        </div>
        
        <div style="margin: 15px 0;">
          <label><strong>${i18n.t("dialog.fragmentOrder")}</strong></label><br>
          <input type="number" id="fragment-index" placeholder="1, 2, 3..." 
                 style="width: 100%; padding: 8px; margin-top: 5px;">
        </div>
        
        <div style="margin-top: 20px; text-align: right;">
          <button id="fragment-cancel" style="
            background: #6c757d; color: white; border: none; 
            padding: 8px 16px; margin-right: 10px; border-radius: 4px; cursor: pointer;
          ">${i18n.t("button.cancel")}</button>
          <button id="fragment-confirm" style="
            background: #007bff; color: white; border: none; 
            padding: 8px 16px; border-radius: 4px; cursor: pointer;
          ">${i18n.t("button.createFragment")}</button>
        </div>
      </div>
    </div>
  `;

  // Add modal to DOM
  document.body.insertAdjacentHTML("beforeend", modalHTML);

  // Set up event listeners for modal buttons
  document.getElementById("fragment-cancel")!.onclick = () => {
    document.getElementById("fragment-modal")!.remove();
  };

  document.getElementById("fragment-confirm")!.onclick = () => {
    const effect = (
      document.getElementById("fragment-effect") as HTMLSelectElement
    ).value;
    const indexInput = (
      document.getElementById("fragment-index") as HTMLInputElement
    ).value;
    const index = indexInput ? parseInt(indexInput) : undefined;

    const fragmentData = {
      id: `fragment-${Date.now()}`,
      text: selectedText,
      effect: effect,
      index: index,
    };

    onConfirm(fragmentData);
    document.getElementById("fragment-modal")!.remove();
  };

  // Close modal when clicking outside of it
  document.getElementById("fragment-modal")!.onclick = (e) => {
    if (e.target === document.getElementById("fragment-modal")) {
      document.getElementById("fragment-modal")!.remove();
    }
  };
}

/**
 * Update UI text elements based on current language
 * Finds all elements with data-i18n attribute and updates their content
 */
function updateUIText() {
  const elements = document.querySelectorAll("[data-i18n]");
  elements.forEach((element) => {
    const key = element.getAttribute("data-i18n");
    if (key) {
      element.innerHTML = i18n.t(key);
    }
  });
}

/**
 * Initialize the Quill editor and fragment functionality
 * Sets up the editor with fragment support, event handlers, and UI integration
 */
try {
  // Register the custom fragment blot with Quill
  Quill.register({
    "formats/fragment": FragmentBlot,
  });

  // Initialize Quill editor with fragment support
  const quill = new Quill("#editor", {
    theme: "snow",
    modules: {
      toolbar: {
        container: [
          ["bold", "italic"],
          ["link"],
          [{ "custom-fragment": "Fragment" }], // Custom fragment button
        ],
        handlers: {
          "custom-fragment": function () {
            handleFragmentButton(quill);
          },
        },
      },
    },
  });

  // Set up fragment creation event listener
  quill.on(
    "fragment-created",
    (fragmentData: {
      id: string;
      text: string;
      effect: string;
      index?: number;
    }) => {
      console.log("Fragment created:", fragmentData);

      // Log fragment creation to UI
      const eventsLog = document.getElementById("events-log");
      if (eventsLog) {
        const logEntry = document.createElement("div");
        logEntry.style.padding = "5px";
        logEntry.style.borderBottom = "1px solid #eee";
        logEntry.innerHTML = `
        <strong>Fragment Created:</strong><br>
        Text: "${fragmentData.text}"<br>
        Effect: ${fragmentData.effect}<br>
        ${fragmentData.index ? `Index: ${fragmentData.index}<br>` : ""}
        ID: ${fragmentData.id}
      `;
        eventsLog.appendChild(logEntry);
        eventsLog.scrollTop = eventsLog.scrollHeight;
      }

      // Placeholder for database integration
      // saveFragmentToYourDatabase(fragmentData);
    }
  );

  // Make quill available globally for debugging
  (window as any).quill = quill;

  // Initialize language selector functionality
  const languageSelector = document.getElementById(
    "language-selector"
  ) as HTMLSelectElement;
  if (languageSelector) {
    languageSelector.value = i18n.getCurrentLanguage();
    languageSelector.addEventListener("change", (e) => {
      const newLang = (e.target as HTMLSelectElement).value;
      i18n.setLanguage(newLang);
    });
  }

  // Set up language change listener
  document.addEventListener("language-changed", () => {
    updateUIText();
  });

  // Perform initial UI text update
  updateUIText();

  /**
   * Export functionality for testing and demonstration
   * Converts current editor content to Reveal.js format
   */
  (window as any).exportToReveal = () => {
    const contents = quill.getContents();
    const slideHTML = RevealExporter.generateRevealSlide(contents, "My Slide");
    console.log("Reveal.js Slide HTML:", slideHTML);

    // Display export result in UI
    const eventsLog = document.getElementById("events-log");
    if (eventsLog) {
      const logEntry = document.createElement("div");
      logEntry.style.padding = "10px";
      logEntry.style.background = "#f0f0f0";
      logEntry.style.borderRadius = "4px";
      logEntry.style.marginTop = "10px";
      logEntry.innerHTML = `
        <strong>Exported Reveal.js HTML:</strong><br>
        <pre style="white-space: pre-wrap; font-size: 12px;">${slideHTML}</pre>
      `;
      eventsLog.appendChild(logEntry);
      eventsLog.scrollTop = eventsLog.scrollHeight;
    }

    return slideHTML;
  };
} catch (error) {
  console.error("Error initializing Quill:", error);
}
