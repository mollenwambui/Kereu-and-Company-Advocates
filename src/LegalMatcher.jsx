import React, { useState } from 'react';
import {
  Building2, Scale, Gavel, Shield, Home, Users, FileText,
  MessageCircle, Phone, ArrowLeft, Check, RotateCcw
} from 'lucide-react';
import './LegalMatcher.css';

const WHATSAPP = '254791018377';
const PHONE = '+254791018377';

const AREAS = [
  { id: 'corporate', icon: Building2, title: 'Business & contracts', sub: 'Company setup, agreements, commercial disputes', service: 'Corporate & Commercial Law',
    bring: ['Company documents (CR12, certificate of incorporation)', 'The contract or agreement in question', 'Emails or letters exchanged with the other party'] },
  { id: 'civil', icon: Scale, title: 'A dispute or court case', sub: 'Suing, being sued, recovering money', service: 'Civil Litigation',
    bring: ['Any court papers or demand letters you received', 'Agreements, receipts or invoices', 'A short timeline of what happened'] },
  { id: 'constitutional', icon: Gavel, title: 'My rights were violated', sub: 'Constitutional and fundamental freedoms', service: 'Constitutional Law',
    bring: ['Any documents showing what happened', 'Names, dates and places involved', 'Reports filed with any authority'] },
  { id: 'review', icon: Shield, title: 'A public body’s decision', sub: 'Challenge a ruling, licence or administrative action', service: 'Judicial Review',
    bring: ['The decision letter or notice', 'Your application and any correspondence', 'The date you received the decision'] },
  { id: 'property', icon: Home, title: 'Land & property', sub: 'Buying, selling, transfers, title issues', service: 'Property & Conveyancing',
    bring: ['Copy of the title deed or lease', 'Sale agreement, if any', 'Your ID and KRA PIN'] },
  { id: 'family', icon: Users, title: 'Family & succession', sub: 'Divorce, custody, estates and wills', service: 'Family Law',
    bring: ['Marriage or birth certificates', 'Death certificate and list of assets (for estates)', 'Any existing court orders or wills'] },
  { id: 'employment', icon: FileText, title: 'Work & employment', sub: 'Contracts, dismissal, workplace disputes', service: 'Employment Law',
    bring: ['Your employment contract', 'Payslips and any termination or warning letters', 'Emails or messages about the dispute'] }
];

const URGENCY = [
  { id: 'urgent', label: 'Urgent', sub: 'A court date, deadline or notice is close' },
  { id: 'soon', label: 'Soon', sub: 'I need help in the next few weeks' },
  { id: 'explore', label: 'Just exploring', sub: 'I want to understand my options' }
];

export default function LegalMatcher() {
  const [step, setStep] = useState(0);
  const [area, setArea] = useState(null);
  const [urgency, setUrgency] = useState(null);
  const [name, setName] = useState('');

  const chosen = AREAS.find(a => a.id === area);
  const when = URGENCY.find(u => u.id === urgency);

  const reset = () => { setStep(0); setArea(null); setUrgency(null); setName(''); };

  const message = chosen && when
    ? `Hello Kereu & Company Advocates, I would like help with ${chosen.service}. Urgency: ${when.label}.` +
      (name.trim() ? ` My name is ${name.trim().slice(0, 60)}.` : '')
    : '';
  const waLink = `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(message)}`;

  return (
    <section id="matcher" className="lm-section">
      <div className="lm-wrap">
        <p className="lm-eyebrow">Client guide</p>
        <h2 className="lm-title">Not sure where to start?</h2>
        <p className="lm-lead">
          Answer three quick questions and we’ll point you to the right service and tell you what to bring.
        </p>

        <div className="lm-card">
          <div className="lm-progress" role="progressbar" aria-valuemin={0} aria-valuemax={3} aria-valuenow={step}>
            <span style={{ width: `${(step / 3) * 100}%` }} />
          </div>

          <div className="lm-stage" key={step} aria-live="polite">
            {step === 0 && (
              <>
                <h3 className="lm-q">What do you need help with?</h3>
                <div className="lm-grid">
                  {AREAS.map(a => (
                    <button key={a.id} className="lm-option" onClick={() => { setArea(a.id); setStep(1); }}>
                      <span className="lm-icon"><a.icon size={26} /></span>
                      <span className="lm-opt-text">
                        <strong>{a.title}</strong>
                        <small>{a.sub}</small>
                      </span>
                    </button>
                  ))}
                </div>
              </>
            )}

            {step === 1 && (
              <>
                <button className="lm-back" onClick={() => setStep(0)}><ArrowLeft size={16} /> Back</button>
                <h3 className="lm-q">How urgent is it?</h3>
                <div className="lm-grid lm-grid-3">
                  {URGENCY.map(u => (
                    <button key={u.id} className={`lm-option lm-urgency lm-${u.id}`} onClick={() => { setUrgency(u.id); setStep(2); }}>
                      <span className="lm-opt-text">
                        <strong>{u.label}</strong>
                        <small>{u.sub}</small>
                      </span>
                    </button>
                  ))}
                </div>
              </>
            )}

            {step === 2 && (
              <>
                <button className="lm-back" onClick={() => setStep(1)}><ArrowLeft size={16} /> Back</button>
                <h3 className="lm-q">What should we call you? <span className="lm-optional">(optional)</span></h3>
                <form className="lm-form" onSubmit={e => { e.preventDefault(); setStep(3); }}>
                  <input
                    className="lm-input"
                    type="text"
                    maxLength={60}
                    placeholder="Your name"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    autoFocus
                  />
                  <button type="submit" className="lm-primary">See my result</button>
                </form>
                <p className="lm-hint">Please don’t type confidential case details here.</p>
              </>
            )}

            {step === 3 && chosen && when && (
              <div className="lm-result">
                <div className="lm-check"><Check size={34} /></div>
                <p className="lm-result-label">Your best match</p>
                <h3 className="lm-result-title">{chosen.service}</h3>
                <p className="lm-result-sub">
                  {urgency === 'urgent'
                    ? 'Because this is urgent, calling us directly is the fastest route.'
                    : 'Send us a message and we’ll get back to you.'}
                </p>

                <div className="lm-bring">
                  <h4>Bring these to your consultation</h4>
                  <ul>
                    {chosen.bring.map((b, i) => (
                      <li key={b} style={{ animationDelay: `${0.25 + i * 0.12}s` }}><Check size={16} /> {b}</li>
                    ))}
                  </ul>
                </div>

                <div className="lm-actions">
                  <a className={urgency === 'urgent' ? 'lm-primary' : 'lm-secondary'} href={`tel:${PHONE}`}>
                    <Phone size={18} /> Call now
                  </a>
                  <a className="lm-whatsapp" href={waLink} target="_blank" rel="noopener noreferrer">
                    <MessageCircle size={18} /> Message on WhatsApp
                  </a>
                </div>
                <button className="lm-back lm-reset" onClick={reset}><RotateCcw size={14} /> Start over</button>
              </div>
            )}
          </div>
        </div>

        <p className="lm-note">
          This guide offers general information only. It is not legal advice and does not create an advocate–client relationship.
        </p>
      </div>
    </section>
  );
}