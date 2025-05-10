import { useState, useEffect ,useCallback} from 'react';
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
        case 'match': {
          const matches = inputText.match(regex);
          result = matches ? matches.join(', ') : 'No matches found';
          highlighted = inputText.replace(regex, match => `<mark>${match}</mark>`);
          break;
        }
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
    <div className="regex-wrapper">
      <header>
        <h1>🔍 Regex Playground</h1>
        <p>Test, build, and understand your regular expressions visually</p>
      </header>

      <div className="controls">
        <label>Select Operation</label>
        <Select
          options={regexOptions}
          value={regexOptions.find(opt => opt.value === selectedOperation)}
          onChange={(opt) => setSelectedOperation(opt?.value || 'match')}
        />
      </div>

      <div className="main-grid">
        <div className="section">
          <label>Input Text</label>
          <textarea
            placeholder="Enter text to test against regex"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
          />
        </div>

        <div className="section">
          <label>Regex Pattern</label>
          <input
            type="text"
            placeholder="e.g. \bword\b"
            value={regexPattern}
            onChange={(e) => setRegexPattern(e.target.value)}
          />
          <div className="checkbox">
            <input
              type="checkbox"
              checked={caseSensitive}
              onChange={() => setCaseSensitive(!caseSensitive)}
            />
            <label>Case Sensitive</label>
          </div>

          {selectedOperation === 'replace' && (
            <>
              <label>Replacement Text</label>
              <input
                type="text"
                placeholder="Replacement"
                value={replacementText}
                onChange={(e) => setReplacementText(e.target.value)}
              />
            </>
          )}
        </div>

        <div className="section">
          <label>Output</label>
          <textarea readOnly value={outputText} />
          <button onClick={handleCopy} disabled={!outputText}>
            📋 Copy Output
          </button>
        </div>

        {selectedOperation === 'match' && (
          <div className="section full-width">
            <label>Highlighted Result</label>
            <div
              className="highlighted"
              dangerouslySetInnerHTML={{ __html: highlightedText }}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default RegexTools;
// Removed conflicting local useCallback function

