require("dotenv").config(); // ← must be first — loads .env before any other imports
const express = require("express");
const cors = require("cors");
const app = express();
const routes = require("./app/routes/routes");
const bodyParser = require("body-parser");
const path = require("path");
var multer = require("multer");
var async = require("async");
const compression = require("compression");

app.set("view engine", "ejs");

// ── CORS — allow any origin (Vercel frontend, localhost dev) ──────────────────
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "Accept"],
  })
);
app.options("*", cors());

// ── Body parsers ──────────────────────────────────────────────────────────────
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ parameterLimit: 100000, limit: "50mb", extended: true }));
app.use(compression());
app.use(express.static(path.join(__dirname, "./uploads")));

// ── File uploads ──────────────────────────────────────────────────────────────
app.use(multer({ dest: __dirname + "/uploads/" }).any());

// ── Routes ────────────────────────────────────────────────────────────────────
app.use(routes);

app.get("/", (req, res) => {
  res.send("Dental Care API is running!");
});

app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok", uptime: process.uptime(), timestamp: new Date().toISOString() });
});

const PORT = process.env.PORT || 5000;

// For Vercel serverless — export app
module.exports = app;

// For local dev / Back4App / traditional servers — start listener
if (process.env.NODE_ENV !== "production" || process.env.START_SERVER === "true") {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}
