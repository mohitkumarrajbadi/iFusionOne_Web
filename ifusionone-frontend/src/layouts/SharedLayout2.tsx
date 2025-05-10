import React from 'react';
import './SharedLayout2.css';

const SharedLayout2 = ({
  title,
  subtitle,
  languageSelect,
  originalFileInput,
  modifiedFileInput,
  downloadButton,
  editor
}: {
  title: string;
  subtitle: string;
  languageSelect: React.ReactNode;
  originalFileInput: React.ReactNode;
  modifiedFileInput: React.ReactNode;
  downloadButton: React.ReactNode;
  editor: React.ReactNode;
}) => {
  return (
    <div className="shared-layout-container diff-wrapper">
      <header className="diff-header">
        <h1 className="title">{title}</h1>
        <p className="subtitle">{subtitle}</p>
      </header>

      <section className="toolbar-section">
        <div className="toolbar-row">
          <label htmlFor="language-select" className="diff-label">📝 Select Language:</label>
          <div id="language-select" className="toolbar-control">
            {languageSelect}
          </div>
        </div>

        <div className="toolbar-row file-row">
          <div className="file-input-group">
            <label htmlFor="original-file" className="diff-label">📂 Original File:</label>
            <div id="original-file" className="toolbar-control">{originalFileInput}</div>
          </div>

          <div className="file-input-group">
            <label htmlFor="modified-file" className="diff-label">📂 Modified File:</label>
            <div id="modified-file" className="toolbar-control">{modifiedFileInput}</div>
          </div>

          <div className="toolbar-control download-button">{downloadButton}</div>
        </div>
      </section>

      <main className="code-editor-area">
        {editor}
      </main>
    </div>
  );
};

export default SharedLayout2;
