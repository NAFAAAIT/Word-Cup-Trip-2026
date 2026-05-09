const mongoose = require("mongoose");

const restaurantSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Restaurant name is required"],
            trim: true,
            index: true,
        },
        city: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "City",
            required: [true, "City reference is required"],
            index: true,
        },
        stadium: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Stadium",
            default: null,
            index: true,
        },
        country: {
            type: String,
            trim: true,
            default: null,
        },
        cuisine: {
            type: String,
            trim: true,
            default: null,
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
        rating: {
            type: Number,
            min: 0,
            max: 5,
            default: null,
        },
        distance: {
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

module.exports = mongoose.model("Restaurant", restaurantSchema);
