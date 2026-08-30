require("dotenv").config();
const mysql = require("mysql2");

const connection = mysql.createConnection({
  host:     process.env.DB_HOST     || "localhost",
  port:     parseInt(process.env.DB_PORT || "3306"),
  user:     process.env.DB_USER     || "root",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_NAME     || "dental",
});

connection.connect((err) => {
  if (err) {
    console.error("❌ MySQL connection failed:", err.message);
    process.exit(1);
  }
  console.log(`✅ MySQL connected → ${process.env.DB_NAME || "dental"}`);
});

module.exports = connection;
