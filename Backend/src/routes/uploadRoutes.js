const express = require("express");
const path = require("path");
const multer = require("multer");
const { protect, authorize } = require("../middleware/authMiddleware");

const router = express.Router();
const uploadDir = path.join(__dirname, "..", "..", "uploads");

const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, uploadDir),
    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname || "").toLowerCase() || ".png";
        const safeExt = ext.startsWith(".") ? ext : `.${ext}`;
        cb(null, `${Date.now()}-${Math.random().toString(36).slice(2, 10)}${safeExt}`);
    },
});

const upload = multer({
    storage,
    limits: {
        fileSize: 5 * 1024 * 1024,
    },
    fileFilter: (req, file, cb) => {
        if (!file.mimetype || !file.mimetype.startsWith("image/")) {
            return cb(new Error("Only image uploads are allowed"));
        }
        cb(null, true);
    },
});

router.post("/", protect, authorize("admin"), upload.single("file"), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ success: false, message: "No file uploaded" });
    }

    const publicUrl = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;

    return res.status(201).json({
        success: true,
        url: publicUrl,
        fileName: req.file.filename,
    });
});

module.exports = router;
