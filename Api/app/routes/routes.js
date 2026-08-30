const express = require("express");
const router = express.Router();

const auth = require("../config/auth");
const UserController = require("../controller/userController");

const ContactController = require("../controller/contactusController");

//login
router.post("/user_login", UserController.userLogin);
router.post("/signup", UserController.Registration);
router.post("/add/contactus", ContactController.ContactUs);

router.post("/getDoctorFromSpecialist", UserController.getDoctorFromSpecialist);
router.post("/add/appointment", UserController.AddAppointment);
router.post("/update/appointmentStatus", UserController.UpdateAppointmentStatus);
router.post("/recent/appointment", UserController.RecentAppointmentList);
router.post("/detail/doctor", UserController.getDoctor);
router.post("/getappointment", UserController.getAppointment);
router.post("/update/status", UserController.UpdateStatus);

module.exports = router;
