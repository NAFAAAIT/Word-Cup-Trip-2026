import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  FaSearch, FaBed, FaUtensils, FaMapMarkedAlt, FaPhoneAlt,
  FaFutbol, FaGlobeAmericas, FaStar, FaArrowRight, FaShieldAlt,
} from 'react-icons/fa';
import HotelCard from '../components/HotelCard';
import RestaurantCard from '../components/RestaurantCard';
import StadiumCard from '../components/StadiumCard';
import { mockHotels, mockRestaurants, mockStadiums } from '../data/mockData';
import './Home.css';

const HOST_CITIES = [
  { name: 'New York/NJ', flag: '🇺🇸', matches: 8, emoji: '🏟️' },
  { name: 'Los Angeles', flag: '🇺🇸', matches: 8, emoji: '🌴' },
  { name: 'Mexico City', flag: '🇲🇽', matches: 5, emoji: '⚽' },
  { name: 'Toronto', flag: '🇨🇦', matches: 6, emoji: '🍁' },
  { name: 'Miami', flag: '🇺🇸', matches: 6, emoji: '🏖️' },
  { name: 'Vancouver', flag: '🇨🇦', matches: 6, emoji: '🏔️' },
];

const STATS = [
  { value: '48', label: 'Host Cities' },
  { value: '104', label: 'Total Matches' },
  { value: '3', label: 'Countries' },
  { value: '5M+', label: 'Expected Fans' },
];

function Home() {
  const [search, setSearch] = useState('');
  return (
    <div className="home-page">

      {/* ─── HERO ─────────────────────────────────── */}
      <section className="home-hero">
        <div className="home-hero-bg" />
        <div className="home-hero-particles" aria-hidden />
        <div className="container home-hero-inner">
          <div className="home-hero-left">
            <div className="home-hero-eyebrow">
              <FaFutbol className="spinning-ball" />
              FIFA World Cup 2026™
            </div>
            <h1 className="home-hero-title">
              Experience the <span className="text-gradient">Greatest Show</span> on Earth
            </h1>
            <p className="home-hero-sub">
              Your premium travel companion for the World Cup across <strong>USA</strong>, <strong>Canada</strong> & <strong>Mexico</strong>.
            </p>
            <div className="home-hero-ctas">
              <Link to="/stadiums" className="btn btn-primary">
                <FaGlobeAmericas /> Explore Stadiums
              </Link>
              <Link to="/trip" className="btn btn-secondary">
                Plan My Trip <FaArrowRight />
              </Link>
            </div>
          </div>

          <div className="home-hero-search-card glass-panel">
            <h3 className="home-search-title">
              <FaSearch /> Quick Search
            </h3>
            <div className="home-search-input-wrap">
              <FaSearch className="home-search-ico" />
              <input
                type="text"
                placeholder="City, stadium, hotel..."
                className="home-search-input"
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
            </div>
            <p className="home-search-divider">Quick Links</p>
            <div className="home-quick-links">
              <Link to="/hotels" className="home-quick-link"><FaBed /> Hotels</Link>
              <Link to="/restaurants" className="home-quick-link"><FaUtensils /> Dining</Link>
              <Link to="/transport" className="home-quick-link"><FaMapMarkedAlt /> Transport</Link>
              <Link to="/emergency" className="home-quick-link home-quick-link-danger"><FaShieldAlt /> Help</Link>
            </div>
          </div>
        </div>
      </section>

      {/* ─── STATS BAR ────────────────────────────── */}
      <div className="home-stats-bar">
        <div className="container home-stats-inner">
          {STATS.map(s => (
            <div key={s.label} className="home-stat">
              <span className="home-stat-value">{s.value}</span>
              <span className="home-stat-label">{s.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ─── HOST CITIES ──────────────────────────── */}
      <section className="home-section container">
        <div className="home-section-header">
          <h2 className="section-title">Host Cities</h2>
          <Link to="/stadiums" className="view-all-link">View Stadiums <FaArrowRight /></Link>
        </div>
        <div className="home-cities-grid">
          {HOST_CITIES.map(city => (
            <div key={city.name} className="home-city-chip">
              <span className="home-city-emoji">{city.emoji}</span>
              <span className="home-city-flag">{city.flag}</span>
              <div>
                <p className="home-city-name">{city.name}</p>
                <p className="home-city-matches">{city.matches} matches</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ─── FEATURED STADIUMS ────────────────────── */}
      <section className="home-section container">
        <div className="home-section-header">
          <h2 className="section-title">🏟️ Host Stadiums</h2>
          <Link to="/stadiums" className="view-all-link">View All <FaArrowRight /></Link>
        </div>
        <div className="grid lg:grid-cols-2 gap-6">
          {mockStadiums.slice(0, 2).map(s => <StadiumCard key={s.id} stadium={s} />)}
        </div>
      </section>

      {/* ─── TOP HOTELS ───────────────────────────── */}
      <section className="home-section home-section-dark">
        <div className="container">
          <div className="home-section-header">
            <h2 className="section-title">🏨 Top Rated Hotels</h2>
            <Link to="/hotels" className="view-all-link">View All <FaArrowRight /></Link>
          </div>
          <div className="home-hotels-grid">
            {mockHotels.slice(0, 3).map(h => <HotelCard key={h.id} hotel={h} />)}
          </div>
        </div>
      </section>

      {/* ─── FAN DINING ───────────────────────────── */}
      <section className="home-section container">
        <div className="home-section-header">
          <h2 className="section-title">🍽️ Fan Favorites: Dining</h2>
          <Link to="/restaurants" className="view-all-link">View All <FaArrowRight /></Link>
        </div>
        <div className="home-dining-grid">
          {mockRestaurants.slice(0, 4).map(r => <RestaurantCard key={r.id} restaurant={r} />)}
        </div>
      </section>

      {/* ─── CTA BANNER ───────────────────────────── */}
      <section className="home-cta-banner">
        <div className="home-cta-overlay" />
        <div className="container home-cta-inner">
          <div className="home-cta-badge">Limited Spots Available</div>
          <h2 className="home-cta-title">Ready to Plan Your World Cup Trip?</h2>
          <p className="home-cta-sub">Save hotels, restaurants, and stadiums all in one place.</p>
          <Link to="/trip" className="btn btn-primary home-cta-btn">
            Start Planning <FaArrowRight />
          </Link>
        </div>
      </section>
    </div>
  );
}

export default Home;
