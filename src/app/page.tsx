import Link from 'next/link';
import { ArrowRight, Brain, Zap, Shield, ChevronRight } from 'lucide-react';
import styles from './page.module.css';

export default function LandingPage() {
  return (
    <div className={styles.container}>
      {/* Navigation */}
      <nav className={styles.navbar}>
        <div className={styles.logo}>
          <Brain className={styles.logoIcon} />
          <span>CoreNova AI</span>
        </div>
        <div className={styles.navLinks}>
          <Link href="#features">Features</Link>
          <Link href="#solution">Solution</Link>
          <Link href="#about">About</Link>
        </div>
        <div className={styles.navActions}>
          <Link href="/auth" className="btn-secondary">Log In</Link>
          <Link href="/auth" className="btn-primary">Get Started</Link>
        </div>
      </nav>

      {/* Hero Section */}
      <main className={styles.main}>
        <section className={styles.hero}>
          <div className={`animate-fade-in ${styles.heroContent}`}>
            <h1 className={styles.heroTitle}>
              Where Intelligence Meets <span className="gradient-text">Performance.</span>
            </h1>
            <p className={styles.heroSubtitle}>
              CoreNova AI is a high-performance Work Intelligence Platform that transforms documents into actionable workflows, optimizes task execution, and enhances productivity using intelligent automation.
            </p>
            <div className={styles.heroActions}>
              <Link href="/auth" className="btn-primary">
                Get Started <ArrowRight size={18} />
              </Link>
              <Link href="#demo" className="btn-secondary">
                View Demo
              </Link>
            </div>
          </div>
          <div className={`animate-fade-in ${styles.heroVisual}`}>
            {/* Abstract visual */}
            <div className={styles.glowOrb}></div>
            <div className={styles.dashboardMockup}>
              <div className={styles.mockupHeader}>
                <div className={styles.mockupDots}>
                  <span></span><span></span><span></span>
                </div>
              </div>
              <div className={styles.mockupBody}>
                <div className={styles.mockupSidebar}>
                  <div style={{ width: '40%', height: '8px', background: 'var(--border)', borderRadius: '4px', margin: '1rem' }}></div>
                  <div style={{ width: '70%', height: '6px', background: 'var(--border-light)', borderRadius: '3px', margin: '0.75rem 1rem' }}></div>
                  <div style={{ width: '50%', height: '6px', background: 'var(--border-light)', borderRadius: '3px', margin: '0.75rem 1rem' }}></div>
                  <div style={{ width: '60%', height: '6px', background: 'var(--border-light)', borderRadius: '3px', margin: '0.75rem 1rem' }}></div>
                  <div style={{ width: '80%', height: '6px', background: 'var(--border-light)', borderRadius: '3px', margin: '0.75rem 1rem' }}></div>
                </div>
                <div className={styles.mockupMain}>
                  <div className={styles.mockupCard}>
                    <div style={{ display: 'flex', gap: '1rem', padding: '1rem', alignItems: 'center' }}>
                      <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: 'rgba(220, 38, 38, 0.2)' }}></div>
                      <div style={{ flex: 1 }}>
                        <div style={{ width: '40%', height: '10px', background: 'var(--border)', borderRadius: '4px', marginBottom: '8px' }}></div>
                        <div style={{ width: '70%', height: '6px', background: 'var(--border-light)', borderRadius: '3px' }}></div>
                      </div>
                    </div>
                  </div>
                  <div className={styles.mockupCard}>
                    <div style={{ display: 'flex', gap: '1rem', padding: '1rem', alignItems: 'center' }}>
                      <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: 'rgba(220, 38, 38, 0.2)' }}></div>
                      <div style={{ flex: 1 }}>
                        <div style={{ width: '50%', height: '10px', background: 'var(--border)', borderRadius: '4px', marginBottom: '8px' }}></div>
                        <div style={{ width: '85%', height: '6px', background: 'var(--border-light)', borderRadius: '3px' }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Problem Section */}
        <section id="features" className={styles.problemSection}>
          <div className="container">
            <h2 className={styles.sectionTitle}>The Productivity Bottleneck</h2>
            <div className={styles.problemGrid}>
              <div className={`glass-panel ${styles.problemCard}`}>
                <div className={styles.problemIcon}><Brain size={32} /></div>
                <h3>Information Overload</h3>
                <p>Teams spend countless hours searching through disparate documents instead of acting on insights.</p>
              </div>
              <div className={`glass-panel ${styles.problemCard}`}>
                <div className={styles.problemIcon}><Zap size={32} /></div>
                <h3>Manual Inefficiency</h3>
                <p>Routine workflows are bogged down by repetitive manual processes that AI can handle instantly.</p>
              </div>
              <div className={`glass-panel ${styles.problemCard}`}>
                <div className={styles.problemIcon}><Shield size={32} /></div>
                <h3>Fragmented Tools</h3>
                <p>Switching context between 10 different apps drains focus and destroys creative momentum.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Solution Section */}
        <section id="solution" className={styles.solutionSection}>
          <div className="container">
            <div className={styles.solutionContent}>
              <h2 className={styles.sectionTitle}>Enterprise Intelligence Engine</h2>
              <div className={styles.featureList}>
                <div className={styles.featureItem}>
                  <div className={styles.featureIcon}><Brain className="accent-text" /></div>
                  <div>
                    <h4>AI Document Intelligence</h4>
                    <p>Instantly extract key data, action items, and summaries from complex enterprise documents.</p>
                  </div>
                </div>
                <div className={styles.featureItem}>
                  <div className={styles.featureIcon}><Zap className="accent-text" /></div>
                  <div>
                    <h4>Workflow Optimization</h4>
                    <p>Automatically route tasks, predict bottlenecks, and suggest optimal execution paths.</p>
                  </div>
                </div>
                <div className={styles.featureItem}>
                  <div className={styles.featureIcon}><Shield className="accent-text" /></div>
                  <div>
                    <h4>Smart Task Automation</h4>
                    <p>Turn insights into action by letting our agents draft, report, and orchestrate work.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer id="about" className={styles.footer}>
        <div className={`container ${styles.footerContainer}`}>
          <div className={styles.footerBrand}>
            <div className={styles.logo}>
              <Brain className={styles.logoIcon} />
              <span>CoreNova AI</span>
            </div>
            <p className={styles.footerTagline}>Where Intelligence Meets Performance.</p>
            <p className={styles.builtBy}>Built by <span className={styles.innovaid}>Team Innovaid</span></p>
          </div>
          <div className={styles.footerLinks}>
            <div>
              <h4>Product</h4>
              <Link href="#">Features</Link>
              <Link href="#">Pricing</Link>
              <Link href="#">Security</Link>
            </div>
            <div>
              <h4>Company</h4>
              <Link href="#">About CoreNova AI</Link>
              <Link href="#">Contact</Link>
              <Link href="#">Privacy</Link>
            </div>
            <div>
              <h4>Technology</h4>
              <p className={styles.techText}>Frontend: Next.js</p>
              <p className={styles.techText}>Backend: FastAPI</p>
              <p className={styles.techText}>Database: MongoDB Atlas</p>
              <p className={styles.techText}>AI Layer: LLM Intelligence</p>
              <p className={styles.techText}>Deployed via Vercel + Render</p>
            </div>
          </div>
        </div>
        <div className={styles.footerBottom}>
          <p>&copy; {new Date().getFullYear()} CoreNova AI. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
