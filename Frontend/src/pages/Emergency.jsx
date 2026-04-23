import React, { useState } from 'react';
import EmergencySafetyMap from '../components/EmergencySafetyMap';
import { HOSPITAL_COORDS } from '../components/EmergencySafetyMap';
import { mockEmergency } from '../data/mockData';
import { FaPhoneAlt, FaHospital, FaShieldAlt, FaMapMarkerAlt, FaExclamationTriangle, FaAmbulance, FaLocationArrow, FaGlobe, FaMapMarkedAlt } from 'react-icons/fa';
import emergencyHeroImage from '../assets/Emergency.avif';

import './Emergency.css';

import { motion } from 'framer-motion';
import ScrollReveal from '../components/ScrollReveal';

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

const EMERGENCY_DATA = {
  All: {
    code: '🌍',
    title: 'All Regions',
    location: DEFAULT_LOCATION,
    contacts: {
      police: { name: "Police", number: "911", desc: "Universal emergency number in North America." },
      ambulance: { name: "Ambulance", number: "911", desc: "For medical emergencies in all host countries." },
      fire: { name: "Fire", number: "911", desc: "For fire and rescue services." }
    },
    safeZones: [
      { id: 'all-medical', name: 'Global Medical Hub', type: 'medical', note: 'Central coordination.', position: [40.8141, -74.0734] },
    ],
    hospitals: [
      { id: 'hosp-all-us', name: 'MetLife Medical Stadium Hub', distance: '0.5 mi', time: 'Immediate', phone: '911' },
      { id: 'hosp-all-mx', name: 'Centro Medico Azteca', distance: '0.8 mi', time: 'Immediate', phone: '911' },
      { id: 'hosp-all-ca', name: 'BMO Field Medical Center', distance: '0.3 mi', time: 'Immediate', phone: '911' },
    ],
  },
  USA: {
    code: 'US',
    title: 'United States',
    location: {
      name: 'USA Fan Zones',
      lat: 40.8128,
      lng: -74.0742,
    },
    contacts: {
      police: { name: "Police", number: "911", desc: "For urgent police assistance in the US." },
      ambulance: { name: "Ambulance", number: "911", desc: "For immediate US medical response." },
      fire: { name: "Fire", number: "911", desc: "For US fire and rescue services." }
    },
    safeZones: [
      { id: 'ny-medical', name: 'Medical Tent - Fan Zone East', type: 'medical', note: 'First aid and hydration point.', position: [40.8141, -74.0734] },
      { id: 'ny-police', name: 'Police Outpost - North Gate', type: 'police', note: 'Public safety support and crowd control.', position: [40.8122, -74.0759] },
      { id: 'ny-assembly', name: 'Assembly Point - Lot C', type: 'assembly', note: 'Designated evacuation gathering point.', position: [40.8114, -74.0718] },
    ],
    hospitals: [
      { id: 'hosp-ny-1', name: 'Holy Name Medical Center', distance: '2.5 mi', time: '10 min drive', phone: '201-833-3000' },
      { id: 'hosp-ny-2', name: 'Hackensack University Medical Center', distance: '4.1 mi', time: '14 min drive', phone: '551-996-2000' },
      { id: 'hosp-la-1', name: 'Cedars-Sinai Medical Center', distance: '1.2 mi', time: '5 min drive', phone: '310-423-3277' },
      { id: 'hosp-miami-1', name: 'Jackson Memorial Hospital', distance: '3.5 mi', time: '12 min drive', phone: '305-585-1111' },
      { id: 'hosp-miami-2', name: 'Mount Sinai Medical Center Miami', distance: '5.2 mi', time: '15 min drive', phone: '305-674-2121' },
    ],
  },
  Mexico: {
    code: 'MX',
    title: 'México',
    location: {
      name: 'Azteca Fan Zone, Mexico City',
      lat: 19.3029,
      lng: -99.1505,
    },
    contacts: {
      police: { name: "Policía", number: "911", desc: "Para asistencia policial urgente en México." },
      ambulance: { name: "Ambulancia", number: "911", desc: "Urgencias médicas inmediatas." },
      fire: { name: "Bomberos", number: "911", desc: "Servicios de incendio y rescate." }
    },
    safeZones: [
      { id: 'mx-medical', name: 'Medical Tent - Azteca South', type: 'medical', note: 'First aid and hydration point.', position: [19.304, -99.1492] },
      { id: 'mx-police', name: 'Police Outpost - Gate 2', type: 'police', note: 'Public safety support and crowd control.', position: [19.3015, -99.1517] },
      { id: 'mx-assembly', name: 'Assembly Point - Calzada', type: 'assembly', note: 'Designated evacuation gathering point.', position: [19.3009, -99.1486] },
    ],
    hospitals: [
      { id: 'hosp-mx-1', name: 'Hospital General de Mexico', distance: '6.3 mi', time: '19 min drive', phone: '55-2789-2000' },
      { id: 'hosp-mx-2', name: 'Centro Medico Nacional Siglo XXI', distance: '5.9 mi', time: '17 min drive', phone: '55-5627-6900' },
      { id: 'hosp-mx-3', name: 'Hospital Angeles Pedregal', distance: '4.1 mi', time: '12 min drive', phone: '55-5449-7000' },
      { id: 'hosp-mx-4', name: 'Hospital Civil de Guadalajara', distance: '3.8 mi', time: '11 min drive', phone: '33-3613-9488' },
    ],
  },
  Canada: {
    code: 'CA',
    title: 'Canada',
    location: {
      name: 'BMO Fan Village, Toronto',
      lat: 43.6332,
      lng: -79.4186,
    },
    contacts: {
      police: { name: "Police", number: "911", desc: "For urgent police assistance in Canada." },
      ambulance: { name: "Ambulance", number: "911", desc: "For immediate Canadian medical response." },
      fire: { name: "Fire", number: "911", desc: "For Canadian fire and rescue services." }
    },
    safeZones: [
      { id: 'to-medical', name: 'Medical Tent - Princes Gate', type: 'medical', note: 'First aid and hydration point.', position: [43.6317, -79.4211] },
      { id: 'to-police', name: 'Police Outpost - Lakeshore', type: 'police', note: 'Public safety support and crowd control.', position: [43.6328, -79.4159] },
      { id: 'to-assembly', name: 'Assembly Point - Exhibition Lot', type: 'assembly', note: 'Designated evacuation gathering point.', position: [43.6352, -79.4172] },
    ],
    hospitals: [
      { id: 'hosp-to-1', name: 'Toronto General Hospital', distance: '3.8 mi', time: '16 min drive', phone: '416-340-4800' },
      { id: 'hosp-to-2', name: 'Mount Sinai Hospital Toronto', distance: '3.9 mi', time: '15 min drive', phone: '416-586-4800' },
      { id: 'hosp-va-1', name: 'St. Paul\'s Hospital Vancouver', distance: '0.9 mi', time: '4 min drive', phone: '604-682-2344' },
      { id: 'hosp-va-2', name: 'Vancouver General Hospital', distance: '1.5 mi', time: '8 min drive', phone: '604-875-4111' },
    ],
  },
};

const formatCoordinate = (value, positiveLabel, negativeLabel) => {
  const suffix = value >= 0 ? positiveLabel : negativeLabel;
  return `${Math.abs(value).toFixed(4)}° ${suffix}`;
};

const getDirectionsUrl = (originLat, originLng, destinationLat, destinationLng) => (
  `https://www.google.com/maps/dir/?api=1&origin=${originLat},${originLng}&destination=${destinationLat},${destinationLng}&travelmode=driving`
);

const getFlagUrl = (countryCode) => {
  if (countryCode === '🌍') return ''; // Or a globe icon URL
  return `https://flagcdn.com/w40/${countryCode.toLowerCase()}.png`;
};

function EmergencyCard({ type, contact }) {
  const cfg = PRIORITY_CONFIG[type] || PRIORITY_CONFIG.police;
  const { Icon } = cfg;
  return (
    <motion.div
      className="emrg-card"
      style={{ '--e-color': cfg.color, '--e-bg': cfg.bg, '--e-border': cfg.border }}
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <div className="emrg-card-icon-col">
        <Icon className="emrg-icon" />
      </div>
      <div className="emrg-card-body">
        <p className="emrg-card-label">{contact.name || cfg.label}</p>
        <p className="emrg-card-desc">{contact.desc}</p>
        <a href={`tel:${contact.number}`} className="emrg-call-btn">
          <FaPhoneAlt /> Call {contact.number}
        </a>
      </div>
    </motion.div>
  );
}

function Emergency() {
  const regionOptions = Object.keys(EMERGENCY_DATA);
  const [activeRegion, setActiveRegion] = useState('All');
  const activeData = EMERGENCY_DATA[activeRegion];
  const contacts = activeData.contacts;
  const hospitals = activeData.hospitals;

  const [userLocation, setUserLocation] = useState(DEFAULT_LOCATION);
  const [isSharingLocation, setIsSharingLocation] = useState(false);
  const [locationStatus, setLocationStatus] = useState('');

  const handleRegionChange = (region) => {
    const data = EMERGENCY_DATA[region];
    setActiveRegion(region);
    setUserLocation(data.location);
    setLocationStatus('');
  };

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
          <img src={emergencyHeroImage} alt="Safety" />
        </div>
        <div className="page-hero-overlay" />
        <div className="container page-hero-content">
          <div className="page-hero-badge emergency-hero-badge">
            <FaAmbulance /> Emergency Assistance
          </div>
          <h1 className="page-hero-title">Help & <span className="text-gradient">Safety</span></h1>
          <p className="page-hero-desc">Quick access to emergency services and safe zones across all host regions</p>
          <div className="emrg-city-tabs mt-8">
            {regionOptions.map((region) => (
              <button
                key={region}
                type="button"
                className={`emrg-city-tab ${activeRegion === region ? 'active' : ''}`}
                onClick={() => handleRegionChange(region)}
              >
                {EMERGENCY_DATA[region].code === '🌍' ? (
                  <FaGlobe className="mr-2" />
                ) : (
                  <img
                    src={getFlagUrl(EMERGENCY_DATA[region].code)}
                    alt={`${region} flag`}
                    className="emrg-city-flag mr-2"
                    loading="lazy"
                  />
                )}
                <span style={{ marginLeft: '4px' }}>{region}</span>
              </button>
            ))}
          </div>

        </div>
      </section>


      {/* Priority cards */}
      <div className="container emergency-body">
        <ScrollReveal>
          <h2 className="section-title mb-6">
            <FaExclamationTriangle className="text-danger" /> Immediate Assistance
          </h2>
        </ScrollReveal>

        <div className="emrg-priority-grid">
          {Object.entries(contacts).map(([type, contact]) => (
            <EmergencyCard key={type} type={type} contact={contact} />
          ))}
        </div>

        {/* Main grid */}
        <div className="emrg-main-grid">
          {/* Left column */}
          <div className="space-y-4">
            {/* Location card */}
            <ScrollReveal>
              <div className="emrg-location-card card p-5">
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
            </ScrollReveal>

            {/* Hospitals */}
            <ScrollReveal delay={0.2}>
              <div className="card p-5">
                <div className="flex items-center gap-2 mb-4">
                  <FaHospital className="text-danger" style={{ color: 'var(--danger-color)' }} />
                  <h3 className="font-bold">Nearest Hospitals - {activeRegion}</h3>
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
            </ScrollReveal>
          </div>

          {/* Map */}
          <div>
            <ScrollReveal direction="left">
              <h2 className="section-title mb-4">
                <FaMapMarkedAlt className="text-primary-accent" /> Designated Safe Zones - {activeRegion}
              </h2>
              <EmergencySafetyMap
                hospitals={hospitals}
                userPosition={[userLocation.lat, userLocation.lng]}
                safeZones={activeData.safeZones}
              />
              <div className="emrg-map-legend">
                <span><span className="emrg-legend-dot" style={{ background: '#00eeff' }} /> Your Location</span>
                <span><span className="emrg-legend-dot" style={{ background: '#10b981' }} /> Medical Tent</span>
                <span><span className="emrg-legend-dot" style={{ background: '#3b82f6' }} /> Police Outpost</span>
                <span><span className="emrg-legend-dot" style={{ background: '#f59e0b' }} /> Assembly Point</span>
                <span><span className="emrg-legend-dot" style={{ background: '#ef4444' }} /> Hospital</span>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </div>
  );
}


export default Emergency;
