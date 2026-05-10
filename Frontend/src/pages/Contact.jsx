import React, { useState } from 'react';
import { FaFutbol, FaEnvelope, FaUser, FaPaperPlane, FaCheckCircle } from 'react-icons/fa';
import { motion } from 'framer-motion';
import './PublicPage.css';

function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 900);
  };

  return (
    <div className="public-page fade-in">
      {/* Hero */}
      <section className="public-hero">
        <div className="public-hero-bg" />
        <div className="container public-hero-inner">
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <div className="public-eyebrow"><FaFutbol /> Get in Touch</div>
            <h1 className="public-hero-title">Contact <span className="text-gradient">Us</span></h1>
            <p className="public-hero-sub">
              Have a question, feedback, or partnership inquiry? We'd love to hear from you.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact section */}
      <section className="container public-section">
        <div className="contact-layout">

          {/* Info */}
          <div className="contact-info">
            <h2 className="section-title mb-4">Let's Talk</h2>
            <p className="public-body-text mb-4">
              Whether you have feedback about the platform, a question about features,
              or want to collaborate — reach out and we'll get back to you quickly.
            </p>

            <div className="contact-info-item">
              <FaEnvelope className="contact-info-icon" />
              <div>
                <p className="contact-info-label">Email</p>
                <a href="mailto:contact@worldcuptrip2026.com" className="contact-info-value">
                  contact@worldcuptrip2026.com
                </a>
              </div>
            </div>

            <div className="contact-info-item">
              <FaFutbol className="contact-info-icon" />
              <div>
                <p className="contact-info-label">Project</p>
                <p className="contact-info-value">FIFA World Cup 2026 — Graduation Project</p>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="contact-form-wrap glass-panel">
            {submitted ? (
              <div className="contact-success">
                <FaCheckCircle className="contact-success-icon" />
                <h3>Message Sent!</h3>
                <p>Thanks for reaching out. We'll reply to you shortly.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="contact-form">
                <h3 className="contact-form-title">Send a Message</h3>

                <div className="contact-field">
                  <label>Full Name</label>
                  <div className="input-group">
                    <FaUser className="input-icon" />
                    <input type="text" className="input-field pl-10" placeholder="Your name" required />
                  </div>
                </div>

                <div className="contact-field">
                  <label>Email</label>
                  <div className="input-group">
                    <FaEnvelope className="input-icon" />
                    <input type="email" className="input-field pl-10" placeholder="you@example.com" required />
                  </div>
                </div>

                <div className="contact-field">
                  <label>Message</label>
                  <textarea
                    className="input-field contact-textarea"
                    placeholder="How can we help you?"
                    rows={5}
                    required
                  />
                </div>

                <button type="submit" className="btn btn-primary w-full" disabled={loading}>
                  {loading ? 'Sending…' : <><FaPaperPlane /> Send Message</>}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

export default Contact;
