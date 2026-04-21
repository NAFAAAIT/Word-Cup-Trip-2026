import React from 'react';
import { FaStar, FaWifi, FaDumbbell, FaSwimmingPool, FaCoffee, FaParking, FaBus, FaMapMarkerAlt, FaCheckCircle } from 'react-icons/fa';
import { motion } from 'framer-motion';
import './CardComponents.css';

function HotelCard({ hotel }) {

  const getAmenityIcon = (amenity) => {
    if (!amenity) return null;
    const a = amenity.toLowerCase();
    if (a.includes('wifi')) return <FaWifi />;
    if (a.includes('gym')) return <FaDumbbell />;
    if (a.includes('pool')) return <FaSwimmingPool />;
    if (a.includes('breakfast')) return <FaCoffee />;
    if (a.includes('parking')) return <FaParking />;
    if (a.includes('shuttle') || a.includes('bus')) return <FaBus />;
    return null;
  };

  const handleBookNow = () => {
    const query = encodeURIComponent(`${hotel.name} ${hotel.city}`);
    window.open(`https://www.booking.com/searchresults.html?ss=${query}`, '_blank');
  };

  return (
    <motion.div 
      className="hotel-card-v2"
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >

      {/* Image Section */}
      <div className="hotel-card-v2-img-wrap">
        <img src={hotel.image} alt={hotel.name} className="hotel-card-v2-img" />

        {/* Gradient overlay */}
        <div className="hotel-card-v2-img-gradient" />

        {/* Top badges */}
        <div className="hotel-card-v2-badges">
          {hotel.deal && (
            <span className="hotel-v2-badge hotel-v2-badge-deal">
              <FaCheckCircle /> {hotel.deal}
            </span>
          )}
          {hotel.distance && (
            <span className="hotel-v2-badge hotel-v2-badge-dist">
              <FaMapMarkerAlt /> {hotel.distance}
            </span>
          )}
        </div>


        {/* Price on image */}
        <div className="hotel-card-v2-price-overlay">
          <span className="hotel-v2-from">from</span>
          <span className="hotel-v2-price">${hotel.price}</span>
          <span className="hotel-v2-per">/night</span>
        </div>
      </div>

      {/* Content */}
      <div className="hotel-card-v2-body">
        <div className="hotel-v2-header">
          <h3 className="hotel-v2-name">{hotel.name}</h3>
          <div className="hotel-v2-score">
            {hotel.rating.toFixed(1)}
          </div>
        </div>

        <div className="hotel-v2-stars">
          {[1, 2, 3, 4, 5].map(s => (
            <FaStar key={s} className={s <= Math.floor(hotel.rating) ? 'star-on' : 'star-off'} />
          ))}
          <span className="hotel-v2-reviews">({hotel.reviews || 0} reviews)</span>
        </div>

        {hotel.description && (
          <p className="hotel-v2-desc">{hotel.description}</p>
        )}

        <div className="hotel-v2-amenities">
          {hotel.amenities?.slice(0, 4).map((a, i) => (
            <span key={i} className="hotel-v2-amenity">
              {getAmenityIcon(a)}
              {a}
            </span>
          ))}
        </div>

        <button className="hotel-v2-cta" onClick={handleBookNow}>
          View Details & Book
        </button>
      </div>
    </motion.div>
  );
}

export default HotelCard;

