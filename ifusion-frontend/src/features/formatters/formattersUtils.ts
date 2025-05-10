import { js as jsBeautify, html as htmlBeautify, css as cssBeautify } from 'js-beautify';

export const normalizeWhitespace = (input: string): string =>
  input.replace(/\r\n/g, '\n').replace(/[ \t]+$/gm, '').trim();

export const jsonBeautifier = (input: string): string => {
  try {
    return JSON.stringify(JSON.parse(input), null, 2);
  } catch {
    return 'Invalid JSON';
  }
};

export const xmlBeautifier = (input: string): string => {
    const PADDING = '  '; // 2 spaces
    const reg = /(>)(<)(\/*)/g;
    let xml = input.replace(reg, '$1\n$2$3');
    let pad = 0;
    return xml
      .split('\n')
      .map((node) => {
        if (node.match(/^<\/\w/)) pad -= 1;
        const line = PADDING.repeat(pad) + node.trim();
        if (node.match(/^<\w[^>]*[^\/]>$/)) pad += 1;
        return line;
      })
      .join('\n');
  };
  

export const javascriptBeautifier = (input: string): string =>
  jsBeautify(input, { indent_size: 2, space_in_empty_paren: true });

export const typescriptBeautifier = javascriptBeautifier;
export const javaBeautifier = javascriptBeautifier;
export const cssFormatter = (input: string): string => cssBeautify(input, { indent_size: 2 });
export const htmlFormatter = (input: string): string => htmlBeautify(input, { indent_size: 2 });

export const yamlBeautifier = (input: string): string => normalizeWhitespace(input);
export const sqlBeautifier = (input: string): string =>
  input
    .replace(/SELECT\s+/gi, 'SELECT\n')
    .replace(/FROM\s+/gi, 'FROM\n')
    .replace(/WHERE\s+/gi, 'WHERE\n')
    .replace(/AND\s+/gi, '\nAND ')
    .trim();

export const pythonBeautifier = (input: string): string =>
  normalizeWhitespace(input.replace(/:/g, ':\n  ').replace(/^\s+/gm, ''));

export const rubyBeautifier = pythonBeautifier;
export const cppBeautifier = (input: string): string =>
  normalizeWhitespace(
    input
      .replace(/(\{\s*)/g, '{\n')
      .replace(/(\}\s*)/g, '}\n')
      .replace(/;/g, ';\n')
  );

export const goBeautifier = cppBeautifier;

// New Languages
export const dartBeautifier = javascriptBeautifier;
export const kotlinBeautifier = javascriptBeautifier;
export const swiftBeautifier = javascriptBeautifier;
export const phpBeautifier = (input: string): string =>
  input.replace(/<\?php\s+/g, "<?php\n").replace(/;\s*/g, ';\n');

export const shellBeautifier = (input: string): string =>
  normalizeWhitespace(input.replace(/;/g, ';\n'));

export const htmlBeautifier = (input: string): string => {
    return input.replace(/>\s*</g, '>\n<');
};

export const cssBeautifier = (input: string): string => {
    return input.replace(/\s+/g, ' ').trim().replace(/;/g, ';\n').replace(/\{+/g, ' {\n').replace(/\}+/g, '\n}\n');
};

export const beautifyCode = (language: string, input: string): string => {
    const lang = language.toLowerCase();
    switch (lang) {
      case 'json': return jsonBeautifier(input);
      case 'xml': return xmlBeautifier(input);
      case 'javascript':
      case 'js': return javascriptBeautifier(input);
      case 'typescript':
      case 'ts': return typescriptBeautifier(input);
      case 'html': return htmlFormatter(input);
      case 'css': return cssFormatter(input);
      case 'yaml': return yamlBeautifier(input);
      case 'sql': return sqlBeautifier(input);
      case 'python': return pythonBeautifier(input);
      case 'ruby': return rubyBeautifier(input);
      case 'c':
      case 'cpp':
      case 'c++': return cppBeautifier(input);
      case 'go': return goBeautifier(input);
      case 'java': return javaBeautifier(input);
      case 'dart': return dartBeautifier(input);
      case 'kotlin': return kotlinBeautifier(input);
      case 'swift': return swiftBeautifier(input);
      case 'php': return phpBeautifier(input);
      case 'bash':
      case 'sh':
      case 'shell': return shellBeautifier(input);
      default: return `No beautifier available for language: ${language}`;
    }
  };
  