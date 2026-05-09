const Emergency = require("../models/Emergency");
const ApiError = require("../utils/ApiError");
const asyncHandler = require("../utils/asyncHandler");
const sanitizePayload = require("../utils/sanitizePayload");

const toEmergencyDocument = (emergency) => ({
    id: emergency._id,
    key: emergency.key,
    contacts: emergency.contacts,
    hospitals: emergency.hospitals || [],
    createdAt: emergency.createdAt,
    updatedAt: emergency.updatedAt,
});

const getEmergency = asyncHandler(async (req, res) => {
    const emergency = await Emergency.findOne().sort({ createdAt: 1 });

    if (!emergency) {
        return res.status(200).json({ success: true, data: null });
    }

    return res.status(200).json({ success: true, data: toEmergencyDocument(emergency) });
});

const upsertEmergency = asyncHandler(async (req, res) => {
    const payload = sanitizePayload(req.body);

    const emergency = await Emergency.findOneAndUpdate(
        { key: payload.key || "global" },
        {
            ...payload,
            key: payload.key || "global",
        },
        {
            new: true,
            upsert: true,
            runValidators: true,
            setDefaultsOnInsert: true,
        }
    );

    return res.status(200).json({ success: true, data: toEmergencyDocument(emergency) });
});

const deleteEmergency = asyncHandler(async (req, res) => {
    const emergency = await Emergency.findOneAndDelete({ key: req.params.key || "global" });

    if (!emergency) {
        throw new ApiError(404, "Emergency document not found");
    }

    return res.status(200).json({ success: true, message: "Emergency document deleted" });
});

module.exports = {
    getEmergency,
    upsertEmergency,
    deleteEmergency,
};
