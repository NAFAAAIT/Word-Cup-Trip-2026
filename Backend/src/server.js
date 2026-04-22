require("dotenv").config();

const app = require("./app");
const connectDB = require("./config/db");

const PORT = process.env.PORT || 5000;
let server;

const startServer = async () => {
    try {
        await connectDB();
        server = app.listen(PORT, () => {
            // eslint-disable-next-line no-console
            console.log(`Server running on port ${PORT}`);
        });
    } catch (error) {
        // eslint-disable-next-line no-console
        console.error("Failed to start server", error.message);
        process.exit(1);
    }
};

process.on("unhandledRejection", (reason) => {
    // eslint-disable-next-line no-console
    console.error("Unhandled promise rejection:", reason);

    if (server) {
        server.close(() => process.exit(1));
        return;
    }

    process.exit(1);
});

process.on("SIGINT", () => {
    // eslint-disable-next-line no-console
    console.log("SIGINT received, shutting down gracefully...");

    if (server) {
        server.close(() => process.exit(0));
        return;
    }

    process.exit(0);
});

startServer();
