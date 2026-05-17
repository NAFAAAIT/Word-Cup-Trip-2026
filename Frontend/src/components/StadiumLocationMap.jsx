import React, { useEffect, useMemo } from 'react';
import { CircleMarker, MapContainer, Popup, TileLayer, useMap } from 'react-leaflet';

const STADIUM_COORDINATES = {
    'MetLife Stadium': [40.8135, -74.0744],
    'Estadio Azteca': [19.3029, -99.1505],
    'BMO Field': [43.6332, -79.4186],
    'SoFi Stadium': [33.9534, -118.3392],
    'AT&T Stadium': [32.7473, -97.0945],
    'Mercedes-Benz Stadium': [33.7554, -84.4009],
    'Hard Rock Stadium': [25.958, -80.2389],
    'BC Place': [49.2768, -123.1119],
};

function FitToStadium({ center, zoom }) {
    const map = useMap();

    useEffect(() => {
        if (!center) {
            return;
        }

        map.setView(center, zoom || 13, { animate: true });
    }, [map, center]);

    return null;
}

function StadiumLocationMap({ stadium, stadiumName, city }) {
    // Accept either a full stadium object or stadiumName/city props for backward compatibility
    const locFromProps = stadium?.location || null;

    const center = useMemo(() => {
        if (locFromProps && typeof locFromProps.lat === 'number' && typeof locFromProps.lng === 'number') {
            return [locFromProps.lat, locFromProps.lng];
        }

        const name = stadium?.name || stadiumName;
        return STADIUM_COORDINATES[name] || [39.8283, -98.5795];
    }, [stadium, stadiumName]);

    const zoom = useMemo(() => (locFromProps ? 15 : 13), [locFromProps]);

    const labelName = stadium?.name || stadiumName || 'Stadium';
    const labelCity = stadium?.city || city || '';

    return (
        <div className="stadium-location-map-shell" role="region" aria-label={`Map of ${labelName}`}>
            <MapContainer center={center} zoom={zoom} scrollWheelZoom={true} className="stadium-location-map">
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <FitToStadium center={center} zoom={zoom} />

                <CircleMarker
                    center={center}
                    radius={10}
                    pathOptions={{
                        color: '#ffffff',
                        weight: 2,
                        fillColor: '#00eeff',
                        fillOpacity: 0.85,
                    }}
                >
                    <Popup>
                        <strong>{labelName}</strong>
                        <br />
                        {labelCity}
                    </Popup>
                </CircleMarker>
            </MapContainer>
        </div>
    );
}

export default StadiumLocationMap;
