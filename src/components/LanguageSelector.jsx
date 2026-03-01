import { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import { LANGUAGES } from '../utils/languages';

function LangLogo({ logo, label, size = 18 }) {
    return (
        <img
            src={logo}
            alt={label}
            width={size}
            height={size}
            style={{ objectFit: 'contain', flexShrink: 0 }}
            onError={(e) => { e.currentTarget.style.display = 'none'; }}
        />
    );
}

export default function LanguageSelector({ selected, onChange }) {
    const [open, setOpen] = useState(false);
    const ref = useRef(null);
    const lang = LANGUAGES.find((l) => l.id === selected) || LANGUAGES[0];

    useEffect(() => {
        const handleClick = (e) => {
            if (ref.current && !ref.current.contains(e.target)) setOpen(false);
        };
        document.addEventListener('mousedown', handleClick);
        return () => document.removeEventListener('mousedown', handleClick);
    }, []);

    return (
        <div ref={ref} style={{ position: 'relative' }}>
            <button
                onClick={() => setOpen((v) => !v)}
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '5px 12px',
                    background: 'var(--bg-tertiary)',
                    border: '1px solid var(--border-primary)',
                    borderRadius: 'var(--radius-md)',
                    color: 'var(--text-primary)',
                    cursor: 'pointer',
                    fontSize: '13px',
                    fontWeight: 500,
                    transition: 'all var(--transition-fast)',
                    minWidth: '148px',
                }}
                onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = 'var(--accent-primary)';
                    e.currentTarget.style.background = 'var(--accent-subtle)';
                }}
                onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'var(--border-primary)';
                    e.currentTarget.style.background = 'var(--bg-tertiary)';
                }}
            >
                <LangLogo logo={lang.logo} label={lang.label} size={18} />
                <span style={{ flex: 1, textAlign: 'left' }}>{lang.label}</span>
                <ChevronDown
                    size={13}
                    style={{
                        transition: 'transform 0.2s',
                        transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
                        color: 'var(--text-muted)',
                    }}
                />
            </button>

            {open && (
                <div
                    style={{
                        position: 'absolute',
                        top: 'calc(100% + 6px)',
                        left: 0,
                        background: 'var(--bg-elevated)',
                        border: '1px solid var(--border-primary)',
                        borderRadius: 'var(--radius-lg)',
                        boxShadow: 'var(--shadow-lg)',
                        zIndex: 200,
                        minWidth: '180px',
                        overflow: 'hidden',
                        animation: 'slideInUp 0.15s ease',
                    }}
                >
                    {LANGUAGES.filter(l => !l.hidden).map((l) => (
                        <button
                            key={l.id}
                            onClick={() => {
                                onChange(l.id);
                                setOpen(false);
                            }}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '10px',
                                width: '100%',
                                padding: '8px 14px',
                                background: l.id === selected ? 'var(--accent-subtle)' : 'transparent',
                                border: 'none',
                                color: l.id === selected ? 'var(--accent-light)' : 'var(--text-secondary)',
                                cursor: 'pointer',
                                fontSize: '13px',
                                textAlign: 'left',
                                transition: 'all 0.1s',
                            }}
                            onMouseEnter={(e) => {
                                if (l.id !== selected) {
                                    e.currentTarget.style.background = 'var(--bg-hover)';
                                    e.currentTarget.style.color = 'var(--text-primary)';
                                }
                            }}
                            onMouseLeave={(e) => {
                                if (l.id !== selected) {
                                    e.currentTarget.style.background = 'transparent';
                                    e.currentTarget.style.color = 'var(--text-secondary)';
                                }
                            }}
                        >
                            <LangLogo logo={l.logo} label={l.label} size={18} />
                            <span>{l.label}</span>
                            {l.id === selected && (
                                <span style={{ marginLeft: 'auto', fontSize: 10, color: 'var(--accent-light)' }}>✓</span>
                            )}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}
