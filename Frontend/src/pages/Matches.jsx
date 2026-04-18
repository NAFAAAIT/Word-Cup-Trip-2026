import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { FaFutbol, FaCalendarAlt, FaClock, FaMapMarkerAlt, FaFilter, FaSearch, FaTrophy } from 'react-icons/fa';
import { mockMatches } from '../data/mockData';
import './Matches.css';

function Matches() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [filter, setFilter] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  const stadiums = ['All', ...new Set(mockMatches.map(m => m.stadium))];

  useEffect(() => {
    const stadiumParam = searchParams.get('stadium');
    const cityParam = searchParams.get('city');

    if (stadiumParam && stadiums.includes(stadiumParam)) {
      setFilter(stadiumParam);
    }

    if (cityParam) {
      setSearchTerm(cityParam);
    }
  }, [searchParams, stadiums]);

  const filteredMatches = mockMatches.filter(match => {
    const matchesFilter = filter === 'All' || match.stadium === filter;
    const matchesSearch = match.teamA.toLowerCase().includes(searchTerm.toLowerCase()) ||
      match.teamB.toLowerCase().includes(searchTerm.toLowerCase()) ||
      match.city.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const planTransportForMatch = (match) => {
    const params = new URLSearchParams({
      city: match.city,
      stadium: match.stadium,
      kickoff: `${match.date} ${match.time}`,
    });

    navigate(`/transport?${params.toString()}`);
  };

  return (
    <div className="matches-page">
      {/* ─── Hero Section ─────────────────────────── */}
      <section className="matches-hero">
        <div className="container">
          <div className="hero-content">
            <div className="badge badge-primary">Match Schedule</div>
            <h1 className="hero-title">FIFA World Cup 2026™ <span className="text-gradient">Fixtures</span></h1>
            <p className="hero-desc">
              Stay up to date with the complete match schedule across the USA, Canada, and Mexico.
            </p>
          </div>
        </div>
      </section>

      {/* ─── Filters Section ──────────────────────── */}
      <section className="matches-filters container">
        <div className="filters-glass glass-panel">
          <div className="search-box">
            <FaSearch className="search-icon" />
            <input
              type="text"
              placeholder="Search teams or cities..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="input-field"
            />
          </div>
          <div className="filter-group">
            <FaFilter className="filter-icon" />
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="input-field select-field"
            >
              {stadiums.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
        </div>
      </section>

      {/* ─── Matches Grid ─────────────────────────── */}
      <main className="matches-grid container">
        {filteredMatches.length > 0 ? (
          filteredMatches.map(match => (
            <div key={match.id} className="match-card glass-panel">
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
                    {match.flagA === 'tbd' ? (
                      <div className="flag-placeholder">?</div>
                    ) : (
                      <img
                        src={`https://flagcdn.com/w160/${match.flagA}.png`}
                        alt={`${match.teamA} flag`}
                        loading="lazy"
                      />
                    )}
                  </div>
                  <span className="team-name">{match.teamA}</span>
                </div>
                <div className="match-vs">VS</div>
                <div className="team">
                  <span className="team-name">{match.teamB}</span>
                  <div className="team-flag">
                    {match.flagB === 'tbd' ? (
                      <div className="flag-placeholder">?</div>
                    ) : (
                      <img
                        src={`https://flagcdn.com/w160/${match.flagB}.png`}
                        alt={`${match.teamB} flag`}
                        loading="lazy"
                      />
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
                <button className="match-cta btn btn-outline">
                  Match Details
                </button>
                <button
                  className="match-cta btn btn-secondary"
                  onClick={() => planTransportForMatch(match)}
                >
                  Plan Transport
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="no-matches">
            <p>No matches found matching your criteria.</p>
          </div>
        )}
      </main>
    </div>
  );
}

export default Matches;
