const express = require("express");
const {
    createBooking,
    getMyBookings,
    getBookingById,
} = require("../controllers/bookingController");
const { protect } = require("../middleware/authMiddleware");
const validateObjectId = require("../middleware/validateObjectId");

const router = express.Router();

router.post("/", protect, createBooking);
router.get("/me", protect, getMyBookings);
router.get("/:id", protect, validateObjectId("id"), getBookingById);

module.exports = router;
