const mongoose = require("mongoose");

const hotelSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Hotel name is required"],
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
        price: {
            type: Number,
            min: 0,
            default: null,
        },
        rating: {
            type: Number,
            min: 0,
            max: 5,
            default: null,
        },
        reviews: {
            type: Number,
            min: 0,
            default: 0,
        },
        distance: {
            type: String,
            trim: true,
            default: null,
        },
        amenities: {
            type: [String],
            default: [],
        },
        deal: {
            type: String,
            trim: true,
            default: null,
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Hotel", hotelSchema);
