/**
 * Internationalization (i18n) Module
 * 
 * This module provides multilingual support for the Quill Reveal Slide plugin.
 * It contains translations for UI elements, messages, and instructions in multiple languages.
 * Currently supports: Turkish (tr), English (en), Spanish (es), French (fr), German (de)
 * 
 * @author Evren Yeniev
 * @version 1.0.0
 */

/**
 * Interface defining the structure for translation objects
 * Each translation key maps to an object containing language codes and their respective translations
 */
interface Translations {
  [key: string]: {
    [lang: string]: string;
  };
}

/**
 * Main translations object containing all UI text translations
 * Organized by feature/component for easier maintenance
 */
const translations: Translations = {
  // UI Messages and prompts
  "ui.selectText": {
    tr: "Lütfen fragment yapmak istediğiniz metni seçin!",
    en: "Please select the text you want to make a fragment!",
    es: "¡Por favor selecciona el texto que quieres convertir en fragmento!",
    fr: "Veuillez sélectionner le texte que vous voulez transformer en fragment!",
    de: "Bitte wählen Sie den Text aus, den Sie zu einem Fragment machen möchten!",
  },

  // Dialog Headers and Labels
  "dialog.createFragment": {
    tr: "▣ Fragment Oluştur",
    en: "▣ Create Fragment",
    es: "▣ Crear Fragmento",
    fr: "▣ Créer Fragment",
    de: "▣ Fragment Erstellen",
  },

  "dialog.selectedText": {
    tr: "Seçili Metin:",
    en: "Selected Text:",
    es: "Texto Seleccionado:",
    fr: "Texte Sélectionné:",
    de: "Ausgewählter Text:",
  },

  "dialog.animationEffect": {
    tr: "Animasyon Efekti:",
    en: "Animation Effect:",
    es: "Efecto de Animación:",
    fr: "Effet d'Animation:",
    de: "Animationseffekt:",
  },

  "dialog.fragmentOrder": {
    tr: "Fragment Sırası (opsiyonel):",
    en: "Fragment Order (optional):",
    es: "Orden del Fragmento (opcional):",
    fr: "Ordre du Fragment (optionnel):",
    de: "Fragment-Reihenfolge (optional):",
  },

  // Button Labels
  "button.cancel": {
    tr: "İptal",
    en: "Cancel",
    es: "Cancelar",
    fr: "Annuler",
    de: "Abbrechen",
  },

  "button.createFragment": {
    tr: "Fragment Oluştur",
    en: "Create Fragment",
    es: "Crear Fragmento",
    fr: "Créer Fragment",
    de: "Fragment Erstellen",
  },

  "button.exportToReveal": {
    tr: "📤 Reveal.js'e Aktar",
    en: "📤 Export to Reveal.js",
    es: "📤 Exportar a Reveal.js",
    fr: "📤 Exporter vers Reveal.js",
    de: "📤 Nach Reveal.js Exportieren",
  },

  // Instructions and Help Text
  "instructions.title": {
    tr: "📝 Fragment Nasıl Oluşturulur:",
    en: "📝 How to Create Fragments:",
    es: "📝 Cómo Crear Fragmentos:",
    fr: "📝 Comment Créer des Fragments:",
    de: "📝 Wie man Fragmente erstellt:",
  },

  "instructions.step1": {
    tr: "Metni seçin: Fragment yapmak istediğiniz metni işaretleyin",
    en: "Select text: Highlight the text you want to make a fragment",
    es: "Seleccionar texto: Resalta el texto que quieres convertir en fragmento",
    fr: "Sélectionner le texte: Surlignez le texte que vous voulez transformer en fragment",
    de: "Text auswählen: Markieren Sie den Text, den Sie zu einem Fragment machen möchten",
  },

  "instructions.step2": {
    tr: "Fragment butonuna tıklayın: Toolbar'da ▣ simgesine tıklayın",
    en: "Click fragment button: Click the ▣ icon in the toolbar",
    es: "Hacer clic en el botón de fragmento: Haz clic en el icono ▣ en la barra de herramientas",
    fr: "Cliquez sur le bouton fragment: Cliquez sur l'icône ▣ dans la barre d'outils",
    de: "Fragment-Button klicken: Klicken Sie auf das ▣ Symbol in der Symbolleiste",
  },

  "instructions.step3": {
    tr: "Animasyon seçin: Açılan pencerede istediğiniz efekti seçin",
    en: "Choose animation: Select your desired effect in the dialog",
    es: "Elegir animación: Selecciona el efecto deseado en el diálogo",
    fr: "Choisir l'animation: Sélectionnez l'effet souhaité dans la boîte de dialogue",
    de: "Animation wählen: Wählen Sie den gewünschten Effekt im Dialog",
  },

  "instructions.step4": {
    tr: "Sıra belirtin: (Opsiyonel) Fragment'ın görünme sırasını belirtin",
    en: "Set order: (Optional) Specify the fragment's appearance order",
    es: "Establecer orden: (Opcional) Especifica el orden de aparición del fragmento",
    fr: "Définir l'ordre: (Optionnel) Spécifiez l'ordre d'apparition du fragment",
    de: "Reihenfolge festlegen: (Optional) Geben Sie die Erscheinungsreihenfolge des Fragments an",
  },

  "instructions.step5": {
    tr: 'Oluştur: "Fragment Oluştur" butonuna tıklayın',
    en: 'Create: Click the "Create Fragment" button',
    es: 'Crear: Haz clic en el botón "Crear Fragmento"',
    fr: 'Créer: Cliquez sur le bouton "Créer Fragment"',
    de: 'Erstellen: Klicken Sie auf die Schaltfläche "Fragment Erstellen"',
  },

  "instructions.tip": {
    tr: '💡 İpucu: Fragment oluşturduktan sonra "Reveal.js\'e Aktar" butonu ile Reveal.js formatında export edebilirsiniz.',
    en: '💡 Tip: After creating fragments, you can export them in Reveal.js format using the "Export to Reveal.js" button.',
    es: '💡 Consejo: Después de crear fragmentos, puedes exportarlos en formato Reveal.js usando el botón "Exportar a Reveal.js".',
    fr: '💡 Conseil: Après avoir créé des fragments, vous pouvez les exporter au format Reveal.js en utilisant le bouton "Exporter vers Reveal.js".',
    de: '💡 Tipp: Nach dem Erstellen von Fragmenten können Sie diese im Reveal.js-Format mit der Schaltfläche "Nach Reveal.js Exportieren" exportieren.',
  },

  // Events
  "events.title": {
    tr: "▣ Fragment Events & Export",
    en: "▣ Fragment Events & Export",
    es: "▣ Eventos de Fragmentos y Exportación",
    fr: "▣ Événements de Fragments et Export",
    de: "▣ Fragment-Ereignisse & Export",
  },

  "events.description": {
    tr: "Fragment oluşturulduğunda 'fragment-created' event'i tetiklenir.",
    en: "The 'fragment-created' event is triggered when a fragment is created.",
    es: "El evento 'fragment-created' se activa cuando se crea un fragmento.",
    fr: "L'événement 'fragment-created' est déclenché lors de la création d'un fragment.",
    de: "Das 'fragment-created' Ereignis wird ausgelöst, wenn ein Fragment erstellt wird.",
  },

  // Animation Effects
  "effect.fadeIn": {
    tr: "Fade In (varsayılan)",
    en: "Fade In (default)",
    es: "Fade In (predeterminado)",
    fr: "Fade In (par défaut)",
    de: "Fade In (Standard)",
  },

  "effect.fadeUp": {
    tr: "Yukarı Fade",
    en: "Fade Up",
    es: "Fade Arriba",
    fr: "Fade Vers le Haut",
    de: "Nach Oben Einblenden",
  },

  "effect.fadeDown": {
    tr: "Aşağı Fade",
    en: "Fade Down",
    es: "Fade Abajo",
    fr: "Fade Vers le Bas",
    de: "Nach Unten Einblenden",
  },

  "effect.fadeLeft": {
    tr: "Sola Fade",
    en: "Fade Left",
    es: "Fade Izquierda",
    fr: "Fade Vers la Gauche",
    de: "Nach Links Einblenden",
  },

  "effect.fadeRight": {
    tr: "Sağa Fade",
    en: "Fade Right",
    es: "Fade Derecha",
    fr: "Fade Vers la Droite",
    de: "Nach Rechts Einblenden",
  },

  "effect.highlightRed": {
    tr: "Kırmızı Vurgula",
    en: "Highlight Red",
    es: "Resaltar Rojo",
    fr: "Surligner en Rouge",
    de: "Rot Hervorheben",
  },

  "effect.highlightGreen": {
    tr: "Yeşil Vurgula",
    en: "Highlight Green",
    es: "Resaltar Verde",
    fr: "Surligner en Vert",
    de: "Grün Hervorheben",
  },

  "effect.highlightBlue": {
    tr: "Mavi Vurgula",
    en: "Highlight Blue",
    es: "Resaltar Azul",
    fr: "Surligner en Bleu",
    de: "Blau Hervorheben",
  },

  // Page elements
  "page.title": {
    tr: "▣ Quill Reveal Slide Test",
    en: "▣ Quill Reveal Slide Test",
    es: "▣ Prueba de Quill Reveal Slide",
    fr: "▣ Test Quill Reveal Slide",
    de: "▣ Quill Reveal Slide Test",
  },

  "language.label": {
    tr: "🌐 Dil:",
    en: "🌐 Language:",
    es: "🌐 Idioma:",
    fr: "🌐 Langue:",
    de: "🌐 Sprache:",
  },

  "editor.placeholder": {
    tr: "Fragment editörünü test etmek için buraya yazmaya başlayın...",
    en: "Start typing here to test the fragment editor...",
    es: "Comienza a escribir aquí para probar el editor de fragmentos...",
    fr: "Commencez à taper ici pour tester l'éditeur de fragments...",
    de: "Beginnen Sie hier zu tippen, um den Fragment-Editor zu testen...",
  },

  "button.clearEvents": {
    tr: "🗑️ Olayları Temizle",
    en: "🗑️ Clear Events",
    es: "🗑️ Limpiar Eventos",
    fr: "🗑️ Effacer les Événements",
    de: "🗑️ Ereignisse Löschen",
  },

  "events.log.empty": {
    tr: "Henüz olay yok. Olayları görmek için fragment oluşturun...",
    en: "No events yet. Create some fragments to see events here...",
    es: "Aún no hay eventos. Crea algunos fragmentos para ver eventos aquí...",
    fr: "Aucun événement pour le moment. Créez des fragments pour voir les événements ici...",
    de: "Noch keine Ereignisse. Erstellen Sie Fragmente, um Ereignisse hier zu sehen...",
  },
};

/**
 * I18n Class - Internationalization Manager
 * 
 * Handles language detection, switching, and translation retrieval.
 * Provides methods for managing multilingual support throughout the application.
 */
class I18n {
  private currentLanguage: string = "tr"; // Default language

  /**
   * Initialize the i18n system
   * Detects browser language and loads saved language preference
   */
  constructor() {
    // Detect browser language from navigator
    const browserLang = navigator.language.split("-")[0];
    if (this.isLanguageSupported(browserLang)) {
      this.currentLanguage = browserLang;
    }

    // Load language preference from localStorage
    const savedLang = localStorage.getItem("fragment-editor-language");
    if (savedLang && this.isLanguageSupported(savedLang)) {
      this.currentLanguage = savedLang;
    }
  }

  /**
   * Set the current language and save preference
   * @param lang - Language code to set (must be supported)
   */
  setLanguage(lang: string) {
    if (this.isLanguageSupported(lang)) {
      this.currentLanguage = lang;
      localStorage.setItem("fragment-editor-language", lang);
      this.updateUI();
    }
  }

  /**
   * Get the currently active language code
   * @returns Current language code (e.g., 'en', 'tr', 'es')
   */
  getCurrentLanguage(): string {
    return this.currentLanguage;
  }

  /**
   * Get list of all supported languages with their display information
   * @returns Array of language objects with code, name, and flag
   */
  getSupportedLanguages(): Array<{ code: string; name: string; flag: string }> {
    return [
      { code: "tr", name: "Türkçe", flag: "🇹🇷" },
      { code: "en", name: "English", flag: "🇺🇸" },
      { code: "es", name: "Español", flag: "🇪🇸" },
      { code: "fr", name: "Français", flag: "🇫🇷" },
      { code: "de", name: "Deutsch", flag: "🇩🇪" },
    ];
  }

  /**
   * Check if a language code is supported by the system
   * @param lang - Language code to check
   * @returns True if language is supported, false otherwise
   */
  private isLanguageSupported(lang: string): boolean {
    return this.getSupportedLanguages().some((l) => l.code === lang);
  }

  /**
   * Get translated text for a given key
   * Falls back to English if translation not found, then to the key itself
   * 
   * @param key - Translation key to look up
   * @returns Translated text in current language or fallback
   */
  t(key: string): string {
    const translation = translations[key];
    if (!translation) {
      console.warn(`Translation key not found: ${key}`);
      return key;
    }

    return translation[this.currentLanguage] || translation["en"] || key;
  }

  /**
   * Update UI elements when language changes
   * Dispatches a custom event for UI components to listen for language changes
   */
  private updateUI() {
    // Dispatch event for UI updates
    document.dispatchEvent(
      new CustomEvent("language-changed", {
        detail: { language: this.currentLanguage },
      })
    );
  }
}

// Export singleton instance for use throughout the application
export const i18n = new I18n();
