const express = require("express");
const {
    getEmergency,
    upsertEmergency,
    deleteEmergency,
} = require("../controllers/emergencyController");
const { protect, authorize } = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", getEmergency);
router.put("/", protect, authorize("admin"), upsertEmergency);
router.delete("/", protect, authorize("admin"), deleteEmergency);

module.exports = router;
