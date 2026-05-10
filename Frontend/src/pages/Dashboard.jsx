import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  FaFutbol, FaHotel, FaUtensils, FaMapMarkerAlt, FaBus,
  FaShieldAlt, FaCalendarAlt, FaClock, FaArrowRight,
  FaTrophy, FaSearch, FaFilter
} from 'react-icons/fa';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { getMatches, getStadiums } from '../services/api';
import { mockMatches } from '../data/mockData';
import ScrollReveal from '../components/ScrollReveal';
import './Dashboard.css';

const FEATURE_CARDS = [
  { icon: <FaFutbol />, label: 'Matches', to: '/matches', color: '#00eeff', desc: 'Full 2026 schedule' },
  { icon: <FaMapMarkerAlt />, label: 'Stadiums', to: '/stadiums', color: '#0d59f2', desc: 'Explore venues & maps' },
  { icon: <FaHotel />, label: 'Hotels', to: '/hotels', color: '#10b981', desc: 'Stays near every arena' },
  { icon: <FaUtensils />, label: 'Restaurants', to: '/restaurants', color: '#f59e0b', desc: 'Top dining spots' },
  { icon: <FaBus />, label: 'Transport', to: '/transport', color: '#8b5cf6', desc: 'Bus, metro & taxi routes' },
  { icon: <FaShieldAlt />, label: 'Emergency', to: '/emergency', color: '#ef4444', desc: 'Hospitals & contacts' },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
};
const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: 'easeOut' } },
};

function Dashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [matches, setMatches] = useState(mockMatches.slice(0, 12));
  const [stadiumsList, setStadiumsList] = useState(['All Stadiums']);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('All Stadiums');

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const [mRes, sRes] = await Promise.all([
          getMatches({ limit: 100, page: 1 }),
          getStadiums(),
        ]);
        if (!mounted) return;
        // Only replace mock data when the API actually returns results
        if (Array.isArray(mRes) && mRes.length > 0) setMatches(mRes.slice(0, 12));
        if (Array.isArray(sRes) && sRes.length > 0) {
          setStadiumsList(['All Stadiums', ...new Set(sRes.map(s => s.name))]);
        } else {
          setStadiumsList(['All Stadiums', ...new Set(mockMatches.map(m => m.stadium))]);
        }
      } catch {
        setStadiumsList(['All Stadiums', ...new Set(mockMatches.map(m => m.stadium))]);
      }
    })();
    return () => { mounted = false; };
  }, []);

  const filtered = matches.filter(m => {
    const matchesSearch = !search ||
      m.teamA.toLowerCase().includes(search.toLowerCase()) ||
      m.teamB.toLowerCase().includes(search.toLowerCase()) ||
      m.city.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filter === 'All Stadiums' || m.stadium === filter;
    return matchesSearch && matchesFilter;
  });

  const goToStadium = (stadiumName) => {
    navigate(`/stadiums?stadium=${encodeURIComponent(stadiumName)}`);
  };

  const firstName = user?.fullName?.split(' ')[0] || 'Fan';

  return (
    <div className="dashboard-page">

      {/* ── Welcome banner ── */}
      <section className="dashboard-hero">
        <div className="dashboard-hero-bg" />
        <div className="container dashboard-hero-inner">
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="dashboard-eyebrow">
              <FaFutbol className="spinning-ball" /> FIFA World Cup 2026™
            </div>
            <h1 className="dashboard-hero-title">
              Welcome back, <span className="text-gradient">{firstName}!</span>
            </h1>
            <p className="dashboard-hero-sub">
              Plan your ultimate World Cup experience — matches, stadiums, hotels, and more.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── Feature cards grid ── */}
      <section className="container dashboard-section">
        <ScrollReveal>
          <h2 className="section-title mb-6">Explore Features</h2>
        </ScrollReveal>
        <motion.div
          className="dashboard-features-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {FEATURE_CARDS.map(card => (
            <motion.div key={card.label} variants={itemVariants}>
              <Link to={card.to} className="dash-feature-card glass-panel" style={{ '--card-accent': card.color }}>
                <div className="dash-feature-icon" style={{ background: `${card.color}18`, border: `1px solid ${card.color}30`, color: card.color }}>
                  {card.icon}
                </div>
                <div>
                  <p className="dash-feature-label">{card.label}</p>
                  <p className="dash-feature-desc">{card.desc}</p>
                </div>
                <FaArrowRight className="dash-feature-arrow" />
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* ── Matches section ── */}
      <section className="container dashboard-section">
        <ScrollReveal>
          <div className="dashboard-matches-header">
            <div>
              <h2 className="section-title">Upcoming Matches</h2>
              <p className="section-subtitle">Click a match to view the stadium, nearby hotels, restaurants & transport</p>
            </div>
            <Link to="/matches" className="view-all-link">
              View All <FaArrowRight />
            </Link>
          </div>
        </ScrollReveal>

        {/* Filters */}
        <div className="dashboard-filters">
          <div className="dash-search-wrap">
            <FaSearch className="dash-search-icon" />
            <input
              type="text"
              placeholder="Search teams or city…"
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="dash-search-input"
            />
          </div>
          <div className="dash-filter-wrap">
            <FaFilter className="dash-filter-icon" />
            <select
              value={filter}
              onChange={e => setFilter(e.target.value)}
              className="dash-filter-select"
            >
              {stadiumsList.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
        </div>

        {/* Match cards grid */}
        <motion.div
          className="dashboard-matches-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {filtered.length > 0 ? filtered.map(match => (
            <motion.div
              key={match.id}
              className="dash-match-card glass-panel"
              variants={itemVariants}
              onClick={() => goToStadium(match.stadium)}
              title={`View ${match.stadium}`}
            >
              <div className="dash-match-header">
                <span className={`dash-match-type ${match.type === 'Grand Final' ? 'final' : ''}`}>
                  {match.type === 'Grand Final' ? <FaTrophy /> : <FaFutbol />}
                  {match.type}
                </span>
                <span className="dash-match-group">{match.group}</span>
              </div>

              <div className="dash-match-teams">
                <div className="dash-team">
                  {match.flagA && match.flagA !== 'tbd' ? (
                    <img src={`https://flagcdn.com/w80/${match.flagA}.png`} alt={match.teamA} className="dash-flag" loading="lazy" />
                  ) : (
                    <div className="dash-flag-placeholder">?</div>
                  )}
                  <span className="dash-team-name">{match.teamA}</span>
                </div>
                <span className="dash-vs">VS</span>
                <div className="dash-team dash-team-right">
                  <span className="dash-team-name">{match.teamB}</span>
                  {match.flagB && match.flagB !== 'tbd' ? (
                    <img src={`https://flagcdn.com/w80/${match.flagB}.png`} alt={match.teamB} className="dash-flag" loading="lazy" />
                  ) : (
                    <div className="dash-flag-placeholder">?</div>
                  )}
                </div>
              </div>

              <div className="dash-match-meta">
                <span><FaCalendarAlt /> {match.date}</span>
                <span><FaClock /> {match.time}</span>
              </div>
              <div className="dash-match-venue">
                <FaMapMarkerAlt /> {match.stadium}, {match.city}
              </div>

              <div className="dash-match-footer">
                <span className="dash-match-hint">Click to explore venue →</span>
              </div>
            </motion.div>
          )) : (
            <div className="no-matches" style={{ gridColumn: '1/-1' }}>
              <p>No matches found for your search.</p>
            </div>
          )}
        </motion.div>
      </section>
    </div>
  );
}

export default Dashboard;
