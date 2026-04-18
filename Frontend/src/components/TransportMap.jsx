import React, { useEffect, useMemo } from 'react';
import { MapContainer, TileLayer, Polyline, CircleMarker, Popup, useMap } from 'react-leaflet';

function MapBoundsUpdater({ selectedRoute }) {
    const map = useMap();

    useEffect(() => {
        if (!selectedRoute?.coordinates?.length) {
            return;
        }

        const bounds = selectedRoute.coordinates;
        map.fitBounds(bounds, { padding: [24, 24] });
    }, [map, selectedRoute]);

    return null;
}

function TransportMap({ routes, selectedRouteId, onSelectRoute }) {
    const selectedRoute = useMemo(() => {
        if (!routes.length) {
            return null;
        }

        return routes.find((route) => route.id === selectedRouteId) || routes[0];
    }, [routes, selectedRouteId]);

    if (!selectedRoute) {
        return (
            <div className="transport-map-fallback">
                <h3>No route selected</h3>
                <p>Adjust filters to display routes on the map.</p>
            </div>
        );
    }

    const fallbackCenter = selectedRoute.coordinates?.[0] || [40.75, -73.99];

    return (
        <div className="transport-map-shell" role="region" aria-label="Transit map">
            <MapContainer
                center={fallbackCenter}
                zoom={12}
                scrollWheelZoom={true}
                className="transport-leaflet-map"
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                <MapBoundsUpdater selectedRoute={selectedRoute} />

                {routes.map((route) => {
                    const isActive = route.id === selectedRoute.id;
                    const start = route.coordinates?.[0];
                    const end = route.coordinates?.[route.coordinates.length - 1];

                    return (
                        <React.Fragment key={route.id}>
                            <Polyline
                                positions={route.coordinates}
                                pathOptions={{
                                    color: route.color,
                                    weight: isActive ? 6 : 4,
                                    opacity: isActive ? 0.95 : 0.55,
                                }}
                                eventHandlers={{
                                    click: () => onSelectRoute(route.id),
                                }}
                            />

                            {start && (
                                <CircleMarker
                                    center={start}
                                    radius={isActive ? 7 : 5}
                                    pathOptions={{ color: route.color, fillColor: route.color, fillOpacity: 0.9 }}
                                    eventHandlers={{ click: () => onSelectRoute(route.id) }}
                                >
                                    <Popup>
                                        <strong>{route.lineName}</strong>
                                        <br />
                                        Start: {route.from}
                                    </Popup>
                                </CircleMarker>
                            )}

                            {end && (
                                <CircleMarker
                                    center={end}
                                    radius={isActive ? 8 : 6}
                                    pathOptions={{ color: '#ffffff', fillColor: route.color, fillOpacity: 0.95 }}
                                    eventHandlers={{ click: () => onSelectRoute(route.id) }}
                                >
                                    <Popup>
                                        <strong>{route.stadium}</strong>
                                        <br />
                                        Destination: {route.to}
                                    </Popup>
                                </CircleMarker>
                            )}
                        </React.Fragment>
                    );
                })}
            </MapContainer>
        </div>
    );
}

export default TransportMap;
