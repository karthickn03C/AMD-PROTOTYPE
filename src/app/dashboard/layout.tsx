"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
    LayoutDashboard,
    FileText,
    CheckSquare,
    Bot,
    BarChart,
    PieChart,
    Settings,
    Bell,
    Brain,
    LogOut,
    Search
} from 'lucide-react';
import styles from './layout.module.css';
import classNames from 'classnames';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();

    const navItems = [
        { label: 'Dashboard', icon: LayoutDashboard, href: '/dashboard' },
        { label: 'Documents', icon: FileText, href: '/dashboard/documents' },
        { label: 'Tasks', icon: CheckSquare, href: '/dashboard/tasks' },
        { label: 'AI Assistant', icon: Bot, href: '/dashboard/assistant' },
        { label: 'Reports', icon: BarChart, href: '/dashboard/reports' },
        { label: 'Analytics', icon: PieChart, href: '/dashboard/analytics' },
        { label: 'Settings', icon: Settings, href: '/dashboard/settings' },
    ];

    return (
        <div className={styles.container}>
            {/* Sidebar */}
            <aside className={styles.sidebar}>
                <div className={styles.sidebarHeader}>
                    <Brain className={styles.logoIcon} size={28} />
                    <span className={styles.logoText}>CoreNova AI</span>
                </div>

                <nav className={styles.sidebarNav}>
                    {navItems.map((item) => {
                        const isActive = pathname === item.href;
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={classNames(styles.navItem, { [styles.navItemActive]: isActive })}
                            >
                                <item.icon size={20} className={classNames({ 'accent-text': isActive })} />
                                <span>{item.label}</span>
                            </Link>
                        );
                    })}
                </nav>

                <div className={styles.sidebarFooter}>
                    <Link href="/auth" className={styles.logoutBtn}>
                        <LogOut size={20} />
                        <span>Sign Out</span>
                    </Link>
                </div>
            </aside>

            {/* Main Content Area */}
            <main className={styles.mainContent}>
                {/* Top bar */}
                <header className={styles.topbar}>
                    <div className={styles.searchBar}>
                        <Search size={18} className={styles.searchIcon} />
                        <input type="text" placeholder="Search insights, tasks, or documents..." className={styles.searchInput} />
                    </div>

                    <div className={styles.topbarActions}>
                        <div className={styles.aiStatus}>
                            <div className={styles.pulseDot}></div>
                            <span>AI Engine Active</span>
                        </div>
                        <button className={styles.iconBtn}>
                            <Bell size={20} />
                        </button>
                        <div className={styles.userProfile}>
                            <div className={styles.avatar}>JD</div>
                        </div>
                    </div>
                </header>

                {/* Page Content */}
                <div className={styles.pageContent}>
                    {children}
                </div>
            </main>
        </div>
    );
}
