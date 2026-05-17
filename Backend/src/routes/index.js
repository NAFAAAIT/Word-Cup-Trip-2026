const express = require("express");

const authRoutes = require("./authRoutes");
const stadiumRoutes = require("./stadiumRoutes");
const hotelRoutes = require("./hotelRoutes");
const restaurantRoutes = require("./restaurantRoutes");
const matchRoutes = require("./matchRoutes");
const emergencyRoutes = require("./emergencyRoutes");
const cityRoutes = require("./cityRoutes");
const bookingRoutes = require("./bookingRoutes");
const userRoutes = require("./userRoutes");
const transportRoutes = require("./transportRoutes");

const router = express.Router();

router.use("/auth", authRoutes);
router.use("/stadiums", stadiumRoutes);
router.use("/hotels", hotelRoutes);
router.use("/restaurants", restaurantRoutes);
router.use("/matches", matchRoutes);
router.use("/emergency", emergencyRoutes);
router.use("/cities", cityRoutes);
router.use("/bookings", bookingRoutes);
router.use("/users", userRoutes);
router.use("/transports", transportRoutes);

module.exports = router;
