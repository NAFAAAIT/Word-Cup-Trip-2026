const express = require("express");
const {
    getRestaurants,
    getRestaurantById,
    createRestaurant,
    updateRestaurant,
    deleteRestaurant,
} = require("../controllers/restaurantController");
const { protect, authorize } = require("../middleware/authMiddleware");
const validateObjectId = require("../middleware/validateObjectId");

const router = express.Router();

router.get("/", getRestaurants);
router.get("/:id", validateObjectId("id"), getRestaurantById);

router.post("/", protect, authorize("admin"), createRestaurant);
router.put("/:id", protect, authorize("admin"), validateObjectId("id"), updateRestaurant);
router.delete("/:id", protect, authorize("admin"), validateObjectId("id"), deleteRestaurant);

module.exports = router;
