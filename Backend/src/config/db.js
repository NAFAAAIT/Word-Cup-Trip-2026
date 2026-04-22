const mongoose = require("mongoose");
const dns = require("dns");

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const configureDnsServers = () => {
    const dnsServers = process.env.DB_DNS_SERVERS;
    if (!dnsServers) {
        return;
    }

    const servers = dnsServers
        .split(",")
        .map((server) => server.trim())
        .filter(Boolean);

    if (servers.length === 0) {
        return;
    }

    dns.setServers(servers);
};

const connectDB = async () => {
    const dbUrl = process.env.DB_URL;

    if (!dbUrl) {
        throw new Error("DB_URL is not configured in environment variables");
    }

    configureDnsServers();

    const retries = Number(process.env.DB_CONNECT_RETRIES || 3);
    const retryDelayMs = Number(process.env.DB_CONNECT_RETRY_DELAY_MS || 2000);

    let lastError;

    for (let attempt = 1; attempt <= retries; attempt += 1) {
        try {
            await mongoose.connect(dbUrl, {
                serverSelectionTimeoutMS: 15000,
                socketTimeoutMS: 45000,
                family: 4,
            });
            // eslint-disable-next-line no-console
            console.log("MongoDB connected");
            return;
        } catch (error) {
            lastError = error;

            if (attempt < retries) {
                // eslint-disable-next-line no-console
                console.warn(
                    `MongoDB connection attempt ${attempt}/${retries} failed: ${error.message}`
                );
                await wait(retryDelayMs);
            }
        }
    }

    const hint =
        "Atlas DNS lookup timed out. Set DB_DNS_SERVERS=8.8.8.8,1.1.1.1 or use a non-SRV mongodb:// URI from Atlas Driver settings.";
    throw new Error(`${lastError.message}. ${hint}`);
};

module.exports = connectDB;
