const Match = require("../models/Match");
const ApiError = require("../utils/ApiError");
const asyncHandler = require("../utils/asyncHandler");
const sanitizePayload = require("../utils/sanitizePayload");

const toMatchCard = (match) => ({
    id: match._id,
    teamA: match.teamA,
    teamB: match.teamB,
    flagA: match.flagA,
    flagB: match.flagB,
    group: match.group,
    date: match.date,
    time: match.time,
    stadium: match.stadium?.name || null,
    stadiumId: match.stadium?._id || null,
    city: match.city?.name || null,
    cityId: match.city?._id || null,
    country: match.city?.country || match.country || null,
    type: match.type,
    createdAt: match.createdAt,
    updatedAt: match.updatedAt,
});

const getMatches = asyncHandler(async (req, res) => {
    const { cityId, stadiumId, type, q, limit = 100, page = 1 } = req.query;
    const filter = {};

    if (cityId) {
        filter.city = cityId;
    }

    if (stadiumId) {
        filter.stadium = stadiumId;
    }

    if (type) {
        filter.type = type;
    }

    if (q) {
        filter.$or = [
            { teamA: { $regex: q, $options: "i" } },
            { teamB: { $regex: q, $options: "i" } },
            { group: { $regex: q, $options: "i" } },
        ];
    }

    const safeLimit = Math.min(Number(limit) || 100, 100);
    const safePage = Math.max(Number(page) || 1, 1);
    const skip = (safePage - 1) * safeLimit;

    const [matches, total] = await Promise.all([
        Match.find(filter)
            .populate("city", "name country")
            .populate("stadium", "name")
            .sort({ createdAt: 1, _id: 1 })
            .skip(skip)
            .limit(safeLimit),
        Match.countDocuments(filter),
    ]);

    return res.status(200).json({
        success: true,
        count: matches.length,
        total,
        page: safePage,
        limit: safeLimit,
        data: matches.map(toMatchCard),
    });
});

const getMatchById = asyncHandler(async (req, res) => {
    const match = await Match.findById(req.params.id)
        .populate("city", "name country")
        .populate("stadium", "name");

    if (!match) {
        throw new ApiError(404, "Match not found");
    }

    return res.status(200).json({ success: true, data: toMatchCard(match) });
});

const createMatch = asyncHandler(async (req, res) => {
    const payload = sanitizePayload(req.body);

    if (!payload.teamA || !payload.teamB || !payload.city || !payload.stadium) {
        throw new ApiError(400, "teamA, teamB, city and stadium are required");
    }

    const created = await Match.create(payload);
    const populated = await Match.findById(created._id)
        .populate("city", "name country")
        .populate("stadium", "name");

    return res.status(201).json({ success: true, data: toMatchCard(populated) });
});

const updateMatch = asyncHandler(async (req, res) => {
    const payload = sanitizePayload(req.body);

    const match = await Match.findByIdAndUpdate(req.params.id, payload, {
        new: true,
        runValidators: true,
    })
        .populate("city", "name country")
        .populate("stadium", "name");

    if (!match) {
        throw new ApiError(404, "Match not found");
    }

    return res.status(200).json({ success: true, data: toMatchCard(match) });
});

const deleteMatch = asyncHandler(async (req, res) => {
    const match = await Match.findByIdAndDelete(req.params.id);

    if (!match) {
        throw new ApiError(404, "Match not found");
    }

    return res.status(200).json({ success: true, message: "Match deleted" });
});

module.exports = {
    getMatches,
    getMatchById,
    createMatch,
    updateMatch,
    deleteMatch,
};
