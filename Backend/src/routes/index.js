const express = require("express");

const authRoutes = require("./authRoutes");
const stadiumRoutes = require("./stadiumRoutes");
const hotelRoutes = require("./hotelRoutes");
const cityRoutes = require("./cityRoutes");
const bookingRoutes = require("./bookingRoutes");

const router = express.Router();

router.use("/auth", authRoutes);
router.use("/stadiums", stadiumRoutes);
router.use("/hotels", hotelRoutes);
router.use("/cities", cityRoutes);
router.use("/bookings", bookingRoutes);

module.exports = router;
