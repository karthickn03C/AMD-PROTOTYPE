"use client";
import { useState } from 'react';
import { User, Bell, Shield, Sliders } from 'lucide-react';
import styles from './settings.module.css';
import toast from 'react-hot-toast';

export default function SettingsPage() {
    const [autoDelegate, setAutoDelegate] = useState(true);
    const [highContrast, setHighContrast] = useState(false);

    const handleSave = () => {
        toast.promise(
            new Promise(resolve => setTimeout(resolve, 1500)),
            {
                loading: 'Applying system parameters...',
                success: 'Profile settings saved successfully.',
                error: 'Could not update settings.'
            },
            { id: 'settings_save' }
        );
    };

    const handleFeatureAlert = (featureName: string) => {
        toast(`Configuring ${featureName}...`, { icon: '⚙️' });
    };

    const handleToggle = (setting: string) => {
        if (setting === 'Auto-Delegation') setAutoDelegate(prev => !prev);
        if (setting === 'High-Contrast Mode') setHighContrast(prev => !prev);
        toast(`Adjusted system parameter: ${setting}`, { icon: '🔄' });
    };

    const handleDelete = () => {
        toast.error('System Admin privileges required to purge account telemetry.');
    };

    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <div>
                    <h1 className={styles.title}>System Settings</h1>
                    <p className={styles.subtitle}>Manage your preferences and workspace configurations</p>
                </div>
            </header>

            <div className={styles.mainLayout}>
                {/* Left Nav */}
                <div className={styles.settingsNav}>
                    <button className={`${styles.navItem} ${styles.activeNavItem}`} onClick={() => handleFeatureAlert('Profile')}>
                        <User size={18} /> Profile Settings
                    </button>
                    <button className={styles.navItem} onClick={() => handleFeatureAlert('Notifications')}>
                        <Bell size={18} /> Notifications
                    </button>
                    <button className={styles.navItem} onClick={() => handleFeatureAlert('Security Architecture')}>
                        <Shield size={18} /> Security
                    </button>
                    <button className={styles.navItem} onClick={() => handleFeatureAlert('Global Preferences')}>
                        <Sliders size={18} /> System Preferences
                    </button>
                </div>

                {/* Right Content */}
                <div className={styles.settingsContent}>
                    <div className={styles.sectionArea}>
                        <h3 className={styles.sectionTitle}>Profile Information</h3>
                        <div className={styles.formGroup}>
                            <div className={styles.avatarRow}>
                                <div className={styles.avatar}>JD</div>
                                <button className="btn-secondary" onClick={() => handleFeatureAlert('Avatar Interface')}>Change Avatar</button>
                                <button className={styles.removeBtn} onClick={() => toast('Avatar reverted to default text block')}>Remove</button>
                            </div>
                        </div>

                        <div className={styles.formGrid}>
                            <div className={styles.inputGroup}>
                                <label>First Name</label>
                                <input type="text" defaultValue="John" className={styles.input} />
                            </div>
                            <div className={styles.inputGroup}>
                                <label>Last Name</label>
                                <input type="text" defaultValue="Doe" className={styles.input} />
                            </div>
                            <div className={styles.inputGroup}>
                                <label>Email Address</label>
                                <input type="email" defaultValue="john.doe@company.com" className={styles.input} />
                            </div>
                            <div className={styles.inputGroup}>
                                <label>Role</label>
                                <input type="text" defaultValue="Operations Manager" className={styles.input} disabled />
                            </div>
                        </div>

                        <div className={styles.actionRow}>
                            <button className="btn-primary" onClick={handleSave}>Save Changes</button>
                        </div>
                    </div>

                    <div className={styles.sectionArea}>
                        <h3 className={styles.sectionTitle}>Workspace Preferences</h3>

                        <div className={styles.preferenceItem}>
                            <div className={styles.prefInfo}>
                                <h4>AI Auto-Delegation</h4>
                                <p>Allow the system to automatically assign simple tasks generated from documents.</p>
                            </div>
                            <div className={autoDelegate ? styles.toggleActive : styles.toggleInactive} onClick={() => handleToggle('Auto-Delegation')}>
                                <div className={styles.toggleKnob}></div>
                            </div>
                        </div>

                        <div className={styles.preferenceItem}>
                            <div className={styles.prefInfo}>
                                <h4>High-Contrast Mode</h4>
                                <p>Increase contrast for text elements in the terminal UI.</p>
                            </div>
                            <div className={highContrast ? styles.toggleActive : styles.toggleInactive} onClick={() => handleToggle('High-Contrast Mode')}>
                                <div className={styles.toggleKnob}></div>
                            </div>
                        </div>
                    </div>

                    <div className={styles.sectionArea}>
                        <h3 className={styles.sectionTitle}>Account Management</h3>
                        <p className={styles.accountDesc}>
                            Permanently delete this account and all associated data from the CoreNova intelligence engine.
                        </p>
                        <button className={styles.dangerBtn} onClick={handleDelete}>Delete Account</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
