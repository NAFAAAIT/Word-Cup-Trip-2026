import React, { useState } from 'react';
import { mockRestaurants } from '../data/mockData';
import RestaurantCard from '../components/RestaurantCard';
import { FaStar, FaSearch, FaTimesCircle, FaUtensils } from 'react-icons/fa';
import './Restaurants.css';

const CUISINE_EMOJIS = {
  All: '🌍', Mexican: '🌮', American: '🍔', Canadian: '🍁', Seafood: '🦞',
  Italian: '🍝', Japanese: '🍣', Indian: '🍛',
};

function Restaurants() {
  const [activeCuisine, setActiveCuisine] = useState('All');
  const [minRating, setMinRating] = useState('Any');
  const [searchQuery, setSearchQuery] = useState('');

  const cuisines = ['All', ...new Set(mockRestaurants.map(r => r.cuisine))];

  const filtered = mockRestaurants.filter(r => {
    const matchCuisine = activeCuisine === 'All' || r.cuisine === activeCuisine;
    const matchRating = minRating === 'Any' || r.rating >= parseFloat(minRating);
    const matchSearch = !searchQuery || r.name.toLowerCase().includes(searchQuery.toLowerCase()) || r.cuisine.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCuisine && matchRating && matchSearch;
  });

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

        {/* Cuisine Tabs */}
        <div className="dining-cuisine-tabs">
          {cuisines.map(c => (
            <button
              key={c}
              onClick={() => setActiveCuisine(c)}
              className={`dining-cuisine-tab ${activeCuisine === c ? 'active' : ''}`}
            >
              <span className="dining-tab-emoji">{CUISINE_EMOJIS[c] || '🍽️'}</span>
              {c}
            </button>
          ))}
        </div>

        {/* Results bar */}
        <div className="dining-results-bar">
          <p className="dining-results-count">
            Showing <strong>{filtered.length}</strong> of {mockRestaurants.length} places
          </p>
          <div className="flex items-center gap-2">
            <span className="text-secondary text-sm">Min rating:</span>
            <select
              className="dining-rating-select"
              value={minRating}
              onChange={e => setMinRating(e.target.value)}
            >
              <option value="Any">Any</option>
              <option value="4.8">4.8+</option>
              <option value="4.5">4.5+</option>
              <option value="4.0">4.0+</option>
            </select>
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
                onClick={() => { setActiveCuisine('All'); setMinRating('Any'); setSearchQuery(''); }}
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
