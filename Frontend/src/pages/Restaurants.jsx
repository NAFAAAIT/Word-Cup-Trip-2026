import React, { useState } from 'react';
import { mockRestaurants } from '../data/mockData';
import RestaurantCard from '../components/RestaurantCard';
import { FaSearch, FaTimesCircle, FaUtensils } from 'react-icons/fa';
import './Restaurants.css';

function Restaurants() {
  const [activeCuisine, setActiveCuisine] = useState('All');
  const [minRating, setMinRating] = useState('Any');
  const [distanceBand, setDistanceBand] = useState('Any');
  const [sortBy, setSortBy] = useState('recommended');
  const [searchQuery, setSearchQuery] = useState('');

  const cuisines = ['All', ...new Set(mockRestaurants.map(r => r.cuisine))];

  const filtered = mockRestaurants
    .filter(r => {
      const normalizedQuery = searchQuery.trim().toLowerCase();
      const matchCuisine = activeCuisine === 'All' || r.cuisine === activeCuisine;
      const matchRating = minRating === 'Any' || r.rating >= parseFloat(minRating);
      const matchSearch =
        !normalizedQuery ||
        r.name.toLowerCase().includes(normalizedQuery) ||
        r.cuisine.toLowerCase().includes(normalizedQuery);

      const numericDistance = parseFloat(r.distance);
      const hasDistanceValue = Number.isFinite(numericDistance);
      let matchDistance = true;
      if (distanceBand === 'under_1') {
        matchDistance = hasDistanceValue && numericDistance < 1;
      } else if (distanceBand === '1_to_3') {
        matchDistance = hasDistanceValue && numericDistance >= 1 && numericDistance <= 3;
      } else if (distanceBand === 'over_3') {
        matchDistance = hasDistanceValue && numericDistance > 3;
      }

      return matchCuisine && matchRating && matchDistance && matchSearch;
    })
    .sort((a, b) => {
      if (sortBy === 'rating_high') return b.rating - a.rating;
      if (sortBy === 'rating_low') return a.rating - b.rating;
      if (sortBy === 'distance_near') return parseFloat(a.distance) - parseFloat(b.distance);
      return 0;
    });

  const resetFilters = () => {
    setActiveCuisine('All');
    setMinRating('Any');
    setDistanceBand('Any');
    setSortBy('recommended');
    setSearchQuery('');
  };

  return (
    <div className="dining-page">
      {/* Hero Banner */}
      <section className="page-hero">
        <div className="page-hero-bg">
          <img src="https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&w=1920&q=80" alt="Restaurant interior" />
        </div>
        <div className="page-hero-overlay" />
        <div className="container page-hero-content">
          <div className="page-hero-badge">
            <FaUtensils /> World Cup Fan Dining
          </div>
          <h1 className="page-hero-title">Taste the <span className="text-gradient">World</span></h1>
          <p className="page-hero-desc">Discover the best restaurants & street food near every host stadium</p>

          {/* Search */}
          <div className="dining-hero-search mt-8">
            <FaSearch className="dining-search-icon" />
            <input
              type="text"
              className="dining-search-input"
              placeholder="Search restaurants or cuisines..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <button className="dining-search-clear" onClick={() => setSearchQuery('')}>
                <FaTimesCircle />
              </button>
            )}
          </div>
        </div>
      </section>

      {/* Content */}
      <div className="container dining-body">

        {/* Results bar */}
        <div className="filter-results-bar">
          <p className="filter-results-count">
            Showing <strong>{filtered.length}</strong> of {mockRestaurants.length} places
          </p>

          <div className="filter-controls-wrap">
            <div className="filter-group-labeled">
              <span className="filter-label">Cuisine</span>
              <select
                className="filter-select"
                value={activeCuisine}
                onChange={e => setActiveCuisine(e.target.value)}
              >
                {cuisines.map(c => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>

            <div className="filter-group-labeled">
              <span className="filter-label">Rating</span>
              <select
                className="filter-select"
                value={minRating}
                onChange={e => setMinRating(e.target.value)}
              >
                <option value="Any">Any</option>
                <option value="4.8">4.8+</option>
                <option value="4.5">4.5+</option>
                <option value="4.0">4.0+</option>
              </select>
            </div>

            <div className="filter-group-labeled">
              <span className="filter-label">Distance</span>
              <select
                className="filter-select"
                value={distanceBand}
                onChange={e => setDistanceBand(e.target.value)}
              >
                <option value="Any">Any</option>
                <option value="under_1">&lt; 1 mile</option>
                <option value="1_to_3">1 - 3 miles</option>
                <option value="over_3">3+ miles</option>
              </select>
            </div>

            <div className="filter-group-labeled filter-group-sort">
              <span className="filter-label">Sort by</span>
              <select
                className="filter-select"
                value={sortBy}
                onChange={e => setSortBy(e.target.value)}
              >
                <option value="recommended">Recommended</option>
                <option value="rating_high">Rating: High to Low</option>
                <option value="rating_low">Rating: Low to High</option>
                <option value="distance_near">Nearest</option>
              </select>
            </div>

            <button className="filter-reset-btn" onClick={resetFilters} type="button">
              Reset
            </button>
          </div>
        </div>

        {/* Cards Grid */}
        <div className="dining-grid">
          {filtered.length > 0 ? (
            filtered.map(r => <RestaurantCard key={r.id} restaurant={r} />)
          ) : (
            <div className="dining-empty-state">
              <p className="text-4xl mb-4">🍽️</p>
              <p className="text-xl font-bold mb-2">No restaurants found</p>
              <p className="text-secondary">Try adjusting your filters or search query.</p>
              <button
                className="btn btn-secondary mt-6"
                onClick={resetFilters}
              >
                Reset Filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Restaurants;
