import React from 'react';
import { Link } from 'react-router-dom';
import {
  FaFutbol, FaArrowRight, FaMapMarkerAlt, FaBed, FaUtensils,
  FaBus, FaGlobeAmericas, FaCity, FaUsers, FaTicketAlt,
  FaCheckCircle, FaShieldAlt
} from 'react-icons/fa';
import { motion } from 'framer-motion';
import ScrollReveal from '../components/ScrollReveal';
import './Home.css';

const STATS = [
  { value: '48', label: 'Host Cities', icon: <FaCity /> },
  { value: '104', label: 'Total Matches', icon: <FaTicketAlt /> },
  { value: '3', label: 'Countries', icon: <FaGlobeAmericas /> },
  { value: '5M+', label: 'Expected Fans', icon: <FaUsers /> },
];

const STEPS = [
  {
    icon: <FaFutbol />,
    title: 'Choose a Match',
    desc: 'Browse the full 2026 schedule across USA, Canada & Mexico.',
  },
  {
    icon: <FaMapMarkerAlt />,
    title: 'Discover the Stadium',
    desc: 'Explore iconic venues, capacity, location maps, and facilities.',
  },
  {
    icon: <FaBed />,
    title: 'Find Hotels & Restaurants',
    desc: 'Curated stays and dining spots within walking distance of every arena.',
  },
  {
    icon: <FaBus />,
    title: 'Get Transport Directions',
    desc: 'Bus, metro, taxi routes with estimated time and cost.',
  },
];

const HOST_CITIES = [
  { name: 'New York / NJ', country: 'USA', matches: 8, image: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?auto=format&fit=crop&w=800&q=80' },
  { name: 'Los Angeles', country: 'USA', matches: 8, image: 'https://thumbs.dreamstime.com/b/sunset-over-los-angeles-downtown-city-center-california-165474416.jpg' },
  { name: 'Mexico City', country: 'Mexico', matches: 5, image: 'https://images.unsplash.com/photo-1585464231875-d9ef1f5ad396?auto=format&fit=crop&w=800&q=80' },
  { name: 'Toronto', country: 'Canada', matches: 6, image: 'https://images.unsplash.com/photo-1517090504586-fde19ea6066f?auto=format&fit=crop&w=800&q=80' },
  { name: 'Miami', country: 'USA', matches: 6, image: 'https://images.unsplash.com/photo-1533106497176-45ae19e68ba2?auto=format&fit=crop&w=800&q=80' },
  { name: 'Vancouver', country: 'Canada', matches: 6, image: 'https://images.unsplash.com/photo-1559511260-66a654ae982a?auto=format&fit=crop&w=800&q=80' },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.12 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: 'easeOut' } },
};

function Home() {
  return (
    <div className="home-page">

      {/* ── HERO ── */}
      <section className="home-hero">
        <div className="home-hero-bg" />
        <div className="home-hero-particles" aria-hidden />
        <div className="container home-hero-inner">

          <motion.div
            className="home-hero-left"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            <div className="home-hero-eyebrow">
              <FaFutbol className="spinning-ball" />
              FIFA World Cup 2026™
            </div>

            <h1 className="home-hero-title">
              Plan your FIFA World Cup 2026 Trip{' '}
              <span className="highlight">in minutes</span>

            </h1>

            <p className="home-hero-sub">
              Your all-in-one travel companion for the biggest football event in history —
              spanning <strong>USA</strong>, <strong>Canada</strong> &amp; <strong>Mexico</strong>.
            </p>

            <div className="home-hero-ctas">
              <Link to="/signup" className="btn btn-primary home-cta-main">
                Get Started <FaArrowRight />
              </Link>
              <Link to="/login" className="btn btn-secondary">
                Sign In
              </Link>
            </div>
          </motion.div>

          {/* Right how-it-works card */}
          <motion.div
            className="home-hero-feature-card glass-panel"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25 }}
          >
            <h3 className="home-search-title">
              <FaFutbol /> How It Works
            </h3>
            <div className="how-steps">
              {STEPS.map((step, i) => (
                <div key={step.title} className="how-step">
                  <div className="how-step-num">{i + 1}</div>
                  <div className="how-step-icon">{step.icon}</div>
                  <div>
                    <p className="how-step-title">{step.title}</p>
                    <p className="how-step-desc">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <Link to="/signup" className="btn btn-primary w-full mt-4" style={{ justifyContent: 'center' }}>
              Create Free Account <FaArrowRight />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ── STATS BAR ── */}
      <div className="home-stats-bar">
        <motion.div
          className="container home-stats-inner"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {STATS.map(s => (
            <motion.div key={s.label} className="home-stat" variants={itemVariants}>
              <div className="home-stat-icon-wrap">{s.icon}</div>
              <div>
                <span className="home-stat-value">{s.value}</span>
                <span className="home-stat-label">{s.label}</span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* ── FEATURES ── */}
      <section className="home-section">
        <div className="container">
          <ScrollReveal>
            <div className="home-section-header" style={{ justifyContent: 'center', textAlign: 'center' }}>
              <div className="section-title-wrap">
                <h2 className="section-title">Everything You Need in One Place</h2>
                <p className="section-subtitle">From your first match search to your final bus ride — we cover it all.</p>
              </div>
            </div>
          </ScrollReveal>

          <motion.div
            className="features-grid"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
          >
            {STEPS.map(step => (
              <motion.div key={step.title} className="feature-card glass-panel" variants={itemVariants}>
                <div className="feature-card-icon">{step.icon}</div>
                <h3 className="feature-card-title">{step.title}</h3>
                <p className="feature-card-desc">{step.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── HOST CITIES ── */}
      <section className="home-section home-section-dark">
        <div className="container">
          <ScrollReveal>
            <div className="home-section-header">
              <div className="section-title-wrap">
                <h2 className="section-title">Iconic Host Cities</h2>
                <p className="section-subtitle">Discover the vibrant metropolises hosting the matches</p>
              </div>
            </div>
          </ScrollReveal>

          <motion.div
            className="home-cities-cards"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
          >
            {HOST_CITIES.map(city => (
              <motion.div key={city.name} className="home-city-card" variants={itemVariants}>
                <img src={city.image} alt={city.name} className="home-city-card-img" loading="lazy" />
                <div className="home-city-card-overlay" />
                <div className="home-city-card-content">
                  <span className="city-card-country">{city.country}</span>
                  <h3 className="city-card-name">{city.name}</h3>
                  <div className="city-card-meta">
                    <FaTicketAlt /> {city.matches} matches
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── CTA BANNER ── */}
      <section className="home-cta-banner">
        <div className="home-cta-overlay" />
        <ScrollReveal duration={1.2}>
          <div className="container home-cta-inner">
            <div className="home-cta-badge">
              <FaShieldAlt /> Free to Use — No Credit Card Required
            </div>
            <h2 className="home-cta-title">Ready to Plan Your World Cup 2026 Trip?</h2>
            <p className="home-cta-sub">
              Join thousands of fans already planning their ultimate football adventure.
              Matches, stadiums, hotels, dining, and transport — all in one place.
            </p>
            <div className="flex justify-center gap-4 mt-8 flex-wrap">
              <Link to="/signup" className="btn btn-primary home-cta-btn">
                Get Started Free <FaArrowRight />
              </Link>
              <Link to="/login" className="btn btn-secondary home-cta-btn">
                Sign In
              </Link>
            </div>
          </div>
        </ScrollReveal>
      </section>
    </div>
  );
}

export default Home;
