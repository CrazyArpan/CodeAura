import { useState } from 'react';
import { FilePlus, Trash2, ChevronRight, FileCode, Settings, HelpCircle, Github } from 'lucide-react';

export default function Sidebar({ files, activeFile, onFileSelect, onNewFile, onDeleteFile }) {
    return (
        <aside className="sidebar">
            {/* Files section */}
            <div className="sidebar-header">
                <span className="sidebar-title">Explorer</span>
                <div className="sidebar-actions">
                    <button
                        className="btn-icon"
                        onClick={onNewFile}
                        data-tooltip="New File"
                        title="New File"
                    >
                        <FilePlus size={14} />
                    </button>
                </div>
            </div>

            <div className="sidebar-content">
                <div style={{ marginBottom: '4px' }}>
                    <div
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '4px',
                            padding: '4px 8px',
                            fontSize: '11px',
                            color: 'var(--text-muted)',
                            fontWeight: 600,
                            textTransform: 'uppercase',
                            letterSpacing: '0.5px',
                        }}
                    >
                        <ChevronRight size={12} />
                        FILES
                    </div>

                    {files.map((file) => (
                        <div
                            key={file.id}
                            className={`file-item ${activeFile === file.id ? 'active' : ''}`}
                            onClick={() => onFileSelect(file.id)}
                        >
                            <span className="file-icon">
                                <FileCode size={14} />
                            </span>
                            <span className="file-name">{file.name}</span>
                            {files.length > 1 && (
                                <button
                                    className="btn-icon"
                                    style={{ width: 20, height: 20, opacity: 0, transition: 'opacity 0.15s' }}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        onDeleteFile(file.id);
                                    }}
                                    onMouseEnter={(e) => (e.currentTarget.style.opacity = 1)}
                                    onMouseLeave={(e) => (e.currentTarget.style.opacity = 0)}
                                >
                                    <Trash2 size={11} />
                                </button>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            {/* Footer nav - Removed as per request */}
        </aside>
    );
}
