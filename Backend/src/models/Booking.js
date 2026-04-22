const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: [true, "User reference is required"],
            index: true,
        },
        bookingType: {
            type: String,
            enum: ["hotel", "stadium", "transport", "other"],
            default: "hotel",
        },
        hotel: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Hotel",
            default: null,
        },
        stadium: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Stadium",
            default: null,
        },
        city: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "City",
            default: null,
        },
        checkInDate: {
            type: Date,
            default: null,
        },
        checkOutDate: {
            type: Date,
            default: null,
        },
        guests: {
            type: Number,
            min: 1,
            default: 1,
        },
        notes: {
            type: String,
            trim: true,
            default: null,
        },
        status: {
            type: String,
            enum: ["pending", "confirmed", "cancelled"],
            default: "pending",
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Booking", bookingSchema);
