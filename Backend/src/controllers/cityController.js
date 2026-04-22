const City = require("../models/City");
const ApiError = require("../utils/ApiError");
const asyncHandler = require("../utils/asyncHandler");
const sanitizePayload = require("../utils/sanitizePayload");

const getCities = asyncHandler(async (req, res) => {
    const { country, q } = req.query;
    const filter = {};

    if (country) {
        filter.country = country;
    }

    if (q) {
        filter.$or = [
            { name: { $regex: q, $options: "i" } },
            { country: { $regex: q, $options: "i" } },
        ];
    }

    const cities = await City.find(filter).sort({ country: 1, name: 1 });

    return res.status(200).json({
        success: true,
        count: cities.length,
        data: cities,
    });
});

const getCityById = asyncHandler(async (req, res) => {
    const city = await City.findById(req.params.id);

    if (!city) {
        throw new ApiError(404, "City not found");
    }

    return res.status(200).json({ success: true, data: city });
});

const createCity = asyncHandler(async (req, res) => {
    const payload = sanitizePayload(req.body);

    if (!payload.name || !payload.country) {
        throw new ApiError(400, "name and country are required");
    }

    const created = await City.create(payload);
    return res.status(201).json({ success: true, data: created });
});

const updateCity = asyncHandler(async (req, res) => {
    const payload = sanitizePayload(req.body);
    const city = await City.findByIdAndUpdate(req.params.id, payload, {
        new: true,
        runValidators: true,
    });

    if (!city) {
        throw new ApiError(404, "City not found");
    }

    return res.status(200).json({ success: true, data: city });
});

const deleteCity = asyncHandler(async (req, res) => {
    const city = await City.findByIdAndDelete(req.params.id);

    if (!city) {
        throw new ApiError(404, "City not found");
    }

    return res.status(200).json({ success: true, message: "City deleted" });
});

module.exports = {
    getCities,
    getCityById,
    createCity,
    updateCity,
    deleteCity,
};
