const express = require("express");
const {
    getCities,
    getCityById,
    createCity,
    updateCity,
    deleteCity,
} = require("../controllers/cityController");
const { protect, authorize } = require("../middleware/authMiddleware");
const validateObjectId = require("../middleware/validateObjectId");

const router = express.Router();

router.get("/", getCities);
router.get("/:id", validateObjectId("id"), getCityById);

router.post("/", protect, authorize("admin"), createCity);
router.put("/:id", protect, authorize("admin"), validateObjectId("id"), updateCity);
router.delete("/:id", protect, authorize("admin"), validateObjectId("id"), deleteCity);

module.exports = router;
