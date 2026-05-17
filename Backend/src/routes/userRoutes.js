const express = require("express");
const { getUsers, updateUser, deleteUser } = require("../controllers/usersController");
const { protect, authorize } = require("../middleware/authMiddleware");
const validateObjectId = require("../middleware/validateObjectId");

const router = express.Router();

router.get("/", protect, authorize("admin"), getUsers);
router.put("/:id", protect, authorize("admin"), validateObjectId("id"), updateUser);
router.delete("/:id", protect, authorize("admin"), validateObjectId("id"), deleteUser);

module.exports = router;