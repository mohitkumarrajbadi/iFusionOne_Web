import Editor, { loader, Monaco, OnChange } from '@monaco-editor/react';
import { useEffect, useState } from 'react';
import { defineMonacoThemes } from '../hooks/useMonacoEditorCustomTheme';

interface MonacoEditorProps {
  height?: string;
  width?: string;
  language?: string;
  value?: string;
  onChange?: OnChange;
  options?: any;
}

const MonacoEditor = ({
  height = "500px",
  width = "100%",
  language = "javascript",
  value = "// Start coding...",
  onChange,
  options = {},
}: MonacoEditorProps) => {
  const [monacoTheme, setMonacoTheme] = useState('vs-light');
  const [monacoFontSize, setMonacoFontSize] = useState(14);

  // Load Monaco themes
  useEffect(() => {
    loader.init().then((monaco: Monaco) => {
      defineMonacoThemes(monaco);
    });
  }, []);

  useEffect(() => {
    const savedTheme = localStorage.getItem('monaco-theme') || 'vs-light';
    setMonacoTheme(savedTheme);
    const savedFontSize = parseInt(localStorage.getItem('monaco-font-size') || '14');
    setMonacoFontSize(savedFontSize);
  }, []);

  return (
    <Editor
      height={height}
      width={width}
      language={language}
      value={value}
      theme={monacoTheme}
      onChange={onChange}
      options={{
        fontSize: monacoFontSize,
        minimap: { enabled: false },
        automaticLayout: true,
        ...options,
      }}
    />
  );
};

export default MonacoEditor;
