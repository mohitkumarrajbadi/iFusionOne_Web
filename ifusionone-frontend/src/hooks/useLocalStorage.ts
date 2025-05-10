// useLocalStorage.ts
import { useState } from 'react';
import { ConverterStorage, FormatterStorage, DiffToolStorage } from '../utils/types';

export enum StorageTemplate {
  CONVERTER = 'CONVERTER',
  DIFFTOOLS = 'DIFFTOOLS',
  ENCODERDECODER = 'ENCODERDECODERTOOL',
  FORMATTER = 'FORMATTER',
  GENERATOR = 'GENERATOR',
  REGEXTOOLS = 'REGEXTOOLS',
}

// Template-to-Data map
type StorageValueMap = {
  [StorageTemplate.CONVERTER]: ConverterStorage;
  [StorageTemplate.FORMATTER]: FormatterStorage;
  [StorageTemplate.DIFFTOOLS]: DiffToolStorage;
  // Add others with specific types
};

export function useLocalStorage<K extends keyof StorageValueMap>(
    key: K,
    initialValue: StorageValueMap[K]
  ) {
    const [storedValue, setStoredValue] = useState<StorageValueMap[K]>(() => {
      try {
        const item = window.localStorage.getItem(key);
        return item ? JSON.parse(item) : initialValue;
      } catch (error) {
        console.error(`Error reading localStorage key "${key}":`, error);
        return initialValue;
      }
    });
  
    const setValue = (value: StorageValueMap[K]) => {
      try {
        const valueToStore =
          typeof value === 'function' ? (value as (arg: StorageValueMap[K]) => StorageValueMap[K])(storedValue) : value;
        setStoredValue(valueToStore);
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      } catch (error) {
        console.error(`Error setting localStorage key "${key}":`, error);
      }
    };
  
    return [storedValue, setValue] as const;
  }
  