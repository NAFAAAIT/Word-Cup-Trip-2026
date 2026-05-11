import React, { useEffect, useMemo, useState } from 'react';
import { RiBusLine, RiDashboardLine, RiFootballLine, RiHotelBedLine, RiSettings3Line } from 'react-icons/ri';
import {
    createStadium,
    createMatch,
    createHotel,
    createRestaurant,
    deleteMatch,
    deleteStadium,
    getCities,
    getEmergency,
    getHotels,
    getMatches,
    getRestaurants,
    getStadiums,
    updateEmergency,
    updateMatch,
    updateStadium,
    uploadFile,
} from '../services/api';
import './AdminDashboard.css';

const createContact = (name, number, desc) => ({ name, number, desc });

const createHospital = (hospital = {}, id = '') => ({
    id: hospital.id || id,
    name: hospital.name || '',
    distance: hospital.distance || '',
    time: hospital.time || '',
    phone: hospital.phone || '',
});

const emptyEmergency = {
    key: 'global',
    contacts: {
        police: createContact('Police', '911', 'For urgent police assistance.'),
        ambulance: createContact('Ambulance', '911', 'For immediate medical emergencies.'),
        fire: createContact('Fire Department', '911', 'For fire and rescue services.'),
    },
    hospitals: [createHospital({}, 'hosp1'), createHospital({}, 'hosp2')],
};

const normalizeEmergency = (value) => ({
    key: value?.key || 'global',
    contacts: {
        police: { ...emptyEmergency.contacts.police, ...(value?.contacts?.police || {}) },
        ambulance: { ...emptyEmergency.contacts.ambulance, ...(value?.contacts?.ambulance || {}) },
        fire: { ...emptyEmergency.contacts.fire, ...(value?.contacts?.fire || {}) },
    },
    hospitals: Array.isArray(value?.hospitals) && value.hospitals.length
        ? value.hospitals.map((hospital, index) => createHospital(hospital, hospital.id || `hosp-${index + 1}`))
        : emptyEmergency.hospitals,
});

const emptyStadiumForm = () => ({
    name: '',
    cityId: '',
    country: '',
    capacity: '',
    image: '',
    description: '',
});

const emptyMatchForm = () => ({
    teamA: '',
    teamB: '',
    stadiumId: '',
    cityId: '',
    date: '',
    time: '',
    group: '',
    type: 'Group Stage',
});

const emptyHotelForm = () => ({
    name: '',
    cityId: '',
    stadiumId: '',
    country: '',
    description: '',
    image: '',
    price: '',
    rating: '',
    distance: '',
    deal: '',
    amenities: '',
});

const emptyRestaurantForm = () => ({
    name: '',
    cityId: '',
    stadiumId: '',
    country: '',
    cuisine: '',
    description: '',
    image: '',
    rating: '',
    distance: '',
    tags: '',
});

const sectionCopy = {
    overview: {
        title: 'Venue Operations',
        subtitle: 'Manage the infrastructure for the 2026 Global Stage.',
    },
    venues: {
        title: 'Stadiums & Matches',
        subtitle: 'Coordinate venue records, fixtures, and capacity details.',
    },
    hospitality: {
        title: 'Hotels & Restaurants',
        subtitle: 'Curate stays and dining experiences around every venue.',
    },
    transport: {
        title: 'Transport Logistics',
        subtitle: 'Track venue flow, travel coverage, and emergency response.',
    },
    settings: {
        title: 'Record Editor',
        subtitle: 'Create, update, and publish records without leaving the dashboard.',
    },
};

function AdminDashboard() {
    const [activeSection, setActiveSection] = useState('overview');
    const [editorTab, setEditorTab] = useState('stadium');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [showAllMatches, setShowAllMatches] = useState(false);
    const [showAllStadiums, setShowAllStadiums] = useState(false);
    const [showAllHotels, setShowAllHotels] = useState(false);
    const [showAllRestaurants, setShowAllRestaurants] = useState(false);

    const [cities, setCities] = useState([]);
    const [stadiums, setStadiums] = useState([]);
    const [hotels, setHotels] = useState([]);
    const [restaurants, setRestaurants] = useState([]);
    const [matches, setMatches] = useState([]);
    const [emergency, setEmergency] = useState(normalizeEmergency(null));

    const [stadiumForm, setStadiumForm] = useState(emptyStadiumForm());
    const [editingStadiumId, setEditingStadiumId] = useState(null);
    const [matchForm, setMatchForm] = useState(emptyMatchForm());
    const [editingMatchId, setEditingMatchId] = useState(null);
    const [hotelForm, setHotelForm] = useState(emptyHotelForm());
    const [restaurantForm, setRestaurantForm] = useState(emptyRestaurantForm());
    const [emergencyForm, setEmergencyForm] = useState(normalizeEmergency(null));
    const [saving, setSaving] = useState(false);

    const loadData = async () => {
        setLoading(true);
        setError('');

        try {
            const [citiesRes, stadiumsRes, hotelsRes, restaurantsRes, matchesRes, emergencyRes] = await Promise.all([
                getCities(),
                getStadiums(),
                getHotels(),
                getRestaurants(),
                getMatches(),
                getEmergency(),
            ]);

            setCities(Array.isArray(citiesRes) ? citiesRes : []);
            setStadiums(Array.isArray(stadiumsRes) ? stadiumsRes : []);
            setHotels(Array.isArray(hotelsRes) ? hotelsRes : []);
            setRestaurants(Array.isArray(restaurantsRes) ? restaurantsRes : []);
            setMatches(Array.isArray(matchesRes) ? matchesRes : []);

            const normalizedEmergency = normalizeEmergency(emergencyRes);
            setEmergency(normalizedEmergency);
            setEmergencyForm(normalizedEmergency);
        } catch (fetchError) {
            setError(fetchError.message || 'Failed to load admin data');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        let mounted = true;

        (async () => {
            if (!mounted) {
                return;
            }

            await loadData();
        })();

        return () => {
            mounted = false;
        };
    }, []);

    const cityById = useMemo(() => {
        return new Map((cities || []).map((city) => [city.id || city._id, city]));
    }, [cities]);

    const stadiumById = useMemo(() => {
        return new Map((stadiums || []).map((stadium) => [stadium.id || stadium._id, stadium]));
    }, [stadiums]);

    const stats = useMemo(() => {
        return [
            { label: 'Stadiums', value: stadiums.length, hint: `${cities.length} cities connected` },
            { label: 'Matches', value: matches.length, hint: 'Live schedule in MongoDB' },
            { label: 'Restaurants', value: restaurants.length, hint: 'Dining records' },
            { label: 'Hotels', value: hotels.length, hint: 'Stay records' },
        ];
    }, [cities.length, hotels.length, matches.length, restaurants.length, stadiums.length]);

    const filteredStadiums = useMemo(() => {
        const query = searchTerm.trim().toLowerCase();
        if (!query) {
            return stadiums;
        }

        return stadiums.filter((stadium) => {
            return [stadium.name, stadium.city, stadium.country, stadium.description]
                .filter(Boolean)
                .join(' ')
                .toLowerCase()
                .includes(query);
        });
    }, [searchTerm, stadiums]);

    const filteredHotels = useMemo(() => {
        const query = searchTerm.trim().toLowerCase();
        if (!query) {
            return hotels;
        }

        return hotels.filter((hotel) => {
            return [hotel.name, hotel.city, hotel.country, hotel.stadiumName, hotel.description, hotel.distance]
                .filter(Boolean)
                .join(' ')
                .toLowerCase()
                .includes(query);
        });
    }, [hotels, searchTerm]);

    const filteredRestaurants = useMemo(() => {
        const query = searchTerm.trim().toLowerCase();
        if (!query) {
            return restaurants;
        }

        return restaurants.filter((restaurant) => {
            return [
                restaurant.name,
                restaurant.city,
                restaurant.country,
                restaurant.stadiumName,
                restaurant.cuisine,
                restaurant.description,
                restaurant.distance,
                ...(Array.isArray(restaurant.tags) ? restaurant.tags : []),
            ]
                .filter(Boolean)
                .join(' ')
                .toLowerCase()
                .includes(query);
        });
    }, [restaurants, searchTerm]);

    const filteredMatches = useMemo(() => {
        const query = searchTerm.trim().toLowerCase();
        if (!query) {
            return matches;
        }

        return matches.filter((match) => {
            return [match.teamA, match.teamB, match.stadium, match.city, match.group, match.type]
                .filter(Boolean)
                .join(' ')
                .toLowerCase()
                .includes(query);
        });
    }, [matches, searchTerm]);

    const visibleMatches = useMemo(() => {
        return showAllMatches ? filteredMatches : filteredMatches.slice(0, 5);
    }, [filteredMatches, showAllMatches]);

    const visibleStadiums = useMemo(() => {
        return showAllStadiums ? filteredStadiums : filteredStadiums.slice(0, 4);
    }, [filteredStadiums, showAllStadiums]);

    const visibleHotels = useMemo(() => {
        return showAllHotels ? filteredHotels : filteredHotels.slice(0, 4);
    }, [filteredHotels, showAllHotels]);

    const visibleRestaurants = useMemo(() => {
        return showAllRestaurants ? filteredRestaurants : filteredRestaurants.slice(0, 4);
    }, [filteredRestaurants, showAllRestaurants]);

    const logisticsRows = useMemo(() => {
        return filteredMatches.slice(0, 5).map((match, index) => ({
            routeId: `TR-${String(4000 + index).slice(-4)}`,
            type: index % 3 === 0 ? 'Bus' : index % 3 === 1 ? 'Shuttle' : 'Train',
            destination: match.stadium || 'Venue TBD',
            frequency: index % 2 === 0 ? 'Every 10 mins' : 'Every 15 mins',
            status: index % 4 === 0 ? 'LIVE' : index % 4 === 1 ? 'DELAYED' : index % 4 === 2 ? 'LIVE' : 'SCHEDULED',
            note: `${match.teamA} vs ${match.teamB}`,
        }));
    }, [filteredMatches]);

    const openEditor = (tab = 'stadium') => {
        setEditorTab(tab);
        setActiveSection('settings');
    };

    const handleStadiumImageUpload = async (event) => {
        const file = event.target.files && event.target.files[0];
        if (!file) {
            return;
        }

        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await uploadFile(formData);
            if (response?.url) {
                setStadiumForm((current) => ({ ...current, image: response.url }));
            }
        } catch (uploadError) {
            setError(uploadError.message || 'Image upload failed');
        } finally {
            event.target.value = '';
        }
    };

    const submitStadium = async (e) => {
        e.preventDefault();
        setSaving(true);

        try {
            const payload = {
                name: stadiumForm.name,
                city: stadiumForm.cityId,
                country: stadiumForm.country || cityById.get(stadiumForm.cityId)?.country || '',
                capacity: stadiumForm.capacity ? Number(stadiumForm.capacity) : null,
                image: stadiumForm.image,
                description: stadiumForm.description,
            };

            if (editingStadiumId) {
                await updateStadium(editingStadiumId, payload);
            } else {
                await createStadium(payload);
            }

            await loadData();
            setStadiumForm(emptyStadiumForm());
            setEditingStadiumId(null);
        } catch (submitError) {
            setError(submitError.message || 'Could not save stadium');
        } finally {
            setSaving(false);
        }
    };

    const removeStadium = async (id) => {
        if (!window.confirm('Delete this stadium?')) {
            return;
        }

        setSaving(true);

        try {
            await deleteStadium(id);
            await loadData();
        } catch (deleteError) {
            setError(deleteError.message || 'Could not delete stadium');
        } finally {
            setSaving(false);
        }
    };

    const editStadium = (stadium) => {
        setEditingStadiumId(stadium.id || stadium._id);
        setStadiumForm({
            name: stadium.name || '',
            cityId: stadium.cityId || stadium.city || '',
            country: stadium.country || '',
            capacity: stadium.capacity ? String(stadium.capacity) : '',
            image: stadium.image || '',
            description: stadium.description || '',
        });
        openEditor('stadium');
    };

    const submitMatch = async (e) => {
        e.preventDefault();
        setSaving(true);

        try {
            const payload = {
                teamA: matchForm.teamA,
                teamB: matchForm.teamB,
                stadium: matchForm.stadiumId,
                city: matchForm.cityId,
                date: matchForm.date,
                time: matchForm.time,
                group: matchForm.group,
                type: matchForm.type,
            };

            if (editingMatchId) {
                await updateMatch(editingMatchId, payload);
            } else {
                await createMatch(payload);
            }

            await loadData();
            setMatchForm(emptyMatchForm());
            setEditingMatchId(null);
        } catch (submitError) {
            setError(submitError.message || 'Could not save match');
        } finally {
            setSaving(false);
        }
    };

    const removeMatch = async (id) => {
        if (!window.confirm('Delete this match?')) {
            return;
        }

        setSaving(true);

        try {
            await deleteMatch(id);
            await loadData();
        } catch (deleteError) {
            setError(deleteError.message || 'Could not delete match');
        } finally {
            setSaving(false);
        }
    };

    const editMatch = (match) => {
        setEditingMatchId(match.id || match._id);
        setMatchForm({
            teamA: match.teamA || '',
            teamB: match.teamB || '',
            stadiumId: match.stadiumId || '',
            cityId: match.cityId || '',
            date: match.date || '',
            time: match.time || '',
            group: match.group || '',
            type: match.type || 'Group Stage',
        });
        openEditor('match');
    };

    const submitHotel = async (e) => {
        e.preventDefault();
        setSaving(true);

        try {
            const payload = {
                name: hotelForm.name,
                city: hotelForm.cityId,
                stadium: hotelForm.stadiumId || undefined,
                country: hotelForm.country || cityById.get(hotelForm.cityId)?.country || '',
                description: hotelForm.description,
                image: hotelForm.image,
                price: hotelForm.price ? Number(hotelForm.price) : undefined,
                rating: hotelForm.rating ? Number(hotelForm.rating) : undefined,
                distance: hotelForm.distance,
                deal: hotelForm.deal,
                amenities: hotelForm.amenities
                    ? hotelForm.amenities.split(',').map((item) => item.trim()).filter(Boolean)
                    : [],
            };

            await createHotel(payload);
            await loadData();
            setHotelForm(emptyHotelForm());
        } catch (submitError) {
            setError(submitError.message || 'Could not save hotel');
        } finally {
            setSaving(false);
        }
    };

    const submitRestaurant = async (e) => {
        e.preventDefault();
        setSaving(true);

        try {
            const payload = {
                name: restaurantForm.name,
                city: restaurantForm.cityId,
                stadium: restaurantForm.stadiumId || undefined,
                country: restaurantForm.country || cityById.get(restaurantForm.cityId)?.country || '',
                cuisine: restaurantForm.cuisine,
                description: restaurantForm.description,
                image: restaurantForm.image,
                rating: restaurantForm.rating ? Number(restaurantForm.rating) : undefined,
                distance: restaurantForm.distance,
                tags: restaurantForm.tags
                    ? restaurantForm.tags.split(',').map((item) => item.trim()).filter(Boolean)
                    : [],
            };

            await createRestaurant(payload);
            await loadData();
            setRestaurantForm(emptyRestaurantForm());
        } catch (submitError) {
            setError(submitError.message || 'Could not save restaurant');
        } finally {
            setSaving(false);
        }
    };

    const updateEmergencyContact = (key, field, value) => {
        setEmergencyForm((current) => ({
            ...current,
            contacts: {
                ...current.contacts,
                [key]: {
                    ...(current.contacts?.[key] || createContact('', '', '')),
                    [field]: value,
                },
            },
        }));
    };

    const updateHospital = (index, field, value) => {
        setEmergencyForm((current) => ({
            ...current,
            hospitals: current.hospitals.map((hospital, currentIndex) => (
                currentIndex === index ? { ...hospital, [field]: value } : hospital
            )),
        }));
    };

    const addHospital = () => {
        setEmergencyForm((current) => ({
            ...current,
            hospitals: [...current.hospitals, createHospital({}, `hosp-${Date.now()}`)],
        }));
    };

    const removeHospital = (index) => {
        setEmergencyForm((current) => ({
            ...current,
            hospitals: current.hospitals.filter((_, currentIndex) => currentIndex !== index),
        }));
    };

    const saveEmergency = async (e) => {
        e.preventDefault();
        setSaving(true);

        try {
            await updateEmergency(emergencyForm);
            await loadData();
        } catch (saveError) {
            setError(saveError.message || 'Could not save emergency contacts');
        } finally {
            setSaving(false);
        }
    };

    const onSectionChange = (section) => {
        setActiveSection(section);
        try {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } catch (e) {
            // fallback for older browsers
            window.scrollTo(0, 0);
        }
    };

    const title = sectionCopy[activeSection] || sectionCopy.overview;

    if (loading) {
        return <div className="admin-loading">Loading dashboard data...</div>;
    }

    return (
        <div className="admin-dashboard-page">
            <div className="admin-shell">
                <aside className="admin-sidebar">
                    <div>
                        <div className="admin-brand-block">
                            <div className="admin-brand-title">FIFA Admin</div>
                            <div className="admin-brand-subtitle">World Cup 2026</div>
                        </div>

                        <nav className="admin-nav">
                            <button className={`admin-nav-item ${activeSection === 'overview' ? 'active' : ''}`} onClick={() => onSectionChange('overview')}>
                                <RiDashboardLine className="admin-nav-icon" aria-hidden="true" />
                                <span className="admin-nav-label">Overview</span>
                            </button>
                            <button className={`admin-nav-item ${activeSection === 'venues' ? 'active' : ''}`} onClick={() => onSectionChange('venues')}>
                                <RiFootballLine className="admin-nav-icon" aria-hidden="true" />
                                <span className="admin-nav-label">Stadiums & Matches</span>
                            </button>
                            <button className={`admin-nav-item ${activeSection === 'hospitality' ? 'active' : ''}`} onClick={() => onSectionChange('hospitality')}>
                                <RiHotelBedLine className="admin-nav-icon" aria-hidden="true" />
                                <span className="admin-nav-label">Hotels & Restaurants</span>
                            </button>
                            <button className={`admin-nav-item ${activeSection === 'transport' ? 'active' : ''}`} onClick={() => onSectionChange('transport')}>
                                <RiBusLine className="admin-nav-icon" aria-hidden="true" />
                                <span className="admin-nav-label">Transport & Emergency</span>
                            </button>
                            <button className={`admin-nav-item ${activeSection === 'settings' ? 'active' : ''}`} onClick={() => onSectionChange('settings')}>
                                <RiSettings3Line className="admin-nav-icon" aria-hidden="true" />
                                <span className="admin-nav-label">Settings</span>
                            </button>
                        </nav>
                    </div>

                    <div className="admin-sidebar-footer">
                        <div className="admin-avatar">A</div>
                        <div>
                            <div className="admin-avatar-name">Admin</div>
                            <div className="admin-avatar-role">Head Coordinator</div>
                        </div>
                    </div>
                </aside>

                <div className="admin-main">
                    <header className="admin-topbar">
                        <label className="admin-searchbar">
                            <span className="admin-search-icon">⌕</span>
                            <input
                                type="text"
                                placeholder="Search matches, venues, or cities..."
                                value={searchTerm}
                                onChange={(event) => setSearchTerm(event.target.value)}
                            />
                        </label>

                        <div className="admin-topbar-actions">
                            <button className="admin-primary-btn" type="button" onClick={() => openEditor('stadium')}>
                                Add Record
                            </button>
                        </div>
                    </header>

                    <main className="admin-content">
                        <section className="admin-hero">
                            <div>
                                <div className="admin-hero-kicker">LIVE SYNC</div>
                                <h1>{title.title}</h1>
                                <p>{title.subtitle}</p>
                            </div>
                            <div className="admin-hero-badge">MongoDB connected</div>
                        </section>

                        {error ? (
                            <div className="admin-alert">
                                {error}
                                <button type="button" onClick={() => setError('')}>Dismiss</button>
                            </div>
                        ) : null}

                        <section className="admin-stats-grid">
                            {stats.map((stat) => (
                                <article key={stat.label} className="admin-stat-card">
                                    <span>{stat.label}</span>
                                    <strong>{stat.value}</strong>
                                    <small>{stat.hint}</small>
                                </article>
                            ))}
                        </section>

                        {(activeSection === 'overview' || activeSection === 'venues') && (
                            <section className="admin-grid admin-grid-venues">
                                <article className="admin-panel admin-panel-large">
                                    <div className="admin-panel-header">
                                        <div>
                                            <h2>Stadiums</h2>
                                            <p>Operational records for the host venues.</p>
                                        </div>
                                        <button className="admin-secondary-btn" type="button" onClick={() => openEditor('stadium')}>
                                            + New Stadium
                                        </button>
                                    </div>

                                    <div className="admin-card-list">
                                        {visibleStadiums.map((stadium) => (
                                            <article key={stadium.id || stadium._id} className="admin-stadium-card">
                                                <div className="admin-stadium-image">
                                                    {stadium.image ? <img src={stadium.image} alt={stadium.name} /> : <div className="admin-image-placeholder">No image</div>}
                                                </div>
                                                <div className="admin-stadium-body">
                                                    <div className="admin-card-heading-row">
                                                        <div>
                                                            <h3>{stadium.name}</h3>
                                                            <p>{stadium.city}, {stadium.country}</p>
                                                        </div>
                                                        <div className="admin-card-actions">
                                                            <button type="button" onClick={() => editStadium(stadium)}>✎</button>
                                                            <button type="button" onClick={() => removeStadium(stadium.id || stadium._id)}>⌫</button>
                                                        </div>
                                                    </div>

                                                    <div className="admin-stadium-meta">
                                                        <span>Capacity {stadium.capacity ? Number(stadium.capacity).toLocaleString() : 'N/A'}</span>
                                                        <span>{stadium.matches || 0} matches</span>
                                                    </div>

                                                    <p className="admin-card-description">{stadium.description || 'Venue record synced from MongoDB.'}</p>
                                                </div>
                                            </article>
                                        ))}
                                    </div>

                                    {filteredStadiums.length > 4 ? (
                                        <button
                                            className="admin-secondary-btn"
                                            type="button"
                                            onClick={() => setShowAllStadiums((current) => !current)}
                                        >
                                            {showAllStadiums ? 'Show less' : 'Show all'}
                                        </button>
                                    ) : null}
                                </article>

                                <article className="admin-panel admin-panel-table">
                                    <div className="admin-panel-header">
                                        <div>
                                            <h2>Match Schedule</h2>
                                            <p>Update fixtures and venue assignments.</p>
                                        </div>
                                        <button className="admin-primary-btn" type="button" onClick={() => openEditor('match')}>
                                            + Schedule Match
                                        </button>
                                    </div>

                                    <div className="admin-table">
                                        <div className="admin-table-row admin-table-head">
                                            <span>Date & Time</span>
                                            <span>Matchup</span>
                                            <span>Venue</span>
                                            <span>Actions</span>
                                        </div>

                                        {visibleMatches.map((match) => (
                                            <div key={match.id || match._id} className="admin-table-row">
                                                <span>
                                                    <strong>{match.date || 'TBD'}</strong>
                                                    <small>{match.time || '--:--'}</small>
                                                </span>
                                                <span>
                                                    <strong>{match.teamA} vs {match.teamB}</strong>
                                                    <small>{match.group || 'Group Stage'}</small>
                                                </span>
                                                <span>
                                                    <strong>{match.stadium || 'Venue TBD'}</strong>
                                                    <small>{match.city || 'City TBD'}</small>
                                                </span>
                                                <span className="admin-table-actions">
                                                    <button type="button" onClick={() => editMatch(match)}>✎</button>
                                                    <button type="button" onClick={() => removeMatch(match.id || match._id)}>⌫</button>
                                                </span>
                                            </div>
                                        ))}
                                    </div>

                                    {filteredMatches.length > 5 ? (
                                        <button
                                            className="admin-secondary-btn"
                                            type="button"
                                            onClick={() => setShowAllMatches((current) => !current)}
                                        >
                                            {showAllMatches ? 'Show less' : 'Show all'}
                                        </button>
                                    ) : null}
                                </article>
                            </section>
                        )}

                        {(activeSection === 'overview' || activeSection === 'hospitality') && (
                            <section className="admin-grid admin-grid-hospitality">
                                <article className="admin-panel admin-panel-large">
                                    <div className="admin-panel-header">
                                        <div>
                                            <h2>Hotels</h2>
                                            <p>{filteredHotels.length} records synced from MongoDB.</p>
                                        </div>
                                    </div>

                                    <div className="admin-hospitality-list">
                                        {visibleHotels.map((hotel) => (
                                            <article key={hotel.id || hotel._id} className="admin-hospitality-card">
                                                <div className="admin-hospitality-image">
                                                    {hotel.image ? <img src={hotel.image} alt={hotel.name} /> : <div className="admin-image-placeholder">No image</div>}
                                                </div>
                                                <div className="admin-hospitality-body">
                                                    <div className="admin-card-heading-row">
                                                        <div>
                                                            <h3>{hotel.name}</h3>
                                                            <p>{hotel.city || 'City TBD'}, {hotel.country || 'Country TBD'}</p>
                                                        </div>
                                                        <div className="admin-hospitality-rating">★ {hotel.rating ?? 'N/A'}</div>
                                                    </div>

                                                    <div className="admin-hospitality-meta">
                                                        <span>{hotel.stadiumName || 'No stadium linked'}</span>
                                                        <span>{hotel.distance || 'Distance N/A'}</span>
                                                        <span>{hotel.price ? `$${hotel.price}/night` : 'Price N/A'}</span>
                                                        {hotel.deal ? <span className="is-highlight">{hotel.deal}</span> : null}
                                                    </div>

                                                    {Array.isArray(hotel.amenities) && hotel.amenities.length > 0 ? (
                                                        <div className="admin-hospitality-tags">
                                                            {hotel.amenities.slice(0, 6).map((amenity) => (
                                                                <span key={amenity}>{amenity}</span>
                                                            ))}
                                                        </div>
                                                    ) : null}

                                                    <p className="admin-card-description">{hotel.description || 'No description available.'}</p>
                                                </div>
                                            </article>
                                        ))}
                                    </div>

                                    {filteredHotels.length > 4 ? (
                                        <button
                                            className="admin-secondary-btn"
                                            type="button"
                                            onClick={() => setShowAllHotels((current) => !current)}
                                        >
                                            {showAllHotels ? 'Show less' : 'Show all'}
                                        </button>
                                    ) : null}
                                </article>

                                <article className="admin-panel admin-panel-large">
                                    <div className="admin-panel-header">
                                        <div>
                                            <h2>Restaurants</h2>
                                            <p>{filteredRestaurants.length} dining options around stadiums.</p>
                                        </div>
                                    </div>

                                    <div className="admin-hospitality-list">
                                        {visibleRestaurants.map((restaurant) => (
                                            <article key={restaurant.id || restaurant._id} className="admin-hospitality-card">
                                                <div className="admin-hospitality-image">
                                                    {restaurant.image ? <img src={restaurant.image} alt={restaurant.name} /> : <div className="admin-image-placeholder">No image</div>}
                                                </div>
                                                <div className="admin-hospitality-body">
                                                    <div className="admin-card-heading-row">
                                                        <div>
                                                            <h3>{restaurant.name}</h3>
                                                            <p>{restaurant.city || 'City TBD'}, {restaurant.country || 'Country TBD'}</p>
                                                        </div>
                                                        <div className="admin-hospitality-rating">★ {restaurant.rating ?? 'N/A'}</div>
                                                    </div>

                                                    <div className="admin-hospitality-meta">
                                                        <span>{restaurant.cuisine || 'Cuisine N/A'}</span>
                                                        <span>{restaurant.stadiumName || 'No stadium linked'}</span>
                                                        <span>{restaurant.distance || 'Distance N/A'}</span>
                                                    </div>

                                                    {Array.isArray(restaurant.tags) && restaurant.tags.length > 0 ? (
                                                        <div className="admin-hospitality-tags">
                                                            {restaurant.tags.slice(0, 6).map((tag) => (
                                                                <span key={tag}>{tag}</span>
                                                            ))}
                                                        </div>
                                                    ) : null}

                                                    <p className="admin-card-description">{restaurant.description || 'No description available.'}</p>
                                                </div>
                                            </article>
                                        ))}
                                    </div>

                                    {filteredRestaurants.length > 4 ? (
                                        <button
                                            className="admin-secondary-btn"
                                            type="button"
                                            onClick={() => setShowAllRestaurants((current) => !current)}
                                        >
                                            {showAllRestaurants ? 'Show less' : 'Show all'}
                                        </button>
                                    ) : null}
                                </article>
                            </section>
                        )}

                        {activeSection === 'transport' && (
                            <section className="admin-grid admin-grid-transport">
                                <article className="admin-panel admin-panel-large">
                                    <div className="admin-panel-header">
                                        <div>
                                            <h2>Transport Logistics</h2>
                                            <p>Route cards generated from the live match schedule.</p>
                                        </div>
                                        <div className="admin-inline-actions">
                                            <button className="admin-secondary-btn" type="button">Filter</button>
                                            <button className="admin-secondary-btn" type="button">Export</button>
                                        </div>
                                    </div>

                                    <div className="admin-table admin-transport-table">
                                        <div className="admin-table-row admin-table-head">
                                            <span>Route ID</span>
                                            <span>Type</span>
                                            <span>Destination</span>
                                            <span>Frequency</span>
                                            <span>Status</span>
                                        </div>

                                        {logisticsRows.map((row) => (
                                            <div key={row.routeId} className="admin-table-row admin-transport-row">
                                                <span><strong>{row.routeId}</strong></span>
                                                <span>{row.type}</span>
                                                <span>{row.destination}</span>
                                                <span>{row.frequency}</span>
                                                <span>
                                                    <span className={`admin-status ${row.status.toLowerCase()}`}>{row.status}</span>
                                                    <small>{row.note}</small>
                                                </span>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="admin-mini-stats">
                                        <article className="admin-mini-stat">
                                            <span>Total Venues</span>
                                            <strong>{stadiums.length}</strong>
                                        </article>
                                        <article className="admin-mini-stat">
                                            <span>Total Matches</span>
                                            <strong>{matches.length}</strong>
                                        </article>
                                    </div>
                                </article>

                                <aside className="admin-panel admin-emergency-panel">
                                    <div className="admin-panel-header">
                                        <div>
                                            <h2>Emergency Contacts</h2>
                                            <p>Keep the response numbers current for each zone.</p>
                                        </div>
                                        <button className="admin-secondary-btn" type="button" onClick={() => openEditor('emergency')}>
                                            Edit Contacts
                                        </button>
                                    </div>

                                    <div className="admin-contact-list">
                                        {Object.entries(emergencyForm.contacts || {}).map(([key, contact]) => (
                                            <article key={key} className="admin-contact-card">
                                                <div>
                                                    <h3>{contact.name}</h3>
                                                    <p>{contact.desc}</p>
                                                </div>
                                                <div className="admin-contact-number">{contact.number}</div>
                                            </article>
                                        ))}
                                    </div>

                                    <div className="admin-hospital-list">
                                        {(emergencyForm.hospitals || []).map((hospital) => (
                                            <article key={hospital.id || hospital.name} className="admin-hospital-card">
                                                <strong>{hospital.name}</strong>
                                                <p>{hospital.distance} · {hospital.time}</p>
                                                <span>{hospital.phone}</span>
                                            </article>
                                        ))}
                                    </div>
                                </aside>
                            </section>
                        )}

                        {activeSection === 'settings' && (
                            <section className="admin-panel admin-editor-panel">
                                <div className="admin-editor-tabs">
                                    <button className={editorTab === 'stadium' ? 'active' : ''} type="button" onClick={() => setEditorTab('stadium')}>Stadium</button>
                                    <button className={editorTab === 'match' ? 'active' : ''} type="button" onClick={() => setEditorTab('match')}>Match</button>
                                    <button className={editorTab === 'hotel' ? 'active' : ''} type="button" onClick={() => setEditorTab('hotel')}>Hotel</button>
                                    <button className={editorTab === 'restaurant' ? 'active' : ''} type="button" onClick={() => setEditorTab('restaurant')}>Restaurant</button>
                                    <button className={editorTab === 'emergency' ? 'active' : ''} type="button" onClick={() => setEditorTab('emergency')}>Emergency</button>
                                </div>

                                {editorTab === 'stadium' && (
                                    <form className="admin-form-grid" onSubmit={submitStadium}>
                                        <div className="admin-form-header">
                                            <h2>{editingStadiumId ? 'Update Stadium' : 'Create Stadium'}</h2>
                                            <button className="admin-secondary-btn" type="button" onClick={() => { setEditingStadiumId(null); setStadiumForm(emptyStadiumForm()); }}>Reset</button>
                                        </div>

                                        <input className="admin-input" placeholder="Stadium name" value={stadiumForm.name} onChange={(event) => setStadiumForm((current) => ({ ...current, name: event.target.value }))} />

                                        <div className="admin-form-two-col">
                                            <select className="admin-input" value={stadiumForm.cityId} onChange={(event) => {
                                                const city = cityById.get(event.target.value);
                                                setStadiumForm((current) => ({
                                                    ...current,
                                                    cityId: event.target.value,
                                                    country: city?.country || current.country,
                                                }));
                                            }}>
                                                <option value="">Select city</option>
                                                {cities.map((city) => (
                                                    <option key={city.id || city._id} value={city.id || city._id}>
                                                        {city.name} · {city.country}
                                                    </option>
                                                ))}
                                            </select>
                                            <input className="admin-input" placeholder="Country" value={stadiumForm.country} onChange={(event) => setStadiumForm((current) => ({ ...current, country: event.target.value }))} />
                                        </div>

                                        <div className="admin-form-two-col">
                                            <input className="admin-input" placeholder="Capacity" value={stadiumForm.capacity} onChange={(event) => setStadiumForm((current) => ({ ...current, capacity: event.target.value }))} />
                                            <label className="admin-file-input">
                                                <span>Upload image</span>
                                                <input type="file" accept="image/*" onChange={handleStadiumImageUpload} />
                                            </label>
                                        </div>

                                        <input className="admin-input" placeholder="Image URL" value={stadiumForm.image} onChange={(event) => setStadiumForm((current) => ({ ...current, image: event.target.value }))} />

                                        {stadiumForm.image ? (
                                            <div className="admin-image-preview">
                                                <img src={stadiumForm.image} alt="Stadium preview" />
                                            </div>
                                        ) : null}

                                        <textarea className="admin-textarea" placeholder="Description" value={stadiumForm.description} onChange={(event) => setStadiumForm((current) => ({ ...current, description: event.target.value }))} />

                                        <button className="admin-primary-btn admin-submit-btn" type="submit" disabled={saving}>
                                            {saving ? 'Saving...' : editingStadiumId ? 'Update Stadium' : 'Create Stadium'}
                                        </button>
                                    </form>
                                )}

                                {editorTab === 'match' && (
                                    <form className="admin-form-grid" onSubmit={submitMatch}>
                                        <div className="admin-form-header">
                                            <h2>{editingMatchId ? 'Update Match' : 'Create Match'}</h2>
                                            <button className="admin-secondary-btn" type="button" onClick={() => { setEditingMatchId(null); setMatchForm(emptyMatchForm()); }}>Reset</button>
                                        </div>

                                        <div className="admin-form-two-col">
                                            <input className="admin-input" placeholder="Team A" value={matchForm.teamA} onChange={(event) => setMatchForm((current) => ({ ...current, teamA: event.target.value }))} />
                                            <input className="admin-input" placeholder="Team B" value={matchForm.teamB} onChange={(event) => setMatchForm((current) => ({ ...current, teamB: event.target.value }))} />
                                        </div>

                                        <div className="admin-form-two-col">
                                            <select className="admin-input" value={matchForm.stadiumId} onChange={(event) => setMatchForm((current) => ({ ...current, stadiumId: event.target.value }))}>
                                                <option value="">Select stadium</option>
                                                {stadiums.map((stadium) => (
                                                    <option key={stadium.id || stadium._id} value={stadium.id || stadium._id}>
                                                        {stadium.name}
                                                    </option>
                                                ))}
                                            </select>
                                            <select className="admin-input" value={matchForm.cityId} onChange={(event) => setMatchForm((current) => ({ ...current, cityId: event.target.value }))}>
                                                <option value="">Select city</option>
                                                {cities.map((city) => (
                                                    <option key={city.id || city._id} value={city.id || city._id}>
                                                        {city.name} · {city.country}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>

                                        <div className="admin-form-two-col">
                                            <input className="admin-input" type="date" value={matchForm.date} onChange={(event) => setMatchForm((current) => ({ ...current, date: event.target.value }))} />
                                            <input className="admin-input" type="time" value={matchForm.time} onChange={(event) => setMatchForm((current) => ({ ...current, time: event.target.value }))} />
                                        </div>

                                        <div className="admin-form-two-col">
                                            <input className="admin-input" placeholder="Group" value={matchForm.group} onChange={(event) => setMatchForm((current) => ({ ...current, group: event.target.value }))} />
                                            <input className="admin-input" placeholder="Type" value={matchForm.type} onChange={(event) => setMatchForm((current) => ({ ...current, type: event.target.value }))} />
                                        </div>

                                        <button className="admin-primary-btn admin-submit-btn" type="submit" disabled={saving}>
                                            {saving ? 'Saving...' : editingMatchId ? 'Update Match' : 'Create Match'}
                                        </button>
                                    </form>
                                )}

                                {editorTab === 'hotel' && (
                                    <form className="admin-form-grid" onSubmit={submitHotel}>
                                        <div className="admin-form-header">
                                            <h2>Create Hotel</h2>
                                            <button className="admin-secondary-btn" type="button" onClick={() => setHotelForm(emptyHotelForm())}>Reset</button>
                                        </div>

                                        <input className="admin-input" placeholder="Hotel name" value={hotelForm.name} onChange={(event) => setHotelForm((current) => ({ ...current, name: event.target.value }))} />

                                        <div className="admin-form-two-col">
                                            <select className="admin-input" value={hotelForm.cityId} onChange={(event) => {
                                                const city = cityById.get(event.target.value);
                                                setHotelForm((current) => ({
                                                    ...current,
                                                    cityId: event.target.value,
                                                    country: city?.country || current.country,
                                                }));
                                            }}>
                                                <option value="">Select city</option>
                                                {cities.map((city) => (
                                                    <option key={city.id || city._id} value={city.id || city._id}>
                                                        {city.name} · {city.country}
                                                    </option>
                                                ))}
                                            </select>
                                            <select className="admin-input" value={hotelForm.stadiumId} onChange={(event) => setHotelForm((current) => ({ ...current, stadiumId: event.target.value }))}>
                                                <option value="">Select stadium</option>
                                                {stadiums.map((stadium) => (
                                                    <option key={stadium.id || stadium._id} value={stadium.id || stadium._id}>
                                                        {stadium.name}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>

                                        <div className="admin-form-two-col">
                                            <input className="admin-input" placeholder="Country" value={hotelForm.country} onChange={(event) => setHotelForm((current) => ({ ...current, country: event.target.value }))} />
                                            <input className="admin-input" placeholder="Distance" value={hotelForm.distance} onChange={(event) => setHotelForm((current) => ({ ...current, distance: event.target.value }))} />
                                        </div>

                                        <div className="admin-form-two-col">
                                            <input className="admin-input" placeholder="Price" value={hotelForm.price} onChange={(event) => setHotelForm((current) => ({ ...current, price: event.target.value }))} />
                                            <input className="admin-input" placeholder="Rating" value={hotelForm.rating} onChange={(event) => setHotelForm((current) => ({ ...current, rating: event.target.value }))} />
                                        </div>

                                        <div className="admin-form-two-col">
                                            <input className="admin-input" placeholder="Deal" value={hotelForm.deal} onChange={(event) => setHotelForm((current) => ({ ...current, deal: event.target.value }))} />
                                            <input className="admin-input" placeholder="Image URL" value={hotelForm.image} onChange={(event) => setHotelForm((current) => ({ ...current, image: event.target.value }))} />
                                        </div>

                                        <input className="admin-input" placeholder="Amenities comma separated" value={hotelForm.amenities} onChange={(event) => setHotelForm((current) => ({ ...current, amenities: event.target.value }))} />

                                        <textarea className="admin-textarea" placeholder="Description" value={hotelForm.description} onChange={(event) => setHotelForm((current) => ({ ...current, description: event.target.value }))} />

                                        <button className="admin-primary-btn admin-submit-btn" type="submit" disabled={saving}>
                                            {saving ? 'Saving...' : 'Create Hotel'}
                                        </button>
                                    </form>
                                )}

                                {editorTab === 'restaurant' && (
                                    <form className="admin-form-grid" onSubmit={submitRestaurant}>
                                        <div className="admin-form-header">
                                            <h2>Create Restaurant</h2>
                                            <button className="admin-secondary-btn" type="button" onClick={() => setRestaurantForm(emptyRestaurantForm())}>Reset</button>
                                        </div>

                                        <input className="admin-input" placeholder="Restaurant name" value={restaurantForm.name} onChange={(event) => setRestaurantForm((current) => ({ ...current, name: event.target.value }))} />

                                        <div className="admin-form-two-col">
                                            <select className="admin-input" value={restaurantForm.cityId} onChange={(event) => {
                                                const city = cityById.get(event.target.value);
                                                setRestaurantForm((current) => ({
                                                    ...current,
                                                    cityId: event.target.value,
                                                    country: city?.country || current.country,
                                                }));
                                            }}>
                                                <option value="">Select city</option>
                                                {cities.map((city) => (
                                                    <option key={city.id || city._id} value={city.id || city._id}>
                                                        {city.name} · {city.country}
                                                    </option>
                                                ))}
                                            </select>
                                            <select className="admin-input" value={restaurantForm.stadiumId} onChange={(event) => setRestaurantForm((current) => ({ ...current, stadiumId: event.target.value }))}>
                                                <option value="">Select stadium</option>
                                                {stadiums.map((stadium) => (
                                                    <option key={stadium.id || stadium._id} value={stadium.id || stadium._id}>
                                                        {stadium.name}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>

                                        <div className="admin-form-two-col">
                                            <input className="admin-input" placeholder="Country" value={restaurantForm.country} onChange={(event) => setRestaurantForm((current) => ({ ...current, country: event.target.value }))} />
                                            <input className="admin-input" placeholder="Cuisine" value={restaurantForm.cuisine} onChange={(event) => setRestaurantForm((current) => ({ ...current, cuisine: event.target.value }))} />
                                        </div>

                                        <div className="admin-form-two-col">
                                            <input className="admin-input" placeholder="Distance" value={restaurantForm.distance} onChange={(event) => setRestaurantForm((current) => ({ ...current, distance: event.target.value }))} />
                                            <input className="admin-input" placeholder="Rating" value={restaurantForm.rating} onChange={(event) => setRestaurantForm((current) => ({ ...current, rating: event.target.value }))} />
                                        </div>

                                        <input className="admin-input" placeholder="Image URL" value={restaurantForm.image} onChange={(event) => setRestaurantForm((current) => ({ ...current, image: event.target.value }))} />
                                        <input className="admin-input" placeholder="Tags comma separated" value={restaurantForm.tags} onChange={(event) => setRestaurantForm((current) => ({ ...current, tags: event.target.value }))} />

                                        <textarea className="admin-textarea" placeholder="Description" value={restaurantForm.description} onChange={(event) => setRestaurantForm((current) => ({ ...current, description: event.target.value }))} />

                                        <button className="admin-primary-btn admin-submit-btn" type="submit" disabled={saving}>
                                            {saving ? 'Saving...' : 'Create Restaurant'}
                                        </button>
                                    </form>
                                )}

                                {editorTab === 'emergency' && (
                                    <form className="admin-form-grid" onSubmit={saveEmergency}>
                                        <div className="admin-form-header">
                                            <h2>Emergency Contacts</h2>
                                            <button className="admin-secondary-btn" type="button" onClick={() => setEmergencyForm(normalizeEmergency(emergency))}>Reset</button>
                                        </div>

                                        <div className="admin-emergency-edit-grid">
                                            {Object.entries(emergencyForm.contacts || {}).map(([key, contact]) => (
                                                <div key={key} className="admin-contact-edit-card">
                                                    <input className="admin-input" value={contact.name} onChange={(event) => updateEmergencyContact(key, 'name', event.target.value)} placeholder="Contact name" />
                                                    <input className="admin-input" value={contact.number} onChange={(event) => updateEmergencyContact(key, 'number', event.target.value)} placeholder="Phone number" />
                                                    <textarea className="admin-textarea" value={contact.desc} onChange={(event) => updateEmergencyContact(key, 'desc', event.target.value)} placeholder="Description" />
                                                </div>
                                            ))}
                                        </div>

                                        <div className="admin-form-header admin-form-header-tight">
                                            <h3>Hospitals</h3>
                                            <button className="admin-secondary-btn" type="button" onClick={addHospital}>+ Add Hospital</button>
                                        </div>

                                        <div className="admin-hospital-edit-list">
                                            {emergencyForm.hospitals.map((hospital, index) => (
                                                <div key={hospital.id || index} className="admin-hospital-edit-card">
                                                    <input className="admin-input" value={hospital.name} onChange={(event) => updateHospital(index, 'name', event.target.value)} placeholder="Hospital name" />
                                                    <div className="admin-form-two-col">
                                                        <input className="admin-input" value={hospital.distance} onChange={(event) => updateHospital(index, 'distance', event.target.value)} placeholder="Distance" />
                                                        <input className="admin-input" value={hospital.time} onChange={(event) => updateHospital(index, 'time', event.target.value)} placeholder="Travel time" />
                                                    </div>
                                                    <div className="admin-form-two-col">
                                                        <input className="admin-input" value={hospital.phone} onChange={(event) => updateHospital(index, 'phone', event.target.value)} placeholder="Phone" />
                                                        <button className="admin-danger-btn" type="button" onClick={() => removeHospital(index)}>Remove</button>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>

                                        <button className="admin-primary-btn admin-submit-btn" type="submit" disabled={saving}>
                                            {saving ? 'Saving...' : 'Save Emergency Contacts'}
                                        </button>
                                    </form>
                                )}
                            </section>
                        )}
                    </main>

                    <button className="admin-fab" type="button" onClick={() => openEditor('stadium')}>+</button>
                </div>
            </div>
        </div>
    );
}

export default AdminDashboard;
