"use client";
import { useState } from 'react';
import { Brain, Send, Paperclip, Mic, FileText, ChevronRight, Zap, Lightbulb } from 'lucide-react';
import styles from './assistant.module.css';
import { post } from '@/lib/api';
import toast from 'react-hot-toast';

export default function AssistantPage() {
    const [messages, setMessages] = useState([
        { role: 'ai', content: 'Hello. I am the CoreNova Intelligence Engine. I have analyzed 142 documents today and monitored 12 active projects. How can I optimize your workflow right now?' }
    ]);
    const [input, setInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);

    const handleSend = async (messageText: string = input) => {
        if (!messageText.trim()) return;

        setMessages(prev => [...prev, { role: 'user', content: messageText }]);
        setInput('');
        setIsTyping(true);

        const normalizedInput = messageText.toLowerCase().trim();
        let aiContent = "CoreNova AI prototype mode active. Advanced AI processing and contextual intelligence will be enabled in the full integration version.";

        if (normalizedInput === "hi" || normalizedInput === "hello") {
            aiContent = "Hello. I am CoreNova AI, your high-performance work intelligence engine. I analyze documents, optimize workflows, and generate actionable insights. How can I assist you today?";
        } else if (normalizedInput === "optimize my workflow") {
            aiContent = "After analyzing your active tasks and connected documents, I recommend prioritizing high-impact tasks with near deadlines. Allocate focused time to 'Review Q3 Financial Model' and 'Draft Marketing Campaign.' Based on current execution speed, two tasks may exceed their deadlines unless workload distribution is adjusted.";
        }

        setTimeout(() => {
            setMessages(prev => [...prev, {
                role: 'ai',
                content: aiContent
            }]);
            setIsTyping(false);

            // Auto-scroll to bottom
            const scrollContainer = document.querySelector(`.${styles.messageScroll}`);
            if (scrollContainer) {
                setTimeout(() => {
                    scrollContainer.scrollTop = scrollContainer.scrollHeight;
                }, 100);
            }
        }, 800);
    };

    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <div>
                    <h1 className={styles.title}>Intelligent Workspace</h1>
                    <p className={styles.subtitle}>Direct Interface to the CoreNova LLM Context Engine</p>
                </div>

                <div className={styles.contextBadge}>
                    <div className={styles.pulseDot}></div>
                    <span>Context: 3 Documents, 5 Tasks Linked</span>
                    <ChevronRight size={16} />
                </div>
            </header>

            <div className={styles.mainLayout}>
                {/* Chat Area */}
                <div className={styles.chatArea}>
                    <div className={styles.messageScroll}>
                        {messages.map((msg, idx) => (
                            <div key={idx} className={`${styles.messageWrapper} ${msg.role === 'ai' ? styles.aiWrapper : styles.userWrapper}`}>
                                {msg.role === 'ai' && (
                                    <div className={styles.avatarAi}>
                                        <Brain size={20} className="accent-text" />
                                    </div>
                                )}
                                <div className={`${styles.messageBubble} ${msg.role === 'ai' ? styles.aiMsg : styles.userMsg}`}>
                                    <p>{msg.content}</p>
                                </div>
                                {msg.role === 'user' && (
                                    <div className={styles.avatarUser}>JD</div>
                                )}
                            </div>
                        ))}

                        {isTyping && (
                            <div className={`${styles.messageWrapper} ${styles.aiWrapper}`}>
                                <div className={styles.avatarAi}>
                                    <Brain size={20} className="accent-text" />
                                </div>
                                <div className={`${styles.messageBubble} ${styles.aiMsg} ${styles.typingIndicator}`}>
                                    <span></span><span></span><span></span>
                                </div>
                            </div>
                        )}
                    </div>

                    <div className={styles.inputArea}>
                        <div className={styles.suggestionsList}>
                            <button className={styles.suggestionBtn} onClick={() => handleSend("Summarize my active Project Alpha documents")}>
                                <FileText size={14} /> Summarize my project
                            </button>
                            <button className={styles.suggestionBtn} onClick={() => handleSend("Generate a presentation outline for the Friday executive meeting based on recent Tasks")}>
                                <Lightbulb size={14} /> Generate presentation outline
                            </button>
                            <button className={styles.suggestionBtn} onClick={() => handleSend("Analyze my current sprint tasks and suggest optimizations")}>
                                <Zap size={14} /> Optimize my workflow
                            </button>
                        </div>

                        <div className={styles.inputBox}>
                            <button className={styles.iconBtn}><Paperclip size={20} /></button>
                            <input
                                type="text"
                                placeholder="Ask CoreNova AI to generate reports, analyze data, or manage tasks..."
                                className={styles.inputField}
                                value={input}
                                onChange={e => setInput(e.target.value)}
                                onKeyDown={e => e.key === 'Enter' && handleSend()}
                            />
                            <button className={styles.iconBtn}><Mic size={20} /></button>
                            <button className={styles.sendBtn} onClick={() => handleSend(input)} disabled={!input.trim()}>
                                <Send size={18} />
                            </button>
                        </div>
                        <p className={styles.inputDisclaimer}>CoreNova AI may produce inaccurate information. Always verify extracted intelligence.</p>
                    </div>
                </div>

                {/* Right Context Panel */}
                <div className={styles.contextPanel}>
                    <div className={styles.panelHeader}>
                        <Layers size={18} className="accent-text" />
                        <h3>Active Context</h3>
                    </div>

                    <div className={styles.contextSection}>
                        <h4>Connected Documents</h4>
                        <div className={styles.contextList}>
                            <div className={styles.contextItem}>
                                <FileText size={16} /> <span className={styles.trunc}>Q3_Financial_Review.pdf</span>
                            </div>
                            <div className={styles.contextItem}>
                                <FileText size={16} /> <span className={styles.trunc}>Project_Alpha_Specs.docx</span>
                            </div>
                            <div className={styles.contextItem}>
                                <FileText size={16} /> <span className={styles.trunc}>Marketing_Campaign_Brief.docx</span>
                            </div>
                        </div>
                    </div>

                    <div className={styles.contextSection}>
                        <h4>Connected Tasks</h4>
                        <div className={styles.contextList}>
                            <div className={styles.contextItem}>
                                <Zap size={16} /> <span className={styles.trunc}>Draft Marketing Campaign Brief</span>
                            </div>
                            <div className={styles.contextItem}>
                                <Zap size={16} /> <span className={styles.trunc}>Review Q3 Financial Modeling</span>
                            </div>
                        </div>
                    </div>

                    <div className={styles.contextSection}>
                        <h4>System Memory</h4>
                        <div className={styles.memoryUsage}>
                            <div className={styles.memoryHeader}>
                                <span>Token Context Limit</span>
                                <span>8.2k / 32k</span>
                            </div>
                            <div className={styles.memoryBar}>
                                <div className={styles.memoryFill} style={{ width: '25%' }}></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

// Mocking Layers from lucide component inline to avoid missing imports
const Layers = ({ size, className }: { size: number, className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><polygon points="12 2 2 7 12 12 22 7 12 2"></polygon><polyline points="2 12 12 17 22 12"></polyline><polyline points="2 17 12 22 22 17"></polyline></svg>
);
