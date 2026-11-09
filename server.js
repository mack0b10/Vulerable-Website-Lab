
const express = require("express");
const path = require("path");

const app = express();
const PORT = 3000;

// Serve our website files from the public folder
app.use(express.static(path.join(__dirname, "public")));

// Start the server locally
app.listen(PORT, "127.0.0.1", () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
