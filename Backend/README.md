# World Cup Trip 2026 Backend

Scalable Node.js + Express + MongoDB backend designed for progressive integration with your React SPA.

## 1) Architecture Overview

- Runtime: Node.js + Express
- Database: MongoDB + Mongoose
- Pattern: MVC + middleware + shared utilities
- API base path: `/api`

### Folder Structure

```txt
Backend/
  src/
    config/
      db.js
    controllers/
      authController.js
      bookingController.js
      cityController.js
      hotelController.js
      stadiumController.js
    middleware/
      authMiddleware.js
      errorMiddleware.js
      notFoundMiddleware.js
      validateObjectId.js
    models/
      Booking.js
      City.js
      Hotel.js
      Stadium.js
      User.js
    routes/
      authRoutes.js
      bookingRoutes.js
      cityRoutes.js
      hotelRoutes.js
      index.js
      stadiumRoutes.js
    utils/
      ApiError.js
      asyncHandler.js
      sanitizePayload.js
      token.js
    app.js
    server.js
  .env
  .env.example
  package.json
```

## 2) Quick Start

1. Install dependencies:

```bash
cd Backend
npm install
```

2. Configure `.env` (copy from `.env.example` if needed).

3. Run development server:

```bash
npm run dev
```

4. Health check:

```http
GET http://localhost:5000/api/health
```

## 3) Data Models (Scalable)

### User
- Required: `fullName`, `email`, `password`
- Optional: `avatarUrl`
- Role-based access: `role` in `user|admin`
- Password hashing: bcrypt pre-save hook

### City
- Required: `name`, `country`
- Optional: `description`, `image`, `timezone`, `tags`
- Unique pair: `(name, country)`

### Stadium
- Required: `name`, `city` (ObjectId -> City)
- Optional: `country`, `description`, `image`, `capacity`, `matches`, `location`, `amenities`
- Response includes frontend-friendly fields (`id`, `city`, `country`) to avoid breaking UI

### Hotel
- Required: `name`, `city` (ObjectId -> City)
- Optional: `stadium`, `description`, `image`, `price`, `rating`, `reviews`, `distance`, `amenities`, `deal`
- Response shape mirrors your current card fields

### Booking (Future-ready)
- Required: `user`
- Optional by design: `hotel`, `stadium`, `city`, `checkInDate`, `checkOutDate`, `notes`
- Flexible: `bookingType` defaults to `hotel`
- Status lifecycle: `pending|confirmed|cancelled`

## 4) Authentication System

### Endpoints
- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/auth/me` (protected)
- `POST /api/auth/logout` (protected)

### JWT Strategy
- Token generated on login/register.
- Backend accepts token from:
  - `Authorization: Bearer <token>`
  - HttpOnly cookie (optional via `USE_AUTH_COOKIE=true`)

### localStorage vs HttpOnly Cookies

- localStorage:
  - Pros: easy in SPA, simple to debug
  - Cons: vulnerable to XSS token theft
- HttpOnly cookies:
  - Pros: better XSS protection for token storage
  - Cons: requires strict CORS/credentials/CSRF strategy

Recommendation for now:
- Start with `Authorization` header from localStorage for speed.
- Move to HttpOnly cookies before production hardening.

### Frontend Auth State

Keep in React context:
- `user`
- `token`
- `isAuthenticated`
- `isLoading`

Boot sequence on app start:
1. Read token from storage.
2. Call `/api/auth/me`.
3. If 401, clear storage.
4. If success, hydrate user state.

## 5) API Endpoints

### Stadiums
- `GET /api/stadiums`
- `GET /api/stadiums/:id`
- `POST /api/stadiums` (admin)
- `PUT /api/stadiums/:id` (admin)
- `DELETE /api/stadiums/:id` (admin)

### Hotels
- `GET /api/hotels`
- `GET /api/hotels/:id`
- `POST /api/hotels` (admin)
- `PUT /api/hotels/:id` (admin)
- `DELETE /api/hotels/:id` (admin)

### Cities
- `GET /api/cities`
- `GET /api/cities/:id`
- `POST /api/cities` (admin)
- `PUT /api/cities/:id` (admin)
- `DELETE /api/cities/:id` (admin)

### Bookings
- `POST /api/bookings` (auth user)
- `GET /api/bookings/me` (auth user)
- `GET /api/bookings/:id` (owner or admin)

## 6) Progressive Integration with React (No Big Bang)

### Step 1: Keep existing mock data
- UI remains unchanged.

### Step 2: Connect one feature only (already done for Stadiums list)
- Use API service with fallback to mock data.
- Show loading and non-blocking error message.

### Step 3: Verify API independently
- Test all stadium endpoints in Postman.
- Confirm shape matches component expectations.

### Step 4: Replace mock data feature by feature
- Hotels page next
- Then city pages
- Then bookings/auth pages

### Step 5: Keep fallback for one release cycle
- If API fails, use mock/local fallback.
- Remove fallback once backend is stable.

## 7) Common Issues and How This Backend Handles Them

### CORS errors
- `cors` configured with `CLIENT_ORIGIN` and `credentials: true`.
- Ensure frontend URL exactly matches `.env` value.

### 404 route mismatch
- All endpoints prefixed with `/api`.
- Not-found middleware returns JSON: `Route not found: METHOD URL`.

### JSON parsing issues
- `express.json()` configured globally.
- `apiClient` catches invalid JSON and throws controlled error.

### Async/await mistakes
- Controllers wrapped in `asyncHandler`.
- No unhandled promise rejections from route handlers.

### Token expiration
- Expired tokens produce 401 in auth middleware.
- Frontend should logout + redirect on 401.

### Invalid MongoDB IDs
- `validateObjectId` middleware returns 400 before DB lookup.

### Empty responses breaking UI
- List services return `[]` fallback.
- Stadium page uses API->mock fallback.

### undefined/null fields from frontend
- `sanitizePayload` removes `undefined`, trims strings, normalizes empty strings.
- Schemas use defaults and optional fields for progressive rollout.

## 8) React API Integration Guide

### Base URL setup
Create `Frontend/.env`:

```env
VITE_API_BASE_URL=http://localhost:5000/api
```

### Reusable API service
Implemented in `Frontend/src/services/apiClient.js`.

- Auto-adds auth header from localStorage token.
- Sends `credentials: include` (future cookie support).
- Throws normalized errors.

### Existing services created
- `Frontend/src/services/authService.js`
- `Frontend/src/services/stadiumService.js`
- `Frontend/src/services/hotelService.js`

### Progressive data flow pattern

```js
const [data, setData] = useState(mockData);
const [loading, setLoading] = useState(false);
const [error, setError] = useState('');

useEffect(() => {
  let active = true;
  (async () => {
    try {
      setLoading(true);
      const fromApi = await fetchFeature();
      if (active && fromApi?.length) setData(fromApi);
    } catch (e) {
      if (active) setError('API unavailable. Showing local data.');
    } finally {
      if (active) setLoading(false);
    }
  })();
  return () => { active = false; };
}, []);
```

## 9) Protected Routes (Backend + Frontend)

### Backend
- Add `protect` middleware for authenticated routes.
- Add `authorize('admin')` for admin-only CRUD.

### Frontend
Create route wrapper:

```jsx
import { Navigate } from 'react-router-dom';

function ProtectedRoute({ isAuthenticated, children }) {
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  return children;
}
```

For admin pages:
- Check `user.role === 'admin'`.

## 10) Postman Testing Examples

### Register
```http
POST /api/auth/register
Content-Type: application/json

{
  "fullName": "Admin User",
  "email": "admin@wc26.com",
  "password": "secret123",
  "role": "admin"
}
```

### Login
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "admin@wc26.com",
  "password": "secret123"
}
```

### Create City (admin)
```http
POST /api/cities
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "Los Angeles",
  "country": "USA",
  "description": "Host city in California"
}
```

### Create Stadium (admin)
```http
POST /api/stadiums
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "SoFi Stadium",
  "city": "<cityObjectId>",
  "country": "USA",
  "matches": 8
}
```

### Create Booking (user)
```http
POST /api/bookings
Authorization: Bearer <token>
Content-Type: application/json

{
  "bookingType": "hotel",
  "hotel": "<hotelObjectId>",
  "guests": 2,
  "checkInDate": "2026-06-14"
}
```

## 11) Production Readiness Notes

- Use strong secret in `JWT_SECRET`.
- Use MongoDB credentials from environment only.
- Turn on `USE_AUTH_COOKIE=true` and `NODE_ENV=production` for secure cookies.
- Keep `helmet` enabled.
- Restrict CORS origins to exact domains.
- Add rate limiting and request validation (Joi/Zod/express-validator) as next hardening step.

## 12) Suggested Next Implementation Steps

1. Seed initial `cities`, `stadiums`, and `hotels` collections.
2. Integrate hotels page exactly like stadium page (API + fallback).
3. Add AuthContext and wire `login/signup` forms to auth endpoints.
4. Add a simple admin page to manage cities/stadiums/hotels.
