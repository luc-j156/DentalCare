const con = require("../config/database");
const table = require("../config/tables");

// ─────────────────────────────────────────────────────────────────────────────
// CONTACT US FORM — parameterized to prevent SQL injection
// ─────────────────────────────────────────────────────────────────────────────
exports.ContactUs = (req, res) => {
  const requestData = req.body;

  // Basic server-side presence check
  if (!requestData.Name || !requestData.Email || !requestData.Subject || !requestData.Message) {
    return res.status(400).json({ success: false, message: "All fields are required" });
  }

  const sql = `
    INSERT INTO ${table.contactus} (name, email, subject, message)
    VALUES (?, ?, ?, ?)
  `;
  con.query(sql, [requestData.Name, requestData.Email, requestData.Subject, requestData.Message], (err, results) => {
    if (err) {
      return res.status(400).json({ success: false, message: "Server internal error", error: err });
    }
    return res.status(200).json({ success: true, status: 200, message: "Contact request sent successfully", result: results });
  });
};
