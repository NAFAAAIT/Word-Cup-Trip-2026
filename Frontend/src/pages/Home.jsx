import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  FaSearch, FaBed, FaUtensils, FaMapMarkedAlt, FaPhoneAlt,
  FaFutbol, FaGlobeAmericas, FaStar, FaArrowRight, FaShieldAlt,
  FaHotel, FaCity, FaUsers, FaTicketAlt, FaPlay
} from 'react-icons/fa';
import { motion } from 'framer-motion';
import HotelCard from '../components/HotelCard';
import RestaurantCard from '../components/RestaurantCard';
import StadiumCard from '../components/StadiumCard';
import ScrollReveal from '../components/ScrollReveal';
import { mockHotels, mockRestaurants, mockStadiums } from '../data/mockData';
import './Home.css';

const HOST_CITIES = [
  { name: 'New York/NJ', country: 'USA', matches: 8, image: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?auto=format&fit=crop&w=800&q=80' },
  { name: 'Los Angeles', country: 'USA', matches: 8, image: 'https://thumbs.dreamstime.com/b/sunset-over-los-angeles-downtown-city-center-california-165474416.jpg' },
  { name: 'Mexico City', country: 'Mexico', matches: 5, image: 'https://images.unsplash.com/photo-1585464231875-d9ef1f5ad396?auto=format&fit=crop&w=800&q=80' },
  { name: 'Toronto', country: 'Canada', matches: 6, image: 'https://images.unsplash.com/photo-1517090504586-fde19ea6066f?auto=format&fit=crop&w=800&q=80' },
  { name: 'Miami', country: 'USA', matches: 6, image: 'https://images.unsplash.com/photo-1533106497176-45ae19e68ba2?auto=format&fit=crop&w=800&q=80' },
  { name: 'Vancouver', country: 'Canada', matches: 6, image: 'https://images.unsplash.com/photo-1559511260-66a654ae982a?auto=format&fit=crop&w=800&q=80' },
];

const STATS = [
  { value: '48', label: 'Host Cities', icon: <FaCity /> },
  { value: '104', label: 'Total Matches', icon: <FaTicketAlt /> },
  { value: '3', label: 'Countries', icon: <FaGlobeAmericas /> },
  { value: '5M+', label: 'Expected Fans', icon: <FaUsers /> },
];

function Home() {
  const [search, setSearch] = useState('');

  const filteredCities = HOST_CITIES.filter(city =>
    city.name.toLowerCase().includes(search.toLowerCase()) ||
    city.country.toLowerCase().includes(search.toLowerCase())
  );

  const filteredHotels = mockHotels.filter(hotel =>
    hotel.name.toLowerCase().includes(search.toLowerCase()) ||
    hotel.city.toLowerCase().includes(search.toLowerCase())
  ).slice(0, 3);

  const filteredRestaurants = mockRestaurants.filter(rest =>
    rest.name.toLowerCase().includes(search.toLowerCase()) ||
    rest.cuisine.toLowerCase().includes(search.toLowerCase())
  ).slice(0, 3);

  const filteredStadiums = mockStadiums.filter(stadium =>
    stadium.name.toLowerCase().includes(search.toLowerCase()) ||
    stadium.city.toLowerCase().includes(search.toLowerCase())
  ).slice(0, 2);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
  };


  return (
    <div className="home-page">

      {/* ─── HERO ─── */}
      <section className="home-hero">
        <div className="home-hero-bg" />
        <div className="home-hero-particles" aria-hidden />
        <div className="container home-hero-inner">
          <motion.div
            className="home-hero-left"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="home-hero-eyebrow">
              <FaFutbol className="spinning-ball" />
              FIFA World Cup 2026™
            </div>
            <h1 className="home-hero-title">
              Experience the <span className="text-gradient">Greatest Show</span> on Earth
            </h1>
            <p className="home-hero-sub">
              Your premium travel companion for the World Cup across <strong>USA</strong>, <strong>Canada</strong> & <strong>Mexico</strong>.
            </p>
            <div className="home-hero-ctas">
              <Link to="/stadiums" className="btn btn-primary">
                <FaGlobeAmericas /> Explore Stadiums
              </Link>
              <Link to="/matches" className="btn btn-secondary">
                View Matches <FaArrowRight />
              </Link>
            </div>
          </motion.div>

          <motion.div
            className="home-hero-search-card glass-panel"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >

            <h3 className="home-search-title">
              <FaSearch /> Quick Search
            </h3>
            <div className="home-search-input-wrap">
              <FaSearch className="home-search-ico" />
              <input
                type="text"
                placeholder="City, stadium, hotel..."
                className="home-search-input"
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
            </div>
            <p className="home-search-divider">Quick Links</p>
            <div className="home-quick-links">
              <Link to="/hotels" className="home-quick-link"><FaBed /> Hotels</Link>
              <Link to="/restaurants" className="home-quick-link"><FaUtensils /> Dining</Link>
              <Link to="/transport" className="home-quick-link"><FaMapMarkedAlt /> Transport</Link>
              <Link to="/emergency" className="home-quick-link home-quick-link-danger"><FaShieldAlt /> Help</Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─── STATS BAR ─── */}
      <div className="home-stats-bar">
        <motion.div
          className="container home-stats-inner"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {STATS.map(s => (
            <motion.div key={s.label} className="home-stat" variants={itemVariants}>
              <div className="home-stat-icon-wrap">{s.icon}</div>
              <div>
                <span className="home-stat-value">{s.value}</span>
                <span className="home-stat-label">{s.label}</span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* ─── HOST CITIES ─── */}
      <section className="home-section">
        <div className="container">
          <ScrollReveal>
            <div className="home-section-header">
              <div className="section-title-wrap">
                <h2 className="section-title">Iconic Host Cities</h2>
                <p className="section-subtitle">Discover the vibrant metropolises hosting the matches</p>
              </div>
              <Link to="/stadiums" className="view-all-link">View All Venues <FaArrowRight /></Link>
            </div>
          </ScrollReveal>

          <motion.div
            className="home-cities-cards"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            {filteredCities.length > 0 ? (
              filteredCities.map(city => (
                <motion.div key={city.name} className="home-city-card" variants={itemVariants}>
                  <img src={city.image} alt={city.name} className="home-city-card-img" />
                  <div className="home-city-card-overlay" />
                  <div className="home-city-card-content">
                    <span className="city-card-country">{city.country}</span>
                    <h3 className="city-card-name">{city.name}</h3>
                    <div className="city-card-meta">
                      <FaTicketAlt /> {city.matches} matches
                    </div>
                  </div>
                </motion.div>
              ))
            ) : (
              <div className="p-8 text-center w-full col-span-full opacity-60">No cities found matching your search...</div>
            )}
          </motion.div>
        </div>
      </section>

      {/* ─── TOURNAMENT EXPERIENCE Section ─── */}
      <section className="home-experience-section">
        <div className="container grid lg:grid-cols-2 gap-12 items-center">
          <ScrollReveal direction="right">
            <div className="experience-content">
              <h2 className="experience-title">A Journey Beyond <span className="text-gradient">Football</span></h2>
              <p className="experience-desc">
                The 2026 World Cup is more than just matches. It's an opportunity to explore the diverse cultures,
                stunning landscapes, and world-class hospitality of North America.
              </p>
              <div className="experience-features">
                <div className="exp-feature">
                  <div className="exp-icon"><FaPlay /></div>
                  <div>
                    <h4>Immersive Atmosphere</h4>
                    <p>Join millions of fans in vibrant fan zones across 16 cities.</p>
                  </div>
                </div>
                <div className="exp-feature">
                  <div className="exp-icon"><FaHotel /></div>
                  <div>
                    <h4>Premium Luxury</h4>
                    <p>Hand-picked accommodations steps away from the action.</p>
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="left">
            <div className="experience-visual">
              <div className="exp-img-grid">
                <img src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80" alt="Modern City" className="exp-img-main" />
                <img src="https://images.unsplash.com/photo-1517457373958-b7bdd4587205?q=80&w=2069&auto=format&fit=crop" alt="Fan Celebration" className="exp-img-sub" />
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ─── FEATURED STADIUMS ─── */}
      <section className="home-section">
        <div className="container">
          <ScrollReveal>
            <div className="home-section-header">
              <div className="section-title-wrap">
                <h2 className="section-title">Premier Stadium Venues</h2>
                <p className="section-subtitle">Iconic World Cup arenas across USA, Canada, and Mexico</p>
              </div>
              <Link to="/stadiums" className="view-all-link">View All <FaArrowRight /></Link>
            </div>
          </ScrollReveal>
          <div className="home-stadiums-grid">
            {filteredStadiums.length > 0 ? (
              filteredStadiums.map(s => <StadiumCard key={s.id} stadium={s} />)
            ) : (
              <div className="p-8 text-center w-full col-span-full opacity-60">No stadiums found...</div>
            )}
          </div>
        </div>
      </section>

      {/* ─── TOP HOTELS ─── */}
      <section className="home-section home-section-dark">
        <div className="container">
          <ScrollReveal>
            <div className="home-section-header">
              <div className="section-title-wrap">
                <h2 className="section-title">Luxury Hotel Stays</h2>
                <p className="section-subtitle">Top-rated stays near World Cup host venues</p>
              </div>
              <Link to="/hotels" className="view-all-link">View All <FaArrowRight /></Link>
            </div>
          </ScrollReveal>
          <div className="home-hotels-grid">
            {filteredHotels.length > 0 ? (
              filteredHotels.map(h => <HotelCard key={h.id} hotel={h} />)
            ) : (
              <div className="p-8 text-center w-full col-span-full opacity-60">No hotels found...</div>
            )}
          </div>
        </div>
      </section>

      {/* ─── FAN DINING ─── */}
      <section className="home-section">
        <div className="container">
          <ScrollReveal>
            <div className="home-section-header">
              <div className="section-title-wrap">
                <h2 className="section-title">Fan Dining Spots</h2>
                <p className="section-subtitle">Top-rated restaurants close to stadiums and fan zones</p>
              </div>
              <Link to="/restaurants" className="view-all-link">View All <FaArrowRight /></Link>
            </div>
          </ScrollReveal>
          <div className="home-dining-grid">
            {filteredRestaurants.length > 0 ? (
              filteredRestaurants.map(r => <RestaurantCard key={r.id} restaurant={r} />)
            ) : (
              <div className="p-8 text-center w-full col-span-full opacity-60">No dining spots found...</div>
            )}
          </div>
        </div>
      </section>

      {/* ─── CTA BANNER ─── */}
      <section className="home-cta-banner">
        <div className="home-cta-overlay" />
        <ScrollReveal duration={1.2}>
          <div className="container home-cta-inner">
            <div className="home-cta-badge">Tournament Launch 2026</div>
            <h2 className="home-cta-title">Your Premium World Cup 2026 Guide</h2>
            <p className="home-cta-sub">Plan your full trip in one place: matches, stadiums, hotels, dining, and transport across all host cities.</p>
            <div className="flex justify-center gap-4 mt-8 flex-wrap">
              <Link to="/matches" className="btn btn-primary home-cta-btn">
                Explore Matches <FaArrowRight />
              </Link>
              <Link to="/stadiums" className="btn btn-secondary home-cta-btn">
                Browse Venues
              </Link>
            </div>
          </div>
        </ScrollReveal>
      </section>
    </div>
  );
}

export default Home;

