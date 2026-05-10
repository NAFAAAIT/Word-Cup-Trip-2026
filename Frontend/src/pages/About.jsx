import React from 'react';
import { Link } from 'react-router-dom';
import { FaFutbol, FaGlobeAmericas, FaUsers, FaShieldAlt, FaArrowRight } from 'react-icons/fa';
import { motion } from 'framer-motion';
import './PublicPage.css';

const VALUES = [
  { icon: <FaFutbol />, title: 'Passion for Football', desc: 'We live and breathe football. Every feature is designed with fans at heart.' },
  { icon: <FaGlobeAmericas />, title: 'Global Coverage', desc: 'All 48 host cities across USA, Canada & Mexico — fully covered.' },
  { icon: <FaUsers />, title: 'Fan First', desc: 'Every decision we make puts the travelling fan experience first.' },
  { icon: <FaShieldAlt />, title: 'Safe Travel', desc: 'Emergency info, hospital locations, and safety contacts included.' },
];

function About() {
  return (
    <div className="public-page fade-in">
      {/* Hero */}
      <section className="public-hero">
        <div className="public-hero-bg" />
        <div className="container public-hero-inner">
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <div className="public-eyebrow"><FaFutbol /> About Us</div>
            <h1 className="public-hero-title">Built for <span className="text-gradient">Football Fans</span></h1>
            <p className="public-hero-sub">
              World Cup Trip 2026 is a graduation project designed to make planning your
              FIFA World Cup journey simple, smart, and stress-free.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Story */}
      <section className="container public-section">
        <div className="about-story glass-panel">
          <h2 className="section-title mb-4">Our Story</h2>
          <p className="public-body-text">
            The FIFA World Cup 2026 is the largest in history — 48 teams, 104 matches, and 3 host countries.
            Planning a trip to such a massive event is overwhelming: How do you find a hotel near the stadium?
            Which metro line goes there? What restaurants are around? What if there's an emergency?
          </p>
          <p className="public-body-text">
            We built <strong>World Cup Trip 2026</strong> to answer all of those questions in one place.
            From match schedules and stadium maps to hotel bookings, restaurant recommendations, transport
            routes, and emergency contacts — everything a travelling fan needs is right here.
          </p>
        </div>
      </section>

      {/* Values */}
      <section className="container public-section">
        <h2 className="section-title mb-8 text-center">What We Stand For</h2>
        <div className="about-values-grid">
          {VALUES.map(v => (
            <motion.div
              key={v.title}
              className="about-value-card glass-panel"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="about-value-icon">{v.icon}</div>
              <h3 className="about-value-title">{v.title}</h3>
              <p className="about-value-desc">{v.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="public-cta-section">
        <div className="container text-center">
          <h2 className="public-cta-title">Start Planning Today</h2>
          <p className="public-cta-sub">Create your free account and plan your ultimate World Cup trip.</p>
          <Link to="/signup" className="btn btn-primary public-cta-btn">
            Get Started Free <FaArrowRight />
          </Link>
        </div>
      </section>
    </div>
  );
}

export default About;
