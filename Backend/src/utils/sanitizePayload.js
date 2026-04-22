const sanitizePayload = (payload) => {
    if (!payload || typeof payload !== "object") {
        return {};
    }

    return Object.entries(payload).reduce((acc, [key, value]) => {
        if (value === undefined) {
            return acc;
        }

        if (typeof value === "string") {
            const trimmed = value.trim();
            acc[key] = trimmed === "" ? null : trimmed;
            return acc;
        }

        acc[key] = value;
        return acc;
    }, {});
};

module.exports = sanitizePayload;
