import React, { useMemo } from 'react';
import { CircleMarker, MapContainer, Popup, TileLayer, useMap } from 'react-leaflet';

const DEFAULT_SAFE_ZONES = [
    {
        id: 'sz-medical',
        name: 'Medical Tent - Fan Zone East',
        type: 'medical',
        note: 'First aid and hydration point.',
        position: [40.8141, -74.0734],
    },
    {
        id: 'sz-police',
        name: 'Police Outpost - North Gate',
        type: 'police',
        note: 'Public safety support and crowd control.',
        position: [40.8122, -74.0759],
    },
    {
        id: 'sz-assembly',
        name: 'Assembly Point - Lot C',
        type: 'assembly',
        note: 'Designated evacuation gathering point.',
        position: [40.8114, -74.0718],
    },
];

export const HOSPITAL_COORDS = {
    'Holy Name Medical Center': [40.8869, -74.0073],
    'Hackensack University Medical Center': [40.8842, -74.0558],
    'UCLA Ronald Reagan Medical Center': [34.0655, -118.4455],
    'Cedars-Sinai Medical Center': [34.0752, -118.3804],
    'Toronto General Hospital': [43.6584, -79.3889],
    'Mount Sinai Hospital Toronto': [43.6455, -79.3934],
    'Hospital General de Mexico': [19.4109, -99.1529],
    'Centro Medico Nacional Siglo XXI': [19.4081, -99.1535],
    'Jackson Memorial Hospital': [25.7901, -80.2093],
    'Mount Sinai Medical Center Miami': [25.8130, -80.1332],
    'St. Paul\'s Hospital Vancouver': [49.2811, -123.1287],
    'Vancouver General Hospital': [49.2611, -123.1246],
    'Hospital Angeles Pedregal': [19.3245, -99.2198],
    'Hospital Civil de Guadalajara': [20.6791, -103.3411],
    'MetLife Medical Stadium Hub': [40.8141, -74.0734],
    'Centro Medico Azteca': [19.304, -99.1492],
    'BMO Field Medical Center': [43.6317, -79.4211],
};

const POINT_STYLE = {
    user: { color: '#00eeff', radius: 9 },
    medical: { color: '#10b981', radius: 8 },
    police: { color: '#3b82f6', radius: 8 },
    assembly: { color: '#f59e0b', radius: 8 },
    hospital: { color: '#ef4444', radius: 10 },
};

function FitAllPoints({ points }) {
    const map = useMap();

    React.useEffect(() => {
        if (!points.length) {
            return;
        }

        const bounds = points.map((point) => point.position);
        map.fitBounds(bounds, { padding: [28, 28] });
    }, [map, points]);

    return null;
}

function EmergencySafetyMap({ hospitals, userPosition, safeZones = DEFAULT_SAFE_ZONES }) {
    const mapPoints = useMemo(() => {
        const userPoint = userPosition
            ? [
                {
                    id: 'user-live-location',
                    name: 'Your Current Location',
                    type: 'user',
                    note: 'Live GPS location from your device.',
                    position: userPosition,
                },
            ]
            : [];

        const hospitalPoints = hospitals
            .filter((hospital) => HOSPITAL_COORDS[hospital.name])
            .map((hospital) => ({
                id: `h-${hospital.id}`,
                name: hospital.name,
                type: 'hospital',
                note: `${hospital.distance} away - ${hospital.time}`,
                phone: hospital.phone,
                position: HOSPITAL_COORDS[hospital.name],
            }));

        return [...userPoint, ...safeZones, ...hospitalPoints];
    }, [hospitals, safeZones, userPosition]);

    const fallbackCenter = mapPoints[0]?.position || [40.8128, -74.0742];

    return (
        <div className="emrg-map-shell" role="region" aria-label="Emergency safe zones and hospitals map">
            <MapContainer center={fallbackCenter} zoom={13} scrollWheelZoom className="emrg-leaflet-map">
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                <FitAllPoints points={mapPoints} />

                {mapPoints.map((point) => {
                    const style = POINT_STYLE[point.type];

                    return (
                        <CircleMarker
                            key={point.id}
                            center={point.position}
                            radius={style.radius}
                            pathOptions={{
                                color: '#ffffff',
                                weight: 2,
                                fillColor: style.color,
                                fillOpacity: 0.9,
                            }}
                        >
                            <Popup>
                                <strong>{point.name}</strong>
                                <br />
                                {point.note}
                                {point.phone && (
                                    <>
                                        <br />
                                        Call: {point.phone}
                                    </>
                                )}
                            </Popup>
                        </CircleMarker>
                    );
                })}
            </MapContainer>
        </div>
    );
}

export default EmergencySafetyMap;