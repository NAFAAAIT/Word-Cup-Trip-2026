import React, { useState } from 'react';
import HotelCard from '../components/HotelCard';
import RestaurantCard from '../components/RestaurantCard';
import StadiumCard from '../components/StadiumCard';
import { mockHotels, mockRestaurants, mockStadiums } from '../data/mockData';
import { FaSuitcase, FaCalendarAlt, FaShareAlt, FaTrash, FaHotel, FaUtensils, FaFutbol, FaArrowRight, FaPlus } from 'react-icons/fa';
import './MyTrip.css';

const TRIP_DAYS = [
  { date: 'Jun 14', label: 'Match Day 1', city: 'New York / NJ', emoji: '⚽' },
  { date: 'Jun 17', label: 'Exploration Day', city: 'Mexico City', emoji: '🏙️' },
  { date: 'Jun 22', label: 'Match Day 2 — SF', city: 'Los Angeles', emoji: '🏆' },
];

function StatCard({ icon, label, count, color }) {
  return (
    <div className="mytrip-stat-card" style={{ '--s-color': color }}>
      <div className="mytrip-stat-icon">{icon}</div>
      <div>
        <p className="mytrip-stat-count">{count}</p>
        <p className="mytrip-stat-label">{label}</p>
      </div>
    </div>
  );
}

function MyTrip() {
  const savedHotels = [mockHotels[0], mockHotels[2]];
  const savedRestaurants = [mockRestaurants[1], mockRestaurants[0]];
  const savedStadiums = [mockStadiums[0], mockStadiums[3]];

  return (
    <div className="mytrip-page">
      {/* Hero / Dashboard Header */}
      <div className="mytrip-hero">
        <div className="mytrip-hero-overlay" />
        <div className="container mytrip-hero-inner">
          <div>
            <div className="mytrip-hero-badge">
              <FaSuitcase /> My World Cup Trip
            </div>
            <h1 className="mytrip-hero-title">Your Travel Dashboard</h1>
            <p className="mytrip-hero-sub">Manage your itinerary, saved locations, and match schedule.</p>
          </div>
          <div className="mytrip-hero-actions">
            <button className="btn btn-secondary"><FaShareAlt /> Share Trip</button>
            <button className="btn btn-primary"><FaCalendarAlt /> View Calendar</button>
          </div>
        </div>
      </div>

      <div className="container mytrip-body">

        {/* Stats Row */}
        <div className="mytrip-stats-row">
          <StatCard icon={<FaHotel />} label="Saved Hotels" count={savedHotels.length} color="#00eeff" />
          <StatCard icon={<FaUtensils />} label="Saved Dining" count={savedRestaurants.length} color="#f59e0b" />
          <StatCard icon={<FaFutbol />} label="Stadiums" count={savedStadiums.length} color="#10b981" />
          <StatCard icon={<FaCalendarAlt />} label="Planned Days" count={TRIP_DAYS.length} color="#a78bfa" />
        </div>

        {/* Itinerary */}
        <section className="mytrip-section">
          <div className="mytrip-section-header">
            <h2 className="section-title">📅 My Itinerary</h2>
            <button className="mytrip-add-btn"><FaPlus /> Add Day</button>
          </div>
          <div className="mytrip-itinerary">
            {TRIP_DAYS.map((day, i) => (
              <div key={i} className="mytrip-day-card">
                <div className="mytrip-day-date">
                  <span className="mytrip-day-emoji">{day.emoji}</span>
                  <span className="mytrip-day-number">{day.date}</span>
                </div>
                <div className="mytrip-day-content">
                  <p className="mytrip-day-label">{day.label}</p>
                  <p className="mytrip-day-city">{day.city}</p>
                </div>
                <button className="mytrip-day-arrow"><FaArrowRight /></button>
              </div>
            ))}
          </div>
        </section>

        {/* Saved Stadiums */}
        <section className="mytrip-section">
          <div className="mytrip-section-header">
            <h2 className="section-title">🏟️ Saved Stadiums ({savedStadiums.length})</h2>
          </div>
          <div className="grid lg:grid-cols-2 gap-6">
            {savedStadiums.map(s => <StadiumCard key={s.id} stadium={s} />)}
          </div>
        </section>

        {/* Saved Hotels */}
        <section className="mytrip-section">
          <div className="mytrip-section-header">
            <h2 className="section-title">🏨 Saved Hotels ({savedHotels.length})</h2>
          </div>
          <div className="mytrip-hotels-grid">
            {savedHotels.map(h => <HotelCard key={h.id} hotel={h} />)}
          </div>
        </section>

        {/* Saved Dining */}
        <section className="mytrip-section">
          <div className="mytrip-section-header">
            <h2 className="section-title">🍽️ Saved Dining ({savedRestaurants.length})</h2>
          </div>
          <div className="mytrip-dining-grid">
            {savedRestaurants.map(r => <RestaurantCard key={r.id} restaurant={r} />)}
          </div>
        </section>
      </div>
    </div>
  );
}

export default MyTrip;
