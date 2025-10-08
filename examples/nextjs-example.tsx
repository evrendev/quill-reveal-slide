// Next.js component example for Quill Reveal Slide
'use client';

import { useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import Head from 'next/head';

// Dynamically import Quill to avoid SSR issues
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });
import 'react-quill/dist/quill.snow.css';

export default function QuillRevealSlidePage() {
  const quillRef = useRef(null);
  const [exportedHTML, setExportedHTML] = useState('');
  const [fragments, setFragments] = useState([]);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    
    // Import Quill modules dynamically
    const loadQuillModules = async () => {
      if (typeof window !== 'undefined') {
        const Quill = (await import('quill')).default;
        const { FragmentBlot, RevealExporter, i18n } = await import('quill-reveal-slide');
        
        // Register the fragment format
        Quill.register('formats/fragment', FragmentBlot);
        
        // Configure custom toolbar
        const toolbarOptions = [
          ['bold', 'italic', 'underline'],
          ['link', 'blockquote'],
          [{ 'list': 'ordered'}, { 'list': 'bullet' }],
          [{ 'header': [1, 2, 3, false] }],
          [{ 'custom-fragment': '🎭 Fragment' }]
        ];

        // Custom toolbar handler
        const handleFragmentCreation = (quill) => {
          const selection = quill.getSelection();
          if (!selection || selection.length === 0) {
            alert('Please select text first!');
            return;
          }

          const selectedText = quill.getText(selection.index, selection.length);
          const effect = prompt('Enter fragment effect:', 'fade-in');
          const order = prompt('Enter fragment order (optional):');
          
          if (effect) {
            const fragmentData = {
              effect,
              index: order ? parseInt(order) : undefined
            };

            quill.format('fragment', fragmentData);
            
            const newFragment = {
              id: `fragment-${Date.now()}`,
              text: selectedText,
              ...fragmentData
            };
            
            setFragments(prev => [...prev, newFragment]);
            quill.emitter.emit('fragment-created', newFragment);
          }
        };

        // Store references for export functions
        window.quillInstance = quillRef.current?.getEditor();
        window.RevealExporter = RevealExporter;
        window.handleFragmentCreation = handleFragmentCreation;
      }
    };

    loadQuillModules();
  }, []);

  const exportSlide = () => {
    if (window.quillInstance && window.RevealExporter) {
      const contents = window.quillInstance.getContents();
      const slideHTML = window.RevealExporter.generateRevealSlide(contents, "Next.js Generated Slide");
      setExportedHTML(slideHTML);
    }
  };

  const exportPresentation = () => {
    if (window.quillInstance && window.RevealExporter) {
      const contents = window.quillInstance.getContents();
      const slideHTML = window.RevealExporter.generateRevealSlide(contents, "Next.js Generated Slide");
      const presentationHTML = window.RevealExporter.generateCompletePresentation([slideHTML]);
      setExportedHTML(presentationHTML);
    }
  };

  const handleChange = (content, delta, source, editor) => {
    // Handle content changes if needed
  };

  const modules = {
    toolbar: {
      container: [
        ['bold', 'italic', 'underline'],
        ['link', 'blockquote'],
        [{ 'list': 'ordered'}, { 'list': 'bullet' }],
        [{ 'header': [1, 2, 3, false] }],
        [{ 'custom-fragment': '🎭 Fragment' }]
      ],
      handlers: {
        'custom-fragment': function() {
          if (window.handleFragmentCreation) {
            window.handleFragmentCreation(this.quill);
          }
        }
      }
    }
  };

  if (!isClient) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Head>
        <title>Quill Reveal Slide - Next.js Example</title>
        <meta name="description" content="Next.js integration example for Quill Reveal Slide" />
        <link href="/quill-reveal-slide.css" rel="stylesheet" />
      </Head>
      
      <div style={{ maxWidth: '1000px', margin: '40px auto', padding: '20px' }}>
        <div style={{ 
          background: 'white', 
          borderRadius: '16px', 
          padding: '40px', 
          boxShadow: '0 8px 32px rgba(0,0,0,0.1)' 
        }}>
          <h1 style={{ 
            color: '#2c3e50', 
            marginBottom: '10px',
            fontSize: '2.5rem',
            textAlign: 'center'
          }}>
            🎭 Next.js + Quill Reveal Slide
          </h1>
          
          <p style={{ 
            color: '#7f8c8d', 
            marginBottom: '40px',
            textAlign: 'center',
            fontSize: '1.2rem'
          }}>
            Server-side rendering compatible fragment editor
          </p>
          
          <div style={{ 
            background: 'linear-gradient(135deg, #e8f5e8 0%, #f0f9f0 100%)', 
            borderLeft: '4px solid #27ae60', 
            padding: '20px', 
            marginBottom: '30px',
            borderRadius: '0 12px 12px 0' 
          }}>
            <h3 style={{ color: '#27ae60', marginBottom: '15px' }}>
              🚀 Next.js Integration Features
            </h3>
            <ul style={{ paddingLeft: '20px' }}>
              <li><strong>SSR Compatible:</strong> Dynamically loaded to avoid hydration issues</li>
              <li><strong>TypeScript Ready:</strong> Full type support included</li>
              <li><strong>Production Optimized:</strong> Code splitting and lazy loading</li>
              <li><strong>SEO Friendly:</strong> Works with Next.js App Router</li>
            </ul>
          </div>

          <div style={{ marginBottom: '30px' }}>
            <ReactQuill
              ref={quillRef}
              theme="snow"
              modules={modules}
              onChange={handleChange}
              defaultValue={`Welcome to Next.js + Quill Reveal Slide! 

This example shows how to integrate Quill Reveal Slide with Next.js applications.

Key benefits of this integration:
• Server-side rendering compatible
• Automatic code splitting
• TypeScript support
• Production optimized

Select any text above and click the Fragment button to create animated elements for your Reveal.js presentations.

Perfect for creating educational content, marketing presentations, or interactive storytelling!`}
              style={{ 
                height: '300px',
                marginBottom: '50px'
              }}
            />
          </div>
          
          {/* Fragments List */}
          {fragments.length > 0 && (
            <div style={{ 
              background: '#f8f9fa', 
              padding: '20px', 
              borderRadius: '12px',
              marginBottom: '30px'
            }}>
              <h3 style={{ marginBottom: '15px', color: '#2c3e50' }}>
                📋 Created Fragments ({fragments.length})
              </h3>
              <div style={{ display: 'grid', gap: '10px' }}>
                {fragments.map((fragment, index) => (
                  <div 
                    key={fragment.id}
                    style={{ 
                      background: 'white',
                      padding: '15px',
                      borderRadius: '8px',
                      borderLeft: '3px solid #3498db',
                      boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                    }}
                  >
                    <div style={{ 
                      fontWeight: 'bold', 
                      color: '#3498db',
                      marginBottom: '5px'
                    }}>
                      {fragment.effect}
                      {fragment.index && ` (order: ${fragment.index})`}
                    </div>
                    <div style={{ 
                      fontSize: '14px', 
                      color: '#7f8c8d' 
                    }}>
                      "{fragment.text.length > 80 ? fragment.text.substring(0, 80) + '...' : fragment.text}"
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {/* Export Section */}
          <div style={{ 
            background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)', 
            padding: '30px', 
            borderRadius: '12px' 
          }}>
            <h3 style={{ 
              marginBottom: '20px', 
              color: '#2c3e50',
              fontSize: '1.4rem'
            }}>
              📤 Export to Reveal.js
            </h3>
            
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
              gap: '15px', 
              marginBottom: '20px' 
            }}>
              <button 
                onClick={exportSlide}
                style={{ 
                  padding: '15px 25px', 
                  border: 'none', 
                  borderRadius: '10px', 
                  background: 'linear-gradient(135deg, #3498db 0%, #2980b9 100%)', 
                  color: 'white', 
                  cursor: 'pointer',
                  fontWeight: '600',
                  fontSize: '14px',
                  transition: 'transform 0.2s ease'
                }}
                onMouseOver={(e) => e.target.style.transform = 'translateY(-2px)'}
                onMouseOut={(e) => e.target.style.transform = 'translateY(0)'}
              >
                📄 Export Single Slide
              </button>
              
              <button 
                onClick={exportPresentation}
                style={{ 
                  padding: '15px 25px', 
                  border: 'none', 
                  borderRadius: '10px', 
                  background: 'linear-gradient(135deg, #27ae60 0%, #229954 100%)', 
                  color: 'white', 
                  cursor: 'pointer',
                  fontWeight: '600',
                  fontSize: '14px',
                  transition: 'transform 0.2s ease'
                }}
                onMouseOver={(e) => e.target.style.transform = 'translateY(-2px)'}
                onMouseOut={(e) => e.target.style.transform = 'translateY(0)'}
              >
                📊 Export Full Presentation
              </button>
            </div>
            
            {exportedHTML && (
              <div>
                <h4 style={{ marginBottom: '10px', color: '#2c3e50' }}>
                  Generated HTML:
                </h4>
                <pre style={{ 
                  background: '#2c3e50', 
                  color: '#ecf0f1', 
                  padding: '20px', 
                  borderRadius: '8px', 
                  overflow: 'auto', 
                  maxHeight: '300px',
                  fontSize: '12px',
                  lineHeight: '1.4'
                }}>
                  {exportedHTML}
                </pre>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

// Usage instructions for package.json
/*
Add these dependencies to your Next.js project:

{
  "dependencies": {
    "next": "^14.0.0",
    "react": "^18.0.0",
    "react-dom": "^18.0.0",
    "react-quill": "^2.0.0",
    "quill": "^2.0.3",
    "quill-reveal-slide": "^1.0.0"
  }
}

And add this to your next.config.js:

module.exports = {
  transpilePackages: ['quill-reveal-slide'],
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      'quill': 'quill/dist/quill.js'
    };
    return config;
  }
};
*/