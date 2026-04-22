const mongoose = require("mongoose");
const ApiError = require("../utils/ApiError");

const validateObjectId = (paramName = "id") => (req, res, next) => {
    const id = req.params[paramName];

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return next(new ApiError(400, `Invalid MongoDB ObjectId for parameter '${paramName}'`));
    }

    return next();
};

module.exports = validateObjectId;
