import { useState, useEffect, useCallback } from 'react';
import Select from 'react-select';
import './regexTools.css';

const regexOptions = [
  { label: 'Match Pattern', value: 'match' },
  { label: 'Replace Pattern', value: 'replace' },
  { label: 'Split String', value: 'split' },
  { label: 'Test Pattern', value: 'test' },
];

const RegexTools = () => {
  const [selectedOperation, setSelectedOperation] = useState('match');
  const [inputText, setInputText] = useState('');
  const [regexPattern, setRegexPattern] = useState('');
  const [outputText, setOutputText] = useState('');
  const [highlightedText, setHighlightedText] = useState('');
  const [caseSensitive, setCaseSensitive] = useState(false);
  const [replacementText, setReplacementText] = useState('REPLACEMENT');

  const handleRegexOperation = useCallback(() => {
    try {
      const flags = caseSensitive ? 'g' : 'gi';
      const regex = new RegExp(regexPattern, flags);

      let result = '';
      let highlighted = inputText;

      switch (selectedOperation) {
        case 'match':
          const matches = inputText.match(regex);
          result = matches ? matches.join(', ') : 'No matches found';
          highlighted = inputText.replace(regex, match => `<mark>${match}</mark>`);
          break;
        case 'replace':
          result = inputText.replace(regex, replacementText);
          break;
        case 'split':
          result = inputText.split(regex).join(', ');
          break;
        case 'test':
          result = regex.test(inputText) ? '✅ Pattern matches!' : '❌ Pattern does not match';
          break;
        default:
          result = '';
      }

      setOutputText(result);
      setHighlightedText(highlighted);
    } catch (err) {
      setOutputText(`❌ Error: ${err instanceof Error ? err.message : 'An unknown error occurred'}`);
    }
  }, [caseSensitive, inputText, regexPattern, replacementText, selectedOperation]);

  useEffect(() => {
    if (inputText.trim() && regexPattern.trim()) {
      handleRegexOperation();
    } else {
      setOutputText('');
      setHighlightedText('');
    }
  }, [handleRegexOperation]);

  const handleCopy = () => {
    if (!outputText) return;
    navigator.clipboard.writeText(outputText).then(() => {
      alert('✅ Output copied to clipboard!');
    });
  };

  return (
    <div className="regex-tools-container">
      <h1 className="title">🔍 Regex Playground</h1>
      <p className="subtitle">Test, build, and understand your regular expressions visually</p>

      <div className="regex-tools-select">
        <label className="label">Select Operation</label>
        <Select
          options={regexOptions}
          value={regexOptions.find(opt => opt.value === selectedOperation)}
          onChange={(opt) => setSelectedOperation(opt?.value || 'match')}
          classNamePrefix="react-select"
        />
      </div>

      <div className="input-output-area">
        <div className="input-area">
          <label className="label">Input Text</label>
          <textarea
            placeholder="Enter text to test against regex"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
          />
        </div>

        <div className="input-area">
          <label className="label">Regex Pattern</label>
          <input
            type="text"
            placeholder="e.g. \\bword\\b"
            value={regexPattern}
            onChange={(e) => setRegexPattern(e.target.value)}
            className="regex-input"
          />

          <div >
            <input
              type="checkbox"
              checked={caseSensitive}
              onChange={() => setCaseSensitive(!caseSensitive)}
              id="case-sensitive"
            />
            <label htmlFor="case-sensitive" >Case Sensitive</label>
          </div>

          {selectedOperation === 'replace' && (
            <>
              <label className="label" >Replacement Text</label>
              <input
                type="text"
                placeholder="Replacement"
                value={replacementText}
                onChange={(e) => setReplacementText(e.target.value)}
                className="regex-input"
              />
            </>
          )}
        </div>

        <div className="output-area">
          <label className="label">Output</label>
          <textarea readOnly value={outputText} />
          <div className="footer">
            <button onClick={handleCopy} disabled={!outputText}>📋 Copy Output</button>
          </div>
        </div>
      </div>

      {selectedOperation === 'match' && (
        <div>
          <label className="label">Highlighted Result</label>
          <div
            className="highlighted"
            dangerouslySetInnerHTML={{ __html: highlightedText }}
          />
        </div>
      )}
    </div>
  );
};

export default RegexTools;
