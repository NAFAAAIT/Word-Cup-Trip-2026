const Transport = require('../models/Transport');
const ApiError = require('../utils/ApiError');
const asyncHandler = require('../utils/asyncHandler');
const sanitizePayload = require('../utils/sanitizePayload');

const toTransportCard = (t) => ({
    id: t._id,
    routeId: t.routeId,
    type: t.type,
    destination: t.destination,
    frequency: t.frequency,
    status: t.status,
    note: t.note,
    createdAt: t.createdAt,
    updatedAt: t.updatedAt,
});

const getTransports = asyncHandler(async (req, res) => {
    const { limit = 100, page = 1 } = req.query;
    const safeLimit = Math.min(Number(limit) || 100, 200);
    const safePage = Math.max(Number(page) || 1, 1);
    const skip = (safePage - 1) * safeLimit;

    const [rows, total] = await Promise.all([
        Transport.find({}).sort({ createdAt: -1 }).skip(skip).limit(safeLimit),
        Transport.countDocuments({}),
    ]);

    return res.status(200).json({ success: true, count: rows.length, total, data: rows.map(toTransportCard) });
});

const getTransportById = asyncHandler(async (req, res) => {
    const t = await Transport.findById(req.params.id);
    if (!t) throw new ApiError(404, 'Transport not found');
    return res.status(200).json({ success: true, data: toTransportCard(t) });
});

const createTransport = asyncHandler(async (req, res) => {
    const payload = sanitizePayload(req.body);

    if (!payload.routeId || !payload.type || !payload.destination) {
        throw new ApiError(400, 'routeId, type and destination are required');
    }

    const created = await Transport.create(payload);
    return res.status(201).json({ success: true, data: toTransportCard(created) });
});

const updateTransport = asyncHandler(async (req, res) => {
    const payload = sanitizePayload(req.body);

    const t = await Transport.findByIdAndUpdate(req.params.id, payload, { new: true, runValidators: true });
    if (!t) throw new ApiError(404, 'Transport not found');

    return res.status(200).json({ success: true, data: toTransportCard(t) });
});

const deleteTransport = asyncHandler(async (req, res) => {
    const t = await Transport.findByIdAndDelete(req.params.id);
    if (!t) throw new ApiError(404, 'Transport not found');
    return res.status(200).json({ success: true, message: 'Transport deleted' });
});

module.exports = {
    getTransports,
    getTransportById,
    createTransport,
    updateTransport,
    deleteTransport,
};
