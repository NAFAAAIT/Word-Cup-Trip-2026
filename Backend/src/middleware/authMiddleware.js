const User = require("../models/User");
const ApiError = require("../utils/ApiError");
const asyncHandler = require("../utils/asyncHandler");
const { verifyToken } = require("../utils/token");

const extractToken = (req) => {
    const authHeader = req.headers.authorization;

    if (authHeader && authHeader.startsWith("Bearer ")) {
        return authHeader.split(" ")[1];
    }

    const cookieName = process.env.AUTH_COOKIE_NAME || "wc_trip_token";
    if (req.cookies && req.cookies[cookieName]) {
        return req.cookies[cookieName];
    }

    return null;
};

const protect = asyncHandler(async (req, res, next) => {
    const token = extractToken(req);

    if (!token) {
        throw new ApiError(401, "Not authorized: token missing");
    }

    try {
        const decoded = verifyToken(token);
        const user = await User.findById(decoded.id).select("-password");

        if (!user) {
            throw new ApiError(401, "Not authorized: user no longer exists");
        }

        req.user = user;
        next();
    } catch (error) {
        throw new ApiError(401, "Not authorized: invalid or expired token");
    }
});

const authorize = (...roles) => (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
        return next(new ApiError(403, "Forbidden: insufficient permissions"));
    }

    next();
};

module.exports = {
    protect,
    authorize,
};
