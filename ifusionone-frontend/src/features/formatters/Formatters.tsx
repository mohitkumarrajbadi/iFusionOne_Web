import  { useState, useEffect  } from 'react';
import SharedEditorLayout from '../../layouts/SharedLayout';
import {
  cppBeautifier, cssBeautifier, goBeautifier, htmlBeautifier,
  javaBeautifier, javascriptBeautifier, jsonBeautifier, pythonBeautifier,
  rubyBeautifier, sqlBeautifier, typescriptBeautifier, xmlBeautifier, yamlBeautifier
} from './formattersUtils';
import { Form } from 'react-router-dom';

const formatterOptions = [
  { label: 'JSON', value: 'json' },
  { label: 'CSS', value: 'css' },
  { label: 'XML', value: 'xml' },
  { label: 'JavaScript', value: 'javascript' },
  { label: 'YAML', value: 'yaml' },
  { label: 'HTML', value: 'html' },
  { label: 'SQL', value: 'sql' },
  { label: 'Python', value: 'python' },
  { label: 'TypeScript', value: 'typescript' },
  { label: 'Ruby', value: 'ruby' },
  { label: 'C/C++', value: 'cpp' },
  { label: 'Go', value: 'go' },
  { label: 'Java', value: 'java' },
];

// Map formatters to avoid switch-case
const formatterMap = {
  json: jsonBeautifier,
  css: cssBeautifier,
  xml: xmlBeautifier,
  javascript: javascriptBeautifier,
  yaml: yamlBeautifier,
  html: htmlBeautifier,
  sql: sqlBeautifier,
  python: pythonBeautifier,
  typescript: typescriptBeautifier,
  ruby: rubyBeautifier,
  cpp: cppBeautifier,
  go: goBeautifier,
  java: javaBeautifier,
};

const Formatters = () => {
  const [inputText, setInputText] = useState('');
  const [formattedText, setFormattedText] = useState('');
  const [formatterType, setFormatterType] = useState(formatterOptions[0]);

  // Load from localStorage
  useEffect(() => {
    const savedInput = localStorage.getItem('beautifier_input');
    const savedOutput = localStorage.getItem('beautifier_output');
    const savedTypeValue = localStorage.getItem('beautifier_type');

    if (savedInput) setInputText(savedInput);
    if (savedOutput) setFormattedText(savedOutput);
    if (savedTypeValue) {
      const found = formatterOptions.find(opt => opt.value === savedTypeValue);
      if (found) 
        setFormatterType(found)
      else
        setFormatterType(formatterOptions[0]); // Fallback to default if not found
    }
  }, []);

  // Save changes to localStorage
  useEffect(() => {
    localStorage.setItem('beautifier_input', inputText);
  }, [inputText]);

  useEffect(() => {
    localStorage.setItem('beautifier_output', formattedText);
  }, [formattedText]);

  useEffect(() => {
    if (formatterType?.value) {
      localStorage.setItem('beautifier_type', formatterType.value);
    }
  }, [formatterType]);

  // Format handler
  const handleFormat = () => {
    const beautifier = formatterMap[formatterType.value as keyof typeof formatterMap];
    const result = beautifier ? beautifier(inputText) : inputText;
    setFormattedText(result);
  };

  return (
    <SharedEditorLayout
      title="🧹 Code Beautifier"
      subtitle="Paste your code, choose type, and beautify"
      options={formatterOptions}
      selected={formatterType}
      onSelectChange={(option) => {
        if (option) setFormatterType(option);
      }}
      inputValue={inputText}
      onInputChange={setInputText}
      outputValue={formattedText}
      onRunClick={handleFormat}
      inputLang={formatterType.value}
      outputLang={formatterType.value}
      buttonLabel="Beautify"
    />
  );
};

export default {
  name: 'Formatter',
  route: '/formatters',
  component: Formatters,
  icon: '🧹',
};

