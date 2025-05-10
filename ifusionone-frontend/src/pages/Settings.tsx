import { useEffect, useState } from 'react';
import { customThemes } from '../hooks/useMonacoEditorCustomTheme';
import Select, { SingleValue } from 'react-select';
import { Tooltip } from 'react-tooltip';
import { AiOutlineInfoCircle } from 'react-icons/ai';
import '../styles/Settings.css';

interface SelectOption {
  value: string;
  label: string;
}

interface ApplySettingsParams {
  theme: string;
  font: string;
  size: string;
}

const Settings = () => {
  const [theme, setTheme] = useState<string>('light');
  const [font, setFont] = useState<string>("'JetBrains Mono', monospace");
  const [textSize, setTextSize] = useState<string>('medium');
  const [monacoTheme, setMonacoTheme] = useState<string>('vs-light');
  const [monacoFontSize, setMonacoFontSize] = useState<string>('14');

  useEffect(() => {
    const savedTheme = localStorage.getItem('app-theme') || 'light';
    const savedFont = localStorage.getItem('app-font') || "'JetBrains Mono', monospace";
    const savedSize = localStorage.getItem('app-text-size') || 'medium';
    const savedMonacoTheme = localStorage.getItem('monaco-theme') || 'vs-light';
    const savedMonacoFontSize = localStorage.getItem('monaco-font-size') || '14';

    setTheme(savedTheme);
    setFont(savedFont);
    setTextSize(savedSize);
    setMonacoTheme(savedMonacoTheme);
    setMonacoFontSize(savedMonacoFontSize);

    applySettings({ theme: savedTheme, font: savedFont, size: savedSize });
  }, []);

  const applySettings = ({ theme, font, size }: ApplySettingsParams): void => {
    document.body.setAttribute('data-theme', theme);
    document.body.style.fontFamily = font;

    let fontSize = '16px';
    if (size === 'small') fontSize = '14px';
    if (size === 'large') fontSize = '18px';
    document.body.style.fontSize = fontSize;
  };

  const handleThemeChange = (selectedOption: SingleValue<SelectOption>): void => {
    if (selectedOption) {
      setTheme(selectedOption.value);
      localStorage.setItem('app-theme', selectedOption.value);
      applySettings({ theme: selectedOption.value, font, size: textSize });
    }
  };

  const handleFontChange = (selectedOption: SingleValue<SelectOption>): void => {
    if (selectedOption) {
      setFont(selectedOption.value);
      localStorage.setItem('app-font', selectedOption.value);
      applySettings({ theme, font: selectedOption.value, size: textSize });
    }
  };

  const handleTextSizeChange = (selectedOption: SingleValue<SelectOption>): void => {
    if (selectedOption) {
      setTextSize(selectedOption.value);
      localStorage.setItem('app-text-size', selectedOption.value);
      applySettings({ theme, font, size: selectedOption.value });
    }
  };

  const handleMonacoThemeChange = (selectedOption: SingleValue<SelectOption>): void => {
    if (selectedOption) {
      setMonacoTheme(selectedOption.value);
      localStorage.setItem('monaco-theme', selectedOption.value);
    }
  };

  const handleMonacoFontSizeChange = (selectedOption: SingleValue<SelectOption>): void => {
    if (selectedOption) {
      setMonacoFontSize(selectedOption.value);
      localStorage.setItem('monaco-font-size', selectedOption.value);
    }
  };

  const resetSettings = (): void => {
    const defaultTheme = 'light';
    const defaultFont = "'JetBrains Mono', monospace";
    const defaultSize = 'medium';
    const defaultMonacoTheme = 'vs-light';
    const defaultMonacoFontSize = '14';

    setTheme(defaultTheme);
    setFont(defaultFont);
    setTextSize(defaultSize);
    setMonacoTheme(defaultMonacoTheme);
    setMonacoFontSize(defaultMonacoFontSize);

    localStorage.clear();
    applySettings({ theme: defaultTheme, font: defaultFont, size: defaultSize });
  };

  const themeOptions: SelectOption[] = [
    { value: 'light', label: 'Light' },
    { value: 'dark', label: 'Dark' },
  ];

  const fontOptions: SelectOption[] = [
    { value: "'JetBrains Mono', monospace", label: 'JetBrains Mono' },
    { value: "'Courier New', monospace", label: 'Courier New' },
    { value: "'Times New Roman', serif", label: 'Times New Roman' },
    { value: "'Arial', sans-serif", label: 'Arial' },
  ];

  const textSizeOptions: SelectOption[] = [
    { value: 'small', label: 'Small' },
    { value: 'medium', label: 'Medium' },
    { value: 'large', label: 'Large' },
  ];

  const monacoThemeOptions: SelectOption[] = Object.entries(customThemes).map(
    ([name, id]) => ({
      value: id,
      label: name,
    })
  );

  const monacoFontSizeOptions: SelectOption[] = [
    { value: '12', label: '12px' },
    { value: '14', label: '14px' },
    { value: '16', label: '16px' },
    { value: '18', label: '18px' },
  ];

  return (
    <div className="settings-container">
      <h2>Settings</h2>

      <div className="setting-item">
        <label htmlFor="theme-select">
          App Theme
          <AiOutlineInfoCircle className="info-icon" data-tooltip-id="theme-tooltip" data-tooltip-content="Choose between Light or Dark theme for the app UI" />
        </label>
        <Select
          id="theme-select"
          value={themeOptions.find(option => option.value === theme)}
          onChange={handleThemeChange}
          options={themeOptions}
          className="react-select-container"
          classNamePrefix="react-select"
        />
        <Tooltip id="theme-tooltip" />
      </div>

      <div className="setting-item">
        <label htmlFor="font-select">
          Font Style
          <AiOutlineInfoCircle className="info-icon" data-tooltip-id="font-tooltip" data-tooltip-content="Select the font style for your application" />
        </label>
        <Select
          id="font-select"
          value={fontOptions.find(option => option.value === font)}
          onChange={handleFontChange}
          options={fontOptions}
          className="react-select-container"
          classNamePrefix="react-select"
        />
        <Tooltip id="font-tooltip" />
      </div>

      <div className="setting-item">
        <label htmlFor="size-select">
          Text Size
          <AiOutlineInfoCircle className="info-icon" data-tooltip-id="size-tooltip" data-tooltip-content="Adjust the text size for better readability" />
        </label>
        <Select
          id="size-select"
          value={textSizeOptions.find(option => option.value === textSize)}
          onChange={handleTextSizeChange}
          options={textSizeOptions}
          className="react-select-container"
          classNamePrefix="react-select"
        />
        <Tooltip id="size-tooltip" />
      </div>

      <div className="setting-item">
        <label htmlFor="monaco-theme">
          Monaco Theme
          <AiOutlineInfoCircle className="info-icon" data-tooltip-id="monaco-theme-tooltip" data-tooltip-content="Choose a theme for the Monaco editor" />
        </label>
        <Select
          id="monaco-theme"
          value={monacoThemeOptions.find(option => option.value === monacoTheme)}
          onChange={handleMonacoThemeChange}
          options={monacoThemeOptions}
          className="react-select-container"
          classNamePrefix="react-select"
        />
        <Tooltip id="monaco-theme-tooltip" />
      </div>

      <div className="setting-item">
        <label htmlFor="monaco-font-size">
          Monaco Font Size
          <AiOutlineInfoCircle className="info-icon" data-tooltip-id="monaco-font-size-tooltip" data-tooltip-content="Set the font size for the Monaco editor" />
        </label>
        <Select
          id="monaco-font-size"
          value={monacoFontSizeOptions.find(option => option.value === monacoFontSize)}
          onChange={handleMonacoFontSizeChange}
          options={monacoFontSizeOptions}
          className="react-select-container"
          classNamePrefix="react-select"
        />
        <Tooltip id="monaco-font-size-tooltip" />
      </div>

      <div className="setting-item">
        <button className="reset-button" onClick={resetSettings}>
          Reset to Default
        </button>
      </div>

      <div className="preview-area">
        <h3>Live Preview</h3>
        <p>This is how your text will look with current settings.</p>
      </div>
    </div>
  );
};

export default Settings;
