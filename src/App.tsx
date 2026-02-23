import { useEffect, useRef, useState } from 'react';
import AnoAI from './components/ui/animated-shader-background';
import { ThemeToggle } from './components/ui/theme-toggle';

function App() {
    const [typedText, setTypedText] = useState('');
    const [formStatus, setFormStatus] = useState<{ type: 'success' | 'error' | null, message: string }>({ type: null, message: '' });
    const phrases = ["Cyber Security Student.", "Ethical Hacker.", "System Defender."];
    const charIndexRef = useRef(0);
    const phraseIndexRef = useRef(0);
    const isDeletingRef = useRef(false);

    // Intersection Observer for scroll animations
    useEffect(() => {
        const observer = new IntersectionObserver((entries, obs) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    obs.unobserve(entry.target);
                }
            });
        }, { threshold: 0.15 });

        document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

        return () => {
            observer.disconnect();
        };
    }, []);

    // Typing Effect
    useEffect(() => {
        let timeoutId: number;

        const typeEffect = () => {
            const currentPhrase = phrases[phraseIndexRef.current];

            if (isDeletingRef.current) {
                setTypedText(currentPhrase.substring(0, charIndexRef.current - 1));
                charIndexRef.current--;
            } else {
                setTypedText(currentPhrase.substring(0, charIndexRef.current + 1));
                charIndexRef.current++;
            }

            let typingSpeed = isDeletingRef.current ? 50 : 100;

            if (!isDeletingRef.current && charIndexRef.current === currentPhrase.length) {
                typingSpeed = 2000; // Pause at end of phrase
                isDeletingRef.current = true;
            } else if (isDeletingRef.current && charIndexRef.current === 0) {
                isDeletingRef.current = false;
                phraseIndexRef.current = (phraseIndexRef.current + 1) % phrases.length;
                typingSpeed = 500; // Pause before typing next phrase
            }

            timeoutId = setTimeout(typeEffect, typingSpeed);
        };

        timeoutId = setTimeout(typeEffect, 1000);

        return () => {
            clearTimeout(timeoutId);
        };
    }, []);

    // Spotlight Effect Handler
    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        const card = e.currentTarget;
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        card.style.setProperty('--mouse-x', `${x}px`);
        card.style.setProperty('--mouse-y', `${y}px`);
    };

    const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const name = formData.get('name') as string;
        const email = formData.get('email') as string;
        const message = formData.get('message') as string;

        if (!name || !email || !message) {
            setFormStatus({ type: 'error', message: 'Please fill out all fields.' });
            return;
        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            setFormStatus({ type: 'error', message: 'Please enter a valid email address.' });
            return;
        }

        // Success UI
        setFormStatus({ type: 'success', message: 'Transmission successful! Message received.' });
        e.currentTarget.reset();

        setTimeout(() => {
            setFormStatus({ type: null, message: '' });
        }, 4000);
    };

    return (
        <div className="min-h-screen bg-[var(--bg-base)] text-[var(--text-main)] transition-colors duration-300">
            {/* Animated Background */}
            <AnoAI />

            {/* Navigation */}
            <header>
                <div className="container nav-container">
                    <a href="#hero" className="logo">Atharva <span>Nachane</span></a>
                    <nav>
                        <ul>
                            <li><a href="#hero">Home</a></li>
                            <li><a href="#about">About</a></li>
                            <li><a href="#projects">Projects</a></li>
                            <li><a href="#contact">Contact</a></li>
                            <li className="ml-4"><ThemeToggle /></li>
                        </ul>
                    </nav>
                </div>
            </header>

            {/* Hero Section */}
            <section id="hero">
                <div className="container hero-content fade-in">
                    <h1 className="hero-title">Hi, I'm <span className="gradient-text">Atharva.</span></h1>
                    <div className="hero-subtitle">
                        <span>{typedText}</span><span className="typing-cursor"></span>
                    </div>
                    <p className="hero-desc">
                        A Second-Year B.Tech Cyber Security student dedicated to building secure systems, analyzing
                        vulnerabilities, and implementing robust digital defenses.
                    </p>
                    <div className="hero-actions">
                        <a href="#projects" className="btn">View Projects</a>
                        <a href="#contact" className="btn btn-outline">Contact Me</a>
                    </div>
                </div>
            </section>

            {/* About & Skills Section */}
            <section id="about">
                <div className="container fade-in">
                    <h2 className="section-title">About Me</h2>
                    <p className="section-subtitle">Passionate about protecting digital infrastructures and continuously expanding my technical toolkit.</p>

                    <div className="about-grid">
                        <div className="about-text">
                            <p>
                                I am currently pursuing my B.Tech in Cyber Security. My academic and personal projects are
                                focused on understanding the core fundamentals of network security, ethical hacking, and
                                software development.
                            </p>
                            <p>
                                I approach cybersecurity from a developer's perspective, believing that the best way to secure a
                                system is to understand exactly how it is built. I am actively seeking opportunities to apply my
                                knowledge in real-world scenarios.
                            </p>
                        </div>

                        <div className="interactive-card skills-container" onMouseMove={handleMouseMove}>
                            <div className="card-content">
                                <h3>Technical Arsenal</h3>
                                <div className="skills-list">
                                    <span className="skill-tag">Network Security</span>
                                    <span className="skill-tag">Ethical Hacking</span>
                                    <span className="skill-tag">Java</span>
                                    <span className="skill-tag">Web Development</span>
                                    <span className="skill-tag">Linux SysAdmin</span>
                                    <span className="skill-tag">Threat Analysis</span>
                                    <span className="skill-tag">Python</span>
                                    <span className="skill-tag">Cryptography</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Projects Section */}
            <section id="projects">
                <div className="container fade-in">
                    <h2 className="section-title">Featured Work</h2>
                    <p className="section-subtitle">A selection of my recent academic and personal security projects.</p>

                    <div className="projects-grid">
                        {/* Project 1 */}
                        <div className="interactive-card project-card" onMouseMove={handleMouseMove}>
                            <div className="card-content">
                                <div className="project-header">
                                    <h3 className="project-title">AI Phishing Detector</h3>
                                    <span className="project-status">Completed</span>
                                </div>
                                <p className="project-desc">
                                    A machine learning model trained to analyze email metadata and body text content to
                                    accurately identify and flag sophisticated spear-phishing attempts.
                                </p>
                                <div className="tech-stack">
                                    <span className="tech-tag">Python</span>
                                    <span className="tech-tag">TensorFlow</span>
                                    <span className="tech-tag">Data Analysis</span>
                                </div>
                            </div>
                        </div>

                        {/* Project 2 */}
                        <div className="interactive-card project-card" onMouseMove={handleMouseMove}>
                            <div className="card-content">
                                <div className="project-header">
                                    <h3 className="project-title">Secure Crypto Analyzer</h3>
                                    <span className="project-status">Active</span>
                                </div>
                                <p className="project-desc">
                                    A cryptographic tool that evaluates password entropy against known brute-force dictionary
                                    attacks, featuring a visualizer to demonstrate salt encryption methods.
                                </p>
                                <div className="tech-stack">
                                    <span className="tech-tag">Java</span>
                                    <span className="tech-tag">Cryptography</span>
                                    <span className="tech-tag">UI Dev</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Contact Section */}
            <section id="contact">
                <div className="container fade-in">
                    <h2 className="section-title">Get In Touch</h2>
                    <p className="section-subtitle">Whether you have a question or just want to say hi, I'll try my best to get back
                        to you.</p>

                    <div className="interactive-card contact-wrapper" onMouseMove={handleMouseMove}>
                        <div className="card-content">
                            <form id="contactForm" onSubmit={handleFormSubmit}>
                                <div className="form-group">
                                    <label htmlFor="name" className="form-label">Name</label>
                                    <input type="text" id="name" name="name" className="form-control" placeholder="John Doe" />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="email" className="form-label">Email Address</label>
                                    <input type="email" id="email" name="email" className="form-control" placeholder="john@example.com" />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="message" className="form-label">Message</label>
                                    <textarea id="message" name="message" className="form-control" placeholder="How can I help you?"></textarea>
                                </div>

                                {formStatus.type && (
                                    <div className={`form-message ${formStatus.type}`} style={{ display: 'block' }}>
                                        {formStatus.message}
                                    </div>
                                )}

                                <button type="submit" className="btn" style={{ width: '100%', marginTop: '10px' }}>
                                    Send Transmission
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer>
                <div className="container">
                    <div className="social-links">
                        <a href="https://www.linkedin.com/in/atharva-nachane-5b13a6323/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
                        <a href="https://github.com/atharvanachane/PORTFOLIO" target="_blank" rel="noopener noreferrer">GitHub</a>
                        <a href="#">Email</a>
                    </div>
                    <p className="footer-text">&copy; 2026 Atharva Nachane. Designed & Built for the Future.</p>
                </div>
            </footer>
        </div>
    );
}

export default App;
