const jwt = require("jsonwebtoken");

const signToken = (payload) => {
    const secret = process.env.JWT_SECRET;
    const expiresIn = process.env.JWT_EXPIRES_IN || "7d";

    if (!secret) {
        throw new Error("JWT_SECRET is not configured");
    }

    return jwt.sign(payload, secret, { expiresIn });
};

const verifyToken = (token) => jwt.verify(token, process.env.JWT_SECRET);

module.exports = {
    signToken,
    verifyToken,
};
