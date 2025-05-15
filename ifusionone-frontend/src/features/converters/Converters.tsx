import React, { useEffect, useMemo, useState, useCallback } from 'react';
import SharedEditorLayout from '../../layouts/SharedLayout';
import {
  ConverterOption,
  converters,
  ConverterStorageData,
  LOCAL_STORAGE_KEY,
  converterFunctionMap,
} from './constants';

function Converters() {
  const [converterSelected, setConverterSelected] = useState<ConverterOption>(converters[0]);
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');

  useEffect(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (saved) {
        const parsed: Partial<ConverterStorageData> = JSON.parse(saved);
        const matched = converters.find(c => c.value === parsed?.converterSelected?.value);
        if (matched) setConverterSelected(matched);
        if (parsed.inputText) setInputText(parsed.inputText);
        if (parsed.outputText) setOutputText(parsed.outputText);
      }
    } catch (error) {
      console.error('Failed to load saved state:', error);
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

  const handleConversion = useCallback(async () => {
    const converterFn = converterFunctionMap[converterSelected.value];
    if (!converterFn) {
      setOutputText('❌ Conversion failed: No converter function available.');
      return;
    }

    try {
      const result = await converterFn(inputText);
      setOutputText(result);
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : String(error);
      setOutputText(`❌ Conversion failed:\n${errorMsg}`);
    }
  }, [converterSelected.value, inputText]);

  return (
    <SharedEditorLayout
      title="🔁 Format Converter"
      subtitle="Convert between formats like JSON, XML, YAML, CSV and more"
      options={converters}
      selected={converterSelected}
      onSelectChange={(option) => option && setConverterSelected(option as ConverterOption)}
      inputValue={inputText}
      onInputChange={setInputText}
      outputValue={outputText}
      onRunClick={handleConversion}
      inputLang={currentConverter?.inputLanguage || 'text'}
      outputLang={currentConverter?.outputLanguage || 'text'}
      buttonLabel="Convert"
    />
  );
}

export default {
  name: 'Converters',
  route: '/converters',
  component: Converters,
  icon: '🔁',
};
