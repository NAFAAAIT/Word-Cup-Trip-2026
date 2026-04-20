import React, { useState } from 'react';
import EmergencySafetyMap from '../components/EmergencySafetyMap';
import { HOSPITAL_COORDS } from '../components/EmergencySafetyMap';
import { mockEmergency } from '../data/mockData';
import { FaPhoneAlt, FaHospital, FaShieldAlt, FaMapMarkerAlt, FaExclamationTriangle, FaAmbulance, FaLocationArrow } from 'react-icons/fa';
import './Emergency.css';

const PRIORITY_CONFIG = {
  police: { Icon: FaShieldAlt, label: 'Police', color: '#3b82f6', bg: 'rgba(59,130,246,0.1)', border: 'rgba(59,130,246,0.3)' },
  ambulance: { Icon: FaAmbulance, label: 'Ambulance', color: '#ef4444', bg: 'rgba(239,68,68,0.1)', border: 'rgba(239,68,68,0.3)' },
  fire: { Icon: FaExclamationTriangle, label: 'Fire Dept.', color: '#f59e0b', bg: 'rgba(245,158,11,0.1)', border: 'rgba(245,158,11,0.3)' },
};

const DEFAULT_LOCATION = {
  name: 'Fan Zone, East Rutherford, NJ',
  lat: 40.8128,
  lng: -74.0742,
};

const formatCoordinate = (value, positiveLabel, negativeLabel) => {
  const suffix = value >= 0 ? positiveLabel : negativeLabel;
  return `${Math.abs(value).toFixed(4)}° ${suffix}`;
};

const getDirectionsUrl = (originLat, originLng, destinationLat, destinationLng) => (
  `https://www.google.com/maps/dir/?api=1&origin=${originLat},${originLng}&destination=${destinationLat},${destinationLng}&travelmode=driving`
);

function EmergencyCard({ type, contact }) {
  const cfg = PRIORITY_CONFIG[type] || PRIORITY_CONFIG.police;
  const { Icon } = cfg;
  return (
    <div className="emrg-card" style={{ '--e-color': cfg.color, '--e-bg': cfg.bg, '--e-border': cfg.border }}>
      <div className="emrg-card-icon-col">
        <Icon className="emrg-icon" />
      </div>
      <div className="emrg-card-body">
        <p className="emrg-card-label">{cfg.label}</p>
        <p className="emrg-card-desc">{contact.desc}</p>
        <a href={`tel:${contact.number}`} className="emrg-call-btn">
          <FaPhoneAlt /> Call {contact.number}
        </a>
      </div>
    </div>
  );
}

function Emergency() {
  const { contacts, hospitals } = mockEmergency;
  const [userLocation, setUserLocation] = useState(DEFAULT_LOCATION);
  const [isSharingLocation, setIsSharingLocation] = useState(false);
  const [locationStatus, setLocationStatus] = useState('');

  const handleShareLocation = () => {
    if (!navigator.geolocation) {
      setLocationStatus('Geolocation is not supported on this browser.');
      return;
    }

    setIsSharingLocation(true);
    setLocationStatus('Detecting your live location...');

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const lat = Number(position.coords.latitude.toFixed(6));
        const lng = Number(position.coords.longitude.toFixed(6));
        const mapsUrl = `https://www.google.com/maps?q=${lat},${lng}`;
        const shareText = `Emergency location: ${lat}, ${lng}`;

        setUserLocation({
          name: 'Live Device Location',
          lat,
          lng,
        });

        let handled = false;

        if (navigator.share) {
          try {
            await navigator.share({
              title: 'Emergency Location',
              text: shareText,
              url: mapsUrl,
            });
            setLocationStatus('Location shared successfully.');
            handled = true;
          } catch {
            // User can cancel the native share sheet; continue with copy fallback.
          }
        }

        if (!handled && navigator.clipboard?.writeText) {
          try {
            await navigator.clipboard.writeText(`${shareText}\n${mapsUrl}`);
            setLocationStatus('Location copied to clipboard.');
            handled = true;
          } catch {
            // Ignore clipboard permission issues and fall through to plain text status.
          }
        }

        if (!handled) {
          setLocationStatus(`Location ready: ${lat}, ${lng}`);
        }

        setIsSharingLocation(false);
      },
      () => {
        setLocationStatus('Unable to access location. Please allow GPS permission.');
        setIsSharingLocation(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      }
    );
  };

  return (
    <div className="emergency-page">
      {/* Hero */}
      <section className="page-hero">
        <div className="page-hero-bg">
          <img src="https://images.unsplash.com/photo-1587745416684-47953f16f02f?auto=format&fit=crop&w=1920&q=80" alt="Safety" />
        </div>
        <div className="page-hero-overlay" />
        <div className="container page-hero-content">
          <div className="page-hero-badge pulsing">
            ⚠️ Emergency Assistance
          </div>
          <h1 className="page-hero-title">Help & <span className="text-gradient">Safety</span></h1>
          <p className="page-hero-desc">Quick access to emergency services and safe zones across all host cities</p>
        </div>
      </section>

      {/* Priority cards */}
      <div className="container emergency-body">
        <h2 className="section-title mb-6">🚨 Immediate Assistance</h2>
        <div className="emrg-priority-grid">
          {Object.entries(contacts).map(([type, contact]) => (
            <EmergencyCard key={type} type={type} contact={contact} />
          ))}
        </div>

        {/* Main grid */}
        <div className="emrg-main-grid">
          {/* Left column */}
          <div className="space-y-6">
            {/* Location card */}
            <div className="emrg-location-card card p-6">
              <div className="flex items-center gap-2 mb-4">
                <FaMapMarkerAlt className="text-primary-accent" />
                <h3 className="font-bold">Your Location</h3>
              </div>
              <p className="text-xl font-bold text-white mb-1">{userLocation.name}</p>
              <p className="text-secondary text-sm mb-3">
                {formatCoordinate(userLocation.lat, 'N', 'S')}, {formatCoordinate(userLocation.lng, 'E', 'W')}
              </p>
              <button
                type="button"
                className="emrg-sos-btn"
                onClick={handleShareLocation}
                disabled={isSharingLocation}
              >
                <FaLocationArrow /> {isSharingLocation ? 'Locating...' : 'SOS - Share My Location'}
              </button>
              {locationStatus && <p className="emrg-sos-status">{locationStatus}</p>}
            </div>

            {/* Hospitals */}
            <div className="card p-6">
              <div className="flex items-center gap-2 mb-4">
                <FaHospital className="text-danger" style={{ color: 'var(--danger-color)' }} />
                <h3 className="font-bold">Nearest Hospitals</h3>
              </div>
              <div className="space-y-4">
                {hospitals.map(h => (
                  <div key={h.id} className="emrg-hospital-row">
                    <div className="emrg-hospital-meta">
                      <p className="emrg-hospital-name">{h.name}</p>
                      <p className="emrg-hospital-sub">{h.distance} away · {h.time}</p>
                    </div>
                    <div className="emrg-hospital-actions">
                      {HOSPITAL_COORDS[h.name] ? (
                        <a
                          href={getDirectionsUrl(
                            userLocation.lat,
                            userLocation.lng,
                            HOSPITAL_COORDS[h.name][0],
                            HOSPITAL_COORDS[h.name][1]
                          )}
                          target="_blank"
                          rel="noreferrer"
                          className="btn btn-secondary emrg-btn-sm"
                        >
                          <FaMapMarkerAlt /> Dir.
                        </a>
                      ) : (
                        <button type="button" className="btn btn-secondary emrg-btn-sm" disabled>
                          <FaMapMarkerAlt /> Dir.
                        </button>
                      )}
                      <a href={`tel:${h.phone}`} className="btn btn-primary emrg-btn-sm">
                        <FaPhoneAlt /> Call
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Map */}
          <div>
            <h2 className="section-title mb-4">🗺️ Designated Safe Zones</h2>
            <EmergencySafetyMap hospitals={hospitals} userPosition={[userLocation.lat, userLocation.lng]} />
            <div className="emrg-map-legend">
              <span><span className="emrg-legend-dot" style={{ background: '#00eeff' }} /> Your Location</span>
              <span><span className="emrg-legend-dot" style={{ background: '#10b981' }} /> Medical Tent</span>
              <span><span className="emrg-legend-dot" style={{ background: '#3b82f6' }} /> Police Outpost</span>
              <span><span className="emrg-legend-dot" style={{ background: '#f59e0b' }} /> Assembly Point</span>
              <span><span className="emrg-legend-dot" style={{ background: '#ef4444' }} /> Hospital</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Emergency;
