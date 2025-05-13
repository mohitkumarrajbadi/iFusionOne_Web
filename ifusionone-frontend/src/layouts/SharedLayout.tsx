import React from 'react';
import Select, { SingleValue } from 'react-select';
import MonacoEditor from '../components/MonacoEditor';
import './SharedLayout.css';

type FormatterOption = {
  label: string;
  value: string;
};

interface SharedEditorLayoutProps {
  title: string;
  subtitle: string;
  options: FormatterOption[];
  selected: FormatterOption;
  onSelectChange: (option: SingleValue<FormatterOption>) => void;
  inputValue: string;
  onInputChange: (value: string) => void;
  outputValue: string;
  onRunClick: () => void;
  inputLang: string;
  outputLang: string;
  buttonLabel: string;
}

const SharedEditorLayout: React.FC<SharedEditorLayoutProps> = ({
  title,
  subtitle,
  options,
  selected,
  onSelectChange,
  inputValue,
  onInputChange,
  outputValue,
  onRunClick,
  inputLang,
  outputLang,
  buttonLabel,
}) => {
  return (
    <div className="layout-container">
      <h1 className="title">{title}</h1>
      <p className="subtitle">{subtitle}</p>

      <div className="formatter-type">
        <label htmlFor="selectType">Select:</label>
        <Select
          id="selectType"
          options={options}
          value={selected}
          onChange={onSelectChange}
          className="react-select-container"
          classNamePrefix="react-select"
        />
      </div>

      <div className="input-output-area">
        <div className="input-area">
          <h2 className="subtitle">{inputLang.toUpperCase()}</h2>
          <div className="editor-wrapper">
            <MonacoEditor
              language={inputLang}
              value={inputValue}
              onChange={(value) => onInputChange(value || '')}
              height="65vh"
              width="100%"
            />
          </div>
        </div>
        <div className="output-area">
          <h2 className="subtitle">{outputLang.toUpperCase()}</h2>
          <div className="editor-wrapper">
            <MonacoEditor
              language={outputLang}
              value={outputValue}
              height="65vh"
              width="100%"
              options={{ readOnly: true }}
            />
          </div>
        </div>
      </div>

      <div className="action-buttons">
        <button onClick={onRunClick} className="format-btn">
          {buttonLabel}
        </button>
      </div>
    </div>
  );
};

export default SharedEditorLayout;
