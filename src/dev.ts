// src/dev.ts
import Quill from "quill";
import "quill/dist/quill.snow.css";
import { FragmentBlot, RevealExporter } from "./index";
import "./quill-reveal-slide.css";

// Fragment dialog handler
function handleFragmentButton(quill: Quill) {
  const selection = quill.getSelection();
  if (!selection || selection.length === 0) {
    alert("Lütfen fragment yapmak istediğiniz metni seçin!");
    return;
  }

  const selectedText = quill.getText(selection.index, selection.length);
  showFragmentDialog(selectedText, (fragmentData) => {
    // Seçili metni fragment ile değiştir
    quill.deleteText(selection.index, selection.length);
    quill.insertEmbed(selection.index, "fragment", fragmentData);

    // Fragment created event emit
    quill.emitter.emit("fragment-created", fragmentData);
  });
}

// Fragment dialog göster
function showFragmentDialog(
  selectedText: string,
  onConfirm: (data: any) => void
) {
  // Modal HTML oluştur
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
        <h3>🎭 Fragment Oluştur</h3>
        <p><strong>Seçili Metin:</strong> "${selectedText}"</p>
        
        <div style="margin: 15px 0;">
          <label><strong>Animasyon Efekti:</strong></label><br>
          <select id="fragment-effect" style="width: 100%; padding: 8px; margin-top: 5px;">
            <option value="fade-in">Fade In (varsayılan)</option>
            <option value="fade-up">Fade Up</option>
            <option value="fade-down">Fade Down</option>
            <option value="fade-left">Fade Left</option>
            <option value="fade-right">Fade Right</option>
            <option value="fade-out">Fade Out</option>
            <option value="fade-in-then-out">Fade In Then Out</option>
            <option value="highlight-red">Highlight Red</option>
            <option value="highlight-green">Highlight Green</option>
            <option value="highlight-blue">Highlight Blue</option>
            <option value="grow">Grow</option>
            <option value="shrink">Shrink</option>
            <option value="strike">Strike</option>
          </select>
        </div>
        
        <div style="margin: 15px 0;">
          <label><strong>Fragment Sırası (opsiyonel):</strong></label><br>
          <input type="number" id="fragment-index" placeholder="1, 2, 3..." 
                 style="width: 100%; padding: 8px; margin-top: 5px;">
        </div>
        
        <div style="margin-top: 20px; text-align: right;">
          <button id="fragment-cancel" style="
            background: #6c757d; color: white; border: none; 
            padding: 8px 16px; margin-right: 10px; border-radius: 4px; cursor: pointer;
          ">İptal</button>
          <button id="fragment-confirm" style="
            background: #007bff; color: white; border: none; 
            padding: 8px 16px; border-radius: 4px; cursor: pointer;
          ">Fragment Oluştur</button>
        </div>
      </div>
    </div>
  `;

  // Modal'ı DOM'a ekle
  document.body.insertAdjacentHTML("beforeend", modalHTML);

  // Event listeners
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

  // Modal dışına tıklayınca kapat
  document.getElementById("fragment-modal")!.onclick = (e) => {
    if (e.target === document.getElementById("fragment-modal")) {
      document.getElementById("fragment-modal")!.remove();
    }
  };
}

try {
  Quill.register({
    "formats/fragment": FragmentBlot,
  });

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

  // Fragment created event listener
  quill.on(
    "fragment-created",
    (fragmentData: {
      id: string;
      text: string;
      effect: string;
      index?: number;
    }) => {
      console.log("Fragment created:", fragmentData);

      // Log to UI
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

      // Here you can add your database save logic
      // saveFragmentToYourDatabase(fragmentData);
    }
  );

  (window as any).quill = quill;

  // Export functionality for testing
  (window as any).exportToReveal = () => {
    const contents = quill.getContents();
    const slideHTML = RevealExporter.generateRevealSlide(contents, "My Slide");
    console.log("Reveal.js Slide HTML:", slideHTML);

    // Show in UI
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
