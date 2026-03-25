import React, { useState } from 'react';
import MapPlaceholder from '../components/MapPlaceholder';
import { FaSubway, FaBus, FaTaxi, FaTrain, FaMapMarkerAlt, FaClock, FaMoneyBillAlt, FaSyncAlt } from 'react-icons/fa';
import './Transport.css';

const transportData = [
  {
    id: 1, type: 'Subway', icon: FaSubway, color: '#00eeff',
    name: 'Blue Line Fan Train', time: '15 mins', cost: '$2.75',
    route: 'Central Station → Stadium North', freq: 'Every 5 mins',
    status: 'On Time', statusOk: true,
  },
  {
    id: 2, type: 'Bus', icon: FaBus, color: '#f59e0b',
    name: 'Express Matchday Shuttle', time: '25 mins', cost: 'Free with ticket',
    route: 'Downtown Hub → Stadium South', freq: 'Every 15 mins',
    status: 'Frequent', statusOk: true,
  },
  {
    id: 3, type: 'Taxi', icon: FaTaxi, color: '#ef4444',
    name: 'Rideshare / Taxi', time: '10-20 mins', cost: '$15 – $30',
    route: 'City Center → Dedicated Drop-off Zone', freq: 'On Demand',
    status: 'High Demand', statusOk: false,
  },
  {
    id: 4, type: 'Train', icon: FaTrain, color: '#10b981',
    name: 'Regional Rail', time: '45 mins', cost: '$8.50',
    route: 'Airport → Main Transit Center', freq: 'Every 30 mins',
    status: 'On Time', statusOk: true,
  },
];

function TransportCard({ option }) {
  const Icon = option.icon;
  return (
    <div className="transport-card-v2">
      <div className="transport-card-icon-col" style={{ '--t-color': option.color }}>
        <Icon className="transport-icon-v2" />
        <span className="transport-type-label">{option.type}</span>
      </div>
      <div className="transport-card-body-v2">
        <div className="transport-card-header-v2">
          <h3 className="transport-name-v2">{option.name}</h3>
          <span className={`transport-status-badge ${option.statusOk ? 'ok' : 'warn'}`}>
            <FaSyncAlt /> {option.status}
          </span>
        </div>
        <p className="transport-route-v2">
          <FaMapMarkerAlt /> {option.route}
        </p>
        <div className="transport-meta-v2">
          <span><FaClock /> {option.time}</span>
          <span><FaMoneyBillAlt /> {option.cost}</span>
          <span className="transport-freq-v2">{option.freq}</span>
        </div>
      </div>
    </div>
  );
}

function Transport() {
  const [activeCity, setActiveCity] = useState('New York/NJ');
  const cities = ['New York/NJ', 'Los Angeles', 'Mexico City', 'Toronto'];

  return (
    <div className="transport-page">
      {/* Hero */}
      <div className="transport-hero">
        <div className="transport-hero-overlay" />
        <div className="container transport-hero-content">
          <div className="transport-hero-badge">
            <FaBus /> Fan Transit Guide
          </div>
          <h1 className="transport-hero-title">Getting Around</h1>
          <p className="transport-hero-sub">Navigate host cities with real-time transit options straight to the stadiums</p>
          {/* City selector */}
          <div className="transport-city-tabs">
            {cities.map(c => (
              <button
                key={c}
                className={`transport-city-tab ${activeCity === c ? 'active' : ''}`}
                onClick={() => setActiveCity(c)}
              >
                {c}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="container transport-body">
        <div className="transport-layout">
          {/* Options */}
          <div>
            <h2 className="section-title mb-6">🚌 Recommended Routes — {activeCity}</h2>
            <div className="transport-cards-list">
              {transportData.map(opt => <TransportCard key={opt.id} option={opt} />)}
            </div>
          </div>

          {/* Map */}
          <div>
            <h2 className="section-title mb-6">🗺️ Live Transit Map</h2>
            <MapPlaceholder height="480px" title="Transit Network Map" />
            <div className="transport-map-legend">
              <span className="legend-dot" style={{ background: '#00eeff' }} /> Subway
              <span className="legend-dot" style={{ background: '#f59e0b' }} /> Bus
              <span className="legend-dot" style={{ background: '#ef4444' }} /> Taxi Zone
              <span className="legend-dot" style={{ background: '#10b981' }} /> Train
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Transport;
