import React, { useState } from 'react';
import { mockHotels } from '../data/mockData';
import HotelCard from '../components/HotelCard';
import { FaSearch, FaTimesCircle, FaMapMarkerAlt } from 'react-icons/fa';
import hotelHeroImage from '../assets/Hotel.avif';
import './Hotels.css';

function Hotels() {
  const [maxPrice, setMaxPrice] = useState('all');
  const [minRating, setMinRating] = useState('all');
  const [distanceBand, setDistanceBand] = useState('all');
  const [sortBy, setSortBy] = useState('recommended');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredHotels = mockHotels
    .filter(hotel => {
      const normalizedQuery = searchQuery.trim().toLowerCase();
      const hitsSearch =
        !normalizedQuery ||
        hotel.name.toLowerCase().includes(normalizedQuery) ||
        hotel.city?.toLowerCase().includes(normalizedQuery);

      const hitsPrice = maxPrice === 'all' || hotel.price <= Number(maxPrice);
      const hitsRating = minRating === 'all' || hotel.rating >= Number(minRating);

      const numericDistance = parseFloat(hotel.distance);
      const hasDistanceValue = Number.isFinite(numericDistance);

      let hitsDistance = true;
      if (distanceBand === 'under_1') {
        hitsDistance = hasDistanceValue && numericDistance < 1;
      } else if (distanceBand === '1_to_3') {
        hitsDistance = hasDistanceValue && numericDistance >= 1 && numericDistance <= 3;
      } else if (distanceBand === 'over_3') {
        hitsDistance = hasDistanceValue && numericDistance > 3;
      }

      return hitsSearch && hitsPrice && hitsRating && hitsDistance;
    })
    .sort((a, b) => {
      if (sortBy === 'price_low') return a.price - b.price;
      if (sortBy === 'price_high') return b.price - a.price;
      if (sortBy === 'rating_high') return b.rating - a.rating;
      return 0;
    });

  const resetFilters = () => {
    setMaxPrice('all');
    setMinRating('all');
    setDistanceBand('all');
    setSortBy('recommended');
    setSearchQuery('');
  };

  return (
    <div className="hotels-page">
      {/* Page Hero Banner */}
      <section className="page-hero">
        <div className="page-hero-bg">
          <img src={hotelHeroImage} alt="Hotels" />
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
        <div className="filter-results-bar">
          <p className="filter-results-count">
            Showing <strong>{filteredHotels.length}</strong> of {mockHotels.length} hotels
          </p>

          <div className="filter-controls-wrap">
            <div className="filter-group-labeled">
              <span className="filter-label">Max price</span>
              <select
                className="filter-select"
                value={maxPrice}
                onChange={e => setMaxPrice(e.target.value)}
              >
                <option value="all">Any</option>
                <option value="200">Up to $200</option>
                <option value="300">Up to $300</option>
                <option value="500">Up to $500</option>
              </select>
            </div>

            <div className="filter-group-labeled">
              <span className="filter-label">Rating</span>
              <select
                className="filter-select"
                value={minRating}
                onChange={e => setMinRating(e.target.value)}
              >
                <option value="all">Any</option>
                <option value="4">4.0+</option>
                <option value="4.5">4.5+</option>
                <option value="4.8">4.8+</option>
              </select>
            </div>

            <div className="filter-group-labeled">
              <span className="filter-label">Distance</span>
              <select
                className="filter-select"
                value={distanceBand}
                onChange={e => setDistanceBand(e.target.value)}
              >
                <option value="all">Any</option>
                <option value="under_1">&lt; 1 mile</option>
                <option value="1_to_3">1 - 3 miles</option>
                <option value="over_3">3+ miles</option>
              </select>
            </div>

            <div className="filter-group-labeled">
              <span className="filter-label">Sort by:</span>
              <select
                className="filter-select"
                value={sortBy}
                onChange={e => setSortBy(e.target.value)}
              >
                <option value="recommended">Recommended</option>
                <option value="price_low">Price: Low to High</option>
                <option value="price_high">Price: High to Low</option>
                <option value="rating_high">Top Rated</option>
              </select>
            </div>

            <button className="filter-reset-btn" onClick={resetFilters} type="button">
              Reset
            </button>
          </div>
        </div>

        {/* Grid */}
        <div className="hotels-layout">

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
