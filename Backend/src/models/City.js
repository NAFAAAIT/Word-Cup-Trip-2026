const mongoose = require("mongoose");

const citySchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "City name is required"],
            trim: true,
            index: true,
        },
        country: {
            type: String,
            required: [true, "Country is required"],
            trim: true,
            index: true,
        },
        description: {
            type: String,
            trim: true,
            default: null,
        },
        image: {
            type: String,
            trim: true,
            default: null,
        },
        timezone: {
            type: String,
            trim: true,
            default: null,
        },
        tags: {
            type: [String],
            default: [],
        },
    },
    {
        timestamps: true,
    }
);

citySchema.index({ name: 1, country: 1 }, { unique: true });

module.exports = mongoose.model("City", citySchema);
