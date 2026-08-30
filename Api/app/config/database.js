require("dotenv").config();
const mysql = require("mysql2");

// Build database configuration supporting connection strings or individual env vars
let poolConfig;

if (process.env.MYSQL_URL || process.env.DATABASE_URL || process.env.MYSQL_PUBLIC_URL) {
  const connectionUrl =
    process.env.MYSQL_URL ||
    process.env.DATABASE_URL ||
    process.env.MYSQL_PUBLIC_URL;
  poolConfig = {
    uri: connectionUrl,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    ssl:
      process.env.DB_SSL === "true" || process.env.MYSQL_SSL === "true"
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
    connectionLimit: 10,
    queueLimit: 0,
    ssl:
      process.env.DB_SSL === "true" || process.env.MYSQL_SSL === "true"
        ? { rejectUnauthorized: false }
        : undefined,
  };
}

const pool = mysql.createPool(poolConfig);

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
  }
});

module.exports = pool;
