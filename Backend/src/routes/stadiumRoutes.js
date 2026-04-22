const express = require("express");
const {
    getStadiums,
    getStadiumById,
    createStadium,
    updateStadium,
    deleteStadium,
} = require("../controllers/stadiumController");
const { protect, authorize } = require("../middleware/authMiddleware");
const validateObjectId = require("../middleware/validateObjectId");

const router = express.Router();

router.get("/", getStadiums);
router.get("/:id", validateObjectId("id"), getStadiumById);

router.post("/", protect, authorize("admin"), createStadium);
router.put("/:id", protect, authorize("admin"), validateObjectId("id"), updateStadium);
router.delete("/:id", protect, authorize("admin"), validateObjectId("id"), deleteStadium);

module.exports = router;
