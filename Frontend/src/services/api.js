const BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

function unwrapData(response) {
    if (response && Object.prototype.hasOwnProperty.call(response, 'data')) {
        return response.data;
    }

    return response;
}

async function request(path, opts = {}) {
    const token = localStorage.getItem('token');
    const headers = Object.assign({}, opts.headers || {});
    if (!headers['Content-Type'] && !(opts.body instanceof FormData)) {
        headers['Content-Type'] = 'application/json';
    }
    if (token) headers['Authorization'] = `Bearer ${token}`;

    const res = await fetch(`${BASE}${path}`, Object.assign({}, opts, { headers }));
    const text = await res.text();
    const data = text ? JSON.parse(text) : null;
    if (!res.ok) {
        const err = new Error(data && data.message ? data.message : `${res.status} ${res.statusText}`);
        err.status = res.status;
        throw err;
    }
    return data;
}

export async function getCities() {
    return unwrapData(await request('/cities'));
}

export async function getStadiums() {
    return unwrapData(await request('/stadiums'));
}

export async function getHotels() {
    return unwrapData(await request('/hotels'));
}

export async function getRestaurants() {
    return unwrapData(await request('/restaurants'));
}

export async function getMatches(params = {}) {
    const query = new URLSearchParams();

    Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== '') {
            query.append(key, String(value));
        }
    });

    const suffix = query.toString() ? `?${query.toString()}` : '';
    return unwrapData(await request(`/matches${suffix}`));
}

export async function getEmergency() {
    return unwrapData(await request('/emergency'));
}

// Auth
export async function login(email, password) {
    const res = await request('/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
    });
    if (res && res.token) {
        localStorage.setItem('token', res.token);
        localStorage.setItem('user', JSON.stringify(res.user || null));
    }
    return res;
}

export async function getMe() {
    return request('/auth/me');
}

export function logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
}

// Admin CRUD - Stadiums
export async function createStadium(payload) {
    return request('/stadiums', { method: 'POST', body: JSON.stringify(payload) });
}

export async function updateStadium(id, payload) {
    return request(`/stadiums/${id}`, { method: 'PUT', body: JSON.stringify(payload) });
}

export async function deleteStadium(id) {
    return request(`/stadiums/${id}`, { method: 'DELETE' });
}

// Admin CRUD - Matches
export async function createMatch(payload) {
    return request('/matches', { method: 'POST', body: JSON.stringify(payload) });
}

export async function updateMatch(id, payload) {
    return request(`/matches/${id}`, { method: 'PUT', body: JSON.stringify(payload) });
}

export async function deleteMatch(id) {
    return request(`/matches/${id}`, { method: 'DELETE' });
}

export async function updateEmergency(payload) {
    return request('/emergency', { method: 'PUT', body: JSON.stringify(payload) });
}

export async function uploadFile(formData) {
    const token = localStorage.getItem('token');
    const headers = {};

    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }

    const res = await fetch(`${BASE}/uploads`, {
        method: 'POST',
        headers,
        body: formData,
    });

    const text = await res.text();
    const data = text ? JSON.parse(text) : null;

    if (!res.ok) {
        const err = new Error(data && data.message ? data.message : `${res.status} ${res.statusText}`);
        err.status = res.status;
        throw err;
    }

    return data;
}

export default {
    getCities,
    getStadiums,
    getHotels,
    getRestaurants,
    getMatches,
    getEmergency,
    updateEmergency,
};
