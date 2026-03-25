import React, { useState } from 'react';
import MapPlaceholder from '../components/MapPlaceholder';
import HotelCard from '../components/HotelCard';
import RestaurantCard from '../components/RestaurantCard';
import { mockStadiums, mockHotels, mockRestaurants } from '../data/mockData';
import StadiumCard from '../components/StadiumCard';
import { FaArrowLeft, FaUsers, FaFutbol, FaMapMarkerAlt, FaBus, FaParking, FaSubway } from 'react-icons/fa';
import './Stadiums.css';

function StadiumDetailView({ stadium, onBack }) {
  return (
    <div className="stadium-detail-page fade-in">
      {/* Full-bleed hero */}
      <div className="stadium-detail-hero">
        <img src={stadium.image} alt={stadium.name} className="stadium-detail-hero-img" />
        <div className="stadium-detail-hero-overlay" />
        <div className="container stadium-detail-hero-content">
          <button className="stadium-back-btn" onClick={onBack}>
            <FaArrowLeft /> All Stadiums
          </button>
          <div className="stadium-detail-badges">
            <span className="stadium-detail-badge-country">
              <FaMapMarkerAlt /> {stadium.city}, {stadium.country}
            </span>
            <span className="stadium-detail-badge-matches">
              <FaFutbol /> {stadium.matches} Matches
            </span>
          </div>
          <h1 className="stadium-detail-title">{stadium.name}</h1>
          <div className="stadium-detail-stats">
            <div className="sdetail-stat">
              <FaUsers className="sdetail-stat-icon" />
              <span className="sdetail-stat-value">{stadium.capacity}</span>
              <span className="sdetail-stat-label">Capacity</span>
            </div>
            <div className="sdetail-stat-divider" />
            <div className="sdetail-stat">
              <FaFutbol className="sdetail-stat-icon" />
              <span className="sdetail-stat-value">{stadium.matches}</span>
              <span className="sdetail-stat-label">Matches</span>
            </div>
          </div>
        </div>
      </div>

      <div className="container stadium-detail-body">
        <div className="stadium-detail-grid">
          {/* Main column */}
          <div>
            <section className="card p-8 mb-8">
              <h2 className="section-title">About the Venue</h2>
              <p className="text-secondary leading-relaxed text-lg">{stadium.description}</p>
            </section>

            <section className="mb-8">
              <h2 className="section-title">🏨 Nearby Hotels</h2>
              <div className="grid md:grid-cols-2 gap-6">
                {mockHotels.slice(0, 2).map(h => <HotelCard key={h.id} hotel={h} />)}
              </div>
            </section>

            <section>
              <h2 className="section-title">🍽️ Nearby Dining</h2>
              <div className="grid md:grid-cols-2 gap-6">
                {mockRestaurants.slice(0, 2).map(r => <RestaurantCard key={r.id} restaurant={r} />)}
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <div className="stadium-detail-sidebar">
            <div className="card p-6 mb-6">
              <h3 className="font-bold mb-4 flex items-center gap-2">
                <FaMapMarkerAlt className="text-primary-accent" /> Stadium Location
              </h3>
              <MapPlaceholder height="280px" title={stadium.name} />
            </div>
            <div className="card p-6">
              <h3 className="font-bold mb-4 flex items-center gap-2">
                <FaBus className="text-success-color" /> Transport Options
              </h3>
              <ul className="stadium-transport-list">
                <li className="stadium-transport-item">
                  <FaSubway className="text-primary-accent" />
                  <span className="flex-1">Nearest Metro</span>
                  <span className="text-white font-bold text-sm">0.5 mi</span>
                </li>
                <li className="stadium-transport-item">
                  <FaBus className="text-warning" />
                  <span className="flex-1">Fan Shuttle</span>
                  <span className="text-white font-bold text-sm">Every 15 min</span>
                </li>
                <li className="stadium-transport-item border-b-0">
                  <FaParking className="text-danger" />
                  <span className="flex-1">Parking</span>
                  <span className="font-bold text-sm" style={{ color: 'var(--warning-color)' }}>Pre-book only</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Stadiums() {
  const [selectedStadium, setSelectedStadium] = useState(null);
  const [activeCountry, setActiveCountry] = useState('All');

  if (selectedStadium) {
    return <StadiumDetailView stadium={selectedStadium} onBack={() => setSelectedStadium(null)} />;
  }

  const countries = ['All', 'USA', 'Mexico', 'Canada'];
  const filtered = activeCountry === 'All'
    ? mockStadiums
    : mockStadiums.filter(s => s.country === activeCountry);

  return (
    <div className="stadiums-page">
      {/* Hero */}
      <div className="stadiums-hero">
        <div className="stadiums-hero-overlay" />
        <div className="stadiums-hero-particles" />
        <div className="container stadiums-hero-content">
          <div className="stadiums-hero-badge">
            <FaFutbol /> FIFA World Cup 2026™ — Venues
          </div>
          <h1 className="stadiums-hero-title">The Arenas</h1>
          <p className="stadiums-hero-sub">
            Discover the iconic venues across North America where football history will be written in 2026
          </p>
          {/* Country filter */}
          <div className="stadiums-country-tabs">
            {countries.map(c => (
              <button
                key={c}
                className={`stadiums-country-tab ${activeCountry === c ? 'active' : ''}`}
                onClick={() => setActiveCountry(c)}
              >
                {c === 'USA' ? '🇺🇸' : c === 'Mexico' ? '🇲🇽' : c === 'Canada' ? '🇨🇦' : '🌍'} {c}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Stadium cards */}
      <div className="container stadiums-body">
        <p className="stadiums-results-count">
          Showing <strong>{filtered.length}</strong> venues
        </p>
        <div className="stadiums-cards-list">
          {filtered.map(stadium => (
            <StadiumCard
              key={stadium.id}
              stadium={stadium}
              onClick={() => setSelectedStadium(stadium)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Stadiums;
