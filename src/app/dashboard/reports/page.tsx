"use client";
import { useState } from 'react';
import { FileText, Download, Share2, Printer, Search, Brain, Clock, Plus } from 'lucide-react';
import styles from './reports.module.css';
import { get } from '@/lib/api';
import toast from 'react-hot-toast';

export default function ReportsPage() {
    const [selectedReport, setSelectedReport] = useState(1);
    const [isDownloading, setIsDownloading] = useState(false);

    const reports = [
        { id: 1, title: 'Q3 Financial Performance', date: 'Oct 12, 2024', type: 'Financial' },
        { id: 2, title: 'Project Alpha Tech Specs', date: 'Oct 10, 2024', type: 'Technical' },
        { id: 3, title: 'Marketing Campaign Analysis', date: 'Oct 08, 2024', type: 'Analytics' },
        { id: 4, title: 'Security Compliance Audit', date: 'Oct 05, 2024', type: 'Audit' },
        { id: 5, title: 'Vendor Risk Assessment', date: 'Oct 01, 2024', type: 'Legal' },
    ];

    const handleDownload = async () => {
        setIsDownloading(true);
        console.log("Button clicked: Export PDF", { selectedReport });

        const activeReport = reports.find(r => r.id === selectedReport);
        toast.loading(`Processing PDF for ${activeReport?.title}...`, { id: 'download' });

        // Prototype Demo Mode:
        await new Promise(resolve => setTimeout(resolve, 2500));

        const reportName = activeReport?.title.replace(/\s+/g, '_') || 'Report';

        const reportContent = `CORENOVA AI INTELLIGENCE REPORT\n\nTitle: ${activeReport?.title}\nDate: ${activeReport?.date}\nType: ${activeReport?.type}\n\nSummary:\nThis is a securely synthesized demonstration PDF extraction generated seamlessly by the CoreNova AI engine for prototype mockups.\n\nStatus: Secure Extraction Complete.\nTime: ${new Date().toLocaleTimeString()}`;

        const blob = new Blob([reportContent], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `${reportName}.txt`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);

        toast.success(`Document ${activeReport?.title} downloaded successfully!`, { id: 'download' });
        setIsDownloading(false);
    };

    const handleNewReport = () => {
        console.log("Button clicked: New Report");
        toast('Redirecting to Intelligence Engine...', { icon: '🧠' });
        // Navigation logic...
    };

    const handlePrinter = () => {
        console.log("Button clicked: Printer");
        toast('Sending to printer...', { icon: '🖨️' });
    };

    const handleShare = () => {
        console.log("Button clicked: Share");
        toast('Share link copied to clipboard', { icon: '🔗' });
    };

    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <div>
                    <h1 className={styles.title}>Intelligence Reports</h1>
                    <p className={styles.subtitle}>AI-Generated Structured Business Documents</p>
                </div>
                <button className="btn-primary" onClick={handleNewReport}>
                    <Brain size={18} /> New Report
                </button>
            </header>

            <div className={styles.mainLayout}>
                {/* Left List */}
                <div className={styles.sidebarList}>
                    <div className={styles.searchBox}>
                        <Search size={16} className={styles.searchIcon} />
                        <input type="text" placeholder="Search reports..." className={styles.searchInput} />
                    </div>

                    <div className={styles.listContainer}>
                        {reports.map((report) => (
                            <div
                                key={report.id}
                                className={`${styles.listItem} ${selectedReport === report.id ? styles.listActive : ''}`}
                                onClick={() => setSelectedReport(report.id)}
                            >
                                <div className={styles.listIcon}>
                                    <FileText size={20} className={selectedReport === report.id ? 'accent-text' : 'text-muted'} />
                                </div>
                                <div className={styles.listInfo}>
                                    <h4>{report.title}</h4>
                                    <div className={styles.listMeta}>
                                        <span><Clock size={12} /> {report.date}</span>
                                        <span className={styles.listBadge}>{report.type}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Right Preview */}
                <div className={styles.previewArea}>
                    <div className={styles.previewToolbar}>
                        <div className={styles.toolbarInfo}>
                            <Brain size={16} className="accent-text" />
                            <span>Generated from 3 source documents</span>
                        </div>
                        <div className={styles.toolbarActions}>
                            <button className={styles.iconBtn} onClick={handlePrinter}><Printer size={18} /></button>
                            <button className={styles.iconBtn} onClick={handleShare}><Share2 size={18} /></button>
                            <button className="btn-secondary" style={{ padding: '0.5rem 1rem' }} onClick={handleDownload} disabled={isDownloading}>
                                <Download size={16} /> {isDownloading ? 'Exporting...' : 'Export PDF'}
                            </button>
                        </div>
                    </div>

                    <div className={styles.documentPreview}>
                        <div className={styles.a2Document}>
                            {/* Document Header */}
                            <div className={styles.docHeader}>
                                <div className={styles.docBrand}>CoreNova Intelligence</div>
                                <div className={styles.docMetaRight}>CONFIDENTIAL • Q3 2024</div>
                            </div>

                            <h1 className={styles.docTitle}>Executive Summary: Q3 Financial Performance</h1>
                            <p className={styles.docDate}>Generated exactly at: 10:42 AM, Oct 12, 2024</p>

                            <div className={styles.docContent}>
                                <section className={styles.docSection}>
                                    <h2>1. Executive Summary</h2>
                                    <p>
                                        The third quarter of 2024 demonstrated significant growth across all major software segments.
                                        Recurring revenue increased by 14% year-over-year, largely driven by the Enterprise Intelligence
                                        product line. Operating margins improved by 210 basis points due to optimized cloud infrastructure costs.
                                    </p>
                                </section>

                                <hr className={styles.docDivider} />

                                <section className={styles.docSection}>
                                    <h2>2. Key Findings</h2>
                                    <ul className={styles.docList}>
                                        <li><strong>Revenue Beat:</strong> Total revenue reached $42.5M, exceeding projections by $1.2M.</li>
                                        <li><strong>Churn Reduction:</strong> Enterprise churn rate dropped to a historic low of 1.1%.</li>
                                        <li><strong>CAC Increase:</strong> Customer Acquisition Cost (CAC) rose by 4% due to aggressive marketing spend in EU markets.</li>
                                    </ul>
                                </section>

                                <hr className={styles.docDivider} />

                                <div className={styles.docGrid}>
                                    <section className={styles.docSection}>
                                        <h2>3. Action Plan</h2>
                                        <ul className={styles.docList}>
                                            <li>Reallocate 15% of Q4 marketing budget to domestic campaigns.</li>
                                            <li>Initiate hiring for 5 new Enterprise Account Executives.</li>
                                            <li>Review cloud vendor pricing tiers before yearly renewal.</li>
                                        </ul>
                                    </section>
                                    <section className={styles.docSection}>
                                        <h2>4. Risk Analysis</h2>
                                        <div className={styles.riskBox}>
                                            <strong>Elevated Risk: EU Market Penetration</strong>
                                            <p>Increased CAC indicates saturation in current targeted segments. Recommend pausing campaign scaling until Q1 2025.</p>
                                        </div>
                                    </section>
                                </div>

                                <hr className={styles.docDivider} />

                                <section className={styles.docSection}>
                                    <h2>5. Conclusion</h2>
                                    <p>
                                        The financial posture of the organization remains robust. The deliberate shift towards larger enterprise
                                        contracts is yielding expected returns. Focus for Q4 must remain on operational efficiency and managing CAC
                                        within acceptable parameters.
                                    </p>
                                </section>
                            </div>

                            <div className={styles.docFooter}>
                                <span>Page 1 of 1</span>
                                <span>AI Confidence Score: 98%</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
