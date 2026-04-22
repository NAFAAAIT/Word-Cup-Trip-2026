const express = require("express");
const {
    getHotels,
    getHotelById,
    createHotel,
    updateHotel,
    deleteHotel,
} = require("../controllers/hotelController");
const { protect, authorize } = require("../middleware/authMiddleware");
const validateObjectId = require("../middleware/validateObjectId");

const router = express.Router();

router.get("/", getHotels);
router.get("/:id", validateObjectId("id"), getHotelById);

router.post("/", protect, authorize("admin"), createHotel);
router.put("/:id", protect, authorize("admin"), validateObjectId("id"), updateHotel);
router.delete("/:id", protect, authorize("admin"), validateObjectId("id"), deleteHotel);

module.exports = router;
