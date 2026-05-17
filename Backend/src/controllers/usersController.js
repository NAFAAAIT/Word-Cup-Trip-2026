const User = require("../models/User");
const ApiError = require("../utils/ApiError");
const asyncHandler = require("../utils/asyncHandler");
const sanitizePayload = require("../utils/sanitizePayload");

const serializeUser = (user) => ({
    id: user._id,
    fullName: user.fullName,
    email: user.email,
    role: user.role,
    avatarUrl: user.avatarUrl,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
});

const getUsers = asyncHandler(async (req, res) => {
    const users = await User.find({}).sort({ createdAt: -1 });

    return res.status(200).json({
        success: true,
        count: users.length,
        data: users.map(serializeUser),
    });
});

const updateUser = asyncHandler(async (req, res) => {
    const payload = sanitizePayload(req.body);
    const updates = {};

    if (typeof payload.fullName === "string" && payload.fullName.trim()) {
        updates.fullName = payload.fullName.trim();
    }

    if (typeof payload.email === "string" && payload.email.trim()) {
        const email = payload.email.trim().toLowerCase();
        const existing = await User.findOne({ email, _id: { $ne: req.params.id } });

        if (existing) {
            throw new ApiError(409, "Email is already registered");
        }

        updates.email = email;
    }

    if (Object.keys(updates).length === 0) {
        throw new ApiError(400, "fullName or email is required");
    }

    const user = await User.findByIdAndUpdate(req.params.id, updates, {
        new: true,
        runValidators: true,
    });

    if (!user) {
        throw new ApiError(404, "User not found");
    }

    return res.status(200).json({
        success: true,
        data: serializeUser(user),
    });
});

const deleteUser = asyncHandler(async (req, res) => {
    if (req.user?._id?.toString() === req.params.id) {
        throw new ApiError(400, "You cannot delete your own account from the admin dashboard");
    }

    const user = await User.findByIdAndDelete(req.params.id);

    if (!user) {
        throw new ApiError(404, "User not found");
    }

    return res.status(200).json({
        success: true,
        message: "User deleted successfully",
    });
});

module.exports = {
    getUsers,
    updateUser,
    deleteUser,
};