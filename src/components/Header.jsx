import { Play, Square, FileCode2, Zap } from 'lucide-react';
import LanguageSelector from './LanguageSelector';

export default function Header({
    filename,
    onFilenameChange,
    isRunning,
    onRun,
    selectedLanguage,
    onLanguageChange,
}) {
    return (
        <header className="header">
            {/* Logo */}
            <div className="header-logo">
                <img
                    src="/vite.svg"
                    alt="CodeAura Logo"
                    width={28}
                    height={28}
                    style={{ filter: 'drop-shadow(0 0 8px var(--accent-glow))' }}
                />
                <span className="header-logo-text">CodeAura</span>
            </div>

            <div className="header-divider" />

            {/* Language Selector */}
            <LanguageSelector selected={selectedLanguage} onChange={onLanguageChange} />

            <div className="header-divider" />

            {/* Filename */}
            <div className="header-filename">
                <FileCode2 size={14} color="var(--text-muted)" />
                <input
                    className="filename-input"
                    value={filename}
                    onChange={(e) => onFilenameChange(e.target.value)}
                    spellCheck={false}
                />
            </div>

            {/* Run button */}
            <div className="header-actions">
                <button
                    className={`btn btn-run ${isRunning ? 'running' : ''}`}
                    onClick={onRun}
                    disabled={isRunning}
                    title={isRunning ? 'Running…' : 'Run (Ctrl+Enter)'}
                >
                    {isRunning ? (
                        <>
                            <Square size={13} />
                            Running…
                        </>
                    ) : (
                        <>
                            <Play size={13} fill="currentColor" />
                            Run
                        </>
                    )}
                </button>
            </div>
        </header>
    );
}
