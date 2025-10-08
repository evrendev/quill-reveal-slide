// React component example
import React, { useEffect, useRef } from 'react';
import Quill from 'quill';
import { TagModule, TagBlot } from 'quill-reveal-slide';
import 'quill/dist/quill.snow.css';
import 'quill-reveal-slide/style.css';

// Register the modules
Quill.register({
  'modules/tag': TagModule,
  'formats/tag': TagBlot,
});

function QuillEditor() {
  const editorRef = useRef(null);
  const quillRef = useRef(null);

  useEffect(() => {
    if (editorRef.current && !quillRef.current) {
      quillRef.current = new Quill(editorRef.current, {
        theme: 'snow',
        modules: {
          toolbar: [
            ['bold', 'italic', 'underline'],
            ['link'],
            [{ 'list': 'ordered'}, { 'list': 'bullet' }]
          ],
          tag: true, // Enable tag module
        },
      });
    }

    return () => {
      if (quillRef.current) {
        quillRef.current = null;
      }
    };
  }, []);

  return (
    <div>
      <h2>My Editor with Tags</h2>
      <div ref={editorRef} style={{ height: '300px' }} />
      <p>Type #hashtag and press space to create tags!</p>
    </div>
  );
}

export default QuillEditor;