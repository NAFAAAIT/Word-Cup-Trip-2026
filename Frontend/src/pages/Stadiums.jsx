import React, { useMemo, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import StadiumLocationMap from '../components/StadiumLocationMap';
import HotelCard from '../components/HotelCard';
import RestaurantCard from '../components/RestaurantCard';
import { mockMatches, mockStadiums, mockHotels, mockRestaurants } from '../data/mockData';
import StadiumCard from '../components/StadiumCard';
import { FaArrowLeft, FaUsers, FaFutbol, FaMapMarkerAlt, FaBus, FaParking, FaSubway, FaRoute, FaCalendarAlt } from 'react-icons/fa';
import './Stadiums.css';

function StadiumDetailView({ stadium, onBack }) {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [stadium]);

  const relatedMatches = useMemo(
    () => mockMatches.filter((match) => match.stadium === stadium.name),
    [stadium.name]
  );

  const transportCity = relatedMatches[0]?.city || stadium.city;

  const nearbyHotels = useMemo(() => {
    // Filter by exact city first
    const inCity = mockHotels.filter((hotel) => hotel.city === stadium.city);
    return inCity.length ? inCity : mockHotels.slice(0, 4);
  }, [stadium.city]);

  const nearbyRestaurants = useMemo(() => {
    const nameLower = stadium.name.toLowerCase();
    const cityLower = stadium.city.toLowerCase();
    
    // Filter by stadium name in distance or city match
    const scoped = mockRestaurants.filter((r) => {
      const distLower = r.distance.toLowerCase();
      return distLower.includes(nameLower) || 
             distLower.includes(stadium.name.split(' ')[0].toLowerCase()) ||
             r.description.toLowerCase().includes(nameLower) ||
             (r.country === stadium.country && cityLower.includes(r.distance.toLowerCase().split(' to ')[1] || ''));
    });

    // If no direct matches, fall back to city or country scoped
    if (scoped.length) return scoped;
    
    return mockRestaurants.filter(r => r.city === stadium.city || r.country === stadium.country).slice(0, 4);
  }, [stadium.name, stadium.city, stadium.country]);

  const openTransport = () => {
    const params = new URLSearchParams({
      city: transportCity,
      stadium: stadium.name,
    });

    navigate(`/transport?${params.toString()}`);
  };

  const openMatches = () => {
    const params = new URLSearchParams({
      stadium: stadium.name,
      city: transportCity,
    });

    navigate(`/matches?${params.toString()}`);
  };

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

          <div className="stadium-detail-cta-row">
            <button className="btn btn-primary stadium-detail-cta" onClick={openTransport}>
              <FaRoute /> Plan Transport
            </button>
            <button className="btn btn-secondary stadium-detail-cta" onClick={openMatches}>
              <FaCalendarAlt /> View Stadium Matches
            </button>
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
                {nearbyHotels.map(h => <HotelCard key={h.id} hotel={h} />)}
              </div>
            </section>

            <section>
              <h2 className="section-title">🍽️ Nearby Dining</h2>
              <div className="grid md:grid-cols-2 gap-6">
                {nearbyRestaurants.map(r => <RestaurantCard key={r.id} restaurant={r} />)}
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <div className="stadium-detail-sidebar">
            <div className="card p-6 mb-6">
              <h3 className="font-bold mb-4 flex items-center gap-2">
                <FaMapMarkerAlt className="text-primary-accent" /> Stadium Location
              </h3>
              <StadiumLocationMap stadiumName={stadium.name} city={`${stadium.city}, ${stadium.country}`} />
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
      <section className="page-hero">
        <div className="page-hero-bg">
          <img src="https://images.unsplash.com/photo-1522778119026-d647f0596c20?auto=format&fit=crop&w=1920&q=80" alt="Stadium" />
        </div>
        <div className="page-hero-overlay" />
        <div className="container page-hero-content">
          <div className="page-hero-badge">
            <FaFutbol /> FIFA World Cup 2026™ — Venues
          </div>
          <h1 className="page-hero-title">The <span className="text-gradient">Arenas</span></h1>
          <p className="page-hero-desc">
            Discover the iconic venues across North America where football history will be written in 2026
          </p>
          {/* Country filter */}
          <div className="stadiums-country-tabs mt-8">
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
      </section>

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
