"use client";

import React, { useState, useEffect } from "react";
import ParticlesBackground from "@/components/ParticlesBackground";
import TypedSubtitle from "@/components/TypedSubtitle";
import Chatbot from "@/components/Chatbot";

// Simple smooth animated Counter component
function Counter({ target, duration = 2000 }: { target: number; duration?: number }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTimestamp: number | null = null;
    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      const current = progress * target;
      setCount(Number(current.toFixed(target % 1 === 0 ? 0 : 1)));
      if (progress < 1) {
        window.requestAnimationFrame(step);
      } else {
        setCount(target);
      }
    };
    window.requestAnimationFrame(step);
  }, [target, duration]);

  return <>{count}</>;
}

export default function Home() {
  const [navScrolled, setNavScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");

  useEffect(() => {
    const handleScroll = () => {
      setNavScrolled(window.scrollY > 50);

      const sections = ["hero", "about", "experience", "projects", "skills", "achievements", "contact"];
      let current = "hero";
      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el && window.scrollY >= el.offsetTop - 200) {
          current = sectionId;
        }
      }
      setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Set AOS class on scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.05 }
    );

    document.querySelectorAll("[data-aos]").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const handleNavLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const targetEl = document.getElementById(id);
    if (targetEl) {
      targetEl.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <>
      <ParticlesBackground />

      {/* Navigation */}
      <nav id="navbar" className={navScrolled ? "scrolled" : ""}>
        <div className="nav-container">
          <a href="#hero" onClick={(e) => handleNavLinkClick(e, "hero")} className="nav-logo">
            <span className="logo-icon">RG</span>
            <span>Rahul Gadgimata</span>
          </a>
          <div className={`nav-links ${mobileMenuOpen ? "open" : ""}`} id="navLinks">
            <a
              href="#about"
              onClick={(e) => handleNavLinkClick(e, "about")}
              className={`nav-link ${activeSection === "about" ? "active" : ""}`}
            >
              About
            </a>
            <a
              href="#experience"
              onClick={(e) => handleNavLinkClick(e, "experience")}
              className={`nav-link ${activeSection === "experience" ? "active" : ""}`}
            >
              Experience
            </a>
            <a
              href="#projects"
              onClick={(e) => handleNavLinkClick(e, "projects")}
              className={`nav-link ${activeSection === "projects" ? "active" : ""}`}
            >
              Projects
            </a>
            <a
              href="#skills"
              onClick={(e) => handleNavLinkClick(e, "skills")}
              className={`nav-link ${activeSection === "skills" ? "active" : ""}`}
            >
              Skills
            </a>
            <a
              href="#achievements"
              onClick={(e) => handleNavLinkClick(e, "achievements")}
              className={`nav-link ${activeSection === "achievements" ? "active" : ""}`}
            >
              Achievements
            </a>
            <a
              href="#contact"
              onClick={(e) => handleNavLinkClick(e, "contact")}
              className={`nav-link ${activeSection === "contact" ? "active" : ""}`}
            >
              Contact
            </a>
          </div>
          <button
            className="nav-toggle"
            id="navToggle"
            aria-label="Toggle menu"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <span style={{ transform: mobileMenuOpen ? "rotate(45deg) translate(5px, 5px)" : "none" }}></span>
            <span style={{ opacity: mobileMenuOpen ? 0 : 1 }}></span>
            <span style={{ transform: mobileMenuOpen ? "rotate(-45deg) translate(6px, -6px)" : "none" }}></span>
          </button>
        </div>
      </nav>

      {/* Hero */}
      <section id="hero" className="hero">
        <div className="hero-content">
          <div className="hero-grid">
            <div className="hero-photo-wrap" aria-label="Rahul R Gadgimata portrait">
              <div className="hero-photo">
                <img src="/assets/rahul-photo.jpg" alt="Rahul R Gadgimata portrait" />
              </div>
            </div>
            <div className="hero-copy">
              <div className="hero-badge">
                <span className="badge-dot"></span>Available for opportunities
              </div>
              <div className="hero-label">
                <span className="logo-dot"></span>Rahul R Gadgimata
              </div>
              <h1 className="hero-title">Experience liftoff with innovation & technology</h1>
              <p className="hero-subtitle">
                <TypedSubtitle />
              </p>
              <p className="hero-desc">Co-Founder & CTO @ Stack Education · B.Tech (AIML) · 9.1+ CGPA</p>
              <div className="hero-cta">
                <a href="#projects" onClick={(e) => handleNavLinkClick(e, "projects")} className="btn btn-dark">
                  <span>View Projects</span>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </a>
                <a href="#contact" onClick={(e) => handleNavLinkClick(e, "contact")} className="btn btn-outline">
                  Get In Touch
                </a>
                <a
                  href="/assets/rahul-resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-outline"
                >
                  Download Resume
                </a>
              </div>
              <div className="hero-stats">
                <div className="stat">
                  <span className="stat-num">
                    <Counter target={46} />
                  </span>
                  <span className="stat-label">Repositories</span>
                </div>
                <div className="stat">
                  <span className="stat-num">
                    <Counter target={4} />
                  </span>
                  <span className="stat-label">Hackathon Wins</span>
                </div>
                <div className="stat">
                  <span className="stat-num">
                    <Counter target={9.1} />
                  </span>
                  <span className="stat-label">CGPA</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="scroll-indicator">
          <div className="mouse">
            <div className="wheel"></div>
          </div>
          <span>Scroll to explore</span>
        </div>
      </section>

      {/* Antigravity Icon Strip */}
      <section className="icon-strip-section" data-aos>
        <div className="container">
          <div className="icon-strip">
            <div className="ag-icon" title="Full-Stack Development">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <rect x="2" y="3" width="20" height="14" rx="2" />
                <path d="M8 21h8M12 17v4" />
              </svg>
            </div>
            <div className="ag-icon" title="Terminal / CLI">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M4 17l6-5-6-5M12 19h8" />
              </svg>
            </div>
            <div className="ag-icon" title="Version Control">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M15 22v-4a4.8 4.8 0 00-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.4 5.4 0 004 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65S8.93 17.38 9 18v4" />
                <path d="M9 18c-4.51 2-5-2-7-2" />
              </svg>
            </div>
            <div className="ag-icon" title="Responsive Design">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <rect x="5" y="2" width="14" height="20" rx="2" />
                <path d="M12 18h.01" />
              </svg>
            </div>
            <div className="ag-icon" title="API Development">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71" />
                <path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71" />
              </svg>
            </div>
            <div className="ag-icon" title="Copy & Deploy">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <rect x="9" y="9" width="13" height="13" rx="2" />
                <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" />
              </svg>
            </div>
            <div className="ag-icon" title="Component Architecture">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <rect x="3" y="3" width="7" height="7" />
                <rect x="14" y="3" width="7" height="7" />
                <rect x="3" y="14" width="7" height="7" />
                <rect x="14" y="14" width="7" height="7" />
              </svg>
            </div>
            <div className="ag-icon" title="Microservices">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <circle cx="12" cy="12" r="1" />
                <circle cx="12" cy="5" r="1" />
                <circle cx="12" cy="19" r="1" />
                <path d="M12 6v5M12 13v5" />
                <circle cx="5" cy="8" r="1" />
                <path d="M5.6 8.8L11 12" />
                <circle cx="19" cy="8" r="1" />
                <path d="M18.4 8.8L13 12" />
              </svg>
            </div>
            <div className="ag-icon" title="AI & ML">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M12 2a4 4 0 014 4c0 1.95-2 3-2 8h-4c0-5-2-6.05-2-8a4 4 0 014-4z" />
                <path d="M10 14h4" />
                <path d="M10 17h4" />
                <path d="M10 20h4" />
                <path d="M9.7 21.7L12 22l2.3-.3" />
              </svg>
            </div>
            <div className="ag-icon" title="Automation">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </div>
            <div className="ag-icon" title="Data & Analytics">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M12 20V10M18 20V4M6 20v-4" />
              </svg>
            </div>
            <div className="ag-icon" title="Cloud Infrastructure">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M18 10h-1.26A8 8 0 109 20h9a5 5 0 000-10z" />
              </svg>
            </div>
            <div className="ag-icon" title="Security">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
            </div>
            <div className="ag-icon" title="Code Quality">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
                <polyline points="16 18 22 12 16 6" />
                <polyline points="8 6 2 12 8 18" />
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* About */}
      <section id="about" className="section">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">01 — About</span>
            <h2 className="section-title">
              Building things that matter.
              <br />
              Scaling things that last.
            </h2>
          </div>
          <div className="about-grid">
            <div className="about-text">
              <p>
                I'm a <strong>Co-Founder & CTO at Stack Education</strong>, engineering the future of education through
                AI-powered platforms. Currently pursuing my <strong>B.Tech in Artificial Intelligence & Machine Learning</strong>{" "}
                at GM University with a 9.1+ CGPA.
              </p>
              <p>
                My passion lies at the intersection of <strong>Generative AI</strong> and{" "}
                <strong>Scalable SaaS Architecture</strong>. From architecting the GM Finance (GM ONE) ecosystem to developing
                AI-assisted healthcare solutions for Oral Cancer Detection, I build products that create real impact.
              </p>
              <p>
                As the <strong>General Secretary at GMU</strong>, I lead student affairs while coordinating NSS initiatives,
                anti-ragging committees, and organizing technical & cultural events.
              </p>
              <div className="about-interests">
                <span className="interest-tag">Multi-Agent AI</span>
                <span className="interest-tag">LLM Ops</span>
                <span className="interest-tag">Neo4j Graph Science</span>
                <span className="interest-tag">Technical Events</span>
                <span className="interest-tag">Cultural & Literacy</span>
                <span className="interest-tag">Sports</span>
              </div>
            </div>
            <div className="about-terminal">
              <div className="terminal">
                <div className="terminal-header">
                  <div className="terminal-dots">
                    <span className="dot red"></span>
                    <span className="dot yellow"></span>
                    <span className="dot green"></span>
                  </div>
                  <span className="terminal-title">rahul@universe:~/life</span>
                </div>
                <div className="terminal-body">
                  <div className="terminal-line">
                    <span className="prompt">$</span> whoami
                  </div>
                  <div className="terminal-output">
                    <div>
                      Name : <span className="hl">Rahul R Gadgimata</span>
                    </div>
                    <div>
                      Role : <span className="hl">Co-Founder & CTO</span>
                    </div>
                    <div>
                      Org : <span className="hl">Stack Education</span>
                    </div>
                    <div>
                      CGPA : <span className="hl">9.1+</span>
                    </div>
                  </div>
                  <div className="terminal-line">
                    <span className="prompt">$</span> cat mission.txt
                  </div>
                  <div className="terminal-output">
                    <div>→ Engineering future of education</div>
                    <div>→ Architecting GM Finance Ecosystem</div>
                    <div>→ AI-assisted healthcare</div>
                    <div>→ Leading student affairs @ GMU</div>
                  </div>
                  <div className="terminal-line">
                    <span className="prompt">$</span> <span className="cursor-blink">_</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Experience */}
      <section id="experience" className="section section-dark">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">02 — Experience</span>
            <h2 className="section-title">Professional Journey</h2>
          </div>
          <div className="timeline">
            <div className="timeline-item" data-aos>
              <div className="timeline-marker"></div>
              <div className="timeline-card glass-card">
                <div className="timeline-date">2023 — Present</div>
                <h3>Co-Founder & CTO</h3>
                <h4>Stack Education</h4>
                <p className="text-secondary">
                  Engineering the future of education through AI-powered platforms. Building scalable SaaS solutions with Next.js,
                  Python, Google Cloud, and Gemini AI.
                </p>
                <div className="timeline-tags">
                  <span>Next.js</span>
                  <span>Python</span>
                  <span>GCP</span>
                  <span>Gemini AI</span>
                </div>
              </div>
            </div>
            <div className="timeline-item" data-aos>
              <div className="timeline-marker"></div>
              <div className="timeline-card glass-card">
                <div className="timeline-date">2025 — Present</div>
                <h3>General Secretary</h3>
                <h4>GM University</h4>
                <p className="text-secondary">
                  Leading student affairs, coordinating NSS initiatives, organizing technical & cultural events, and serving on the
                  Anti-Ragging Committee.
                </p>
                <div className="timeline-tags">
                  <span>Leadership</span>
                  <span>Events</span>
                  <span>NSS</span>
                </div>
              </div>
            </div>
            <div className="timeline-item" data-aos>
              <div className="timeline-marker"></div>
              <div className="timeline-card glass-card">
                <div className="timeline-date">2025 — 2025</div>
                <h3>Software Development Intern</h3>
                <h4>Industry Project</h4>
                <p className="text-secondary">
                  Hands-on experience with full-stack development, working on production-grade applications.
                </p>
                <div className="timeline-tags">
                  <span>TypeScript</span>
                  <span>React</span>
                  <span>Node.js</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects */}
      <section id="projects" className="section">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">03 — Projects</span>
            <h2 className="section-title">Featured Work</h2>
          </div>
          <div className="projects-grid">
            <div className="project-card glass-card featured" data-aos>
              <div className="project-icon">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#3c4043" strokeWidth="1.5">
                  <path d="M12 1v22M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" />
                </svg>
              </div>
              <div className="project-label">Featured</div>
              <h3>GM Finance — GM ONE</h3>
              <p>A next-gen financial management ecosystem with Gemini-powered spending insights.</p>
              <div className="project-tech">
                <span>Next.js</span>
                <span>TypeScript</span>
                <span>Node.js</span>
                <span>PostgreSQL</span>
                <span>GCP</span>
              </div>
              <a href="https://github.com/Rahulrgadgimata" target="_blank" rel="noopener noreferrer" className="project-link">
                View on GitHub{" "}
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M7 17L17 7M17 7H7M17 7v10" />
                </svg>
              </a>
            </div>
            <div className="project-card glass-card featured" data-aos>
              <div className="project-icon">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#3c4043" strokeWidth="1.5">
                  <path d="M4.8 2.3A.3.3 0 105 2H4a2 2 0 00-2 2v5a6 6 0 006 6 6 6 0 006-6V4a2 2 0 00-2-2h-1a.2.2 0 10.3.3" />
                  <path d="M8 15v1a6 6 0 006 6 6 6 0 006-6v-4" />
                  <circle cx="20" cy="10" r="2" />
                </svg>
              </div>
              <div className="project-label">AI + Healthcare</div>
              <h3>Oral Cancer Care — Dr. ARIA</h3>
              <p>AI-powered screening with multilingual voice assistant. Deep learning trained on 1000+ images.</p>
              <div className="project-tech">
                <span>Android</span>
                <span>Deep Learning</span>
                <span>ResNet</span>
                <span>AI Voice</span>
              </div>
              <a href="https://github.com/Rahulrgadgimata" target="_blank" rel="noopener noreferrer" className="project-link">
                View on GitHub{" "}
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M7 17L17 7M17 7H7M17 7v10" />
                </svg>
              </a>
            </div>
            <div className="project-card glass-card featured" data-aos>
              <div className="project-icon">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#3c4043" strokeWidth="1.5">
                  <path d="M12 2l7 4v6c0 5.25-3.5 8.5-7 10-3.5-1.5-7-4.75-7-10V6l7-4z" />
                  <path d="M9.5 12.5l1.8 1.8 3.2-4" />
                </svg>
              </div>
              <div className="project-label">AI Security</div>
              <h3>CodeVEN AI</h3>
              <p>
                AI-based vulnerability scanner with web crawling, JS analysis, Nmap port scanning, SSL checks, header audits, and
                threat severity classification.
              </p>
              <div className="project-tech">
                <span>Python</span>
                <span>FastAPI</span>
                <span>Redis</span>
                <span>PySpark</span>
                <span>Docker</span>
              </div>
              <a href="https://github.com/Rahulrgadgimata" target="_blank" rel="noopener noreferrer" className="project-link">
                View on GitHub{" "}
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M7 17L17 7M17 7H7M17 7v10" />
                </svg>
              </a>
            </div>
            <div className="project-card glass-card featured" data-aos>
              <div className="project-icon">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#3c4043" strokeWidth="1.5">
                  <path d="M7 8h10M7 12h10M7 16h6" />
                  <path d="M4 5h16v14H4z" />
                </svg>
              </div>
              <div className="project-label">Enterprise AI</div>
              <h3>SecureGPT</h3>
              <p>
                Enterprise RAG assistant for PDF and DOCX-based Q&A with citation-aware answers, semantic search, and Dockerized
                deployment.
              </p>
              <div className="project-tech">
                <span>LangChain</span>
                <span>FAISS</span>
                <span>FastAPI</span>
                <span>LLMs</span>
                <span>Docker</span>
              </div>
              <a href="https://github.com/Rahulrgadgimata" target="_blank" rel="noopener noreferrer" className="project-link">
                View on GitHub{" "}
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M7 17L17 7M17 7H7M17 7v10" />
                </svg>
              </a>
            </div>
            <div className="project-card glass-card featured" data-aos>
              <div className="project-icon">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#3c4043" strokeWidth="1.5">
                  <path d="M4 7h16M7 3h10v18H7z" />
                  <path d="M9 7v10M15 7v10" />
                </svg>
              </div>
              <div className="project-label">Live Project</div>
              <h3>Stack Education</h3>
              <p>Live education platform delivering AI-powered learning experiences with a modern, scalable web presence.</p>
              <div className="project-tech">
                <span>Next.js</span>
                <span>AI Products</span>
                <span>Education Tech</span>
              </div>
              <a href="https://stackeducation.in" target="_blank" rel="noopener noreferrer" className="project-link">
                Visit Live Site{" "}
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M7 17L17 7M17 7H7M17 7v10" />
                </svg>
              </a>
            </div>
            <div className="project-card glass-card" data-aos>
              <div className="project-icon">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#3c4043" strokeWidth="1.5">
                  <path d="M7 20h10M10 20c5.5-2.5 0.8-6.4 3-10" />
                  <path d="M9.5 9.4c1.1.8 1.8 2.2 2.3 3.7-2 .4-3.5.4-4.8-.3-1.2-.6-2.3-1.9-3-4.2 2.8-.5 4.4 0 5.5.8z" />
                  <path d="M14.1 6a7.5 7.5 0 01.5 4c-1.7-.2-3-.8-4-1.8-1-1-1.4-2.3-1.4-4.2C12 4 13.2 4.7 14.1 6z" />
                </svg>
              </div>
              <h3>AGRO-CYCLE</h3>
              <p>Agricultural technology solution to optimize farming cycles. 3 stars on GitHub.</p>
              <div className="project-tech">
                <span>HTML</span>
                <span>JavaScript</span>
                <span>CSS</span>
              </div>
              <a href="https://github.com/Rahulrgadgimata/AGRO-CYCLE" target="_blank" rel="noopener noreferrer" className="project-link">
                View on GitHub{" "}
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M7 17L17 7M17 7H7M17 7v10" />
                </svg>
              </a>
            </div>
            <div className="project-card glass-card" data-aos>
              <div className="project-icon">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#3c4043" strokeWidth="1.5">
                  <path d="M18 10h-1.26A8 8 0 109 20h9a5 5 0 000-10z" />
                </svg>
              </div>
              <h3>Cloud Storage App</h3>
              <p>Cloud storage application with seamless file management capabilities.</p>
              <div className="project-tech">
                <span>JavaScript</span>
                <span>Cloud</span>
              </div>
              <a
                href="https://github.com/Rahulrgadgimata/cloud-storage-app"
                target="_blank"
                rel="noopener noreferrer"
                className="project-link"
              >
                View on GitHub{" "}
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M7 17L17 7M17 7H7M17 7v10" />
                </svg>
              </a>
            </div>
            <div className="project-card glass-card" data-aos>
              <div className="project-icon">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#3c4043" strokeWidth="1.5">
                  <path d="M12 3v18M3 7l9-4 9 4" />
                  <path d="M3 7l3 9h-6l3-9zM21 7l-3 9h6l-3-9z" />
                </svg>
              </div>
              <h3>LegalEase AI</h3>
              <p>AI-powered legal assistance for document analysis and legal insights.</p>
              <div className="project-tech">
                <span>Python</span>
                <span>AI/ML</span>
                <span>NLP</span>
              </div>
              <a href="https://github.com/Rahulrgadgimata/LegalEase-AI" target="_blank" rel="noopener noreferrer" className="project-link">
                View on GitHub{" "}
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M7 17L17 7M17 7H7M17 7v10" />
                </svg>
              </a>
            </div>
            <div className="project-card glass-card" data-aos>
              <div className="project-icon">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#3c4043" strokeWidth="1.5">
                  <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
                  <path d="M6 12v5c3 3 9 3 12 0v-5" />
                </svg>
              </div>
              <h3>GMU Student Feedback</h3>
              <p>Student feedback management system for GM University.</p>
              <div className="project-tech">
                <span>HTML</span>
                <span>JavaScript</span>
              </div>
              <a
                href="https://github.com/Rahulrgadgimata/GMU-STUDENT-FEEDBACK"
                target="_blank"
                rel="noopener noreferrer"
                className="project-link"
              >
                View on GitHub{" "}
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M7 17L17 7M17 7H7M17 7v10" />
                </svg>
              </a>
            </div>
          </div>
          <div className="projects-cta">
            <a
              href="https://github.com/Rahulrgadgimata?tab=repositories"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-outline"
            >
              View All Projects{" "}
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M7 17L17 7M17 7H7M17 7v10" />
              </svg>
            </a>
          </div>
        </div>
      </section>

      {/* Skills */}
      <section id="skills" className="section section-dark">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">04 — Skills</span>
            <h2 className="section-title">Tech Arsenal</h2>
          </div>
          <div className="skills-grid">
            <div className="skill-category glass-card" data-aos>
              <div className="skill-cat-icon">
                <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <polyline points="16 18 22 12 16 6" />
                  <polyline points="8 6 2 12 8 18" />
                </svg>
              </div>
              <h3>Languages & Web</h3>
              <div className="skill-items">
                <div className="skill-item">
                  <span className="skill-dot" style={{ background: "#009688" }}></span>FastAPI
                </div>
                <div className="skill-item">
                  <span className="skill-dot" style={{ background: "#fff" }}></span>Next.js
                </div>
                <div className="skill-item">
                  <span className="skill-dot" style={{ background: "#61DAFB" }}></span>React
                </div>
                <div className="skill-item">
                  <span className="skill-dot" style={{ background: "#3178C6" }}></span>TypeScript
                </div>
                <div className="skill-item">
                  <span className="skill-dot" style={{ background: "#3776AB" }}></span>Python
                </div>
                <div className="skill-item">
                  <span className="skill-dot" style={{ background: "#F7DF1E" }}></span>JavaScript
                </div>
              </div>
            </div>
            <div className="skill-category glass-card" data-aos>
              <div className="skill-cat-icon">
                <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M12 2a4 4 0 014 4c0 1.95-2 3-2 8h-4c0-5-2-6.05-2-8a4 4 0 014-4z" />
                  <path d="M10 14h4M10 17h4M10 20h4" />
                </svg>
              </div>
              <h3>AI & Machine Learning</h3>
              <div className="skill-items">
                <div className="skill-item">
                  <span className="skill-dot" style={{ background: "#4581C3" }}></span>Neo4j
                </div>
                <div className="skill-item">
                  <span className="skill-dot" style={{ background: "#FF6F00" }}></span>TensorFlow
                </div>
                <div className="skill-item">
                  <span className="skill-dot" style={{ background: "#1C3C3C" }}></span>LangChain
                </div>
                <div className="skill-item">
                  <span className="skill-dot" style={{ background: "#8E75B2" }}></span>Google Gemini
                </div>
                <div className="skill-item">
                  <span className="skill-dot" style={{ background: "#EE4C2C" }}></span>PyTorch
                </div>
                <div className="skill-item">
                  <span className="skill-dot" style={{ background: "#4B8BBE" }}></span>Deep Learning
                </div>
              </div>
            </div>
            <div className="skill-category glass-card" data-aos>
              <div className="skill-cat-icon">
                <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M18 10h-1.26A8 8 0 109 20h9a5 5 0 000-10z" />
                </svg>
              </div>
              <h3>Cloud & Infrastructure</h3>
              <div className="skill-items">
                <div className="skill-item">
                  <span className="skill-dot" style={{ background: "#4169E1" }}></span>PostgreSQL
                </div>
                <div className="skill-item">
                  <span className="skill-dot" style={{ background: "#2496ED" }}></span>Docker
                </div>
                <div className="skill-item">
                  <span className="skill-dot" style={{ background: "#4285F4" }}></span>Google Cloud
                </div>
                <div className="skill-item">
                  <span className="skill-dot" style={{ background: "#339933" }}></span>Node.js
                </div>
                <div className="skill-item">
                  <span className="skill-dot" style={{ background: "#F05032" }}></span>Git & GitHub
                </div>
                <div className="skill-item">
                  <span className="skill-dot" style={{ background: "#326CE5" }}></span>Kubernetes
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Achievements */}
      <section id="achievements" className="section">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">05 — Achievements</span>
            <h2 className="section-title">Certifications & Awards</h2>
          </div>
          <div className="achievements-grid">
            <div className="achievement-card glass-card" data-aos>
              <div className="achievement-icon">
                <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#3c4043" strokeWidth="1.5">
                  <path d="M6 9H4.5a2.5 2.5 0 010-5C7 4 7 8 7 8M18 9h1.5a2.5 2.5 0 000-5C17 4 17 8 17 8" />
                  <path d="M4 22h16M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20 7 22M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20 17 22" />
                  <path d="M18 2H6v7a6 6 0 0012 0V2z" />
                </svg>
              </div>
              <h3>4x Hackathon Winner</h3>
              <p>Recognized for innovation and rapid prototyping.</p>
            </div>
            <div className="achievement-card glass-card" data-aos>
              <div className="achievement-icon">
                <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#3c4043" strokeWidth="1.5">
                  <circle cx="12" cy="12" r="1" />
                  <circle cx="12" cy="5" r="1" />
                  <circle cx="12" cy="19" r="1" />
                  <circle cx="5" cy="8" r="1" />
                  <circle cx="19" cy="8" r="1" />
                  <circle cx="5" cy="16" r="1" />
                  <circle cx="19" cy="16" r="1" />
                  <path d="M12 6v5M12 13v5M5.6 8.8L11 12M13 12l5.4-3.2M5.6 15.2L11 12M13 12l5.4 3.2" />
                </svg>
              </div>
              <h3>Neo4j Graph Data Science</h3>
              <p>Certified — Issued January 2026.</p>
            </div>
            <div className="achievement-card glass-card" data-aos>
              <div className="achievement-icon">
                <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#3c4043" strokeWidth="1.5">
                  <path d="M12 2a4 4 0 014 4c0 1.95-2 3-2 8h-4c0-5-2-6.05-2-8a4 4 0 014-4z" />
                  <path d="M10 14h4M10 17h4M10 20h4M9.7 21.7L12 22l2.3-.3" />
                </svg>
              </div>
              <h3>Advanced Deep Learning & AI</h3>
              <p>Udemy certification — January 2026.</p>
            </div>
            <div className="achievement-card glass-card" data-aos>
              <div className="achievement-icon">
                <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#3c4043" strokeWidth="1.5">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M2 12h20M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" />
                </svg>
              </div>
              <h3>NSS Coordinator</h3>
              <p>Leading social service initiatives and health camps.</p>
            </div>
            <div className="achievement-card glass-card" data-aos>
              <div className="achievement-icon">
                <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#3c4043" strokeWidth="1.5">
                  <path d="M15 22v-4a4.8 4.8 0 00-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.4 5.4 0 004 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65S8.93 17.38 9 18v4" />
                  <path d="M9 18c-4.51 2-5-2-7-2" />
                </svg>
              </div>
              <h3>GitHub Developer Program</h3>
              <p>Active open-source contributor.</p>
            </div>
            <div className="achievement-card glass-card" data-aos>
              <div className="achievement-icon">
                <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#3c4043" strokeWidth="1.5">
                  <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
                  <path d="M6 12v5c3 3 9 3 12 0v-5" />
                </svg>
              </div>
              <h3>Academic Excellence</h3>
              <p>B.Tech AIML — 9.1+ CGPA at GM University.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Education */}
      <section id="education" className="section section-dark">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">06 — Education</span>
            <h2 className="section-title">Academic Foundation</h2>
          </div>
          <div className="education-grid">
            <div className="edu-card glass-card" data-aos>
              <div className="edu-year">2023 — 2027</div>
              <h3>Bachelor of Technology in AIML</h3>
              <h4>GM University</h4>
              <p>
                CGPA: <strong>9.1+</strong> | Status: Active
              </p>
              <p>Roles: Student Affairs Leader · Anti-Ragging Committee · NSS Coordinator · General Secretary</p>
            </div>
            <div className="edu-card glass-card" data-aos>
              <div className="edu-year">Pre-University</div>
              <h3>Science Stream</h3>
              <h4>Vishwachetana Vidyaniketana Residential College</h4>
              <p>Pre-University education in Science, building the foundation for technology and innovation.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="section">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">07 — Contact</span>
            <h2 className="section-title">Let's Build Together</h2>
            <p className="section-subtitle">I'm always open to discussing new projects, creative ideas, or opportunities.</p>
          </div>
          <div className="contact-grid">
            <a href="https://github.com/Rahulrgadgimata" target="_blank" rel="noopener noreferrer" className="contact-card glass-card" data-aos>
              <svg width="30" height="30" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
              <h3>GitHub</h3>
              <p>@Rahulrgadgimata</p>
            </a>
            <a
              href="https://www.linkedin.com/in/rahul-r-gadgimata"
              target="_blank"
              rel="noopener noreferrer"
              className="contact-card glass-card"
              data-aos
            >
              <svg width="30" height="30" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
              <h3>LinkedIn</h3>
              <p>rahul-r-gadgimata</p>
            </a>
            <div className="contact-card glass-card" data-aos>
              <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              <h3>Location</h3>
              <p>India</p>
            </div>
          </div>
        </div>
      </section>

      <footer className="footer">
        <div className="container">
          <p className="footer-text">
            Crafted with precision by <strong>Rahul R Gadgimata</strong>
          </p>
          <p className="footer-sub">© 2026 — All rights reserved.</p>
        </div>
      </footer>

      {/* RAG Chatbot */}
      <Chatbot />
    </>
  );
}
