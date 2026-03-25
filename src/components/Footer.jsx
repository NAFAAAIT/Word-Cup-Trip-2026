import React from 'react';
import { Link } from 'react-router-dom';
import { FaFutbol, FaTwitter, FaInstagram, FaFacebook } from 'react-icons/fa';
import './Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-content">
        <div className="footer-brand">
          <div className="brand-logo">
            <FaFutbol className="brand-icon" />
            <span className="brand-title text-gradient">WORLDCUP</span>
          </div>
          <p className="footer-desc">Your ultimate travel companion for the FIFA World Cup 2026 across USA, Canada, and Mexico.</p>
          <div className="social-links">
            <a href="#" className="social-icon"><FaTwitter /></a>
            <a href="#" className="social-icon"><FaInstagram /></a>
            <a href="#" className="social-icon"><FaFacebook /></a>
          </div>
        </div>

        <div className="footer-links">
          <div className="link-group">
            <h4>Explore</h4>
            <Link to="/hotels">Hotels</Link>
            <Link to="/restaurants">Restaurants</Link>
            <Link to="/stadiums">Stadiums</Link>
          </div>
          <div className="link-group">
            <h4>Plan Trip</h4>
            <Link to="/transport">Transport</Link>
            <Link to="/trip">My Trip</Link>
            <Link to="/emergency">Emergency Info</Link>
          </div>
          <div className="link-group">
            <h4>Support</h4>
            <a href="#">FAQ</a>
            <a href="#">Contact Us</a>
            <a href="#">Terms of Service</a>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2026 World Cup Trip. Graduation Project.</p>
      </div>
    </footer>
  );
}

export default Footer;
