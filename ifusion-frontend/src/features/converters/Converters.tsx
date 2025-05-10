// ../Converters.tsx
import { useEffect, useState, useMemo } from 'react';
import * as ConverterUtils from './ConverterUtils';
import SharedEditorLayout from '../../layouts/SharedLayout';
// import { logEvent } from '../../utils/eventLogger';

// TYPES
interface ConverterOption {
  label: string;
  value: string;
  inputLanguage: string;
  outputLanguage: string;
}

interface ConverterStorageData {
  converterSelected: ConverterOption;
  inputText: string;
  outputText: string;
}

const LOCAL_STORAGE_KEY = 'format-converter';

// CONSTANT: Converter Options
const converters: ConverterOption[] = [
  { label: 'JSON ↔ XML', value: 'jsonXml', inputLanguage: 'json', outputLanguage: 'xml' },
  { label: 'JSON ↔ CSV', value: 'jsonCsv', inputLanguage: 'json', outputLanguage: 'csv' },
  { label: 'JSON ↔ YAML', value: 'jsonYaml', inputLanguage: 'json', outputLanguage: 'yaml' },
  { label: 'JSON ↔ TSV', value: 'jsonTsv', inputLanguage: 'json', outputLanguage: 'tsv' },
  { label: 'JSON ↔ String', value: 'jsonString', inputLanguage: 'json', outputLanguage: 'string' },
  { label: 'JSON ↔ Code', value: 'jsonCode', inputLanguage: 'json', outputLanguage: 'code' },
  { label: 'JSON ↔ Array of Table', value: 'jsonArrayTable', inputLanguage: 'json', outputLanguage: 'arrayTable' },
  { label: 'JSON ↔ PHP', value: 'jsonPhp', inputLanguage: 'json', outputLanguage: 'php' },

  { label: 'XML ↔ JSON', value: 'xmlJson', inputLanguage: 'xml', outputLanguage: 'json' },
  { label: 'XML ↔ CSV', value: 'xmlCsv', inputLanguage: 'xml', outputLanguage: 'csv' },
  { label: 'XML ↔ YAML', value: 'xmlYaml', inputLanguage: 'xml', outputLanguage: 'yaml' },
  { label: 'XML ↔ String', value: 'xmlString', inputLanguage: 'xml', outputLanguage: 'string' },
  { label: 'RSS to JSON', value: 'rssJson', inputLanguage: 'rss', outputLanguage: 'json' },

  { label: 'YAML ↔ JSON', value: 'yamlJson', inputLanguage: 'yaml', outputLanguage: 'json' },
  { label: 'YAML ↔ XML', value: 'yamlXml', inputLanguage: 'yaml', outputLanguage: 'xml' },
  { label: 'YAML ↔ CSV', value: 'yamlCsv', inputLanguage: 'yaml', outputLanguage: 'csv' },

  { label: 'CSV ↔ JSON', value: 'csvJson', inputLanguage: 'csv', outputLanguage: 'json' },
  { label: 'CSV ↔ XML', value: 'csvXml', inputLanguage: 'csv', outputLanguage: 'xml' },
  { label: 'CSV ↔ YAML', value: 'csvYaml', inputLanguage: 'csv', outputLanguage: 'yaml' },
  { label: 'CSV ↔ HTML', value: 'csvHtml', inputLanguage: 'csv', outputLanguage: 'html' },

  { label: 'String ↔ JSON', value: 'stringJson', inputLanguage: 'string', outputLanguage: 'json' },
  { label: 'String Case Converter', value: 'stringCase', inputLanguage: 'string', outputLanguage: 'string' },

  { label: 'HTML to JSX', value: 'htmlToJsx', inputLanguage: 'html', outputLanguage: 'jsx' },
  { label: 'HTML to Markdown', value: 'htmlToMarkdown', inputLanguage: 'html', outputLanguage: 'markdown' },
  { label: 'HTML to Text', value: 'htmlToText', inputLanguage: 'html', outputLanguage: 'text' },

  { label: 'PHP Serializer/Unserializer', value: 'phpSerialize', inputLanguage: 'php', outputLanguage: 'php' },
  { label: 'Number Base Converter (e.g., Hex ↔ ASCII)', value: 'numberBase', inputLanguage: 'hex', outputLanguage: 'ascii' },
  { label: 'SVG to CSS', value: 'svgCss', inputLanguage: 'svg', outputLanguage: 'css' },
  { label: 'cURL to Code', value: 'curlCode', inputLanguage: 'curl', outputLanguage: 'code' },
  { label: 'Color Converter', value: 'colorConverter', inputLanguage: 'color', outputLanguage: 'color' },
];

// 🔁 Map of converter functions (Ensure these are correctly implemented in converter-utils.ts)
const converterFunctionMap: Record<string, (input: string) => string | Promise<string>> = {
  jsonXml: ConverterUtils.jsonToXml,
  jsonYaml: ConverterUtils.jsonToYaml,
  yamlJson: ConverterUtils.yamlToJson,
  jsonCsv: ConverterUtils.jsonToCsv,
  csvJson: ConverterUtils.csvToJson,
  xmlJson: ConverterUtils.xmlToJson,
  htmlToMarkdown: ConverterUtils.htmlToMarkdown,
  htmlToText: ConverterUtils.htmlToText,
  // Add additional mappings as needed...
};

export default function Converters() {
  const [converterSelected, setConverterSelected] = useState<ConverterOption>(converters[0]);
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');

  useEffect(() => {
    const savedData = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (savedData) {
      try {
        const parsed: Partial<ConverterStorageData> = JSON.parse(savedData);
        const matched = converters.find(c => c.value === parsed?.converterSelected?.value);
        if (matched) setConverterSelected(matched);
        if (parsed.inputText) setInputText(parsed.inputText);
        if (parsed.outputText) setOutputText(parsed.outputText);
      } catch (err) {
        console.error('Failed to load saved state:', err);
      }
    }
  }, []);

  useEffect(() => {
    const data: ConverterStorageData = {
      converterSelected,
      inputText,
      outputText,
    };
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(data));
  }, [converterSelected, inputText, outputText]);

  const currentConverter = useMemo(
    () => converters.find(c => c.value === converterSelected.value),
    [converterSelected]
  );

  const handleConversion = async () => {
    const { value } = converterSelected;
    try {
      // logEvent('CONVERTER', 'CONVERT', `Converting using ${label}`);
      const converterFn = converterFunctionMap[value];
      if (!converterFn) throw new Error('No converter function available.');
      const result = await converterFn(inputText);
      setOutputText(result);
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : String(err);
      setOutputText(`❌ Conversion failed:\n${errorMsg}`);
      // logEvent('CONVERTER', 'ERROR', errorMsg, { converter: label });
    }
  };

  // const handleCopy = () => {
  //   if (!outputText) return;
  //   navigator.clipboard.writeText(outputText).then(() => {
  //     alert('✅ Output copied to clipboard!');
  //   });
  // };

  return (
    <SharedEditorLayout
      title="🔁 Format Converter"
      subtitle="Convert between formats like JSON, XML, YAML, CSV and more"
      options={converters}
      selected={converterSelected}
      onSelectChange={(option) => {
        if (option) {
          setConverterSelected(option as ConverterOption);
        }
      }}
      inputValue={inputText}
      onInputChange={setInputText}
      outputValue={outputText}
      onRunClick={handleConversion}
      inputLang={currentConverter?.inputLanguage || 'text'}
      outputLang={currentConverter?.outputLanguage || 'text'}
      buttonLabel="Convert"
      // onCopyClick={handleCopy}
    />
  );
}
