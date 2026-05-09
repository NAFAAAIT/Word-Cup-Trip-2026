const path = require("path");
const { pathToFileURL } = require("url");
const mongoose = require("mongoose");
require("dotenv").config();

const connectDB = require("../src/config/db");
const City = require("../src/models/City");
const Stadium = require("../src/models/Stadium");
const Hotel = require("../src/models/Hotel");
const Restaurant = require("../src/models/Restaurant");
const Match = require("../src/models/Match");
const Emergency = require("../src/models/Emergency");
const User = require("../src/models/User");
const Booking = require("../src/models/Booking");

const frontendMockDataPath = path.resolve(
    __dirname,
    "..",
    "..",
    "Frontend",
    "src",
    "data",
    "mockData.js"
);

const DEFAULT_COUNTRY_BY_CITY = {
    "New York/New Jersey": "USA",
    "New York/NJ": "USA",
    "Los Angeles": "USA",
    Miami: "USA",
    Seattle: "USA",
    Philadelphia: "USA",
    "San Francisco Bay Area": "USA",
    Dallas: "USA",
    "Dallas (Arlington)": "USA",
    Atlanta: "USA",
    Boston: "USA",
    Houston: "USA",
    "Kansas City": "USA",
    Toronto: "Canada",
    Vancouver: "Canada",
    Montreal: "Canada",
    Edmonton: "Canada",
    "Mexico City": "Mexico",
    Monterrey: "Mexico",
    Guadalajara: "Mexico",
};

const ADMIN_USER = {
    fullName: "Site Admin",
    email: "admin@worldcuptrip.com",
    password: "Admin123!",
    role: "admin",
    avatarUrl: null,
};

const DEMO_USER = {
    fullName: "Demo Fan",
    email: "demo@worldcuptrip.com",
    password: "Demo123!",
    role: "user",
    avatarUrl: null,
};

const normalizeText = (value) =>
    String(value || "")
        .trim()
        .toLowerCase()
        .replace(/\s+/g, " ");

const parseCapacity = (value) => {
    if (value === null || value === undefined || value === "") {
        return null;
    }

    const numeric = Number(String(value).replace(/,/g, ""));
    return Number.isFinite(numeric) ? numeric : null;
};

const inferCountry = (cityName, explicitCountry = null) => {
    if (explicitCountry) {
        return explicitCountry;
    }

    return DEFAULT_COUNTRY_BY_CITY[cityName] || "USA";
};

const makeCityKey = (name, country) => `${normalizeText(name)}::${normalizeText(country)}`;

const buildKeywordSet = (stadiumName) => {
    return normalizeText(stadiumName)
        .replace(/[^a-z0-9\s]/g, " ")
        .split(/\s+/)
        .filter((token) => token.length >= 3);
};

const importFrontendData = async () => {
    const moduleUrl = pathToFileURL(frontendMockDataPath).href;
    return import(moduleUrl);
};

const seedCities = async (cityNames, stadiums, hotels, matches) => {
    const cityRecords = new Map();

    const addCity = (name, country) => {
        if (!name) {
            return;
        }

        const resolvedCountry = inferCountry(name, country);
        const key = makeCityKey(name, resolvedCountry);

        if (!cityRecords.has(key)) {
            cityRecords.set(key, {
                name,
                country: resolvedCountry,
                description: null,
                image: null,
                timezone: null,
                tags: [],
            });
        }
    };

    for (const cityName of cityNames || []) {
        addCity(cityName, DEFAULT_COUNTRY_BY_CITY[cityName]);
    }

    for (const stadium of stadiums || []) {
        addCity(stadium.city, stadium.country);
    }

    for (const hotel of hotels || []) {
        addCity(hotel.city, hotel.country);
    }

    for (const match of matches || []) {
        addCity(match.city, match.country);
    }

    const docs = await City.insertMany(Array.from(cityRecords.values()), { ordered: true });
    const cityMap = new Map();

    for (const doc of docs) {
        cityMap.set(makeCityKey(doc.name, doc.country), doc);
    }

    return cityMap;
};

const seedStadiums = async (stadiums, cityMap) => {
    const documents = [];
    const stadiumCityKeys = [];
    const stadiumMetaRecords = [];

    for (const stadium of stadiums || []) {
        const country = inferCountry(stadium.city, stadium.country);
        const cityKey = makeCityKey(stadium.city, country);
        const cityDoc = cityMap.get(cityKey);

        if (!cityDoc) {
            throw new Error(`Missing city reference for stadium: ${stadium.name}`);
        }

        documents.push({
            name: stadium.name,
            city: cityDoc._id,
            country,
            description: stadium.description || null,
            image: stadium.image || null,
            capacity: parseCapacity(stadium.capacity),
            matches: stadium.matches || 0,
            location: {
                lat: null,
                lng: null,
                address: null,
            },
            amenities: [],
        });
        stadiumMetaRecords.push({
            name: stadium.name,
            cityId: cityDoc._id,
            cityName: stadium.city,
            country,
        });
        stadiumCityKeys.push(cityKey);
    }

    const docs = await Stadium.insertMany(documents, { ordered: true });
    const stadiumMap = new Map();
    const stadiumsByCity = new Map();

    docs.forEach((doc, index) => {
        const cityKey = stadiumCityKeys[index];
        const meta = {
            _id: doc._id,
            name: doc.name,
            cityId: stadiumMetaRecords[index].cityId,
            cityName: stadiumMetaRecords[index].cityName,
            country: stadiumMetaRecords[index].country,
        };

        stadiumMap.set(normalizeText(doc.name), meta);

        if (!stadiumsByCity.has(cityKey)) {
            stadiumsByCity.set(cityKey, []);
        }
        stadiumsByCity.get(cityKey).push(meta);
    });

    return { stadiumMap, stadiumsByCity };
};

const pickStadiumReference = (hotel, stadiumMap, stadiumsByCity) => {
    const country = inferCountry(hotel.city, hotel.country);
    const cityDocKey = makeCityKey(hotel.city, country);

    const cityStadiums = stadiumsByCity.get(cityDocKey) || [];
    if (cityStadiums.length === 1) {
        return cityStadiums[0]._id;
    }

    const haystack = normalizeText([hotel.name, hotel.distance, hotel.description].filter(Boolean).join(" "));

    for (const stadium of cityStadiums) {
        const stadiumName = normalizeText(stadium.name);
        if (haystack.includes(stadiumName)) {
            return stadium._id;
        }

        const keywords = buildKeywordSet(stadium.name);
        if (keywords.some((keyword) => haystack.includes(keyword))) {
            return stadium._id;
        }
    }

    for (const [stadiumName, stadiumDoc] of stadiumMap.entries()) {
        if (haystack.includes(stadiumName)) {
            return stadiumDoc._id;
        }
    }

    return null;
};

const pickStadiumFromText = (value, stadiumMap) => {
    const haystack = normalizeText(value);

    for (const stadium of stadiumMap.values()) {
        const stadiumName = normalizeText(stadium.name);
        if (haystack.includes(stadiumName)) {
            return stadium;
        }

        const keywords = buildKeywordSet(stadium.name);
        if (keywords.some((keyword) => haystack.includes(keyword))) {
            return stadium;
        }
    }

    return null;
};

const seedRestaurants = async (restaurants, stadiumMap) => {
    const documents = [];

    for (const restaurant of restaurants || []) {
        const stadium = pickStadiumFromText(
            [restaurant.name, restaurant.distance, restaurant.description].filter(Boolean).join(" "),
            stadiumMap
        );

        if (!stadium) {
            throw new Error(`Missing stadium reference for restaurant: ${restaurant.name}`);
        }

        documents.push({
            name: restaurant.name,
            city: stadium.cityId,
            stadium: stadium._id,
            country: stadium.country || restaurant.country || null,
            cuisine: restaurant.cuisine || null,
            description: restaurant.description || null,
            image: restaurant.image || null,
            rating: restaurant.rating ?? null,
            distance: restaurant.distance || null,
            tags: Array.isArray(restaurant.tags) ? restaurant.tags : [],
        });
    }

    await Restaurant.insertMany(documents, { ordered: true });
};

const seedMatches = async (matches, cityMap, stadiumMap) => {
    const documents = [];

    for (const match of matches || []) {
        const country = inferCountry(match.city, match.country);
        const cityDoc = cityMap.get(makeCityKey(match.city, country));
        const stadium = stadiumMap.get(normalizeText(match.stadium));

        if (!cityDoc) {
            throw new Error(`Missing city reference for match: ${match.teamA} vs ${match.teamB}`);
        }

        if (!stadium) {
            throw new Error(`Missing stadium reference for match: ${match.stadium}`);
        }

        documents.push({
            teamA: match.teamA,
            teamB: match.teamB,
            flagA: match.flagA || null,
            flagB: match.flagB || null,
            group: match.group || null,
            date: match.date || null,
            time: match.time || null,
            stadium: stadium._id,
            city: cityDoc._id,
            country: cityDoc.country || country,
            type: match.type || "Group Stage",
        });
    }

    await Match.insertMany(documents, { ordered: true });
};

const seedEmergency = async (emergencyData) => {
    await Emergency.create({
        key: "global",
        contacts: emergencyData.contacts,
        hospitals: emergencyData.hospitals,
    });
};

const seedHotels = async (hotels, cityMap, stadiumMap, stadiumsByCity) => {
    const documents = [];

    for (const hotel of hotels || []) {
        const country = inferCountry(hotel.city, hotel.country);
        const cityDoc = cityMap.get(makeCityKey(hotel.city, country));

        if (!cityDoc) {
            throw new Error(`Missing city reference for hotel: ${hotel.name}`);
        }

        documents.push({
            name: hotel.name,
            city: cityDoc._id,
            stadium: pickStadiumReference(hotel, stadiumMap, stadiumsByCity),
            description: hotel.description || null,
            image: hotel.image || null,
            price: hotel.price ?? null,
            rating: hotel.rating ?? null,
            reviews: hotel.reviews || 0,
            distance: hotel.distance || null,
            amenities: Array.isArray(hotel.amenities) ? hotel.amenities : [],
            deal: hotel.deal || null,
        });
    }

    await Hotel.insertMany(documents, { ordered: true });
};

const seedUsers = async () => {
    await User.create([ADMIN_USER, DEMO_USER]);
};

const clearCollections = async () => {
    await Booking.deleteMany({});
    await Match.deleteMany({});
    await Restaurant.deleteMany({});
    await Emergency.deleteMany({});
    await Hotel.deleteMany({});
    await Stadium.deleteMany({});
    await City.deleteMany({});
    await User.deleteMany({});
};

const main = async () => {
    let connectionOpened = false;

    try {
        const { cities, mockHotels, mockStadiums, mockRestaurants, mockMatches, mockEmergency } = await importFrontendData();

        await connectDB();
        connectionOpened = true;

        await clearCollections();

        const cityMap = await seedCities(cities, mockStadiums, mockHotels, mockMatches);
        const { stadiumMap, stadiumsByCity } = await seedStadiums(mockStadiums, cityMap);
        await seedHotels(mockHotels, cityMap, stadiumMap, stadiumsByCity);
        await seedRestaurants(mockRestaurants, stadiumMap);
        await seedMatches(mockMatches, cityMap, stadiumMap);
        await seedEmergency(mockEmergency);
        await seedUsers();

        // eslint-disable-next-line no-console
        console.log("Seed completed successfully");
        // eslint-disable-next-line no-console
        console.log(`Cities seeded: ${cityMap.size}`);
        // eslint-disable-next-line no-console
        console.log(`Stadiums seeded: ${mockStadiums.length}`);
        // eslint-disable-next-line no-console
        console.log(`Hotels seeded: ${mockHotels.length}`);
        // eslint-disable-next-line no-console
        console.log(`Restaurants seeded: ${mockRestaurants.length}`);
        // eslint-disable-next-line no-console
        console.log(`Matches seeded: ${mockMatches.length}`);
        // eslint-disable-next-line no-console
        console.log("Emergency documents seeded: 1");
        // eslint-disable-next-line no-console
        console.log("Users seeded: 2");
    } catch (error) {
        // eslint-disable-next-line no-console
        console.error("Seeding failed:", error.message);
        process.exitCode = 1;
    } finally {
        if (connectionOpened && mongoose.connection.readyState !== 0) {
            await mongoose.disconnect();
        }
    }
};

if (require.main === module) {
    main();
}

module.exports = {
    main,
};
