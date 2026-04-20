import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  FaSearch, FaBed, FaUtensils, FaMapMarkedAlt, FaPhoneAlt,
  FaFutbol, FaGlobeAmericas, FaStar, FaArrowRight, FaShieldAlt,
  FaHotel, FaCity, FaUsers, FaTicketAlt, FaPlay
} from 'react-icons/fa';
import HotelCard from '../components/HotelCard';
import RestaurantCard from '../components/RestaurantCard';
import StadiumCard from '../components/StadiumCard';
import { mockHotels, mockRestaurants, mockStadiums } from '../data/mockData';
import './Home.css';

const HOST_CITIES = [
  { name: 'New York/NJ', country: 'USA', matches: 8, image: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?auto=format&fit=crop&w=800&q=80' },
  { name: 'Los Angeles', country: 'USA', matches: 8, image: 'https://thumbs.dreamstime.com/b/sunset-over-los-angeles-downtown-city-center-california-165474416.jpg' },
  { name: 'Mexico City', country: 'Mexico', matches: 5, image: 'https://images.unsplash.com/photo-1585464231875-d9ef1f5ad396?auto=format&fit=crop&w=800&q=80' },
  { name: 'Toronto', country: 'Canada', matches: 6, image: 'https://images.unsplash.com/photo-1517090504586-fde19ea6066f?auto=format&fit=crop&w=800&q=80' },
  { name: 'Miami', country: 'USA', matches: 6, image: 'https://images.unsplash.com/photo-1533106497176-45ae19e68ba2?auto=format&fit=crop&w=800&q=80' },
  { name: 'Vancouver', country: 'Canada', matches: 6, image: 'https://images.unsplash.com/photo-1559511260-66a654ae982a?auto=format&fit=crop&w=800&q=80' },
];

const STATS = [
  { value: '48', label: 'Host Cities', icon: <FaCity /> },
  { value: '104', label: 'Total Matches', icon: <FaTicketAlt /> },
  { value: '3', label: 'Countries', icon: <FaGlobeAmericas /> },
  { value: '5M+', label: 'Expected Fans', icon: <FaUsers /> },
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
              <Link to="/matches" className="btn btn-secondary">
                View Matches <FaArrowRight />
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
              <div className="home-stat-icon-wrap">{s.icon}</div>
              <div>
                <span className="home-stat-value">{s.value}</span>
                <span className="home-stat-label">{s.label}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ─── HOST CITIES ──────────────────────────── */}
      <section className="home-section container">
        <div className="home-section-header">
          <div className="section-title-wrap">
            <h2 className="section-title">Iconic Host Cities</h2>
            <p className="section-subtitle">Discover the vibrant metropolises hosting the matches</p>
          </div>
          <Link to="/stadiums" className="view-all-link">View All Venues <FaArrowRight /></Link>
        </div>
        <div className="home-cities-cards">
          {HOST_CITIES.map(city => (
            <div key={city.name} className="home-city-card">
              <img src={city.image} alt={city.name} className="home-city-card-img" />
              <div className="home-city-card-overlay" />
              <div className="home-city-card-content">
                <span className="city-card-country">{city.country}</span>
                <h3 className="city-card-name">{city.name}</h3>
                <div className="city-card-meta">
                  <FaTicketAlt /> {city.matches} matches
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ─── TOURNAMENT EXPERIENCE Section ────────── */}
      <section className="home-experience-section">
        <div className="container grid lg:grid-cols-2 gap-12 items-center">
          <div className="experience-content">
            <h2 className="experience-title">A Journey Beyond <span className="text-gradient">Football</span></h2>
            <p className="experience-desc">
              The 2026 World Cup is more than just matches. It's an opportunity to explore the diverse cultures, 
              stunning landscapes, and world-class hospitality of North America.
            </p>
            <div className="experience-features">
              <div className="exp-feature">
                <div className="exp-icon"><FaPlay /></div>
                <div>
                  <h4>Immersive Atmosphere</h4>
                  <p>Join millions of fans in vibrant fan zones across 16 cities.</p>
                </div>
              </div>
              <div className="exp-feature">
                <div className="exp-icon"><FaHotel /></div>
                <div>
                  <h4>Premium Luxury</h4>
                  <p>Hand-picked accommodations steps away from the action.</p>
                </div>
              </div>
            </div>
          </div>
          <div className="experience-visual">
            <div className="exp-img-grid">
              <img src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80" alt="Modern City" className="exp-img-main" />
              <img src="https://images.unsplash.com/photo-1517457373958-b7bdd4587205?q=80&w=2069&auto=format&fit=crop" alt="Fan Celebration" className="exp-img-sub" />
            </div>
          </div>
        </div>
      </section>

      {/* ─── FEATURED STADIUMS ────────────────────── */}
      <section className="home-section container">
        <div className="home-section-header">
          <div className="section-title-wrap">
            <h2 className="section-title">World-Class Arenas</h2>
            <p className="section-subtitle">The legendary stages for the 2026 tournament</p>
          </div>
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
            <div className="section-title-wrap">
              <h2 className="section-title">Premium Stays</h2>
              <p className="section-subtitle">Luxury hotels curated for visiting fans</p>
            </div>
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
          <div className="section-title-wrap">
            <h2 className="section-title">Culinary Scenes</h2>
            <p className="section-subtitle">The best restaurants nearby host venues</p>
          </div>
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
          <div className="home-cta-badge">Tournament Launch 2026</div>
          <h2 className="home-cta-title">Your Ultimate World Cup Guide</h2>
          <p className="home-cta-sub">Start planning your cross-continental journey today. Every stadium, every city, one premium platform.</p>
          <div className="flex justify-center gap-4 mt-8 flex-wrap">
             <Link to="/matches" className="btn btn-primary home-cta-btn">
              Explore Matches <FaArrowRight />
            </Link>
             <Link to="/stadiums" className="btn btn-secondary home-cta-btn">
              Browse Venues
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
