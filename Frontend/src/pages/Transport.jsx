import React, { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import TransportMap from '../components/TransportMap';
import {
  FaSubway,
  FaBus,
  FaTaxi,
  FaTrain,
  FaMapMarkerAlt,
  FaClock,
  FaMoneyBillAlt,
  FaSyncAlt,
  FaUndoAlt,
  FaGlobe,
  FaMapMarkedAlt,
} from 'react-icons/fa';
import { mockTransports, mockStadiums } from '../data/mockData';
import './Transport.css';

import { motion } from 'framer-motion';

const typeIcon = {
  Subway: FaSubway,
  Bus: FaBus,
  Taxi: FaTaxi,
  Train: FaTrain,
};

const DEFAULT_FILTERS = {
  activeType: 'All',
  sortBy: 'fastest',
  statusFilter: 'All',
  durationMax: 60,
  costMax: 40,
  searchText: '',
};

function TransportCard({ option, isSelected, onSelect }) {
  const Icon = typeIcon[option.type] || FaBus;

  return (
    <motion.button
      type="button"
      className={`transport-card-v2 ${isSelected ? 'selected' : ''}`}
      onClick={() => onSelect(option.id)}
      aria-pressed={isSelected}
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      <div className="transport-card-icon-col" style={{ '--t-color': option.color }}>
        <Icon className="transport-icon-v2" />
        <span className="transport-type-label">{option.type}</span>
      </div>
      <div className="transport-card-body-v2">
        <div className="transport-card-header-v2">
          <h3 className="transport-name-v2">{option.lineName}</h3>
          <span className={`transport-status-badge ${option.statusOk ? 'ok' : 'warn'}`}>
            <FaSyncAlt /> {option.status}
          </span>
        </div>
        <p className="transport-route-v2">
          <FaMapMarkerAlt /> {option.from} to {option.to}
        </p>
        <div className="transport-meta-v2">
          <span><FaClock /> {option.durationMin} mins</span>
          <span><FaMoneyBillAlt /> {option.costLabel}</span>
          <span className="transport-freq-v2">{option.frequencyLabel}</span>
        </div>
      </div>
    </motion.button>
  );
}


function Transport() {
  const [searchParams] = useSearchParams();
  const countries = ['All', 'USA', 'Mexico', 'Canada'];

  const [activeCountry, setActiveCountry] = useState('All');
  const [activeType, setActiveType] = useState(DEFAULT_FILTERS.activeType);
  const [sortBy, setSortBy] = useState(DEFAULT_FILTERS.sortBy);
  const [statusFilter, setStatusFilter] = useState(DEFAULT_FILTERS.statusFilter);
  const [durationMax, setDurationMax] = useState(DEFAULT_FILTERS.durationMax);
  const [costMax, setCostMax] = useState(DEFAULT_FILTERS.costMax);
  const [searchText, setSearchText] = useState(DEFAULT_FILTERS.searchText);
  const [selectedRouteId, setSelectedRouteId] = useState(null);
  const [fromMatchLabel, setFromMatchLabel] = useState('');

  const routeTypes = useMemo(() => ['All', ...new Set(mockTransports.map((route) => route.type))], []);

  // Helper to map cities to countries
  const cityToCountryMap = useMemo(() => {
    const map = {};
    mockStadiums.forEach(s => {
      map[s.city] = s.country;
      // Handle variations like "New York/NJ" vs "New York/New Jersey"
      if (s.city.includes('/')) {
        const parts = s.city.split('/');
        parts.forEach(p => map[p.trim()] = s.country);
      }
    });
    return map;
  }, []);

  useEffect(() => {
    const city = searchParams.get('city');
    const stadium = searchParams.get('stadium');
    const kickoff = searchParams.get('kickoff');

    if (city) {
      const country = cityToCountryMap[city] || (city.includes('York') ? 'USA' : null);
      if (country) setActiveCountry(country);
    }

    if (stadium) {
      setSearchText(stadium);
      setFromMatchLabel(`${stadium}${kickoff ? ` - ${kickoff}` : ''}`);
    }
  }, [cityToCountryMap, searchParams]);

  const filteredRoutes = useMemo(() => {
    const loweredSearch = searchText.trim().toLowerCase();

    const list = mockTransports.filter((route) => {
      const routeCountry = cityToCountryMap[route.city] || (route.city.includes('York') ? 'USA' : 'USA');
      const matchesCountry = activeCountry === 'All' || routeCountry === activeCountry;
      const matchesType = activeType === 'All' || route.type === activeType;
      const matchesStatus = statusFilter === 'All' || route.status === statusFilter;
      const matchesDuration = route.durationMin <= durationMax;
      const matchesCost = route.costUsd <= costMax;
      const matchesSearch =
        !loweredSearch ||
        route.lineName.toLowerCase().includes(loweredSearch) ||
        route.from.toLowerCase().includes(loweredSearch) ||
        route.to.toLowerCase().includes(loweredSearch) ||
        route.stadium.toLowerCase().includes(loweredSearch);

      return matchesCountry && matchesType && matchesStatus && matchesDuration && matchesCost && matchesSearch;
    });

    const sorted = [...list];
    sorted.sort((a, b) => {
      if (sortBy === 'cheapest') {
        return a.costUsd - b.costUsd;
      }

      if (sortBy === 'frequent') {
        const af = a.frequencyMin ?? Number.POSITIVE_INFINITY;
        const bf = b.frequencyMin ?? Number.POSITIVE_INFINITY;
        return af - bf;
      }

      return a.durationMin - b.durationMin;
    });

    return sorted;
  }, [activeCountry, activeType, cityToCountryMap, costMax, durationMax, searchText, sortBy, statusFilter]);

  useEffect(() => {
    if (!filteredRoutes.length) {
      setSelectedRouteId(null);
      return;
    }

    const selectedStillExists = filteredRoutes.some((route) => route.id === selectedRouteId);
    if (!selectedStillExists) {
      setSelectedRouteId(filteredRoutes[0].id);
    }
  }, [filteredRoutes, selectedRouteId]);

  const resetFilters = () => {
    setActiveType(DEFAULT_FILTERS.activeType);
    setSortBy(DEFAULT_FILTERS.sortBy);
    setStatusFilter(DEFAULT_FILTERS.statusFilter);
    setDurationMax(DEFAULT_FILTERS.durationMax);
    setCostMax(DEFAULT_FILTERS.costMax);
    setSearchText(DEFAULT_FILTERS.searchText);
  };

  return (
    <div className="transport-page">
      <section className="page-hero">
        <div className="page-hero-bg">
          <img src="https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?auto=format&fit=crop&w=1920&q=80" alt="Transport" />
        </div>
        <div className="page-hero-overlay" />
        <div className="container page-hero-content">
          <div className="page-hero-badge">
            <FaBus /> Fan Transit Guide
          </div>
          <h1 className="page-hero-title">Getting <span className="text-gradient">Around</span></h1>
          <p className="page-hero-desc">Navigate host cities with real-time transit options straight to the stadiums</p>

          {fromMatchLabel && (
            <div className="transport-match-banner" role="status">
              Planning route from match context: {fromMatchLabel}
            </div>
          )}

          <div className="transport-city-tabs mt-8">
            {countries.map((c) => (
              <button
                key={c}
                className={`transport-city-tab ${activeCountry === c ? 'active' : ''}`}
                onClick={() => setActiveCountry(c)}
              >
                {c === 'All' ? (
                  <FaGlobe className="mr-2" />
                ) : (
                  <img
                    src={`https://flagcdn.com/w40/${c === 'USA' ? 'us' : c === 'Mexico' ? 'mx' : 'ca'}.png`}
                    alt={c}
                    className="emrg-city-flag mr-2"
                    style={{ width: '20px', height: 'auto', borderRadius: '2px' }}
                  />
                )}
                <span style={{ marginLeft: '4px' }}>{c}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      <div className="container transport-body">
        <div className="filter-panel">
          <div className="filter-panel-row">
            <div className="filter-pills" role="tablist" aria-label="Transport type filter">
              {routeTypes.map((type) => (
                <button
                  type="button"
                  key={type}
                  className={`filter-pill ${activeType === type ? 'active' : ''}`}
                  onClick={() => setActiveType(type)}
                  role="tab"
                  aria-selected={activeType === type}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          <div className="filter-panel-row">
            <div className="filter-group-labeled">
              <span className="filter-label">Sort</span>
              <select className="filter-select" value={sortBy} onChange={(event) => setSortBy(event.target.value)}>
                <option value="fastest">Fastest</option>
                <option value="cheapest">Cheapest</option>
                <option value="frequent">Most Frequent</option>
              </select>
            </div>

            <div className="filter-divider" />

            <div className="filter-group-labeled">
              <span className="filter-label">Status</span>
              <select className="filter-select" value={statusFilter} onChange={(event) => setStatusFilter(event.target.value)}>
                <option value="All">All</option>
                <option value="On Time">On Time</option>
                <option value="Frequent">Frequent</option>
                <option value="High Demand">High Demand</option>
              </select>
            </div>

            <div className="filter-divider" />

            <div className="filter-range-wrap">
              <span className="filter-range-label">Max Duration (<span>{durationMax} mins</span>)</span>
              <input
                type="range"
                className="filter-range"
                min="10"
                max="60"
                step="5"
                value={durationMax}
                onChange={(event) => setDurationMax(Number(event.target.value))}
              />
            </div>

            <div className="filter-range-wrap">
              <span className="filter-range-label">Max Cost (<span>${costMax}</span>)</span>
              <input
                type="range"
                className="filter-range"
                min="0"
                max="40"
                step="1"
                value={costMax}
                onChange={(event) => setCostMax(Number(event.target.value))}
              />
            </div>

            <button type="button" className="filter-reset-btn" onClick={resetFilters}>
              <FaUndoAlt /> Reset Filters
            </button>
          </div>
        </div>

        <div className="filter-results-bar">
          <p className="filter-results-count">
            Showing <strong>{filteredRoutes.length}</strong> of{' '}
            <strong>{mockTransports.filter((route) => {
              const country = cityToCountryMap[route.city] || (route.city.includes('York') ? 'USA' : 'USA');
              return activeCountry === 'All' || country === activeCountry;
            }).length}</strong> routes in {activeCountry === 'All' ? 'World Cup Hubs' : activeCountry}
          </p>
        </div>

        <div className="transport-layout">
          <div>
            <h2 className="section-title mb-6">
              <FaBus className="text-secondary" /> Recommended Routes — {activeCountry === 'All' ? 'All Regions' : activeCountry}
            </h2>


            {!filteredRoutes.length ? (
              <div className="transport-empty-state">
                <h3>No routes found</h3>
                <p>Try broader filters or reset to view all routes for this city.</p>
                <button type="button" className="btn btn-secondary" onClick={resetFilters}>
                  <FaUndoAlt /> Reset Filters
                </button>
              </div>
            ) : (
              <div className="transport-cards-list">
                {filteredRoutes.map((opt) => (
                  <TransportCard
                    key={opt.id}
                    option={opt}
                    isSelected={opt.id === selectedRouteId}
                    onSelect={setSelectedRouteId}
                  />
                ))}
              </div>
            )}
          </div>

          <div>
            <h2 className="section-title mb-6">
              <FaMapMarkedAlt className="text-primary-accent" /> Live Transit Map
            </h2>
            <TransportMap
              routes={filteredRoutes}
              selectedRouteId={selectedRouteId}
              onSelectRoute={setSelectedRouteId}
            />
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
