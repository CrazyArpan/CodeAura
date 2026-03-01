import { useRef, useEffect } from 'react';
import { Trash2, ChevronDown, ChevronUp, Terminal, AlertCircle, CheckCircle } from 'lucide-react';

export default function OutputPanel({ output, isRunning, onClear, height, onHeightChange, language = 'Python' }) {
    const contentRef = useRef(null);

    // Auto-scroll to bottom
    useEffect(() => {
        if (contentRef.current) {
            contentRef.current.scrollTop = contentRef.current.scrollHeight;
        }
    }, [output]);

    const hasError = output.some((line) => line.type === 'stderr');
    const hasOutput = output.length > 0;

    return (
        <div className="output-panel" style={{ height }}>
            {/* Header */}
            <div className="output-header">
                <div className="output-tabs">
                    <button className="output-tab active">
                        <Terminal size={12} />
                        Output
                        {hasOutput && (
                            <span
                                className={`output-tab-dot ${hasError ? 'error' : ''}`}
                                style={{ marginLeft: 4 }}
                            />
                        )}
                    </button>
                </div>

                <div className="output-actions">
                    {hasOutput && (
                        <button className="btn-icon" onClick={onClear} data-tooltip="Clear output" title="Clear">
                            <Trash2 size={13} />
                        </button>
                    )}
                </div>
            </div>

            {/* Content */}
            <div className="output-content" ref={contentRef}>
                {isRunning && (
                    <div className="output-spinner">
                        <div className="spinner" />
                        <span>Running {language}…</span>
                    </div>
                )}

                {!isRunning && !hasOutput && (
                    <div className="output-empty">
                        <Terminal size={32} style={{ opacity: 0.3 }} />
                        <span style={{ fontSize: 13, color: 'var(--text-muted)' }}>
                            Run your code to see output here
                        </span>
                        <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>
                            Press <kbd style={{
                                background: 'var(--bg-elevated)',
                                border: '1px solid var(--border-primary)',
                                borderRadius: '3px',
                                padding: '1px 5px',
                                fontFamily: 'JetBrains Mono, monospace',
                                fontSize: 10,
                            }}>Ctrl+Enter</kbd> or click Run
                        </span>
                    </div>
                )}

                {output.map((line, i) => (
                    <div key={i} className={`output-line ${line.type}`}>
                        {line.type === 'stderr' && (
                            <span className="output-prefix">✗</span>
                        )}
                        {line.type === 'success' && (
                            <span className="output-prefix">✓</span>
                        )}
                        {line.type === 'info' && (
                            <span className="output-prefix">›</span>
                        )}
                        <span style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-all' }}>
                            {line.text}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
}
