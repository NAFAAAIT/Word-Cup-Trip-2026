import React from 'react';
import { FaMap } from 'react-icons/fa';

function MapPlaceholder({ height = '400px', title = 'Interactive Map' }) {
  return (
    <div 
      className="map-placeholder" 
      style={{
        height,
        width: '100%',
        backgroundColor: '#0a0d14',
        backgroundImage: 'radial-gradient(#1e293b 1px, transparent 1px)',
        backgroundSize: '20px 20px',
        border: '1px solid var(--border-color)',
        borderRadius: 'var(--radius-lg)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'var(--text-muted)',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      <div 
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '300px',
          height: '300px',
          background: 'radial-gradient(circle, rgba(0, 238, 255, 0.1) 0%, rgba(0,0,0,0) 70%)',
          borderRadius: '50%',
          pointerEvents: 'none'
        }}
      />
      <FaMap style={{ fontSize: '3rem', marginBottom: '1rem', color: 'var(--primary-accent)' }} />
      <h3 style={{ fontSize: '1.25rem', color: 'var(--text-primary)' }}>{title}</h3>
      <p style={{ marginTop: '0.5rem', fontSize: '0.9rem' }}>Map integration will appear here</p>
      
      {/* Decorative UI elements for the map */}
      <div style={{ position: 'absolute', top: '1rem', right: '1rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        <button className="btn btn-secondary" style={{ padding: '0.5rem' }}>+</button>
        <button className="btn btn-secondary" style={{ padding: '0.5rem' }}>-</button>
      </div>
    </div>
  );
}

export default MapPlaceholder;
