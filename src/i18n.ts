// src/i18n.ts

interface Translations {
  [key: string]: {
    [lang: string]: string;
  };
}

const translations: Translations = {
  // UI Messages
  'ui.selectText': {
    'tr': 'Lütfen fragment yapmak istediğiniz metni seçin!',
    'en': 'Please select the text you want to make a fragment!',
    'es': '¡Por favor selecciona el texto que quieres convertir en fragmento!',
    'fr': 'Veuillez sélectionner le texte que vous voulez transformer en fragment!',
    'de': 'Bitte wählen Sie den Text aus, den Sie zu einem Fragment machen möchten!'
  },
  
  // Dialog Headers
  'dialog.createFragment': {
    'tr': '🎭 Fragment Oluştur',
    'en': '🎭 Create Fragment',
    'es': '🎭 Crear Fragmento',
    'fr': '🎭 Créer Fragment',
    'de': '🎭 Fragment Erstellen'
  },
  
  'dialog.selectedText': {
    'tr': 'Seçili Metin:',
    'en': 'Selected Text:',
    'es': 'Texto Seleccionado:',
    'fr': 'Texte Sélectionné:',
    'de': 'Ausgewählter Text:'
  },
  
  'dialog.animationEffect': {
    'tr': 'Animasyon Efekti:',
    'en': 'Animation Effect:',
    'es': 'Efecto de Animación:',
    'fr': 'Effet d\'Animation:',
    'de': 'Animationseffekt:'
  },
  
  'dialog.fragmentOrder': {
    'tr': 'Fragment Sırası (opsiyonel):',
    'en': 'Fragment Order (optional):',
    'es': 'Orden del Fragmento (opcional):',
    'fr': 'Ordre du Fragment (optionnel):',
    'de': 'Fragment-Reihenfolge (optional):'
  },
  
  // Buttons
  'button.cancel': {
    'tr': 'İptal',
    'en': 'Cancel',
    'es': 'Cancelar',
    'fr': 'Annuler',
    'de': 'Abbrechen'
  },
  
  'button.createFragment': {
    'tr': 'Fragment Oluştur',
    'en': 'Create Fragment',
    'es': 'Crear Fragmento',
    'fr': 'Créer Fragment',
    'de': 'Fragment Erstellen'
  },
  
  'button.exportToReveal': {
    'tr': '📤 Reveal.js\'e Aktar',
    'en': '📤 Export to Reveal.js',
    'es': '📤 Exportar a Reveal.js',
    'fr': '📤 Exporter vers Reveal.js',
    'de': '📤 Nach Reveal.js Exportieren'
  },
  
  // Instructions
  'instructions.title': {
    'tr': '📝 Fragment Nasıl Oluşturulur:',
    'en': '📝 How to Create Fragments:',
    'es': '📝 Cómo Crear Fragmentos:',
    'fr': '📝 Comment Créer des Fragments:',
    'de': '📝 Wie man Fragmente erstellt:'
  },
  
  'instructions.step1': {
    'tr': 'Metni seçin: Fragment yapmak istediğiniz metni işaretleyin',
    'en': 'Select text: Highlight the text you want to make a fragment',
    'es': 'Seleccionar texto: Resalta el texto que quieres convertir en fragmento',
    'fr': 'Sélectionner le texte: Surlignez le texte que vous voulez transformer en fragment',
    'de': 'Text auswählen: Markieren Sie den Text, den Sie zu einem Fragment machen möchten'
  },
  
  'instructions.step2': {
    'tr': 'Fragment butonuna tıklayın: Toolbar\'da 🎭 simgesine tıklayın',
    'en': 'Click fragment button: Click the 🎭 icon in the toolbar',
    'es': 'Hacer clic en el botón de fragmento: Haz clic en el icono 🎭 en la barra de herramientas',
    'fr': 'Cliquez sur le bouton fragment: Cliquez sur l\'icône 🎭 dans la barre d\'outils',
    'de': 'Fragment-Button klicken: Klicken Sie auf das 🎭 Symbol in der Symbolleiste'
  },
  
  'instructions.step3': {
    'tr': 'Animasyon seçin: Açılan pencerede istediğiniz efekti seçin',
    'en': 'Choose animation: Select your desired effect in the dialog',
    'es': 'Elegir animación: Selecciona el efecto deseado en el diálogo',
    'fr': 'Choisir l\'animation: Sélectionnez l\'effet souhaité dans la boîte de dialogue',
    'de': 'Animation wählen: Wählen Sie den gewünschten Effekt im Dialog'
  },
  
  'instructions.step4': {
    'tr': 'Sıra belirtin: (Opsiyonel) Fragment\'ın görünme sırasını belirtin',
    'en': 'Set order: (Optional) Specify the fragment\'s appearance order',
    'es': 'Establecer orden: (Opcional) Especifica el orden de aparición del fragmento',
    'fr': 'Définir l\'ordre: (Optionnel) Spécifiez l\'ordre d\'apparition du fragment',
    'de': 'Reihenfolge festlegen: (Optional) Geben Sie die Erscheinungsreihenfolge des Fragments an'
  },
  
  'instructions.step5': {
    'tr': 'Oluştur: "Fragment Oluştur" butonuna tıklayın',
    'en': 'Create: Click the "Create Fragment" button',
    'es': 'Crear: Haz clic en el botón "Crear Fragmento"',
    'fr': 'Créer: Cliquez sur le bouton "Créer Fragment"',
    'de': 'Erstellen: Klicken Sie auf die Schaltfläche "Fragment Erstellen"'
  },
  
  'instructions.tip': {
    'tr': '💡 İpucu: Fragment oluşturduktan sonra "Reveal.js\'e Aktar" butonu ile Reveal.js formatında export edebilirsiniz.',
    'en': '💡 Tip: After creating fragments, you can export them in Reveal.js format using the "Export to Reveal.js" button.',
    'es': '💡 Consejo: Después de crear fragmentos, puedes exportarlos en formato Reveal.js usando el botón "Exportar a Reveal.js".',
    'fr': '💡 Conseil: Après avoir créé des fragments, vous pouvez les exporter au format Reveal.js en utilisant le bouton "Exporter vers Reveal.js".',
    'de': '💡 Tipp: Nach dem Erstellen von Fragmenten können Sie diese im Reveal.js-Format mit der Schaltfläche "Nach Reveal.js Exportieren" exportieren.'
  },
  
  // Events
  'events.title': {
    'tr': '🎭 Fragment Events & Export',
    'en': '🎭 Fragment Events & Export',
    'es': '🎭 Eventos de Fragmentos y Exportación',
    'fr': '🎭 Événements de Fragments et Export',
    'de': '🎭 Fragment-Ereignisse & Export'
  },
  
  'events.description': {
    'tr': 'Fragment oluşturulduğunda \'fragment-created\' event\'i tetiklenir.',
    'en': 'The \'fragment-created\' event is triggered when a fragment is created.',
    'es': 'El evento \'fragment-created\' se activa cuando se crea un fragmento.',
    'fr': 'L\'événement \'fragment-created\' est déclenché lors de la création d\'un fragment.',
    'de': 'Das \'fragment-created\' Ereignis wird ausgelöst, wenn ein Fragment erstellt wird.'
  },
  
  // Animation Effects
  'effect.fadeIn': {
    'tr': 'Fade In (varsayılan)',
    'en': 'Fade In (default)',
    'es': 'Fade In (predeterminado)',
    'fr': 'Fade In (par défaut)',
    'de': 'Fade In (Standard)'
  },
  
  'effect.fadeUp': {
    'tr': 'Yukarı Fade',
    'en': 'Fade Up',
    'es': 'Fade Arriba',
    'fr': 'Fade Vers le Haut',
    'de': 'Nach Oben Einblenden'
  },
  
  'effect.fadeDown': {
    'tr': 'Aşağı Fade',
    'en': 'Fade Down',
    'es': 'Fade Abajo',
    'fr': 'Fade Vers le Bas',
    'de': 'Nach Unten Einblenden'
  },
  
  'effect.fadeLeft': {
    'tr': 'Sola Fade',
    'en': 'Fade Left',
    'es': 'Fade Izquierda',
    'fr': 'Fade Vers la Gauche',
    'de': 'Nach Links Einblenden'
  },
  
  'effect.fadeRight': {
    'tr': 'Sağa Fade',
    'en': 'Fade Right',
    'es': 'Fade Derecha',
    'fr': 'Fade Vers la Droite',
    'de': 'Nach Rechts Einblenden'
  },
  
  'effect.highlightRed': {
    'tr': 'Kırmızı Vurgula',
    'en': 'Highlight Red',
    'es': 'Resaltar Rojo',
    'fr': 'Surligner en Rouge',
    'de': 'Rot Hervorheben'
  },
  
  'effect.highlightGreen': {
    'tr': 'Yeşil Vurgula',
    'en': 'Highlight Green',
    'es': 'Resaltar Verde',
    'fr': 'Surligner en Vert',
    'de': 'Grün Hervorheben'
  },
  
  'effect.highlightBlue': {
    'tr': 'Mavi Vurgula',
    'en': 'Highlight Blue',
    'es': 'Resaltar Azul',
    'fr': 'Surligner en Bleu',
    'de': 'Blau Hervorheben'
  }
};

class I18n {
  private currentLanguage: string = 'tr';
  
  constructor() {
    // Browser dilini algıla
    const browserLang = navigator.language.split('-')[0];
    if (this.isLanguageSupported(browserLang)) {
      this.currentLanguage = browserLang;
    }
    
    // localStorage'dan dil tercihini al
    const savedLang = localStorage.getItem('fragment-editor-language');
    if (savedLang && this.isLanguageSupported(savedLang)) {
      this.currentLanguage = savedLang;
    }
  }
  
  setLanguage(lang: string) {
    if (this.isLanguageSupported(lang)) {
      this.currentLanguage = lang;
      localStorage.setItem('fragment-editor-language', lang);
      this.updateUI();
    }
  }
  
  getCurrentLanguage(): string {
    return this.currentLanguage;
  }
  
  getSupportedLanguages(): Array<{code: string, name: string, flag: string}> {
    return [
      { code: 'tr', name: 'Türkçe', flag: '🇹🇷' },
      { code: 'en', name: 'English', flag: '🇺🇸' },
      { code: 'es', name: 'Español', flag: '🇪🇸' },
      { code: 'fr', name: 'Français', flag: '🇫🇷' },
      { code: 'de', name: 'Deutsch', flag: '🇩🇪' }
    ];
  }
  
  private isLanguageSupported(lang: string): boolean {
    return this.getSupportedLanguages().some(l => l.code === lang);
  }
  
  t(key: string): string {
    const translation = translations[key];
    if (!translation) {
      console.warn(`Translation key not found: ${key}`);
      return key;
    }
    
    return translation[this.currentLanguage] || translation['en'] || key;
  }
  
  private updateUI() {
    // UI güncellemesi için event gönder
    document.dispatchEvent(new CustomEvent('language-changed', {
      detail: { language: this.currentLanguage }
    }));
  }
}

export const i18n = new I18n();