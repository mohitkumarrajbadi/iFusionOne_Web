// File: useDetectLanguage.ts
import { useCallback } from 'react';
import hljs from 'highlight.js';

// Your Monaco-supported languages
export const supportedLanguages: string[] = [
  'abap', 'actionscript', 'bash', 'c', 'csharp', 'css', 'dockerfile', 'fsharp', 'go',
  'graphql', 'handlebars', 'html', 'java', 'javascript', 'json', 'julia', 'kotlin',
  'less', 'lua', 'markdown', 'objective-c', 'php', 'python', 'r', 'ruby', 'rust',
  'scala', 'scss', 'sql', 'swift', 'typescript', 'xml', 'yaml', 'vue', 'typescriptreact',
  'plaintext', 'shell', 'latex', 'json5', 'perl', 'powershell', 'visual-basic',
  'clojure', 'haskell', 'ocaml', 'solidity', 'groovy', 'elixir', 'zig'
];

// Extension to Monaco mapping (add more as needed)
const extensionMap: Record<string, string> = {
  js: 'javascript',
  ts: 'typescript',
  tsx: 'typescriptreact',
  jsx: 'javascript',
  py: 'python',
  java: 'java',
  rb: 'ruby',
  cpp: 'cpp',
  c: 'c',
  go: 'go',
  cs: 'csharp',
  php: 'php',
  html: 'html',
  css: 'css',
  json: 'json',
  xml: 'xml',
  yml: 'yaml',
  yaml: 'yaml',
  sh: 'shell',
  md: 'markdown',
  sql: 'sql',
};

export const useDetectLanguage = () => {
  const detect = useCallback((fileName: string, content: string): string => {
    // Extract the file extension
    const ext: string = fileName?.split('.').pop()?.toLowerCase() || '';
    const langFromExt: string | undefined = extensionMap[ext];

    // Check if the language from the extension is supported
    if (langFromExt && supportedLanguages.includes(langFromExt)) {
      return langFromExt;
    }

    // Use highlight.js to auto-detect the language from content
    const hljsResult = hljs.highlightAuto(content);
    const detectedLang: string | undefined = hljsResult.language;

    // Check if the detected language is supported
    if (detectedLang && supportedLanguages.includes(detectedLang)) {
      return detectedLang;
    }

    // Fallback to plaintext if no language is detected
    return 'plaintext';
  }, []);

  return { detect };
};
