// React component example for Quill Reveal Slide
import React, { useEffect, useRef, useState } from 'react';
import Quill from 'quill';
import { FragmentBlot, RevealExporter, i18n } from 'quill-reveal-slide';
import 'quill/dist/quill.snow.css';
import 'quill-reveal-slide/style.css';

// Register the fragment format
Quill.register({
  'formats/fragment': FragmentBlot,
});

function QuillFragmentEditor() {
  const editorRef = useRef(null);
  const quillRef = useRef(null);
  const [exportedHTML, setExportedHTML] = useState('');
  const [fragments, setFragments] = useState([]);

  // Fragment creation handler
  const handleFragmentCreation = (quill) => {
    const selection = quill.getSelection();
    if (!selection || selection.length === 0) {
      alert(i18n.t('error.noSelection'));
      return;
    }

    // Get selected text
    const selectedText = quill.getText(selection.index, selection.length);
    
    // Create fragment with default values
    const effect = prompt('Enter fragment effect (fade-in, fade-up, highlight-red, etc.):', 'fade-in');
    const order = prompt('Enter fragment order (optional):');
    
    if (effect) {
      const fragmentData = {
        effect,
        index: order ? parseInt(order) : undefined
      };

      quill.format('fragment', fragmentData);
      
      // Update fragments list
      const newFragment = {
        id: `fragment-${Date.now()}`,
        text: selectedText,
        ...fragmentData
      };
      
      setFragments(prev => [...prev, newFragment]);
      
      // Emit event
      quill.emitter.emit('fragment-created', newFragment);
    }
  };

  useEffect(() => {
    if (editorRef.current && !quillRef.current) {
      quillRef.current = new Quill(editorRef.current, {
        theme: 'snow',
        modules: {
          toolbar: {
            container: [
              ['bold', 'italic', 'underline'],
              ['link'],
              [{ 'list': 'ordered'}, { 'list': 'bullet' }],
              [{ 'custom-fragment': '🎭 Fragment' }]
            ],
            handlers: {
              'custom-fragment': function() {
                handleFragmentCreation(this.quill);
              }
            }
          }
        },
      });

      // Listen to fragment events
      quillRef.current.on('fragment-created', (data) => {
        console.log('Fragment created:', data);
      });

      // Add sample content
      quillRef.current.setText(`Welcome to React + Quill Reveal Slide!

Select any text and click the Fragment button to create animated elements.

This is perfect for creating interactive presentations with React applications.

Try selecting this paragraph and making it a fade-up fragment!`);
    }

    return () => {
      if (quillRef.current) {
        quillRef.current = null;
      }
    };
  }, []);

  // Export functions
  const exportSlide = () => {
    if (quillRef.current) {
      const contents = quillRef.current.getContents();
      const slideHTML = RevealExporter.generateRevealSlide(contents, "React Generated Slide");
      setExportedHTML(slideHTML);
    }
  };

  const exportPresentation = () => {
    if (quillRef.current) {
      const contents = quillRef.current.getContents();
      const slideHTML = RevealExporter.generateRevealSlide(contents, "React Generated Slide");
      const presentationHTML = RevealExporter.generateCompletePresentation([slideHTML]);
      setExportedHTML(presentationHTML);
    }
  };

  const clearEditor = () => {
    if (quillRef.current) {
      quillRef.current.setText('');
      setFragments([]);
      setExportedHTML('');
    }
  };

  return (
    <div style={{ maxWidth: '800px', margin: '40px auto', padding: '20px' }}>
      <div style={{ 
        background: 'white', 
        borderRadius: '12px', 
        padding: '30px', 
        boxShadow: '0 4px 6px rgba(0,0,0,0.1)' 
      }}>
        <h1 style={{ color: '#2c3e50', marginBottom: '10px' }}>
          🎭 React Quill Reveal Slide
        </h1>
        <p style={{ color: '#7f8c8d', marginBottom: '30px' }}>
          Create animated presentation fragments in React
        </p>
        
        <div style={{ 
          background: '#e8f5e8', 
          borderLeft: '4px solid #27ae60', 
          padding: '15px', 
          marginBottom: '20px',
          borderRadius: '0 6px 6px 0' 
        }}>
          <strong>How to use:</strong>
          <ol>
            <li>Select text in the editor</li>
            <li>Click the 🎭 Fragment button</li>
            <li>Enter effect and order</li>
            <li>Export to Reveal.js</li>
          </ol>
        </div>

        <div ref={editorRef} style={{ height: '300px', marginBottom: '20px' }} />
        
        {/* Fragment List */}
        {fragments.length > 0 && (
          <div style={{ marginBottom: '20px' }}>
            <h3>Created Fragments:</h3>
            <ul>
              {fragments.map((fragment, index) => (
                <li key={fragment.id}>
                  <strong>{fragment.effect}</strong> 
                  {fragment.index && ` (order: ${fragment.index})`}: 
                  "{fragment.text.substring(0, 50)}..."
                </li>
              ))}
            </ul>
          </div>
        )}
        
        {/* Export Section */}
        <div style={{ 
          marginTop: '30px', 
          padding: '20px', 
          background: '#f8f9fa', 
          borderRadius: '8px' 
        }}>
          <h3>Export Options</h3>
          <div style={{ display: 'flex', gap: '10px', marginBottom: '15px' }}>
            <button 
              onClick={exportSlide}
              style={{ 
                padding: '8px 16px', 
                border: 'none', 
                borderRadius: '6px', 
                background: '#3498db', 
                color: 'white', 
                cursor: 'pointer' 
              }}
            >
              Export Slide HTML
            </button>
            <button 
              onClick={exportPresentation}
              style={{ 
                padding: '8px 16px', 
                border: 'none', 
                borderRadius: '6px', 
                background: '#27ae60', 
                color: 'white', 
                cursor: 'pointer' 
              }}
            >
              Export Full Presentation
            </button>
            <button 
              onClick={clearEditor}
              style={{ 
                padding: '8px 16px', 
                border: '1px solid #e74c3c', 
                borderRadius: '6px', 
                background: 'white', 
                color: '#e74c3c', 
                cursor: 'pointer' 
              }}
            >
              Clear Editor
            </button>
          </div>
          
          {exportedHTML && (
            <pre style={{ 
              background: '#2c3e50', 
              color: '#ecf0f1', 
              padding: '15px', 
              borderRadius: '6px', 
              overflow: 'auto', 
              maxHeight: '200px',
              fontSize: '12px'
            }}>
              {exportedHTML}
            </pre>
          )}
        </div>
      </div>
    </div>
  );
}

export default QuillFragmentEditor;