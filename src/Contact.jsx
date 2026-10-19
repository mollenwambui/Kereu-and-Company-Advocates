import React from 'react';
import { Phone, Mail, MapPin, MessageCircle, Clock, ArrowRight } from 'lucide-react';
import useReveal from './useReveal';
import './Contact.css';

const PHONE_DISPLAY = '+254 791 018 377';
const PHONE_TEL = '+254791018377';
const WHATSAPP = '254791018377';
const EMAIL = 'wakilikereu@gmail.com';
const ADDRESS = 'Protoco Place, 1st Floor, Thika';
const MAP_QUERY = 'Protoco Place, Thika, Kenya';
const HOURS = 'Mon – Fri, 8:00 am – 5:00 pm'; // Hidden while empty.

const WHATSAPP_LINK =
  `https://wa.me/${WHATSAPP}?text=` +
  encodeURIComponent('Hello Kereu & Company Advocates, I would like to make an enquiry.');

export default function Contact() {
  const ref = useReveal();

  return (
    <section id="contact" className="ct-section" ref={ref}>
      <div className="ct-wrap">
        <div className="ct-head reveal">
          <p className="ct-eyebrow">Contact</p>
          <h2 className="ct-title">Let’s talk about your matter</h2>
          <p className="ct-lead">
            Call, message or visit us. We’ll get back to you as soon as we can.
          </p>
        </div>

        <div className="ct-info">
          <a className="ct-row reveal" href={`tel:${PHONE_TEL}`}>
            <span className="ct-ico"><Phone size={24} /></span>
            <span><small>Call us</small><strong>{PHONE_DISPLAY}</strong></span>
          </a>
          <a className="ct-row reveal" style={{ '--d': '.08s' }} href={`mailto:${EMAIL}`}>
            <span className="ct-ico"><Mail size={24} /></span>
            <span><small>Email</small><strong>{EMAIL}</strong></span>
          </a>
          <div className="ct-row reveal" style={{ '--d': '.16s' }}>
            <span className="ct-ico"><MapPin size={24} /></span>
            <span><small>Visit us</small><strong>{ADDRESS}</strong></span>
          </div>
          {HOURS && (
            <div className="ct-row reveal" style={{ '--d': '.24s' }}>
              <span className="ct-ico"><Clock size={24} /></span>
              <span><small>Office hours</small><strong>{HOURS}</strong></span>
            </div>
          )}
        </div>

        <div className="ct-cta reveal">
          <a className="ct-wa-btn" href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer">
            <MessageCircle size={24} /> Message us on WhatsApp
          </a>
          
        </div>

        <div className="ct-map reveal">
          <iframe
            title="Kereu & Company Advocates office location"
            src={`https://www.google.com/maps?q=${encodeURIComponent(MAP_QUERY)}&output=embed`}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
          <a href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(MAP_QUERY)}`} target="_blank" rel="noopener noreferrer">
            Get directions <ArrowRight size={16} />
          </a>
        </div>
      </div>
    </section>
  );
}