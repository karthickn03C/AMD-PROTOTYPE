"use client";
import { useState, useRef, useEffect } from 'react';
import { UploadCloud, FileText, Settings, Database, Server, Cpu, Brain, Download, RefreshCw, Layers } from 'lucide-react';
import styles from './documents.module.css';
import classNames from 'classnames';
import { get, uploadDocument, post } from '@/lib/api';
import toast from 'react-hot-toast';

export default function DocumentsPage() {
    const [documents, setDocuments] = useState<any[]>([]);
    const [selectedDoc, setSelectedDoc] = useState<number | null>(null);
    const [isUploading, setIsUploading] = useState(false);
    const [isLoadingGrid, setIsLoadingGrid] = useState(true);
    const fileInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        fetchDocuments();
    }, []);

    const fetchDocuments = async () => {
        console.log("Action: Fetching documents grid");
        setIsLoadingGrid(true);

        // Prototype mode: simulated delay and local data injection
        await new Promise(resolve => setTimeout(resolve, 3000)); // 3 second demo delay

        setDocuments([
            { id: 1, name: 'Q3_Financial_Review.pdf', size: '2.4 MB', status: 'Analyzed', type: 'Financial' },
            { id: 2, name: 'Project_Alpha_Specs.docx', size: '1.1 MB', status: 'Processing', type: 'Technical' },
            { id: 3, name: 'HR_Onboarding_V4.pdf', size: '840 KB', status: 'Analyzed', type: 'Internal' },
            { id: 4, name: 'Vendor_Agreement_2024.pdf', size: '3.2 MB', status: 'Failed', type: 'Legal' },
            { id: 5, name: 'Architecture_Diagrams.png', size: '4.5 MB', status: 'Analyzed', type: 'Technical' },
            { id: 6, name: 'Marketing_Campaign_Brief.docx', size: '1.8 MB', status: 'Analyzed', type: 'Marketing' },
        ]);

        setIsLoadingGrid(false);
    };

    const handleUploadClick = () => {
        console.log("Button clicked: Browse Files / Drag Zone");
        fileInputRef.current?.click();
    };

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        console.log("Action: Uploading file", file.name);
        setIsUploading(true);

        // Prototype mode: simulated delay
        await new Promise(resolve => setTimeout(resolve, 2000));

        toast.success(`${file.name} uploaded successfully!`);

        const newDoc = {
            id: Date.now(),
            name: file.name,
            size: `${(file.size / (1024 * 1024)).toFixed(2)} MB`,
            status: 'Processing',
            type: 'Uploaded'
        };

        setDocuments(prev => [newDoc, ...prev]);
        setIsUploading(false);
        if (fileInputRef.current) fileInputRef.current.value = '';
    };

    const handleGenerateReport = async () => {
        console.log("Button clicked: Generate Report", { selectedDoc });
        toast.loading('Generating intelligence report...', { id: 'report' });
        await new Promise(resolve => setTimeout(resolve, 2000));

        // Prototype mode: simulate a real file download using Blob
        let docName = 'Intelligence_Report';
        if (selectedDoc) {
            const found = documents.find(d => d.id === selectedDoc);
            if (found) docName = found.name.split('.')[0] + '_Analysis';
        }

        const reportContent = `CORENOVA AI INTELLIGENCE REPORT\n\nGenerated for: ${docName}\n\nSummary:\nThis is a securely synthesized demonstration report generated seamlessly by the CoreNova AI engine for prototype mockups. Real metrics, token mappings, and workflow paths will appear here natively in full production environments.\n\nStatus: Secure Extraction Complete.\nTime: ${new Date().toLocaleTimeString()}`;

        const blob = new Blob([reportContent], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `${docName}.txt`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);

        toast.success('Report successfully downloaded!', { id: 'report' });
    };

    const handleAutoGenerateTickets = async () => {
        console.log("Button clicked: Auto-generate Jira Tickets", { selectedDoc });
        toast.loading('Extracting tasks...', { id: 'tasks' });
        await new Promise(resolve => setTimeout(resolve, 1500));
        toast.success('Jira tickets drafted in Workflow Engine.', { id: 'tasks' });
    };

    const handleDraftEmail = async () => {
        console.log("Button clicked: Draft summary email");
        toast.loading('Drafting email...', { id: 'email' });
        await new Promise(resolve => setTimeout(resolve, 1000));
        toast.success('Draft saved to email client', { id: 'email' });
    };

    const handleFilter = () => {
        console.log("Button clicked: Filter Grid");
        toast('Filter menu coming soon', { icon: '📊' });
    };

    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <div>
                    <h1 className={styles.title}>AI Intelligence Engine</h1>
                    <p className={styles.subtitle}>Document Analysis & Extraction</p>
                </div>
            </header>

            <div className={styles.mainLayout}>
                {/* Left Side: Upload & Grid */}
                <div className={styles.contentArea}>
                    {/* Upload Section */}
                    <div className={styles.uploadZone}>
                        <div className={styles.uploadBox} onClick={handleUploadClick}>
                            <input
                                type="file"
                                ref={fileInputRef}
                                style={{ display: 'none' }}
                                onChange={handleFileChange}
                                accept=".pdf,.docx,.txt"
                            />
                            <UploadCloud size={40} className="accent-text" />
                            <h3>Drag & Drop Documents</h3>
                            <p>Support PDF, DOCX, TXT. Max 50MB per file.</p>
                            <button className="btn-secondary" onClick={(e) => { e.stopPropagation(); handleUploadClick(); }}>Browse Files</button>
                        </div>

                        <div className={styles.processingStatus}>
                            {isUploading ? (
                                <>
                                    <div className={styles.statusHeader}>
                                        <div className={styles.statusTitle}>
                                            <Cpu size={16} className="accent-text" />
                                            <span>Neural Processing Active</span>
                                        </div>
                                        <span className={styles.statusPercent}>Uploading...</span>
                                    </div>
                                    <div className={styles.progressBar}>
                                        <div className={styles.progressFill}></div>
                                    </div>
                                    <p className={styles.statusDetail}>Extracting entities from uploaded document...</p>
                                </>
                            ) : (
                                <>
                                    <div className={styles.statusHeader}>
                                        <div className={styles.statusTitle}>
                                            <Cpu size={16} style={{ color: 'var(--text-muted)' }} />
                                            <span>System Idle</span>
                                        </div>
                                        <span className={styles.statusPercent}></span>
                                    </div>
                                    <p className={styles.statusDetail}>Awaiting intelligence tasks.</p>
                                </>
                            )}
                        </div>
                    </div>

                    <div className={styles.gridHeader}>
                        <h3>Document Intelligence Grid</h3>
                        <div className={styles.gridActions}>
                            <button className={styles.filterBtn} onClick={handleFilter}><Layers size={16} /> Filter</button>
                            <button className={styles.filterBtn} onClick={() => { console.log('Button clicked: Refresh'); fetchDocuments(); }}><RefreshCw size={16} className={isLoadingGrid ? 'spin' : ''} /> Refresh</button>
                        </div>
                    </div>

                    {isLoadingGrid ? (
                        <p style={{ color: 'var(--text-muted)' }}>Fetching intelligence from backend database...</p>
                    ) : (
                        <div className={styles.documentGrid}>
                            {documents.length === 0 ? <p className="text-muted">No documents found.</p> : documents.map((doc) => (
                                <div
                                    key={doc.id}
                                    className={classNames(styles.docCard, { [styles.docCardActive]: selectedDoc === doc.id })}
                                    onClick={() => { console.log("Card clicked: Document", doc.id); setSelectedDoc(doc.id); }}
                                >
                                    <div className={styles.docType}>
                                        <FileText size={24} className="accent-text" />
                                    </div>
                                    <div className={styles.docInfo}>
                                        <h4 className={styles.docName}>{doc.name}</h4>
                                        <div className={styles.docMeta}>
                                            <span>{doc.size || 'N/A'}</span>
                                            <span className={styles.dot}>•</span>
                                            <span>{doc.type || 'Unknown'}</span>
                                        </div>
                                    </div>
                                    <div className={classNames(styles.statusBadge, styles[`status${doc.status}`])}>
                                        {doc.status || 'Processed'}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Right Side: Analysis Panel */}
                <div className={classNames(styles.analysisPanel, { [styles.panelOpen]: selectedDoc !== null })}>
                    {selectedDoc ? (
                        <div className={styles.panelContent}>
                            <div className={styles.panelHeader}>
                                <div>
                                    <h3 className={styles.panelTitle}>Intelligence Report</h3>
                                    <p className={styles.panelSubtitle}>{documents.find(d => d.id === selectedDoc)?.name}</p>
                                </div>
                                <button className={styles.closeBtn} onClick={() => setSelectedDoc(null)}>✕</button>
                            </div>

                            <div className={styles.analysisSections}>
                                <div className={styles.section}>
                                    <h4 className={styles.sectionTitle}><Brain size={16} className="accent-text" /> AI Summary</h4>
                                    <p className={styles.summaryText}>
                                        AI-extracted insights related to document {selectedDoc}. (Backend connection required to map dynamic entities).
                                    </p>
                                </div>

                                <div className={styles.section}>
                                    <h4 className={styles.sectionTitle}><Layers size={16} className="accent-text" /> Suggested Tasks</h4>
                                    <button className={styles.suggestedBtn} onClick={handleAutoGenerateTickets}>+ Auto-generate Jira Tickets</button>
                                    <button className={styles.suggestedBtn} onClick={handleDraftEmail}>+ Draft summary email to executive team</button>
                                </div>
                            </div>

                            <div className={styles.panelFooter}>
                                <button className="btn-primary" style={{ width: '100%' }} onClick={handleGenerateReport}>
                                    <Download size={18} /> Generate Report
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div className={styles.emptyPanel}>
                            <Brain size={48} className={styles.emptyIcon} />
                            <h3>Select a Document</h3>
                            <p>Click on any document in the grid to view AI-extracted intelligence, summaries, and action items.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
