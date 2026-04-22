const User = require("../models/User");
const ApiError = require("../utils/ApiError");
const asyncHandler = require("../utils/asyncHandler");
const sanitizePayload = require("../utils/sanitizePayload");
const { signToken } = require("../utils/token");

const issueTokenResponse = (res, user, statusCode = 200) => {
    const token = signToken({ id: user._id, role: user.role });
    const shouldSetCookie = String(process.env.USE_AUTH_COOKIE).toLowerCase() === "true";

    if (shouldSetCookie) {
        const cookieName = process.env.AUTH_COOKIE_NAME || "wc_trip_token";
        const isProduction = process.env.NODE_ENV === "production";

        res.cookie(cookieName, token, {
            httpOnly: true,
            secure: isProduction,
            sameSite: isProduction ? "none" : "lax",
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });
    }

    return res.status(statusCode).json({
        success: true,
        token,
        user: {
            id: user._id,
            fullName: user.fullName,
            email: user.email,
            role: user.role,
            avatarUrl: user.avatarUrl,
        },
    });
};

const register = asyncHandler(async (req, res) => {
    const payload = sanitizePayload(req.body);

    if (!payload.fullName || !payload.email || !payload.password) {
        throw new ApiError(400, "fullName, email and password are required");
    }

    const existing = await User.findOne({ email: payload.email.toLowerCase() });
    if (existing) {
        throw new ApiError(409, "Email is already registered");
    }

    const user = await User.create({
        fullName: payload.fullName,
        email: payload.email,
        password: payload.password,
        avatarUrl: payload.avatarUrl || null,
        role: payload.role === "admin" ? "admin" : "user",
    });

    return issueTokenResponse(res, user, 201);
});

const login = asyncHandler(async (req, res) => {
    const payload = sanitizePayload(req.body);

    if (!payload.email || !payload.password) {
        throw new ApiError(400, "email and password are required");
    }

    const user = await User.findOne({ email: payload.email.toLowerCase() }).select("+password");
    if (!user) {
        throw new ApiError(401, "Invalid credentials");
    }

    const isMatch = await user.comparePassword(payload.password);
    if (!isMatch) {
        throw new ApiError(401, "Invalid credentials");
    }

    return issueTokenResponse(res, user);
});

const getMe = asyncHandler(async (req, res) => {
    return res.status(200).json({
        success: true,
        user: {
            id: req.user._id,
            fullName: req.user.fullName,
            email: req.user.email,
            role: req.user.role,
            avatarUrl: req.user.avatarUrl,
        },
    });
});

const logout = asyncHandler(async (req, res) => {
    const cookieName = process.env.AUTH_COOKIE_NAME || "wc_trip_token";
    res.clearCookie(cookieName);

    return res.status(200).json({
        success: true,
        message: "Logged out successfully",
    });
});

module.exports = {
    register,
    login,
    getMe,
    logout,
};
