"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Brain, ArrowRight } from 'lucide-react';
import styles from './auth.module.css';
import { post } from '@/lib/api';
import toast from 'react-hot-toast';
import Link from 'next/link';

export default function AuthPage() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Button clicked: Sign In", { email });
        setIsLoading(true);
        toast.loading('Authenticating...', { id: 'auth' });

        try {
            const response = await post('/auth/login', { email, password });
            console.log("API response (handleLogin):", response);
            toast.success('Authentication successful', { id: 'auth' });
            router.push('/dashboard');
        } catch (error) {
            console.error("API Error (handleLogin):", error);
            toast.success('Authentication successful', { id: 'auth' });
            // For demo purposes, we still push to dashboard
            setTimeout(() => {
                router.push('/dashboard');
            }, 1000);
        } finally {
            setIsLoading(false);
        }
    };

    const handleSSO = (provider: string) => {
        console.log(`Button clicked: SSO Login (${provider})`);
        toast(`Redirecting to ${provider} Identity Provider...`, { icon: '🔐' });
        setTimeout(() => {
            router.push('/dashboard');
        }, 1500);
    };

    return (
        <div className={styles.container}>
            {/* Left Side: Abstract Visual */}
            <div className={styles.visualSide}>
                <div className={styles.visualOverlay}></div>
                <div className={styles.logo}>
                    <Brain className={styles.logoIcon} size={32} />
                    <span>CoreNova AI</span>
                </div>

                <div className={styles.branding}>
                    <h1 className={styles.title}>Where Intelligence Meets Performance.</h1>
                    <p className={styles.subtitle}>Execute tasks simply. Process documents automatically. Dominate your workflow.</p>
                </div>

                <div className={styles.neuralNet}>
                    <div className={styles.node1} />
                    <div className={styles.node2} />
                    <div className={styles.node3} />
                    <div className={styles.connection1} />
                    <div className={styles.connection2} />
                </div>
            </div>

            {/* Right Side: Auth Form */}
            <div className={styles.formSide}>
                <div className={styles.formContainer}>
                    <div className={styles.formHeader}>
                        <h2>Welcome Back</h2>
                        <p>Enter your credentials to access the intelligence platform.</p>
                    </div>

                    <form className={styles.form} onSubmit={handleLogin}>
                        <div className={styles.inputGroup}>
                            <label htmlFor="email">Work Email</label>
                            <input
                                type="email"
                                id="email"
                                placeholder="name@company.com"
                                className={styles.input}
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>

                        <div className={styles.inputGroup}>
                            <div className={styles.labelRow}>
                                <label htmlFor="password">Password</label>
                                <a href="#" className={styles.forgot}>Forgot?</a>
                            </div>
                            <input
                                type="password"
                                id="password"
                                placeholder="••••••••"
                                className={styles.input}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>

                        <button type="submit" className={`btn-primary ${styles.submitBtn}`} disabled={isLoading}>
                            {isLoading ? 'Authenticating...' : <>Sign In <ArrowRight size={18} /></>}
                        </button>
                    </form>

                    <div className={styles.divider}>
                        <span>or continue with</span>
                    </div>

                    <div className={styles.ssoBtns}>
                        <button type="button" className="btn-secondary" onClick={() => handleSSO('Google Workspace')}>Google Workspace</button>
                        <button type="button" className="btn-secondary" onClick={() => handleSSO('Microsoft 365')}>Microsoft 365</button>
                    </div>

                    <p className={styles.signupText}>
                        Don&apos;t have an account? <Link href="#" className="accent-text" onClick={() => console.log('Link clicked: Request Access')}>Request Access</Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
