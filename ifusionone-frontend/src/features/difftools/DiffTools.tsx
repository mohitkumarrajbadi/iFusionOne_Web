import { useEffect, useState, useMemo } from 'react';
import Select from 'react-select';
import { DiffEditor, loader, Monaco } from '@monaco-editor/react';

import { options, supportedLanguages } from './DiffToolsUtils';
import { defineMonacoThemes } from '../../hooks/useMonacoEditorCustomTheme';
import { useDetectLanguage } from '../../hooks/useDetectLanguage';
import SharedLayout2 from '../../layouts/SharedLayout2';


const DiffTools = () => {
  const [monacoTheme, setMonacoTheme] = useState('vs-light');
  const [language, setLanguage] = useState('javascript');
  const [original, setOriginal] = useState('');
  const [modified, setModified] = useState('');
  const { detect } = useDetectLanguage();

  // Load Monaco themes
  useEffect(() => {
    loader.init().then((monaco: Monaco) => {
      defineMonacoThemes(monaco);
    });
  }, []);

  // Load saved theme and detect language
  useEffect(() => {
    const savedTheme = localStorage.getItem('monaco-theme') || 'vs-light';
    setMonacoTheme(savedTheme);

    if (original) {
      const detectedLang = detect('input.txt', original);
      if (!language || language === 'plaintext') {
        setLanguage(detectedLang);
      }
    }
  }, [original]);

  const handleFileRead = (
    e: React.ChangeEvent<HTMLInputElement>,
    setContent: (text: string) => void,
    isOriginal: boolean
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      setContent(content);

      const detectedLang = detect(file.name, content);
      if (!language || language === 'plaintext' || !isOriginal) {
        setLanguage(detectedLang);
      }
    };
    reader.readAsText(file);
  };

  const downloadFile = (filename: string, content: string) => {
    const blob = new Blob([content], { type: 'text/plain' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = filename;
    link.click();
  };

  const languageOptions = useMemo(
    () =>
      supportedLanguages.map((lang) => ({
        value: lang,
        label: lang.charAt(0).toUpperCase() + lang.slice(1),
      })),
    []
  );

  return (
    <SharedLayout2
      title="🆚 Diff Tools"
      subtitle="Compare your Code"
      languageSelect={
        <Select
          className="react-select-container"
          classNamePrefix="react-select"
          options={languageOptions}
          value={languageOptions.find((opt) => opt.value === language)}
          onChange={(selected) => setLanguage(selected?.value || 'javascript')}
          isSearchable
        />
      }
      originalFileInput={
        <input type="file" onChange={(e) => handleFileRead(e, setOriginal, true)} />
      }
      modifiedFileInput={
        <input type="file" onChange={(e) => handleFileRead(e, setModified, false)} />
      }
      downloadButton={
        <button
          onClick={() => downloadFile('merged_output.txt', modified)}
          className="diff-button"
        >
          💾 Download Modified
        </button>
      }
      editor={
        <DiffEditor
          original={original}
          modified={modified}
          language={language}
          theme={monacoTheme}
          options={options}
          height="calc(90vh - 3rem)"
        />
      }
    />
  );
};

export default DiffTools;
