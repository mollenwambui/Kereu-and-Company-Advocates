import React, { useState, useEffect } from 'react';
import { Scale, Building2, Home, Users, FileText, ArrowRight, Menu, X, Gavel, Shield } from 'lucide-react';
import LegalMatcher from './LegalMatcher';
import About from './About';
import Contact from './Contact';
import useReveal from './useReveal';
import './App.css';

function App() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [counters, setCounters] = useState({ cases: 0, success: 0, clients: 0 });
  const servicesRef = useReveal();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const animateCounters = () => {
      const duration = 2000;
      const steps = 60;
      const casesIncrement = 100 / steps;
      const successIncrement = 95 / steps;
      const clientsIncrement = 100 / steps;

      let step = 0;
      const interval = setInterval(() => {
        step++;
        setCounters({
          cases: Math.min(Math.round(casesIncrement * step), 100),
          success: Math.min(Math.round(successIncrement * step), 95),
          clients: Math.min(Math.round(clientsIncrement * step), 100)
        });

        if (step >= steps) clearInterval(interval);
      }, duration / steps);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          animateCounters();
          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );

    const statsElement = document.getElementById('stats-section');
    if (statsElement) observer.observe(statsElement);

    return () => observer.disconnect();
  }, []);

  const services = [
    { icon: Building2, title: "Corporate & Commercial Law", desc: "Company formation, mergers, acquisitions, commercial transactions, contracts, and corporate governance solutions." },
    { icon: Scale, title: "Civil Litigation", desc: "Expert representation in civil disputes and litigation matters before Kenyan courts." },
    { icon: Gavel, title: "Constitutional Law", desc: "Protection of constitutional rights, fundamental freedoms, and interpretation of constitutional provisions." },
    { icon: Shield, title: "Judicial Review", desc: "Challenging decisions of public bodies, administrative law, and public law litigation." },
    { icon: Home, title: "Property & Conveyancing", desc: "Land transactions, property transfers, and real estate legal services." },
    { icon: Users, title: "Family Law", desc: "Matrimonial matters, divorce, custody, succession, and family dispute resolution." },
    { icon: FileText, title: "Employment Law", desc: "Employment contracts, workplace disputes, and labor law compliance." }
  ];

  return (
    <div className="app-container">
      {/* Navigation */}
      <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
        <div className="nav-content">
          <div className="logo">
            <div className="logo-icon">K</div>
            <div className="logo-text">
              <div className="logo-title">Kereu & Company</div>
              <div className="logo-subtitle">Advocates</div>
            </div>
          </div>

          <div className="nav-links">
            <a href="#services">Services</a>
            <a href="#matcher">Find Help</a>
            <a href="#about">About</a>
            <a href="#contact">Contact</a>
          </div>

          <button className="mobile-menu-btn" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="mobile-menu">
            <a href="#services" onClick={() => setMobileMenuOpen(false)}>Services</a>
            <a href="#matcher" onClick={() => setMobileMenuOpen(false)}>Find Help</a>
            <a href="#about" onClick={() => setMobileMenuOpen(false)}>About</a>
            <a href="#contact" onClick={() => setMobileMenuOpen(false)}>Contact</a>
          </div>
        )}
      </nav>

      {/* Hero */}
      <section className="hero-section">
        <div className="hero-background" />

        <div className="hero-content">
          <div className="hero-icon">
            <Scale size={80} />
          </div>
          <h1 className="hero-title">
            Excellence in Legal<br />
            <span className="highlight">Representation</span>
          </h1>
          <p className="hero-subtitle">
            Trusted advocates providing comprehensive legal services across Nairobi and Kenya
          </p>
          <a href="#contact" className="cta-button">
            <span>Schedule a Consultation</span>
            <ArrowRight size={20} />
          </a>
        </div>

        <div className="scroll-indicator">
          <div className="scroll-border">
            <div className="scroll-dot" />
          </div>
        </div>
      </section>

      {/* Stats */}
      <section id="stats-section" className="stats-section">
        <div className="stats-container">
          <div className="stat-card">
            <div className="stat-value-box">
              <div className="stat-value">{counters.cases}+</div>
            </div>
            <p className="stat-label">Cases Handled</p>
          </div>
          <div className="stat-card">
            <div className="stat-value-box">
              <div className="stat-value">{counters.success}%</div>
            </div>
            <p className="stat-label">Success Rate</p>
          </div>
          <div className="stat-card">
            <div className="stat-value-box">
              <div className="stat-value">{counters.clients}+</div>
            </div>
            <p className="stat-label">Satisfied Clients</p>
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="sv-section" ref={servicesRef}>
        <div className="sv-wrap">
          <div className="sv-head reveal">
            <p className="sv-eyebrow">What we do</p>
            <h2 className="sv-title">Our legal services</h2>
            <p className="sv-lead">
              Practical legal support for individuals and businesses, from first advice to representation in court.
            </p>
          </div>

          <div className="sv-grid">
            {services.map((service, i) => (
              <article key={i} className="sv-card reveal" style={{ '--d': `${(i % 3) * 0.1}s` }}>
                <span className="sv-num">{String(i + 1).padStart(2, '0')}</span>
                <div className="sv-icon"><service.icon size={30} /></div>
                <h3>{service.title}</h3>
                <p>{service.desc}</p>
                <a href="#contact" className="sv-link">Enquire <ArrowRight size={16} /></a>
              </article>
            ))}
          </div>

          <p className="sv-foot reveal">
            Not sure which service fits? <a href="#matcher">Use our quick guide</a>
          </p>
        </div>
      </section>

      {/* Interactive client guide */}
      <LegalMatcher />

      {/* About */}
      <About />

      {/* Contact */}
      <Contact />

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-logo">
            <div className="logo-icon">K</div>
            <div className="footer-title">Kereu & Company Advocates</div>
          </div>
          <p className="footer-text">&copy; {new Date().getFullYear()} Kereu & Company Advocates. All rights reserved.</p>
          <p className="footer-tagline">Legal services with integrity and excellence</p>
        </div>
      </footer>
    </div>
  );
}

export default App;