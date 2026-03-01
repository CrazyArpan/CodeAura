import { useState, useRef, useEffect } from 'react';
import { Bot, X, Send, Sparkles, Bug, Zap, MessageSquare, Code2 } from 'lucide-react';
import { useGemini } from '../hooks/useGemini';
import {
    buildExplainPrompt,
    buildFixBugsPrompt,
    buildOptimizePrompt,
    buildAddCommentsPrompt,
    buildChatPrompt,
} from '../utils/prompts';

const QUICK_ACTIONS = [
    { id: 'explain', label: 'Explain', icon: MessageSquare, color: '#3b82f6' },
    { id: 'fix', label: 'Fix Bugs', icon: Bug, color: '#ef4444' },
    { id: 'optimize', label: 'Optimize', icon: Zap, color: '#f59e0b' },
    { id: 'comments', label: 'Add Comments', icon: Code2, color: '#10b981' },
];

function MessageContent({ content }) {
    // Simple markdown-like rendering
    const parts = content.split(/(```[\s\S]*?```)/g);
    return (
        <div>
            {parts.map((part, i) => {
                if (part.startsWith('```')) {
                    const lines = part.split('\n');
                    const lang = lines[0].replace('```', '').trim();
                    const code = lines.slice(1, -1).join('\n');
                    return (
                        <pre key={i} style={{ margin: '8px 0' }}>
                            <code>{code}</code>
                        </pre>
                    );
                }
                // Render **bold** and `inline code`
                const formatted = part
                    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                    .replace(/`([^`]+)`/g, '<code>$1</code>');
                return (
                    <p
                        key={i}
                        dangerouslySetInnerHTML={{ __html: formatted }}
                        style={{ marginBottom: part.trim() ? '6px' : 0 }}
                    />
                );
            })}
        </div>
    );
}

export default function AIPanel({ onClose, code, lastError, apiKey, onApiKeyChange }) {
    const [messages, setMessages] = useState([
        {
            role: 'assistant',
            content: "Hi! I'm **PyAI**, your Python coding assistant. I can explain your code, fix bugs, optimize performance, or answer any Python questions. What would you like help with?",
        },
    ]);
    const [input, setInput] = useState('');
    const [isStreaming, setIsStreaming] = useState(false);
    const [showApiInput, setShowApiInput] = useState(!apiKey);
    const messagesEndRef = useRef(null);
    const textareaRef = useRef(null);
    const { askAI } = useGemini(apiKey);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const addMessage = (role, content) => {
        setMessages((prev) => [...prev, { role, content }]);
    };

    const handleSend = async (prompt, userLabel) => {
        if (isStreaming) return;
        const label = userLabel || input.trim();
        if (!label) return;

        setInput('');
        addMessage('user', label);
        setIsStreaming(true);

        // Add streaming assistant message
        setMessages((prev) => [...prev, { role: 'assistant', content: '', streaming: true }]);

        try {
            await askAI(prompt || buildChatPrompt(label, code), (chunk, full) => {
                setMessages((prev) => {
                    const updated = [...prev];
                    updated[updated.length - 1] = { role: 'assistant', content: full, streaming: true };
                    return updated;
                });
            });
            // Mark done
            setMessages((prev) => {
                const updated = [...prev];
                updated[updated.length - 1] = { ...updated[updated.length - 1], streaming: false };
                return updated;
            });
        } catch (e) {
            setMessages((prev) => {
                const updated = [...prev];
                updated[updated.length - 1] = {
                    role: 'assistant',
                    content: `⚠️ Error: ${e.message}`,
                    streaming: false,
                };
                return updated;
            });
        } finally {
            setIsStreaming(false);
        }
    };

    const handleQuickAction = (actionId) => {
        if (!code.trim()) {
            addMessage('assistant', '⚠️ Please write some Python code in the editor first!');
            return;
        }
        const prompts = {
            explain: { prompt: buildExplainPrompt(code), label: 'Explain my code' },
            fix: { prompt: buildFixBugsPrompt(code, lastError), label: 'Fix bugs in my code' },
            optimize: { prompt: buildOptimizePrompt(code), label: 'Optimize my code' },
            comments: { prompt: buildAddCommentsPrompt(code), label: 'Add comments to my code' },
        };
        const { prompt, label } = prompts[actionId];
        handleSend(prompt, label);
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend(null, input.trim());
        }
    };

    return (
        <div className="ai-panel">
            {/* Header */}
            <div className="ai-panel-header">
                <div className="ai-panel-title">
                    <Bot size={16} color="var(--accent-light)" />
                    PyAI Assistant
                    <span className="ai-badge">GEMINI</span>
                </div>
                <button className="btn-icon" onClick={onClose} title="Close AI panel">
                    <X size={15} />
                </button>
            </div>

            {/* API Key input */}
            {showApiInput && (
                <div style={{
                    padding: '12px 16px',
                    borderBottom: '1px solid var(--border-secondary)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '8px',
                }}>
                    <label style={{ fontSize: 11, color: 'var(--text-muted)', fontWeight: 600 }}>
                        GEMINI API KEY
                    </label>
                    <div style={{ display: 'flex', gap: '8px' }}>
                        <input
                            type="password"
                            placeholder="AIza..."
                            value={apiKey}
                            onChange={(e) => onApiKeyChange(e.target.value)}
                            style={{
                                flex: 1,
                                background: 'var(--bg-tertiary)',
                                border: '1px solid var(--border-primary)',
                                borderRadius: 'var(--radius-md)',
                                color: 'var(--text-primary)',
                                padding: '6px 10px',
                                fontSize: 12,
                                fontFamily: 'JetBrains Mono, monospace',
                                outline: 'none',
                            }}
                        />
                        <button
                            className="btn btn-primary"
                            style={{ padding: '6px 12px', fontSize: 12 }}
                            onClick={() => setShowApiInput(false)}
                            disabled={!apiKey}
                        >
                            Save
                        </button>
                    </div>
                    <span style={{ fontSize: 10, color: 'var(--text-muted)' }}>
                        Get a free key at{' '}
                        <a href="https://aistudio.google.com" target="_blank" rel="noreferrer"
                            style={{ color: 'var(--accent-light)' }}>
                            aistudio.google.com
                        </a>
                    </span>
                </div>
            )}

            {/* Quick actions */}
            <div className="ai-quick-actions">
                {QUICK_ACTIONS.map((action) => (
                    <button
                        key={action.id}
                        className="quick-action-btn"
                        onClick={() => handleQuickAction(action.id)}
                        disabled={isStreaming}
                    >
                        <action.icon size={11} color={action.color} />
                        {action.label}
                    </button>
                ))}
            </div>

            {/* Messages */}
            <div className="ai-messages">
                {messages.map((msg, i) => (
                    <div key={i} className={`ai-message ${msg.role}`}>
                        <div className="ai-message-role">
                            {msg.role === 'assistant' ? (
                                <>
                                    <Sparkles size={10} />
                                    PyAI
                                </>
                            ) : (
                                'You'
                            )}
                        </div>
                        <div className="ai-message-content">
                            {msg.streaming && !msg.content ? (
                                <div className="typing-indicator">
                                    <div className="typing-dot" />
                                    <div className="typing-dot" />
                                    <div className="typing-dot" />
                                </div>
                            ) : (
                                <MessageContent content={msg.content} />
                            )}
                            {msg.streaming && msg.content && (
                                <span style={{
                                    display: 'inline-block',
                                    width: 8,
                                    height: 14,
                                    background: 'var(--accent-light)',
                                    marginLeft: 2,
                                    animation: 'blink 0.8s ease infinite',
                                    verticalAlign: 'text-bottom',
                                }} />
                            )}
                        </div>
                    </div>
                ))}
                <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="ai-input-area">
                {!apiKey && (
                    <button
                        style={{
                            fontSize: 11,
                            color: 'var(--accent-light)',
                            background: 'none',
                            border: 'none',
                            cursor: 'pointer',
                            textAlign: 'left',
                            padding: 0,
                        }}
                        onClick={() => setShowApiInput(true)}
                    >
                        ⚙ Set API key to enable AI
                    </button>
                )}
                <div className="ai-input-wrapper">
                    <textarea
                        ref={textareaRef}
                        className="ai-input"
                        placeholder="Ask anything about your code…"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={handleKeyDown}
                        rows={1}
                        disabled={isStreaming}
                    />
                    <button
                        className="ai-send-btn"
                        onClick={() => handleSend(null, input.trim())}
                        disabled={isStreaming || !input.trim()}
                    >
                        <Send size={13} />
                    </button>
                </div>
                <span className="ai-hint">Shift+Enter for new line · Enter to send</span>
            </div>
        </div>
    );
}
