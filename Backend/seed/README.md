# Database Seed

This folder contains the phase 1 MongoDB seeding script.

## Run

From the `Backend/` folder:

```bash
npm run seed
```

The script uses `DB_URL` from `Backend/.env`, clears the existing phase 1 collections, and reloads data from `Frontend/src/data/mockData.js`.
