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

function FitToStadium({ center }) {
    const map = useMap();

    useEffect(() => {
        if (!center) {
            return;
        }

        map.setView(center, 13, { animate: true });
    }, [map, center]);

    return null;
}

function StadiumLocationMap({ stadiumName, city }) {
    const center = useMemo(
        () => STADIUM_COORDINATES[stadiumName] || [39.8283, -98.5795],
        [stadiumName]
    );

    return (
        <div className="stadium-location-map-shell" role="region" aria-label={`Map of ${stadiumName}`}>
            <MapContainer center={center} zoom={13} scrollWheelZoom={true} className="stadium-location-map">
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <FitToStadium center={center} />

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
                        <strong>{stadiumName}</strong>
                        <br />
                        {city}
                    </Popup>
                </CircleMarker>
            </MapContainer>
        </div>
    );
}

export default StadiumLocationMap;
