const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            trim: true,
            default: null,
        },
        number: {
            type: String,
            trim: true,
            default: null,
        },
        desc: {
            type: String,
            trim: true,
            default: null,
        },
    },
    { _id: false }
);

const hospitalSchema = new mongoose.Schema(
    {
        id: {
            type: String,
            trim: true,
            default: null,
        },
        name: {
            type: String,
            trim: true,
            default: null,
        },
        distance: {
            type: String,
            trim: true,
            default: null,
        },
        time: {
            type: String,
            trim: true,
            default: null,
        },
        phone: {
            type: String,
            trim: true,
            default: null,
        },
    },
    { _id: false }
);

const emergencySchema = new mongoose.Schema(
    {
        key: {
            type: String,
            required: [true, "Emergency key is required"],
            unique: true,
            trim: true,
            default: "global",
        },
        contacts: {
            police: contactSchema,
            ambulance: contactSchema,
            fire: contactSchema,
        },
        hospitals: {
            type: [hospitalSchema],
            default: [],
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Emergency", emergencySchema);
