import React from 'react';
import { Link } from 'react-router-dom';
import {
  FaFutbol, FaMapMarkerAlt, FaHotel, FaUtensils,
  FaBus, FaShieldAlt, FaArrowRight, FaLock
} from 'react-icons/fa';
import { motion } from 'framer-motion';
import './PublicPage.css';

const SERVICES = [
  {
    icon: <FaFutbol />,
    title: 'Match Schedule',
    desc: 'Browse the complete 104-match FIFA World Cup 2026 schedule. Filter by group, stadium, or team.',
    color: '#00eeff',
    to: '/matches',
  },
  {
    icon: <FaMapMarkerAlt />,
    title: 'Stadium Explorer',
    desc: 'Explore all 16 World Cup venues with interactive maps, capacity details, and facility info.',
    color: '#0d59f2',
    to: '/stadiums',
  },
  {
    icon: <FaHotel />,
    title: 'Hotel Finder',
    desc: 'Discover curated hotels near every stadium. Filter by price, rating, and distance.',
    color: '#10b981',
    to: '/hotels',
  },
  {
    icon: <FaUtensils />,
    title: 'Restaurant Guide',
    desc: 'Find top-rated restaurants and fan dining spots close to every arena across 3 countries.',
    color: '#f59e0b',
    to: '/restaurants',
  },
  {
    icon: <FaBus />,
    title: 'Transport Planner',
    desc: 'Plan your stadium journey with bus, metro, and taxi routes — including estimated times and costs.',
    color: '#8b5cf6',
    to: '/transport',
  },
  {
    icon: <FaShieldAlt />,
    title: 'Emergency Info',
    desc: 'Access hospital locations, emergency phone numbers, and safety information for every host city.',
    color: '#ef4444',
    to: '/emergency',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};
const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: 'easeOut' } },
};

function Services() {
  return (
    <div className="public-page fade-in">
      {/* Hero */}
      <section className="public-hero">
        <div className="public-hero-bg" />
        <div className="container public-hero-inner">
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <div className="public-eyebrow"><FaFutbol /> Our Services</div>
            <h1 className="public-hero-title">Everything You Need <span className="text-gradient">in One App</span></h1>
            <p className="public-hero-sub">
              Six powerful tools to plan every aspect of your World Cup 2026 trip —
              from match day logistics to emergency contacts.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services grid */}
      <section className="container public-section">
        <motion.div
          className="services-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {SERVICES.map(svc => (
            <motion.div key={svc.title} className="service-card glass-panel" variants={itemVariants}
              style={{ '--svc-color': svc.color }}>
              <div className="service-card-icon" style={{ background: `${svc.color}15`, color: svc.color, border: `1px solid ${svc.color}25` }}>
                {svc.icon}
              </div>
              <h3 className="service-card-title">{svc.title}</h3>
              <p className="service-card-desc">{svc.desc}</p>
              <div className="service-card-locked">
                <FaLock className="service-lock-icon" />
                <span>Login required</span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* CTA */}
      <section className="public-cta-section">
        <div className="container text-center">
          <h2 className="public-cta-title">Access All Features Free</h2>
          <p className="public-cta-sub">Create your account in seconds and unlock the full platform.</p>
          <div className="flex justify-center gap-4 flex-wrap">
            <Link to="/signup" className="btn btn-primary public-cta-btn">
              Sign Up Free <FaArrowRight />
            </Link>
            <Link to="/login" className="btn btn-secondary public-cta-btn">
              Sign In
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Services;
