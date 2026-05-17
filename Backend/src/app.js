const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const path = require("path");

const routes = require("./routes");
const uploadRoutes = require("./routes/uploadRoutes");
const notFound = require("./middleware/notFoundMiddleware");
const errorHandler = require("./middleware/errorMiddleware");

const app = express();

const allowedOrigins = new Set(
    String(process.env.CLIENT_ORIGINS || process.env.CLIENT_ORIGIN || "http://localhost:5173")
        .split(",")
        .map((origin) => origin.trim())
        .filter(Boolean)
);

const isAllowedOrigin = (origin) => {
    if (!origin) {
        return true;
    }

    if (allowedOrigins.has(origin)) {
        return true;
    }

    try {
        const parsed = new URL(origin);
        return parsed.hostname.endsWith(".vercel.app");
    } catch {
        return false;
    }
};

const corsOptions = {
    origin(origin, callback) {
        if (isAllowedOrigin(origin)) {
            callback(null, true);
            return;
        }

        callback(new Error(`CORS blocked for origin: ${origin}`));
    },
    credentials: true,
};

app.use(helmet());
app.use(cors(corsOptions));
app.use(morgan(process.env.NODE_ENV === "production" ? "combined" : "dev"));
app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get("/api/health", (req, res) => {
    res.status(200).json({ success: true, message: "API is healthy" });
});

app.use("/uploads", express.static(path.join(__dirname, "..", "uploads")));
app.use("/api/uploads", uploadRoutes);
app.use("/api", routes);
app.use(notFound);
app.use(errorHandler);

module.exports = app;
