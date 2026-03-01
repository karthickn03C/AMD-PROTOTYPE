"use client";
import { useState, useEffect } from 'react';
import { Activity, ShieldAlert, BarChart3, TrendingUp, Cpu, Workflow } from 'lucide-react';
import styles from './analytics.module.css';
import { get } from '@/lib/api';
import toast from 'react-hot-toast';

export default function AnalyticsPage() {
    const [isLoading, setIsLoading] = useState(true);
    const [analyticsData, setAnalyticsData] = useState<any>(null);
    const [timeFilter, setTimeFilter] = useState('Last 30 Days');

    useEffect(() => {
        fetchAnalytics();
    }, [timeFilter]);

    const fetchAnalytics = async () => {
        console.log("Action: Fetching analytics data for", timeFilter);
        setIsLoading(true);

        // Prototype mode: simulated delay and local data injection
        await new Promise(resolve => setTimeout(resolve, 3000)); // 3 second demo delay

        setAnalyticsData({
            productivityIndex: 94.2,
            taskCompletionRate: 88,
            riskFactor: 'Low',
            workConsistency: 'A-',
            bars: [60, 45, 80, 55, 90, 75, 85, 40, 65, 95, 88, 70],
            optimizations: [
                { score: '98%', title: 'Automate QA Process', desc: 'System detects 14 hours/week spent on manual QA. Suggesting automated pipeline integration.' },
                { score: '85%', title: 'Rebalance Workload', desc: 'Developer team is over-allocated relative to design team capacity. Delaying sprint delivery.' }
            ]
        });

        setIsLoading(false);
    };

    const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        console.log("Input changed: Time Filter", e.target.value);
        setTimeFilter(e.target.value);
    };

    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <div>
                    <h1 className={styles.title}>System Analytics</h1>
                    <p className={styles.subtitle}>Telemetry & Performance Metrics</p>
                </div>
                <div className={styles.timeFilter}>
                    <select className={styles.select} value={timeFilter} onChange={handleFilterChange}>
                        <option>Last 30 Days</option>
                        <option>Last Quarter</option>
                        <option>Year to Date</option>
                    </select>
                </div>
            </header>

            {isLoading ? (
                <p style={{ color: 'var(--text-muted)' }}>Fetching live telemetry...</p>
            ) : analyticsData && (
                <>
                    <div className={styles.topMetrics}>
                        <div className={`glass-panel ${styles.metricCard}`}>
                            <div className={styles.metricIcon}><Activity size={24} /></div>
                            <div className={styles.metricInfo}>
                                <span className={styles.metricLabel}>Productivity Index</span>
                                <span className={styles.metricValue}>{analyticsData.productivityIndex}</span>
                                <span className={`${styles.metricChange} ${styles.positive}`}>Live connection</span>
                            </div>
                        </div>

                        <div className={`glass-panel ${styles.metricCard}`}>
                            <div className={styles.metricIcon}><Workflow size={24} /></div>
                            <div className={styles.metricInfo}>
                                <span className={styles.metricLabel}>Task Completion Rate</span>
                                <span className={styles.metricValue}>{analyticsData.taskCompletionRate}%</span>
                                <span className={`${styles.metricChange} ${styles.positive}`}>Live connection</span>
                            </div>
                        </div>

                        <div className={`glass-panel ${styles.metricCard}`}>
                            <div className={styles.metricIcon}><ShieldAlert size={24} className="accent-text" /></div>
                            <div className={styles.metricInfo}>
                                <span className={styles.metricLabel}>Risk Prediction Factor</span>
                                <span className={styles.metricValue}>{analyticsData.riskFactor}</span>
                                <span className={`${styles.metricChange} ${styles.negative}`}>Live connection</span>
                            </div>
                        </div>

                        <div className={`glass-panel ${styles.metricCard}`}>
                            <div className={styles.metricIcon}><Cpu size={24} /></div>
                            <div className={styles.metricInfo}>
                                <span className={styles.metricLabel}>Work Consistency</span>
                                <span className={styles.metricValue}>{analyticsData.workConsistency}</span>
                                <span className={`${styles.metricChange} ${styles.neutral}`}>Live connection</span>
                            </div>
                        </div>
                    </div>

                    <div className={styles.mainGrid}>
                        {/* Main Chart */}
                        <div className={`glass-panel ${styles.chartPanel} ${styles.colSpan2}`}>
                            <div className={styles.panelHeader}>
                                <h3 className={styles.panelTitle}>Productivity Output Volume</h3>
                                <button className={styles.iconBtn} onClick={() => { console.log('Button clicked: Refresh chart'); fetchAnalytics(); }}><BarChart3 size={18} /></button>
                            </div>

                            <div className={styles.barChartContainer}>
                                <div className={styles.yAxis}>
                                    <span>100</span>
                                    <span>75</span>
                                    <span>50</span>
                                    <span>25</span>
                                    <span>0</span>
                                </div>

                                <div className={styles.barsArea}>
                                    {analyticsData.bars.map((height: number, i: number) => (
                                        <div key={i} className={styles.barColumn}>
                                            <div
                                                className={styles.barFill}
                                                style={{ height: `${height}%` }}
                                            ></div>
                                            <span className={styles.barLabel}>{`W${i + 1}`}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* AI Optimization Suggestions */}
                        <div className={`glass-panel ${styles.chartPanel}`}>
                            <div className={styles.panelHeader}>
                                <h3 className={styles.panelTitle}>AI Optimization Directives</h3>
                                <button className={styles.iconBtn} onClick={() => toast('Directive settings opened.', { icon: '⚙️' })}><TrendingUp size={18} /></button>
                            </div>

                            <div className={styles.optimizationList}>
                                {analyticsData.optimizations.map((opt: any, index: number) => (
                                    <div key={index} className={styles.optItem}>
                                        <div className={styles.optScore}>{opt.score}</div>
                                        <div className={styles.optInfo}>
                                            <h4>{opt.title}</h4>
                                            <p>{opt.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}
