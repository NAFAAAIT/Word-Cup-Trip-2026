import React, { useState } from 'react';
import { FaMapMarkerAlt, FaUsers, FaFutbol, FaArrowRight } from 'react-icons/fa';
import { motion } from 'framer-motion';
import './CardComponents.css';

function StadiumCard({ stadium, onClick }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      className="stadium-card-v2"
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}

      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
    >
      {/* Image half */}
      <div className="stadium-v2-img-wrap">
        <img
          src={stadium.image}
          alt={stadium.name}
          className="stadium-v2-img"
          style={{ transform: hovered ? 'scale(1.08)' : 'scale(1)' }}
        />
        <div className="stadium-v2-img-overlay" />

        {/* Matches badge */}
        <div className="stadium-v2-matches-badge">
          <FaFutbol /> {stadium.matches} Matches
        </div>

        {/* Location on image */}
        <div className="stadium-v2-location-badge">
          <FaMapMarkerAlt /> {stadium.city}
        </div>
      </div>

      {/* Content half */}
      <div className="stadium-v2-body">
        <div className="stadium-v2-country-tag">{stadium.country}</div>
        <h2 className="stadium-v2-title">{stadium.name}</h2>
        <p className="stadium-v2-desc">{stadium.description}</p>

        <div className="stadium-v2-stats">
          <div className="stadium-v2-stat">
            <FaUsers className="stadium-v2-stat-icon" />
            <div>
              <p className="stadium-v2-stat-value">{stadium.capacity}</p>
              <p className="stadium-v2-stat-label">Capacity</p>
            </div>
          </div>
          <div className="stadium-v2-stat">
            <FaFutbol className="stadium-v2-stat-icon" />
            <div>
              <p className="stadium-v2-stat-value">{stadium.matches}</p>
              <p className="stadium-v2-stat-label">Matches</p>
            </div>
          </div>
        </div>

        {onClick && (
          <button className="stadium-v2-explore-btn">
            Explore Venue <FaArrowRight />
          </button>
        )}
      </div>
    </motion.div>
  );
}

export default StadiumCard;

