import type * as monaco from 'monaco-editor';

export const options: monaco.editor.IDiffEditorConstructionOptions = {
    // Core behavior
    originalEditable: true,
    readOnly: false,
    renderSideBySide: true,
    automaticLayout: true,
    scrollBeyondLastLine: false,

    // Font & appearance
    fontFamily: 'JetBrains Mono, Fira Code, monospace',
    fontSize: 15,
    fontLigatures: true,
    fontWeight: '500',
    lineHeight: 22,

    // Cursor
    cursorStyle: 'line',
    cursorBlinking: 'smooth',

    // Wrapping & layout
    wordWrap: 'on',
    wordWrapColumn: 80,
    minimap: {
        enabled: false,
    },

    // Diff behavior
    diffAlgorithm: 'advanced', // More accurate diffing
    renderWhitespace: 'boundary',
    renderLineHighlight: 'all',
    folding: true,
    foldingStrategy: 'auto',

    // Suggestions & hints
    suggestOnTriggerCharacters: true,
    suggestSelection: 'recentlyUsed',
    showUnused: true,

    // Accessibility (optional)
    accessibilitySupport: 'on',

    // Performance tuning (optional)
    enableSplitViewResizing: true,
};


export const supportedLanguages = [
    'abap',
    'actionscript',
    'bash',
    'c',
    'csharp',
    'css',
    'dockerfile',
    'fsharp',
    'go',
    'graphql',
    'handlebars',
    'html',
    'java',
    'javascript',
    'json',
    'julia',
    'kotlin',
    'less',
    'lua',
    'markdown',
    'objective-c',
    'php',
    'python',
    'r',
    'ruby',
    'rust',
    'scala',
    'scss',
    'sql',
    'swift',
    'typescript',
    'xml',
    'yaml',
    'vue',
    'typescriptreact',
    'plaintext',
    'shell',
    'latex',
    'json5',
    'perl',
    'powershell',
    'graphql',
    'visual-basic',
    'clojure',
    'haskell',
    'ocaml',
    'solidity',
    'groovy',
    'elixir',
    'zig',
    // Add more languages if needed
];
