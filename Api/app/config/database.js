require("dotenv").config();
const mysql = require("mysql2");
const fs = require("fs");
const path = require("path");

// Build database configuration supporting connection strings or individual env vars
let poolConfig;

if (process.env.MYSQL_URL || process.env.DATABASE_URL || process.env.MYSQL_PUBLIC_URL) {
  const connectionUrl =
    process.env.MYSQL_URL ||
    process.env.DATABASE_URL ||
    process.env.MYSQL_PUBLIC_URL;
  const parsedUrl = new URL(connectionUrl);
  const isRailwayPublicProxy = /\.proxy\.rlwy\.net$/i.test(parsedUrl.hostname);
  poolConfig = {
    host: parsedUrl.hostname,
    port: parseInt(parsedUrl.port || "3306"),
    user: decodeURIComponent(parsedUrl.username),
    password: decodeURIComponent(parsedUrl.password),
    database: decodeURIComponent(parsedUrl.pathname.replace(/^\//, "")),
    waitForConnections: true,
    connectionLimit: 5,
    maxIdle: 2,
    idleTimeout: 30000,
    queueLimit: 0,
    connectTimeout: 10000,
    enableKeepAlive: true,
    keepAliveInitialDelay: 0,
    ssl:
      !isRailwayPublicProxy && (process.env.DB_SSL === "true" || process.env.MYSQL_SSL === "true")
        ? { rejectUnauthorized: false }
        : undefined,
  };
} else {
  poolConfig = {
    host:
      process.env.DB_HOST ||
      process.env.MYSQLHOST ||
      "localhost",
    port: parseInt(
      process.env.DB_PORT ||
      process.env.MYSQLPORT ||
      "3306"
    ),
    user:
      process.env.DB_USER ||
      process.env.MYSQLUSER ||
      "root",
    password:
      process.env.DB_PASSWORD ||
      process.env.MYSQLPASSWORD ||
      "",
    database:
      process.env.DB_NAME ||
      process.env.MYSQLDATABASE ||
      "dental",
    waitForConnections: true,
    connectionLimit: 5,
    maxIdle: 2,
    idleTimeout: 30000,
    queueLimit: 0,
    connectTimeout: 10000,
    enableKeepAlive: true,
    keepAliveInitialDelay: 0,
    ssl:
      process.env.DB_SSL === "true" || process.env.MYSQL_SSL === "true"
        ? { rejectUnauthorized: false }
        : undefined,
  };
}

const pool = mysql.createPool(poolConfig);

async function initializeSchema() {
  const schemaPath = path.resolve(__dirname, "../../../dental.sql");
  const schemaSql = fs.readFileSync(schemaPath, "utf8");
  const statements = schemaSql
    .replace(/^--.*$/gm, "")
    .split(";")
    .map((statement) => statement.trim())
    .filter(Boolean);

  for (const statement of statements) {
    await pool.promise().query(statement);
  }

  console.log("✅ Dental database schema is ready");
}

pool.getConnection((err, connection) => {
  if (err) {
    console.error("❌ MySQL connection pool failed:", err.message);
  } else {
    const dbName =
      poolConfig.database ||
      process.env.DB_NAME ||
      process.env.MYSQLDATABASE ||
      "dental";
    console.log(`✅ MySQL pool connected successfully → ${dbName}`);
    connection.release();
    initializeSchema().catch((schemaError) => {
      console.error("❌ Database schema initialization failed:", schemaError.message);
    });
  }
});

module.exports = pool;
