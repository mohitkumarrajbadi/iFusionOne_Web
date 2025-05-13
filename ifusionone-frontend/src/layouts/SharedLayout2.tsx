import React from 'react';
import './SharedLayout2.css';

type SharedLayout2Props = {
  title: string;
  subtitle: string;
  languageSelect: React.ReactNode;
  originalFileInput: React.ReactNode;
  modifiedFileInput: React.ReactNode;
  downloadButton: React.ReactNode;
  editor: React.ReactNode;
};

const SharedLayout2 = ({
  title,
  subtitle,
  languageSelect,
  originalFileInput,
  modifiedFileInput,
  downloadButton,
  editor,
}: SharedLayout2Props) => {
  return (
    <div className="shared-layout-container">
      <header className="layout-header">
        <h1 className="layout-title">{title}</h1>
        <p className="layout-subtitle">{subtitle}</p>
      </header>

      <section className="toolbar-section">
        <div className="toolbar-row">
          <label htmlFor="language-select" className="toolbar-label">📝 Language:</label>
          <div id="language-select" className="toolbar-control">{languageSelect}</div>
        </div>

        <div className="toolbar-row file-input-row">
          <div className="file-group">
            <label htmlFor="original-file" className="toolbar-label">📂 Original:</label>
            <div id="original-file" className="toolbar-control">{originalFileInput}</div>
          </div>

          <div className="file-group">
            <label htmlFor="modified-file" className="toolbar-label">📂 Modified:</label>
            <div id="modified-file" className="toolbar-control">{modifiedFileInput}</div>
          </div>

          <div className="toolbar-control">{downloadButton}</div>
        </div>
      </section>

      <main className="editor-container">
        {editor}
      </main>
    </div>
  );
};

export default SharedLayout2;
