import React, { useState, useEffect } from 'react';
import { Scale, Building2, Briefcase, Home, Users, FileText, Phone, Mail, MapPin, ArrowRight, Menu, X, Gavel, Shield } from 'lucide-react';
import './App.css';

function App() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [counters, setCounters] = useState({ cases: 0, success: 0, clients: 0 });

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
            <a href="#about" onClick={() => setMobileMenuOpen(false)}>About</a>
            <a href="#contact" onClick={() => setMobileMenuOpen(false)}>Contact</a>
          </div>
        )}
      </nav>

      {/* Hero */}
      <section className="hero-section">
        <div className="hero-background">
          <div className="floating-shapes">
            {[...Array(20)].map((_, i) => (
              <div key={i} className="shape" style={{
                width: Math.random() * 300 + 50 + 'px',
                height: Math.random() * 300 + 50 + 'px',
                left: Math.random() * 100 + '%',
                top: Math.random() * 100 + '%',
                animationDuration: `${Math.random() * 10 + 10}s`,
                animationDelay: `${Math.random() * 5}s`
              }} />
            ))}
          </div>
        </div>
        
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
      <section id="services" className="services-section">
        <div className="section-container">
          <h2 className="section-title">Our Legal Services</h2>
          <div className="services-grid">
            {services.map((service, i) => (
              <div key={i} className="service-card">
                <div className="service-icon-box">
                  <service.icon size={32} />
                </div>
                <h3 className="service-title">{service.title}</h3>
                <p className="service-desc">{service.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About */}
      <section id="about" className="about-section">
        <div className="about-container">
          <h2 className="section-title white">About Kereu & Company Advocates</h2>
          <div className="about-content">
            <p className="about-text">
              Kereu & Company Advocates is a leading law firm based in Thika, dedicated to providing exceptional legal services to individuals and businesses throughout Kenya.
            </p>
            <p className="about-text">
              With a proven track record of over 100 successfully handled cases, we combine legal expertise with a client-centered approach. Our commitment is to deliver practical, effective legal solutions tailored to each client's unique needs.
            </p>
            <p className="about-text">
              We pride ourselves on our integrity, professionalism, and unwavering dedication to achieving the best possible outcomes for our clients.
            </p>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="contact-section">
        <div className="contact-container">
          <h2 className="section-title">Get in Touch</h2>
          <div className="contact-grid">
            <div className="contact-card">
              <div className="contact-icon-box">
                <Phone size={40} />
              </div>
              <h3 className="contact-title">Phone</h3>
              <a href="tel:0791018377" className="contact-link">+254 791 018 377</a>
            </div>
            <div className="contact-card">
              <div className="contact-icon-box">
                <Mail size={40} />
              </div>
              <h3 className="contact-title">Email</h3>
              <a href="mailto:wakilikereu@gmail.com" className="contact-link">wakilikereu@gmail.com</a>
            </div>
            <div className="contact-card">
              <div className="contact-icon-box">
                <MapPin size={40} />
              </div>
              <h3 className="contact-title">Location</h3>
              <p className="contact-text">Greenhouse, Thika<br />Nairobi, Kenya</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-logo">
            <div className="logo-icon">K</div>
            <div className="footer-title">Kereu & Company Advocates</div>
          </div>
          <p className="footer-text">&copy; 2025 Kereu & Company Advocates. All rights reserved.</p>
          <p className="footer-tagline">Legal services with integrity and excellence</p>
        </div>
      </footer>
    </div>
  );
}

export default App;