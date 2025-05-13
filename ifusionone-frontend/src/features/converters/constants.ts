import * as ConverterUtils from './ConverterUtils';

// TYPES
export interface ConverterOption {
  label: string;
  value: string;
  inputLanguage: string;
  outputLanguage: string;
}

export interface ConverterStorageData {
  converterSelected: ConverterOption;
  inputText: string;
  outputText: string;
}

export const LOCAL_STORAGE_KEY = 'format-converter';

// Converter Options
export const converters: ConverterOption[] = [
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

export const converterFunctionMap: Record<string, (input: string) => string | Promise<string>> = {
  jsonXml: ConverterUtils.jsonToXml,
  jsonYaml: ConverterUtils.jsonToYaml,
  yamlJson: ConverterUtils.yamlToJson,
  jsonCsv: ConverterUtils.jsonToCsv,
  csvJson: ConverterUtils.csvToJson,
  xmlJson: ConverterUtils.xmlToJson,
  htmlToMarkdown: ConverterUtils.htmlToMarkdown,
  htmlToText: ConverterUtils.htmlToText,
  // Add the rest...
};
