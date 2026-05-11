import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  FaFutbol, FaHotel, FaUtensils, FaMapMarkerAlt, FaBus,
  FaShieldAlt, FaCalendarAlt, FaClock, FaArrowRight,
  FaTrophy, FaSearch
} from 'react-icons/fa';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { getMatches, getStadiums } from '../services/api';
import { mockMatches } from '../data/mockData';
import ScrollReveal from '../components/ScrollReveal';
import ErrorBoundary from '../components/ErrorBoundary';
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

const normalizeMatch = (match) => ({
  ...match,
  id: match.id ?? match._id,
  teamA: String(match.teamA || ''),
  teamB: String(match.teamB || ''),
  city: String(match.city || ''),
  stadium: String(match.stadium || ''),
  group: String(match.group || ''),
  date: String(match.date || ''),
  time: String(match.time || ''),
  type: String(match.type || 'Group Stage'),
  flagA: match.flagA || 'tbd',
  flagB: match.flagB || 'tbd',
});

function Dashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [matches, setMatches] = useState(() => mockMatches.slice(0, 12).map(normalizeMatch));
  const [stadiumsList, setStadiumsList] = useState(() => ['All Stadiums', ...new Set(mockMatches.slice(0, 12).map(match => normalizeMatch(match).stadium).filter(Boolean))]);
  const [search, setSearch] = useState('');
  const [groupFilter, setGroupFilter] = useState('All Groups');
  const [filter, setFilter] = useState('All Stadiums');

  const groups = ['All Groups', ...new Set(matches.map(match => match.group).filter(Boolean))].sort();

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
        if (Array.isArray(mRes) && mRes.length > 0) setMatches(mRes.slice(0, 12).map(normalizeMatch));
        if (Array.isArray(sRes) && sRes.length > 0) {
          setStadiumsList(['All Stadiums', ...new Set(sRes.map(s => String(s.name || '')).filter(Boolean))]);
        } else {
          setStadiumsList(['All Stadiums', ...new Set(mockMatches.map(m => normalizeMatch(m).stadium).filter(Boolean))]);
        }
      } catch {
        setStadiumsList(['All Stadiums', ...new Set(mockMatches.map(m => normalizeMatch(m).stadium).filter(Boolean))]);
      }
    })();
    return () => { mounted = false; };
  }, []);

  const filtered = matches.filter(m => {
    const teamA = String(m.teamA || '').toLowerCase();
    const teamB = String(m.teamB || '').toLowerCase();
    const city = String(m.city || '').toLowerCase();
    const stadium = String(m.stadium || '');
    const group = String(m.group || '');
    const matchesSearch = !search ||
      teamA.includes(search.toLowerCase()) ||
      teamB.includes(search.toLowerCase()) ||
      city.includes(search.toLowerCase());
    const matchesGroup = groupFilter === 'All Groups' || group === groupFilter;
    const matchesFilter = filter === 'All Stadiums' || stadium === filter;
    return matchesSearch && matchesGroup && matchesFilter;
  });

  const goToStadium = (stadiumName) => {
    navigate(`/stadiums?stadium=${encodeURIComponent(stadiumName)}`);
  };

  const firstName = user?.fullName?.split(' ')[0] || 'Fan';

  return (
    <ErrorBoundary>
      <div className="dashboard-page">

        {/* ── Welcome banner ── */}
        <section className="dashboard-hero">
          <div className="dashboard-hero-bg" />
          <div className="container dashboard-hero-inner">
            <motion.div
              className="dashboard-hero-copy"
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

            {/* <motion.div
            className="dashboard-hero-panel glass-panel"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.12 }}
          >
            <div className="dashboard-hero-panel-badge">Trip snapshot</div>
            <div className="dashboard-hero-stats">
              <div className="dashboard-hero-stat">
                <span className="dashboard-hero-stat-value">{matches.length}</span>
                <span className="dashboard-hero-stat-label">Matches loaded</span>
              </div>
              <div className="dashboard-hero-stat">
                <span className="dashboard-hero-stat-value">{stadiumCount}</span>
                <span className="dashboard-hero-stat-label">Stadiums ready</span>
              </div>
              <div className="dashboard-hero-stat">
                <span className="dashboard-hero-stat-value">6</span>
                <span className="dashboard-hero-stat-label">Tools available</span>
              </div>
            </div>

            <div className="dashboard-hero-links">
              <Link to="/matches" className="dashboard-hero-link">
                <FaCalendarAlt /> Browse matches
              </Link>
              <Link to="/stadiums" className="dashboard-hero-link">
                <FaMapMarkerAlt /> Explore stadiums
              </Link>
              <Link to="/transport" className="dashboard-hero-link">
                <FaBus /> Plan transport
              </Link>
              <Link to="/emergency" className="dashboard-hero-link">
                <FaShieldAlt /> Emergency info
              </Link>
            </div>
          </motion.div> */}
          </div>
        </section>

        {/* ── Feature cards grid ── */}
        <section className="container dashboard-section">
          <ScrollReveal>
            <h2 className="section-title mb-6">Explore Features</h2>
          </ScrollReveal>
          <div className="dashboard-features-grid">
            {FEATURE_CARDS.map(card => (
              <div key={card.label}>
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
              </div>
            ))}
          </div>
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
          <div className="filter-panel" style={{ marginBottom: '2rem' }}>
            <div className="filter-panel-row">
              <div className="filter-search" style={{ flex: 2 }}>
                <FaSearch className="filter-search-icon" />
                <input
                  type="text"
                  placeholder="Search teams or cities..."
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                />
              </div>
              <div className="filter-divider" />
              <div className="filter-group-labeled">
                <span className="filter-label">Group:</span>
                <select
                  value={groupFilter}
                  onChange={e => setGroupFilter(e.target.value)}
                  className="filter-select"
                >
                  {groups.map(g => <option key={g} value={g}>{g}</option>)}
                </select>
              </div>
              <div className="filter-divider" />
              <div className="filter-group-labeled">
                <span className="filter-label">Stadium:</span>
                <select
                  value={filter}
                  onChange={e => setFilter(e.target.value)}
                  className="filter-select"
                >
                  {stadiumsList.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
            </div>
          </div>

          {/* Match cards grid */}
          <div className="dashboard-matches-grid">
            {filtered.length > 0 ? (
              filtered.map(match => (
                <div
                  key={match.id}
                  className="match-card glass-panel"
                >
                  <div className="match-header">
                    <span className={`match-type ${match.type === 'Grand Final' ? 'final' : ''}`}>
                      {match.type === 'Grand Final' ? <FaTrophy /> : <FaFutbol />}
                      {match.type}
                    </span>
                    <span className="match-group">{match.group}</span>
                  </div>

                  <div className="match-teams">
                    <div className="team">
                      <div className="team-flag">
                        {match.flagA && match.flagA !== 'tbd' ? (
                          <img src={`https://flagcdn.com/w160/${match.flagA}.png`} alt={`${match.teamA} flag`} loading="lazy" />
                        ) : (
                          <div className="flag-placeholder">?</div>
                        )}
                      </div>
                      <span className="team-name">{match.teamA}</span>
                    </div>

                    <div className="match-vs">VS</div>

                    <div className="team">
                      <span className="team-name">{match.teamB}</span>
                      <div className="team-flag">
                        {match.flagB && match.flagB !== 'tbd' ? (
                          <img src={`https://flagcdn.com/w160/${match.flagB}.png`} alt={`${match.teamB} flag`} loading="lazy" />
                        ) : (
                          <div className="flag-placeholder">?</div>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="match-info">
                    <div className="info-item">
                      <FaCalendarAlt />
                      <span>{match.date}</span>
                    </div>
                    <div className="info-item">
                      <FaClock />
                      <span>{match.time} Local</span>
                    </div>
                    <div className="info-item">
                      <FaMapMarkerAlt />
                      <span>{match.stadium}, {match.city}</span>
                    </div>
                  </div>

                  <div className="match-actions">
                    <a
                      href="https://www.fifa.com/en/tickets"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="match-cta btn btn-outline"
                      style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                    >
                      Get Tickets
                    </a>
                    <button
                      className="match-cta btn btn-secondary"
                      onClick={() => goToStadium(match.stadium)}
                    >
                      Explore Venue
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="no-matches" style={{ gridColumn: '1/-1' }}>
                <p>No matches found for your search.</p>
              </div>
            )}
          </div>
        </section>
      </div>
    </ErrorBoundary>
  );
}

export default Dashboard;
