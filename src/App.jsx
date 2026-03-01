import { useState, useCallback, useEffect } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import CodeEditor from './components/CodeEditor';
import { FileCode, FileType2, Plus, X } from 'lucide-react';
import OutputPanel from './components/OutputPanel';
import ResizeHandle from './components/ResizeHandle';
import { useJudge0 } from './hooks/useJudge0';
import { LANGUAGES, getLanguage } from './utils/languages';

let fileIdCounter = 2;

function makeDefaultFile(lang) {
  return { name: `main${lang.extension}`, code: lang.defaultCode };
}

export default function App() {
  const [selectedLangId, setSelectedLangId] = useState('python');

  // Dynamic Theme
  useEffect(() => {
    const lang = getLanguage(selectedLangId);
    if (lang.color) {
      document.documentElement.style.setProperty('--accent-primary', lang.color);
    }
  }, [selectedLangId]);

  const [files, setFiles] = useState(() => {
    const lang = getLanguage('python');
    return [{ id: 1, ...makeDefaultFile(lang) }];
  });
  const [activeFileId, setActiveFileId] = useState(1);
  const [output, setOutput] = useState([]);
  const [isRunning, setIsRunning] = useState(false);
  const [outputHeight, setOutputHeight] = useState(240);
  const [showHtmlModal, setShowHtmlModal] = useState(false);

  const { runCode } = useJudge0();

  const activeFile = files.find((f) => f.id === activeFileId) || files[0];

  // Determine actual language context based on selected language and active file extension
  let computedLangId = selectedLangId;
  if (selectedLangId === 'html') {
    if (activeFile.name.endsWith('.css')) computedLangId = 'css';
    else if (activeFile.name.endsWith('.js')) computedLangId = 'js-web';
    else computedLangId = 'html';
  }
  const currentLang = getLanguage(computedLangId);

  const handleLanguageChange = useCallback((langId) => {
    // If we're already in an HTML project and trying to switch to HTML, do nothing
    // unless this is a new file being created from the dropdown
    if (langId === 'html' && selectedLangId !== 'html') {
      setShowHtmlModal(true);
      return;
    }

    const lang = getLanguage(langId);
    setSelectedLangId(langId);

    // Update active file extension & load default code if file is still default
    setFiles((prev) => {
      // If we are switching away from HTML project, just reset the whole workspace to the new language to avoid a bunch of mismatched files.
      if (selectedLangId === 'html') {
        setActiveFileId(1);
        return [{ id: 1, ...makeDefaultFile(lang) }];
      }

      return prev.map((f) => {
        if (f.id !== activeFileId) return f;
        const newName = f.name.replace(/\.[^.]+$/, '') + lang.extension;
        return { ...f, name: newName, code: lang.defaultCode };
      });
    });
    setOutput([]);
  }, [activeFileId, selectedLangId]);

  const handleCreateHtmlProject = (addExtras) => {
    setSelectedLangId('html'); // Ensure dropdown reflects "html"

    if (addExtras) {
      let newId = fileIdCounter++;
      const htmlFile = { id: newId, ...makeDefaultFile(getLanguage('html')), name: 'index.html' };
      newId = fileIdCounter++;
      const cssFile = { id: newId, ...makeDefaultFile(getLanguage('css')), name: 'style.css' };
      newId = fileIdCounter++;
      const jsFile = { id: newId, ...makeDefaultFile(getLanguage('js-web')), name: 'script.js' };

      setFiles([htmlFile, cssFile, jsFile]);
      setActiveFileId(htmlFile.id);
    } else {
      const htmlFile = { id: activeFileId, ...makeDefaultFile(getLanguage('html')), name: 'index.html' };
      setFiles((prev) => prev.map((f) => f.id === activeFileId ? htmlFile : f));
    }
    setOutput([]);
    setShowHtmlModal(false);
  };

  const handleCodeChange = useCallback((value) => {
    setFiles((prev) =>
      prev.map((f) => (f.id === activeFileId ? { ...f, code: value || '' } : f))
    );
  }, [activeFileId]);

  const handleRun = useCallback(async () => {
    if (isRunning) return;
    setIsRunning(true);
    setOutput([{ type: 'info', text: `▶ Running ${activeFile.name} (${currentLang.label})…` }]);

    if (currentLang.id === 'html' || currentLang.id === 'css' || currentLang.id === 'js-web' || activeFile.name.endsWith('.html') || activeFile.name.endsWith('.css') || activeFile.name.endsWith('.js') && selectedLangId === 'html') {
      // Local web execution
      const htmlFile = files.find(f => f.name.endsWith('.html'));
      const cssFile = files.find(f => f.name.endsWith('.css'));
      const jsFile = files.find(f => f.name.endsWith('.js'));

      let htmlContent = htmlFile ? htmlFile.code : '<!DOCTYPE html><html><body></body></html>';

      if (cssFile) {
        htmlContent = htmlContent.replace('</head>', `<style>${cssFile.code}</style></head>`);
      }
      if (jsFile) {
        htmlContent = htmlContent.replace('</body>', `<script>${jsFile.code}</script></body>`);
      }

      const blob = new Blob([htmlContent], { type: 'text/html' });
      const url = URL.createObjectURL(blob);
      window.open(url, '_blank');

      setOutput([
        { type: 'info', text: `▶ Running web project…` },
        { type: 'success', text: `✓ Live preview opened in a new tab.` }
      ]);
      setIsRunning(false);
      return;
    }

    const result = await runCode(activeFile.code, currentLang.judge0Id);

    const newOutput = [{ type: 'info', text: `▶ Running ${activeFile.name} (${currentLang.label})…` }];

    if (result.stdout) {
      result.stdout.split('\n').forEach((line) => {
        if (line !== '') newOutput.push({ type: 'stdout', text: line });
      });
    }

    if (result.stderr) {
      result.stderr.split('\n').forEach((line) => {
        if (line !== '') newOutput.push({ type: 'stderr', text: line });
      });
    }

    // Stats line
    const statsText = [
      result.error ? `✗ ${result.status}` : `✓ ${result.status}`,
      result.time ? `· ${result.time}s` : '',
      result.memory ? `· ${(result.memory / 1024).toFixed(1)} MB` : '',
      `· ${result.elapsed}s total`,
    ].filter(Boolean).join(' ');

    newOutput.push({ type: result.error ? 'stderr' : 'success', text: statsText });

    setOutput(newOutput);
    setIsRunning(false);
  }, [isRunning, activeFile, currentLang, runCode, files, selectedLangId]);

  const handleNewFile = () => {
    const id = fileIdCounter++;
    // Use the actual selected language extension, or fall back to current context if it's not a generic file
    const lang = getLanguage(selectedLangId);
    setFiles((prev) => [...prev, { id, name: `script_${id}${lang.extension}`, code: lang.defaultCode }]);
    setActiveFileId(id);
  };

  const handleDeleteFile = (id) => {
    const remaining = files.filter((f) => f.id !== id);
    setFiles(remaining);
    if (activeFileId === id) setActiveFileId(remaining[0]?.id);
  };

  const handleFilenameChange = (name) => {
    setFiles((prev) =>
      prev.map((f) => (f.id === activeFileId ? { ...f, name } : f))
    );
  };

  return (
    <div className="app-layout">
      <Header
        filename={activeFile.name}
        onFilenameChange={handleFilenameChange}
        isRunning={isRunning}
        onRun={handleRun}
        selectedLanguage={selectedLangId}
        onLanguageChange={handleLanguageChange}
      />

      <div className="main-content">
        <Sidebar
          files={files}
          activeFile={activeFileId}
          onFileSelect={setActiveFileId}
          onNewFile={handleNewFile}
          onDeleteFile={handleDeleteFile}
        />

        <div className="editor-area">
          <div style={{ flex: 1, overflow: 'hidden', minHeight: 0, display: 'flex', flexDirection: 'column' }}>
            <CodeEditor
              value={activeFile.code}
              onChange={handleCodeChange}
              onRun={handleRun}
              filename={activeFile.name}
              language={currentLang.monacoLang}
            />
          </div>

          <ResizeHandle onResize={setOutputHeight} />

          <OutputPanel
            output={output}
            isRunning={isRunning}
            onClear={() => setOutput([])}
            height={outputHeight}
            language={currentLang.label}
          />
        </div>
      </div>

      {/* Status bar */}
      <div className="status-bar">
        <div className="status-item">
          <span style={{ fontSize: 15 }}>{currentLang.icon}</span>
          <span>{currentLang.label}</span>
        </div>
        <div className="status-item" style={{ marginLeft: 'auto' }}>
          <span>UTF-8</span>
        </div>
        <div className="status-item">
          <span>Ln {activeFile.code.split('\n').length}</span>
        </div>
      </div>

      {/* HTML Project Modal */}
      {showHtmlModal && (
        <div className="glass-modal-overlay">
          <div className="glass-modal">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div className="glass-modal-icon">
                <FileType2 size={24} color="#e34f26" />
              </div>
              <button className="btn-icon" onClick={() => setShowHtmlModal(false)} style={{ margin: '-10px -10px 0 0' }}>
                <X size={20} />
              </button>
            </div>

            <div>
              <h2 className="glass-modal-title">Web Project Context</h2>
              <p className="glass-modal-desc">
                Would you like to setup a complete web project including CSS and JavaScript, or just a single HTML file?
              </p>
            </div>

            <div className="glass-modal-options">
              <button
                className="glass-modal-btn glass-modal-btn-primary"
                onClick={() => handleCreateHtmlProject(true)}
              >
                <div className="glass-modal-btn-icon">
                  <Plus size={20} />
                </div>
                <div>
                  <div style={{ fontWeight: 600 }}>Create Full Web Project</div>
                  <div style={{ fontSize: 12, color: 'var(--text-secondary)', marginTop: 2 }}>Includes index.html, style.css, and script.js</div>
                </div>
              </button>

              <button
                className="glass-modal-btn"
                onClick={() => handleCreateHtmlProject(false)}
              >
                <div className="glass-modal-btn-icon">
                  <FileCode size={20} />
                </div>
                <div>
                  <div style={{ fontWeight: 600 }}>HTML File Only</div>
                  <div style={{ fontSize: 12, color: 'var(--text-secondary)', marginTop: 2 }}>Just a single index.html file</div>
                </div>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
