const Hotel = require("../models/Hotel");
const ApiError = require("../utils/ApiError");
const asyncHandler = require("../utils/asyncHandler");
const sanitizePayload = require("../utils/sanitizePayload");

const toHotelCard = (hotel) => ({
    id: hotel._id,
    name: hotel.name,
    city: hotel.city?.name || null,
    cityId: hotel.city?._id || null,
    country: hotel.city?.country || null,
    stadiumId: hotel.stadium?._id || null,
    stadiumName: hotel.stadium?.name || null,
    description: hotel.description,
    image: hotel.image,
    price: hotel.price,
    rating: hotel.rating,
    reviews: hotel.reviews || 0,
    distance: hotel.distance,
    amenities: hotel.amenities || [],
    deal: hotel.deal,
    createdAt: hotel.createdAt,
    updatedAt: hotel.updatedAt,
});

const getHotels = asyncHandler(async (req, res) => {
    const {
        cityId,
        minRating,
        maxPrice,
        q,
        limit = 50,
        page = 1,
        sortBy = "recommended",
    } = req.query;

    const filter = {};

    if (cityId) {
        filter.city = cityId;
    }

    if (minRating !== undefined) {
        filter.rating = { ...(filter.rating || {}), $gte: Number(minRating) };
    }

    if (maxPrice !== undefined) {
        filter.price = { ...(filter.price || {}), $lte: Number(maxPrice) };
    }

    if (q) {
        filter.$or = [
            { name: { $regex: q, $options: "i" } },
            { description: { $regex: q, $options: "i" } },
        ];
    }

    const safeLimit = Math.min(Number(limit) || 50, 100);
    const safePage = Math.max(Number(page) || 1, 1);
    const skip = (safePage - 1) * safeLimit;

    let sort = { createdAt: -1 };
    if (sortBy === "price_low") sort = { price: 1 };
    if (sortBy === "price_high") sort = { price: -1 };
    if (sortBy === "rating_high") sort = { rating: -1 };

    const [hotels, total] = await Promise.all([
        Hotel.find(filter)
            .populate("city", "name country")
            .populate("stadium", "name")
            .sort(sort)
            .skip(skip)
            .limit(safeLimit),
        Hotel.countDocuments(filter),
    ]);

    return res.status(200).json({
        success: true,
        count: hotels.length,
        total,
        page: safePage,
        limit: safeLimit,
        data: hotels.map(toHotelCard),
    });
});

const getHotelById = asyncHandler(async (req, res) => {
    const hotel = await Hotel.findById(req.params.id)
        .populate("city", "name country")
        .populate("stadium", "name");

    if (!hotel) {
        throw new ApiError(404, "Hotel not found");
    }

    return res.status(200).json({ success: true, data: toHotelCard(hotel) });
});

const createHotel = asyncHandler(async (req, res) => {
    const payload = sanitizePayload(req.body);

    if (!payload.name || !payload.city) {
        throw new ApiError(400, "name and city are required");
    }

    const created = await Hotel.create(payload);
    const populated = await Hotel.findById(created._id)
        .populate("city", "name country")
        .populate("stadium", "name");

    return res.status(201).json({ success: true, data: toHotelCard(populated) });
});

const updateHotel = asyncHandler(async (req, res) => {
    const payload = sanitizePayload(req.body);

    const hotel = await Hotel.findByIdAndUpdate(req.params.id, payload, {
        new: true,
        runValidators: true,
    })
        .populate("city", "name country")
        .populate("stadium", "name");

    if (!hotel) {
        throw new ApiError(404, "Hotel not found");
    }

    return res.status(200).json({ success: true, data: toHotelCard(hotel) });
});

const deleteHotel = asyncHandler(async (req, res) => {
    const hotel = await Hotel.findByIdAndDelete(req.params.id);

    if (!hotel) {
        throw new ApiError(404, "Hotel not found");
    }

    return res.status(200).json({ success: true, message: "Hotel deleted" });
});

module.exports = {
    getHotels,
    getHotelById,
    createHotel,
    updateHotel,
    deleteHotel,
};
