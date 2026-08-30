const con = require("../config/database");
const table = require("../config/tables");
const utils = require("../common/utils");

// ─────────────────────────────────────────────────────────────────────────────
// GET ALL APPOINTMENTS (Admin filtered view) — parameterized
// ─────────────────────────────────────────────────────────────────────────────
exports.getAppointment = async (req, res) => {
  const sql = `
    SELECT * FROM ${table.appoinment}
    LEFT JOIN ${table.user} ON appointment.DoctorId = user.id
    WHERE time = ? AND date = ?
    ORDER BY appointment.id DESC
  `;
  con.query(sql, [req.body.time, req.body.date], (err, userResult) => {
    if (err) {
      return res.status(500).send({ success: false, message: "Server internal error", error: err });
    }
    return res.status(200).json({ success: true, status: 200, message: "Appointments fetched", result: userResult });
  });
};

// ─────────────────────────────────────────────────────────────────────────────
// GET ALL DOCTORS — parameterized (no user input, safe SELECT)
// ─────────────────────────────────────────────────────────────────────────────
exports.getDoctor = async (req, res) => {
  const sql = `SELECT * FROM ${table.user} WHERE admin = '2'`;
  con.query(sql, (err, userResult) => {
    if (err) {
      return res.status(500).send({ success: false, message: "Server internal error", error: err });
    }
    return res.status(200).json({ success: true, status: 200, message: "Doctors fetched", result: userResult });
  });
};

// ─────────────────────────────────────────────────────────────────────────────
// REGISTRATION — parameterized
// ─────────────────────────────────────────────────────────────────────────────
exports.Registration = async (req, res) => {
  const requestData = req.body;
  var image_file = req.files ? req.files : null;

  // Check for existing email — parameterized
  const checkSql = `SELECT Email FROM ${table.user} WHERE Email = ?`;
  con.query(checkSql, [requestData.Email], (err, userResult) => {
    if (err) {
      return res.status(500).send({ success: false, message: "Server internal error", error: err });
    }
    if (userResult.length > 0) {
      return res.status(400).json({ success: false, message: "Email already registered" });
    }

    let insertSql;
    let insertParams;

    if (requestData.admin === "2") {
      // Doctor registration
      let imagePath = null;
      if (image_file != null && image_file.length > 0) {
        const image_name = image_file[0].originalname;
        const url = utils.getStoreImageFolderPath(FOLDER_NAME.USER_PROFILES) + image_name;
        imagePath = url;
        utils.storeImageToFolder(image_file[0].path, image_name, FOLDER_NAME.USER_PROFILES);
      }
      insertSql = `INSERT INTO ${table.user}
        (FirstName, Email, Password, Gender, Number, Specialist, licencenumber, status, admin, Image)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
      insertParams = [
        requestData.FirstName, requestData.Email, requestData.Password,
        requestData.Gender, requestData.Number, requestData.Specialist,
        requestData.LicenceNumber, requestData.status, requestData.admin, imagePath,
      ];
    } else {
      // Patient registration
      insertSql = `INSERT INTO ${table.user}
        (FirstName, Email, Password, Gender, Address, Number)
        VALUES (?, ?, ?, ?, ?, ?)`;
      insertParams = [
        requestData.FirstName, requestData.Email, requestData.Password,
        requestData.Gender, requestData.Address, requestData.Number,
      ];
    }

    con.query(insertSql, insertParams, (err, results) => {
      if (err) {
        return res.status(400).json({ success: false, message: "Server internal error", error: err });
      }
      return res.status(200).json({ success: true, status: 200, message: "Account created successfully", result: results });
    });
  });
};

// ─────────────────────────────────────────────────────────────────────────────
// LOGIN — parameterized
// ─────────────────────────────────────────────────────────────────────────────
exports.userLogin = async (req, res) => {
  const email = (req.body?.Email || req.body?.email || "").trim();
  const password = (req.body?.Password || req.body?.password || "").trim();

  if (!email || !password) {
    return res.status(400).json({ success: false, message: "Email and Password are required" });
  }

  const sql = `SELECT * FROM ${table.user} WHERE Email = ?`;
  con.query(sql, [email], async (err, results) => {
    if (err) {
      return res.status(500).send({ success: false, message: "Server internal error", error: err });
    }
    if (results.length > 0) {
      const checkPass = await utils.comparePassword(password, results[0].Password, results[0]);
      return res.status(checkPass ? 200 : 400).send({
        success: checkPass ? true : false,
        status:  checkPass ? 200 : 400,
        message: checkPass ? "Logged in successfully" : "Invalid password",
        result:  checkPass ? results[0] : {},
        token:   checkPass,
      });
    } else {
      return res.status(400).send({ success: false, status: 400, message: "Invalid email" });
    }
  });
};

// ─────────────────────────────────────────────────────────────────────────────
// GET DOCTORS BY SPECIALIST — parameterized
// ─────────────────────────────────────────────────────────────────────────────
exports.getDoctorFromSpecialist = async (req, res) => {
  const specialist = (req.body?.Specialist || req.body?.specialist || "").trim();
  const sql = `SELECT * FROM ${table.user} WHERE (Specialist = ? OR ? = '') AND (admin = '2' OR admin = 2) AND status = 'Available'`;
  con.query(sql, [specialist, specialist], (err, results) => {
    if (err) {
      return res.status(400).json({ success: false, message: "Server internal error", error: err });
    }
    return res.status(200).json({ success: true, status: 200, message: "Doctor details", result: results });
  });
};

// ─────────────────────────────────────────────────────────────────────────────
// ADD APPOINTMENT — parameterized
// ─────────────────────────────────────────────────────────────────────────────
exports.AddAppointment = async (req, res) => {
  const requestData = req.body;

  // Check slot availability — parameterized
  const checkSql = `
    SELECT * FROM ${table.appoinment}
    WHERE DoctorId = ? AND time = ? AND date = ?
  `;
  con.query(checkSql, [requestData.DoctorId, requestData.time, requestData.date], (err, results) => {
    if (err) {
      return res.status(400).json({ success: false, message: "Server internal error", error: err });
    }
    if (results.length >= 20) {
      return res.status(200).json({ success: false, message: "Booking slot not available", error: "" });
    }

    // Insert appointment — parameterized
    const insertSql = `
      INSERT INTO ${table.appoinment}
        (CustomerNumber, description, token, user_id, Name, Email, date, time, DoctorId)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
    const insertParams = [
      requestData.CustomerNumber,
      requestData.description,
      results.length + 1,
      requestData.user_id,
      requestData.Name,
      requestData.Email,
      requestData.date,
      requestData.time,
      requestData.DoctorId,
    ];
    con.query(insertSql, insertParams, (err, results1) => {
      if (err) {
        return res.status(400).json({ success: false, message: "Server internal error", error: err });
      }
      return res.status(200).json({ success: true, status: 200, message: "Appointment added", result: results1 });
    });
  });
};

// ─────────────────────────────────────────────────────────────────────────────
// UPDATE PAYMENT STATUS — parameterized
// ─────────────────────────────────────────────────────────────────────────────
exports.UpdateAppointmentStatus = async (req, res) => {
  const sql = `
    UPDATE ${table.appoinment}
    SET payment_status = ?, razorpay_payment_id = ?
    WHERE id = ?
  `;
  con.query(sql, [req.body.payment_status, req.body.razorpay_payment_id, req.body.id], (err, results) => {
    if (err) {
      return res.status(400).json({ success: false, message: "Server internal error", error: err });
    }
    return res.status(200).json({ success: true, status: 200, message: "Status updated", result: results });
  });
};

// ─────────────────────────────────────────────────────────────────────────────
// UPDATE DOCTOR STATUS — parameterized
// ─────────────────────────────────────────────────────────────────────────────
exports.UpdateStatus = async (req, res) => {
  // Whitelist allowed status values to prevent arbitrary writes
  const allowedStatuses = ["Available", "UnAvailable", "Busy"];
  if (!allowedStatuses.includes(req.body.status)) {
    return res.status(400).json({ success: false, message: "Invalid status value" });
  }

  const sql = `UPDATE ${table.user} SET status = ? WHERE id = ?`;
  con.query(sql, [req.body.status, req.body.id], (err, results) => {
    if (err) {
      return res.status(400).json({ success: false, message: "Server internal error", error: err });
    }
    return res.status(200).json({ success: true, status: 200, message: "Status updated", result: results });
  });
};

// ─────────────────────────────────────────────────────────────────────────────
// RECENT APPOINTMENT LIST — parameterized
// ─────────────────────────────────────────────────────────────────────────────
exports.RecentAppointmentList = async (req, res) => {
  let sql;
  let params;

  if (req.body.admin === "0") {
    // Patient: own appointments only
    sql = `
      SELECT * FROM ${table.appoinment}
      LEFT JOIN ${table.user} ON appointment.DoctorId = user.id
      WHERE user_id = ?
      ORDER BY appointment.id DESC
    `;
    params = [req.body.id];
  } else if (req.body.admin === "2") {
    // Doctor: own queue only
    sql = `
      SELECT * FROM ${table.appoinment}
      LEFT JOIN ${table.user} ON appointment.DoctorId = user.id
      WHERE DoctorId = ?
      ORDER BY appointment.id DESC
    `;
    params = [req.body.id];
  } else {
    // Admin: all appointments
    sql = `
      SELECT * FROM ${table.appoinment}
      LEFT JOIN ${table.user} ON appointment.DoctorId = user.id
      ORDER BY appointment.id DESC
    `;
    params = [];
  }

  con.query(sql, params, (err, results) => {
    if (err) {
      return res.status(400).json({ success: false, message: "Server internal error", error: err });
    }
    return res.status(200).json({ success: true, status: 200, message: "Appointments fetched", result: results });
  });
};
