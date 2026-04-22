const Booking = require("../models/Booking");
const ApiError = require("../utils/ApiError");
const asyncHandler = require("../utils/asyncHandler");
const sanitizePayload = require("../utils/sanitizePayload");

const createBooking = asyncHandler(async (req, res) => {
    const payload = sanitizePayload(req.body);

    // Keep payload flexible: only require bookingType at this stage.
    if (!payload.bookingType) {
        payload.bookingType = "hotel";
    }

    const booking = await Booking.create({
        ...payload,
        user: req.user._id,
    });

    const populated = await Booking.findById(booking._id)
        .populate("hotel", "name")
        .populate("stadium", "name")
        .populate("city", "name country")
        .populate("user", "fullName email");

    return res.status(201).json({
        success: true,
        data: populated,
    });
});

const getMyBookings = asyncHandler(async (req, res) => {
    const bookings = await Booking.find({ user: req.user._id })
        .populate("hotel", "name image")
        .populate("stadium", "name image")
        .populate("city", "name country")
        .sort({ createdAt: -1 });

    return res.status(200).json({
        success: true,
        count: bookings.length,
        data: bookings,
    });
});

const getBookingById = asyncHandler(async (req, res) => {
    const booking = await Booking.findById(req.params.id)
        .populate("hotel", "name image")
        .populate("stadium", "name image")
        .populate("city", "name country")
        .populate("user", "fullName email role");

    if (!booking) {
        throw new ApiError(404, "Booking not found");
    }

    const isOwner = booking.user._id.toString() === req.user._id.toString();
    const isAdmin = req.user.role === "admin";

    if (!isOwner && !isAdmin) {
        throw new ApiError(403, "Forbidden: not allowed to access this booking");
    }

    return res.status(200).json({ success: true, data: booking });
});

module.exports = {
    createBooking,
    getMyBookings,
    getBookingById,
};
