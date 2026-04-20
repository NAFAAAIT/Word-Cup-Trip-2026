import React from 'react';
import { FaStar, FaMapMarkerAlt, FaUtensils, FaMap } from 'react-icons/fa';
import './CardComponents.css';

function RestaurantCard({ restaurant }) {

  const handleViewOnMap = () => {
    const query = encodeURIComponent(`${restaurant.name}, ${restaurant.distance.split('to ')[1] || ''} ${restaurant.country}`);
    window.open(`https://www.google.com/maps/search/?api=1&query=${query}`, '_blank');
  };

  return (
    <div className="rest-card-v2">
      {/* Image */}
      <div className="rest-card-v2-img-wrap">
        <img src={restaurant.image} alt={restaurant.name} className="rest-card-v2-img" />
        <div className="rest-card-v2-gradient" />


        {/* Cuisine badge on image */}
        <div className="rest-card-v2-cuisine-badge">
          <FaUtensils />
          {restaurant.cuisine}
        </div>

        {/* Rating badge */}
        <div className="rest-card-v2-rating-badge">
          <FaStar /> {restaurant.rating}
        </div>
      </div>

      {/* Body */}
      <div className="rest-card-v2-body">
        <h3 className="rest-v2-name">{restaurant.name}</h3>

        <div className="rest-v2-meta">
          <span className="rest-v2-country">{restaurant.country}</span>
          {restaurant.distance && (
            <span className="rest-v2-distance">
              <FaMapMarkerAlt /> {restaurant.distance}
            </span>
          )}
        </div>

        {restaurant.description && (
          <p className="rest-v2-desc">{restaurant.description}</p>
        )}

        {restaurant.tags?.length > 0 && (
          <div className="rest-v2-tags">
            {restaurant.tags.map((tag, i) => (
              <span key={i} className="rest-v2-tag">{tag}</span>
            ))}
          </div>
        )}

        <button className="rest-v2-cta" onClick={handleViewOnMap}>
          <FaMap /> View on Map
        </button>
      </div>
    </div>
  );
}

export default RestaurantCard;
