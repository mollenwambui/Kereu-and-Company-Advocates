import React from 'react';
import { Shield, MessageCircle, Clock, MapPin, Scale, ArrowRight } from 'lucide-react';
import useReveal from './useReveal';
import './About.css';

const PRINCIPLES = [
  { icon: Shield, title: 'Integrity', text: 'Honest advice, including when it is not what you hoped to hear.' },
  { icon: MessageCircle, title: 'Clear communication', text: 'Plain language, no jargon. You always know where your matter stands.' },
  { icon: Clock, title: 'Responsiveness', text: 'We return calls and messages promptly and respect your deadlines.' },
  { icon: MapPin, title: 'Local reach', text: 'Based in Thika, serving individuals and businesses in Nairobi and across Kenya.' }
];

const STEPS = [
  { title: 'Listen', text: 'We hear your story and understand the outcome you need.' },
  { title: 'Advise', text: 'You get a clear view of your options, risks and next steps.' },
  { title: 'Act', text: 'We prepare, file and represent you with care.' },
  { title: 'Follow through', text: 'We keep you informed until the matter is resolved.' }
];

// Fill this in with the firm's real details. While it is empty, the block stays hidden.
const ADVOCATES = [
  // { name: 'Full Name', title: 'Managing Advocate', bio: 'Two or three sentences on education, admission and focus areas.' },
];

export default function About() {
  const ref = useReveal();

  return (
    <section id="about" className="ab-section" ref={ref}>
      <div className="ab-k" aria-hidden="true">K</div>

      <div className="ab-wrap">
        <div className="ab-intro">
          <div className="reveal">
            <p className="ab-eyebrow">About the firm</p>
            <h2 className="ab-title">
              Legal counsel built on <span>trust, clarity</span> and care
            </h2>
            <p className="ab-text">
              Kereu & Company Advocates is a law firm based in Thika, serving individuals and businesses in Nairobi and across Kenya. We combine sound legal expertise with a client-centred approach, delivering practical solutions tailored to each matter.
            </p>
            <p className="ab-text">
              We take pride in integrity, professionalism and a steady commitment to achieving the best possible outcome for every client.
            </p>
          </div>

          <div className="ab-quote reveal" style={{ '--d': '.15s' }}>
            <Scale size={34} />
            <p>Legal services with integrity and excellence.</p>
            <small>Kereu & Company Advocates</small>
          </div>
        </div>

        <div className="ab-principles">
          {PRINCIPLES.map((p, i) => (
            <div key={p.title} className="ab-card reveal" style={{ '--d': `${i * 0.1}s` }}>
              <div className="ab-icon"><p.icon size={26} /></div>
              <h4>{p.title}</h4>
              <p>{p.text}</p>
            </div>
          ))}
        </div>

        <h3 className="ab-sub reveal">How we work</h3>
        <ol className="ab-steps">
          {STEPS.map((s, i) => (
            <li key={s.title} className="ab-step reveal" style={{ '--d': `${i * 0.12}s` }}>
              <div className="ab-num">{i + 1}</div>
              <h4>{s.title}</h4>
              <p>{s.text}</p>
            </li>
          ))}
        </ol>

        {ADVOCATES.length > 0 && (
          <>
            <h3 className="ab-sub reveal">Our advocates</h3>
            <div className="ab-team">
              {ADVOCATES.map((a, i) => (
                <div key={a.name} className="ab-person reveal" style={{ '--d': `${i * 0.1}s` }}>
                  <div className="ab-avatar">{a.name.charAt(0)}</div>
                  <div>
                    <h4>{a.name}</h4>
                    <p className="ab-role">{a.title}</p>
                    <p>{a.bio}</p>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        <div className="ab-cta reveal">
          <h3>Ready to talk about your matter?</h3>
          <a href="#contact">Book a consultation <ArrowRight size={18} /></a>
        </div>
      </div>
    </section>
  );
}