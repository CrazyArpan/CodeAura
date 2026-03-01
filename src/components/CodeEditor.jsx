import { useRef, useEffect } from 'react';
import MonacoEditor from '@monaco-editor/react';

const DEFAULT_OPTIONS = {
    fontSize: 14,
    fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
    fontLigatures: true,
    lineHeight: 22,
    minimap: { enabled: false },
    scrollBeyondLastLine: false,
    smoothScrolling: true,
    cursorBlinking: 'smooth',
    cursorSmoothCaretAnimation: 'on',
    bracketPairColorization: { enabled: true },
    guides: { bracketPairs: true },
    padding: { top: 16, bottom: 16 },
    renderLineHighlight: 'all',
    lineNumbers: 'on',
    glyphMargin: false,
    folding: true,
    wordWrap: 'off',
    tabSize: 4,
    insertSpaces: true,
    autoIndent: 'full',
    formatOnPaste: true,
    formatOnType: true,
    suggest: { showKeywords: true },
    quickSuggestions: true,
    parameterHints: { enabled: true },
};

export default function CodeEditor({ value, onChange, onRun, filename, language = 'python' }) {
    const editorRef = useRef(null);

    const handleMount = (editor, monaco) => {
        editorRef.current = editor;

        // Custom dark theme
        monaco.editor.defineTheme('pyai-dark', {
            base: 'vs-dark',
            inherit: true,
            rules: [
                { token: 'keyword', foreground: 'c792ea', fontStyle: 'italic' },
                { token: 'string', foreground: 'c3e88d' },
                { token: 'number', foreground: 'f78c6c' },
                { token: 'comment', foreground: '546e7a', fontStyle: 'italic' },
                { token: 'type', foreground: 'ffcb6b' },
                { token: 'function', foreground: '82aaff' },
                { token: 'variable', foreground: 'eeffff' },
                { token: 'operator', foreground: '89ddff' },
                { token: 'delimiter', foreground: '89ddff' },
                { token: 'class-name', foreground: 'ffcb6b' },
            ],
            colors: {
                'editor.background': '#0d1117',
                'editor.foreground': '#e6edf3',
                'editor.lineHighlightBackground': '#161b22',
                'editor.selectionBackground': '#264f78',
                'editor.inactiveSelectionBackground': '#1c2128',
                'editorLineNumber.foreground': '#484f58',
                'editorLineNumber.activeForeground': '#8b949e',
                'editorCursor.foreground': '#a78bfa',
                'editor.findMatchBackground': '#7c3aed44',
                'editor.findMatchHighlightBackground': '#7c3aed22',
                'editorBracketMatch.background': '#7c3aed33',
                'editorBracketMatch.border': '#7c3aed',
                'scrollbarSlider.background': '#2d333b',
                'scrollbarSlider.hoverBackground': '#373e47',
                'editorGutter.background': '#0d1117',
                'editorWidget.background': '#161b22',
                'editorSuggestWidget.background': '#161b22',
                'editorSuggestWidget.border': '#30363d',
                'editorSuggestWidget.selectedBackground': '#7c3aed33',
            },
        });

        monaco.editor.setTheme('pyai-dark');

        // Ctrl+Enter / Cmd+Enter to run
        editor.addCommand(
            monaco.KeyMod.CtrlCmd | monaco.KeyCode.Enter,
            () => onRun && onRun()
        );

        editor.focus();
    };

    return (
        <div className="editor-panel" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
            {/* Tab bar */}
            <div className="editor-tabs">
                <div className="editor-tab active">
                    <span className="tab-dot" />
                    {filename || 'main.py'}
                </div>
            </div>

            {/* Monaco */}
            <div style={{ flex: 1, minHeight: 0 }}>
                <MonacoEditor
                    height="100%"
                    language={language}
                    value={value}
                    onChange={onChange}
                    onMount={handleMount}
                    options={DEFAULT_OPTIONS}
                    loading={
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            height: '100%',
                            color: 'var(--text-muted)',
                            fontFamily: 'Inter, sans-serif',
                            gap: '12px',
                        }}>
                            <div className="spinner" />
                            Loading editor…
                        </div>
                    }
                />
            </div>
        </div>
    );
}
