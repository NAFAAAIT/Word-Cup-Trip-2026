const Stadium = require("../models/Stadium");
const ApiError = require("../utils/ApiError");
const asyncHandler = require("../utils/asyncHandler");
const sanitizePayload = require("../utils/sanitizePayload");

const toStadiumCard = (stadium) => ({
    id: stadium._id,
    name: stadium.name,
    city: stadium.city?.name || null,
    cityId: stadium.city?._id || null,
    country: stadium.country || stadium.city?.country || null,
    description: stadium.description,
    image: stadium.image,
    capacity: stadium.capacity,
    matches: stadium.matches || 0,
    location: stadium.location,
    amenities: stadium.amenities || [],
    createdAt: stadium.createdAt,
    updatedAt: stadium.updatedAt,
});

const getStadiums = asyncHandler(async (req, res) => {
    const { country, cityId, q, limit = 50, page = 1 } = req.query;
    const filter = {};

    if (country) {
        filter.country = country;
    }

    if (cityId) {
        filter.city = cityId;
    }

    if (q) {
        filter.name = { $regex: q, $options: "i" };
    }

    const safeLimit = Math.min(Number(limit) || 50, 100);
    const safePage = Math.max(Number(page) || 1, 1);
    const skip = (safePage - 1) * safeLimit;

    const [stadiums, total] = await Promise.all([
        Stadium.find(filter)
            .populate("city", "name country")
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(safeLimit),
        Stadium.countDocuments(filter),
    ]);

    return res.status(200).json({
        success: true,
        count: stadiums.length,
        total,
        page: safePage,
        limit: safeLimit,
        data: stadiums.map(toStadiumCard),
    });
});

const getStadiumById = asyncHandler(async (req, res) => {
    const stadium = await Stadium.findById(req.params.id).populate("city", "name country");

    if (!stadium) {
        throw new ApiError(404, "Stadium not found");
    }

    return res.status(200).json({ success: true, data: toStadiumCard(stadium) });
});

const createStadium = asyncHandler(async (req, res) => {
    const payload = sanitizePayload(req.body);

    if (!payload.name || !payload.city) {
        throw new ApiError(400, "name and city are required");
    }

    const created = await Stadium.create(payload);
    const populated = await Stadium.findById(created._id).populate("city", "name country");

    return res.status(201).json({ success: true, data: toStadiumCard(populated) });
});

const updateStadium = asyncHandler(async (req, res) => {
    const payload = sanitizePayload(req.body);

    const stadium = await Stadium.findByIdAndUpdate(req.params.id, payload, {
        new: true,
        runValidators: true,
    }).populate("city", "name country");

    if (!stadium) {
        throw new ApiError(404, "Stadium not found");
    }

    return res.status(200).json({ success: true, data: toStadiumCard(stadium) });
});

const deleteStadium = asyncHandler(async (req, res) => {
    const stadium = await Stadium.findByIdAndDelete(req.params.id);

    if (!stadium) {
        throw new ApiError(404, "Stadium not found");
    }

    return res.status(200).json({ success: true, message: "Stadium deleted" });
});

module.exports = {
    getStadiums,
    getStadiumById,
    createStadium,
    updateStadium,
    deleteStadium,
};
