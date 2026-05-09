const mongoose = require("mongoose");

const matchSchema = new mongoose.Schema(
    {
        teamA: {
            type: String,
            required: [true, "teamA is required"],
            trim: true,
        },
        teamB: {
            type: String,
            required: [true, "teamB is required"],
            trim: true,
        },
        flagA: {
            type: String,
            trim: true,
            default: null,
        },
        flagB: {
            type: String,
            trim: true,
            default: null,
        },
        group: {
            type: String,
            trim: true,
            default: null,
        },
        date: {
            type: String,
            trim: true,
            default: null,
        },
        time: {
            type: String,
            trim: true,
            default: null,
        },
        stadium: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Stadium",
            required: [true, "Stadium reference is required"],
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
        type: {
            type: String,
            trim: true,
            default: "Group Stage",
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Match", matchSchema);
