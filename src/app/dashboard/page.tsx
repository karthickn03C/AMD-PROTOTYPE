import { Brain, TrendingUp, AlertCircle, FileText, CheckCircle2 } from 'lucide-react';
import styles from './dashboard.module.css';

export default function DashboardPage() {
    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <div>
                    <h1 className={styles.title}>Command Center</h1>
                    <p className={styles.subtitle}>Welcome back. Here is your operational overview.</p>
                </div>
                <div className={styles.aiBadge}>
                    <Brain size={18} className="accent-text" />
                    <span>Intelligence Engine Active</span>
                </div>
            </header>

            {/* Top Stats */}
            <div className={styles.statsGrid}>
                <div className={`glass-panel ${styles.statCard}`}>
                    <div className={styles.statHeader}>
                        <h3>Productivity Score</h3>
                        <TrendingUp size={20} className="accent-text" />
                    </div>
                    <div className={styles.statValue}>94<span className={styles.statLimit}>/100</span></div>
                    <div className={styles.statTrend}>+4.2% from last week</div>
                </div>

                <div className={`glass-panel ${styles.statCard}`}>
                    <div className={styles.statHeader}>
                        <h3>Active Projects</h3>
                        <CheckCircle2 size={20} className="accent-text" />
                    </div>
                    <div className={styles.statValue}>12</div>
                    <div className={styles.statTrend}>3 approaching deadline</div>
                </div>

                <div className={`glass-panel ${styles.statCard}`}>
                    <div className={styles.statHeader}>
                        <h3>AI Documents Processed</h3>
                        <FileText size={20} className="accent-text" />
                    </div>
                    <div className={styles.statValue}>142</div>
                    <div className={styles.statTrend}>Generated 48 insights</div>
                </div>
            </div>

            <div className={styles.mainGrid}>
                {/* Left Column */}
                <div className={styles.gridCol1}>
                    <div className={`glass-panel ${styles.panel}`}>
                        <h3 className={styles.panelTitle}>AI Insights Panel</h3>
                        <ul className={styles.insightsList}>
                            <li className={styles.insightItem}>
                                <div className={styles.insightIcon}><Brain size={16} /></div>
                                <div>
                                    <h4>Project Alpha Bottleneck</h4>
                                    <p>Approval step is taking 40% longer than average. Suggesting automated routing.</p>
                                </div>
                            </li>
                            <li className={styles.insightItem}>
                                <div className={styles.insightIcon}><Brain size={16} /></div>
                                <div>
                                    <h4>Meeting Summary Ready</h4>
                                    <p>Q3 Planning meeting transcribed and 5 action items extracted.</p>
                                </div>
                            </li>
                            <li className={styles.insightItem}>
                                <div className={styles.insightIcon}><Brain size={16} /></div>
                                <div>
                                    <h4>Resource Optimization</h4>
                                    <p>Design team has 20% available capacity based on task progression.</p>
                                </div>
                            </li>
                        </ul>
                    </div>

                    <div className={`glass-panel ${styles.panel}`}>
                        <h3 className={styles.panelTitle}>Recent Documents</h3>
                        <div className={styles.docList}>
                            {[
                                { name: 'Q3_Financial_Report.pdf', status: 'Analyzed', date: '2h ago' },
                                { name: 'Vendor_Agreement_v2.docx', status: 'Processing', date: '4h ago' },
                                { name: 'Product_Roadmap_2024.pptx', status: 'Analyzed', date: '1d ago' },
                            ].map((doc, i) => (
                                <div key={i} className={styles.docItem}>
                                    <FileText size={18} className="accent-text" />
                                    <div className={styles.docInfo}>
                                        <span className={styles.docName}>{doc.name}</span>
                                        <span className={styles.docMeta}>{doc.date}</span>
                                    </div>
                                    <span className={`${styles.docStatus} ${doc.status === 'Processing' ? styles.statusProcessing : styles.statusAnalyzed}`}>
                                        {doc.status}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Right Column */}
                <div className={styles.gridCol2}>
                    <div className={`glass-panel ${styles.panel} ${styles.alertPanel}`}>
                        <h3 className={styles.panelTitle} style={{ color: 'var(--accent)' }}>
                            <AlertCircle size={20} /> Deadline Risk Alerts
                        </h3>
                        <div className={styles.alertList}>
                            <div className={styles.alertItem}>
                                <div className={styles.alertBadge}>High</div>
                                <div>
                                    <h4>Client Presentation Deck</h4>
                                    <p>Due in 4 hours. Missing financial annexure.</p>
                                </div>
                            </div>
                            <div className={styles.alertItem}>
                                <div className={styles.alertBadge} style={{ background: 'var(--text-muted)' }}>Med</div>
                                <div>
                                    <h4>UX Research Report</h4>
                                    <p>Due tomorrow. 3 tasks pending review.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
