const Restaurant = require("../models/Restaurant");
const ApiError = require("../utils/ApiError");
const asyncHandler = require("../utils/asyncHandler");
const sanitizePayload = require("../utils/sanitizePayload");

const toRestaurantCard = (restaurant) => ({
    id: restaurant._id,
    name: restaurant.name,
    city: restaurant.city?.name || null,
    cityId: restaurant.city?._id || null,
    country: restaurant.city?.country || restaurant.country || null,
    stadiumId: restaurant.stadium?._id || null,
    stadiumName: restaurant.stadium?.name || null,
    cuisine: restaurant.cuisine,
    description: restaurant.description,
    image: restaurant.image,
    rating: restaurant.rating,
    distance: restaurant.distance,
    tags: restaurant.tags || [],
    createdAt: restaurant.createdAt,
    updatedAt: restaurant.updatedAt,
});

const getRestaurants = asyncHandler(async (req, res) => {
    const {
        cityId,
        stadiumId,
        country,
        cuisine,
        q,
        limit = 50,
        page = 1,
        sortBy = "recommended",
    } = req.query;

    const filter = {};

    if (cityId) {
        filter.city = cityId;
    }

    if (stadiumId) {
        filter.stadium = stadiumId;
    }

    if (country) {
        filter.country = country;
    }

    if (cuisine) {
        filter.cuisine = cuisine;
    }

    if (q) {
        filter.$or = [
            { name: { $regex: q, $options: "i" } },
            { description: { $regex: q, $options: "i" } },
            { cuisine: { $regex: q, $options: "i" } },
        ];
    }

    const safeLimit = Math.min(Number(limit) || 50, 100);
    const safePage = Math.max(Number(page) || 1, 1);
    const skip = (safePage - 1) * safeLimit;

    let sort = { createdAt: -1 };
    if (sortBy === "rating_high") sort = { rating: -1 };
    if (sortBy === "rating_low") sort = { rating: 1 };

    const [restaurants, total] = await Promise.all([
        Restaurant.find(filter)
            .populate("city", "name country")
            .populate("stadium", "name")
            .sort(sort)
            .skip(skip)
            .limit(safeLimit),
        Restaurant.countDocuments(filter),
    ]);

    return res.status(200).json({
        success: true,
        count: restaurants.length,
        total,
        page: safePage,
        limit: safeLimit,
        data: restaurants.map(toRestaurantCard),
    });
});

const getRestaurantById = asyncHandler(async (req, res) => {
    const restaurant = await Restaurant.findById(req.params.id)
        .populate("city", "name country")
        .populate("stadium", "name");

    if (!restaurant) {
        throw new ApiError(404, "Restaurant not found");
    }

    return res.status(200).json({ success: true, data: toRestaurantCard(restaurant) });
});

const createRestaurant = asyncHandler(async (req, res) => {
    const payload = sanitizePayload(req.body);

    if (!payload.name || !payload.city) {
        throw new ApiError(400, "name and city are required");
    }

    const created = await Restaurant.create(payload);
    const populated = await Restaurant.findById(created._id)
        .populate("city", "name country")
        .populate("stadium", "name");

    return res.status(201).json({ success: true, data: toRestaurantCard(populated) });
});

const updateRestaurant = asyncHandler(async (req, res) => {
    const payload = sanitizePayload(req.body);

    const restaurant = await Restaurant.findByIdAndUpdate(req.params.id, payload, {
        new: true,
        runValidators: true,
    })
        .populate("city", "name country")
        .populate("stadium", "name");

    if (!restaurant) {
        throw new ApiError(404, "Restaurant not found");
    }

    return res.status(200).json({ success: true, data: toRestaurantCard(restaurant) });
});

const deleteRestaurant = asyncHandler(async (req, res) => {
    const restaurant = await Restaurant.findByIdAndDelete(req.params.id);

    if (!restaurant) {
        throw new ApiError(404, "Restaurant not found");
    }

    return res.status(200).json({ success: true, message: "Restaurant deleted" });
});

module.exports = {
    getRestaurants,
    getRestaurantById,
    createRestaurant,
    updateRestaurant,
    deleteRestaurant,
};
