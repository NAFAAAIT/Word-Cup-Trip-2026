import React, { useState } from 'react';
import { mockHotels } from '../data/mockData';
import HotelCard from '../components/HotelCard';
import { FaStar, FaFilter, FaSearch, FaTimesCircle, FaMapMarkerAlt } from 'react-icons/fa';
import './Hotels.css';

function Hotels() {
  const [filterPrice, setFilterPrice] = useState(900);
  const [filterStars, setFilterStars] = useState({ 5: true, 4: true, 3: true });
  const [filterDistance, setFilterDistance] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredHotels = mockHotels.filter(hotel => {
    const hitsPrice = hotel.price <= filterPrice;
    const ratingFloor = Math.floor(hotel.rating);
    const hitsStars = filterStars[ratingFloor] || (ratingFloor > 5 && filterStars[5]);
    let hitsDistance = true;
    if (filterDistance === 'under_1' && parseFloat(hotel.distance) >= 1) hitsDistance = false;
    if (filterDistance === '1_to_3' && (parseFloat(hotel.distance) < 1 || parseFloat(hotel.distance) > 3)) hitsDistance = false;
    const hitsSearch = !searchQuery || hotel.name.toLowerCase().includes(searchQuery.toLowerCase()) || hotel.city?.toLowerCase().includes(searchQuery.toLowerCase());
    return hitsPrice && hitsStars && hitsDistance && hitsSearch;
  });

  const resetFilters = () => {
    setFilterPrice(900);
    setFilterStars({ 5: true, 4: true, 3: true });
    setFilterDistance('all');
    setSearchQuery('');
  };

  return (
    <div className="hotels-page">
      {/* Page Hero Banner */}
      <section className="page-hero">
        <div className="page-hero-bg">
          <img src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1920&q=80" alt="Hotels" />
        </div>
        <div className="page-hero-overlay" />
        <div className="container page-hero-content">
          <div className="page-hero-badge">
            <FaMapMarkerAlt /> USA · Canada · Mexico
          </div>
          <h1 className="page-hero-title">Find Your <span className="text-gradient">Perfect Stay</span></h1>
          <p className="page-hero-desc">Curated accommodations steps away from every World Cup venue</p>

          {/* Search bar inside hero */}
          <div className="hotels-hero-search mt-8">
            <FaSearch className="hotels-search-icon" />
            <input
              type="text"
              className="hotels-search-input"
              placeholder="Search by hotel name or city..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <button className="hotels-search-clear" onClick={() => setSearchQuery('')}>
                <FaTimesCircle />
              </button>
            )}
          </div>
        </div>
      </section>

      {/* Main content */}
      <div className="container hotels-body">
        {/* Results bar */}
        <div className="hotels-results-bar">
          <p className="hotels-results-count">
            Showing <strong>{filteredHotels.length}</strong> of {mockHotels.length} hotels
          </p>
          <div className="flex items-center gap-2">
            <span className="text-secondary text-sm">Sort by:</span>
            <select className="hotels-sort-select">
              <option>Recommended</option>
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
              <option>Top Rated</option>
            </select>
          </div>
        </div>

        {/* Sidebar + Grid */}
        <div className="hotels-layout">

          {/* Sidebar */}
          <aside className="hotels-sidebar">
            <div className="hotels-sidebar-inner">
              <div className="sidebar-header">
                <FaFilter className="text-primary-accent" />
                <span>Filters</span>
                <button className="sidebar-reset-btn" onClick={resetFilters}>Reset</button>
              </div>

              {/* Price */}
              <div className="sidebar-section">
                <p className="sidebar-section-title">Price per Night</p>
                <div className="price-range-display">
                  <span>$50</span>
                  <span className="price-range-active">${filterPrice}</span>
                  <span>$900+</span>
                </div>
                <input
                  type="range"
                  min="50" max="900" step="10"
                  className="hotels-range-slider"
                  value={filterPrice}
                  onChange={e => setFilterPrice(Number(e.target.value))}
                />
                <div className="price-track-fill" style={{ width: `${((filterPrice - 50) / 850) * 100}%` }} />
              </div>

              {/* Stars */}
              <div className="sidebar-section">
                <p className="sidebar-section-title">Star Rating</p>
                <div className="star-filter-group">
                  {[5, 4, 3].map(star => (
                    <label key={star} className={`star-filter-chip ${filterStars[star] ? 'active' : ''}`}>
                      <input
                        type="checkbox"
                        className="sr-only"
                        checked={filterStars[star]}
                        onChange={() => setFilterStars({ ...filterStars, [star]: !filterStars[star] })}
                      />
                      {[...Array(star)].map((_, i) => <FaStar key={i} />)}
                      <span className="sr-only">{star} stars</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Distance */}
              <div className="sidebar-section">
                <p className="sidebar-section-title">Distance to Stadium</p>
                <div className="distance-filter-group">
                  {[
                    { value: 'under_1', label: '< 1 mile' },
                    { value: '1_to_3', label: '1 – 3 miles' },
                    { value: 'all', label: 'Any distance' },
                  ].map(opt => (
                    <label key={opt.value} className={`distance-chip ${filterDistance === opt.value ? 'active' : ''}`}>
                      <input
                        type="radio"
                        name="dist"
                        className="sr-only"
                        checked={filterDistance === opt.value}
                        onChange={() => setFilterDistance(opt.value)}
                      />
                      {opt.label}
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          {/* Hotel Grid */}
          <main className="hotels-grid">
            {filteredHotels.length > 0 ? (
              filteredHotels.map(hotel => (
                <HotelCard key={hotel.id} hotel={hotel} />
              ))
            ) : (
              <div className="hotels-empty-state">
                <p className="text-4xl mb-4">🏨</p>
                <p className="text-xl font-bold mb-2">No hotels found</p>
                <p className="text-secondary">Try adjusting your filters.</p>
                <button className="btn btn-secondary mt-6" onClick={resetFilters}>Reset Filters</button>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}

export default Hotels;
