const express = require("express");
const {
    getMatches,
    getMatchById,
    createMatch,
    updateMatch,
    deleteMatch,
} = require("../controllers/matchController");
const { protect, authorize } = require("../middleware/authMiddleware");
const validateObjectId = require("../middleware/validateObjectId");

const router = express.Router();

router.get("/", getMatches);
router.get("/:id", validateObjectId("id"), getMatchById);

router.post("/", protect, authorize("admin"), createMatch);
router.put("/:id", protect, authorize("admin"), validateObjectId("id"), updateMatch);
router.delete("/:id", protect, authorize("admin"), validateObjectId("id"), deleteMatch);

module.exports = router;
