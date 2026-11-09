
const express = require("express");
const path = require("path");
const fs = require("fs");

const app = express();
const PORT = 3000;

// Read JSON requests
app.use(express.json());

// Serve website files
app.use(express.static(path.join(__dirname, "public")));

// Create logs folder if it doesn't exist
const logsDirectory = path.join(__dirname, "logs");

if (!fs.existsSync(logsDirectory)) {
    fs.mkdirSync(logsDirectory);
}

const logFile = path.join(logsDirectory, "security.log");


const failedAttempts = new Map();
const WINDOW_MS = 60 * 1000;

// Detect repeated failed logins
function detectSuspiciousLogin(username, success) {
    const now = Date.now();

    if (success) {
        failedAttempts.delete(username);
        return;
    }

    const attempts = (failedAttempts.get(username) || [])
        .filter(time => now - time < WINDOW_MS);

    attempts.push(now);
    failedAttempts.set(username, attempts);

    if (attempts.length === 3) {
        console.warn(
            `[WARNING] 3 failed login attempts for ${username}`
        );
    }

    if (attempts.length === 5) {
        console.warn(
            `[HIGH ALERT] 5 failed login attempts for ${username}`
        );
    }
}


// Record a security event
function logSecurityEvent(username, success) {
    const timestamp = new Date().toISOString();

    const event = {
        timestamp: timestamp,
        event: "LOGIN_ATTEMPT",
        username: username,
        success: success
    };

    fs.appendFileSync(
        logFile,
        JSON.stringify(event) + "\n"
    );

    console.log("[SECURITY EVENT]", event);
}

// Fictional test account
const testUser = {
    username: "admin",
    password: "lab123"
};

// Handle login requests
app.post("/login", (req, res) => {
    const { username, password } = req.body || {};

    const success =
        username === testUser.username &&
        password === testUser.password;

    logSecurityEvent(
        typeof username === "string" ? username : "unknown",
        success
    );
    detectSuspiciousLogin(
    typeof username === "string" ? username : "unknown",
    success
);

    if (success) {
        return res.json({
            success: true,
            message: "Login successful!"
        });
    }

    res.status(401).json({
        success: false,
        message: "Invalid username or password."
    });
});

// Start server locally

app.listen(PORT, "10.0.0.12", () => {
    console.log(`Lab server running at http://10.0.0.12:${PORT}`);
});
