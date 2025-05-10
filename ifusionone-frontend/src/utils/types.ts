// types.ts

export interface ConverterStorage {
  input: string;
  output: string;
  conversionType: string;
}

export interface FormatterStorage {
  input: string;
  output: string;
  selectedLanguage: string;
}

export interface DiffToolStorage {
  original: string;
  modified: string;
  selectedLanguage: string;
}

// Add more as needed...
