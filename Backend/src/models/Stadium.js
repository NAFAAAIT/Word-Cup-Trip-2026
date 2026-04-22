const mongoose = require("mongoose");

const stadiumSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Stadium name is required"],
            trim: true,
            index: true,
        },
        city: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "City",
            required: [true, "City reference is required"],
            index: true,
        },
        country: {
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
        capacity: {
            type: Number,
            min: 0,
            default: null,
        },
        matches: {
            type: Number,
            min: 0,
            default: 0,
        },
        location: {
            lat: { type: Number, default: null },
            lng: { type: Number, default: null },
            address: { type: String, trim: true, default: null },
        },
        amenities: {
            type: [String],
            default: [],
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Stadium", stadiumSchema);
