-- Dental Care Application Database Schema
-- Compatible with MySQL 5.7+, MySQL 8.0+, MariaDB, Railway MySQL, PlanetScale, Aiven, Supabase

SET FOREIGN_KEY_CHECKS=0;
SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";

-- --------------------------------------------------------
-- Table: appointment
-- --------------------------------------------------------
CREATE TABLE IF NOT EXISTS ppointment (
  id INT NOT NULL AUTO_INCREMENT,
  user_id VARCHAR(255) DEFAULT '0',
  Name VARCHAR(255) NOT NULL,
  date VARCHAR(100) NOT NULL,
  	ime VARCHAR(100) NOT NULL,
  Email VARCHAR(255) NOT NULL,
  DoctorId VARCHAR(100) NOT NULL,
  	oken VARCHAR(255) DEFAULT NULL,
  payment_status VARCHAR(100) DEFAULT 'Pending',
  azorpay_payment_id VARCHAR(255) DEFAULT NULL,
  description TEXT DEFAULT NULL,
  CustomerNumber VARCHAR(100) DEFAULT NULL,
  created DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------
-- Table: contactus
-- --------------------------------------------------------
CREATE TABLE IF NOT EXISTS contactus (
  id INT NOT NULL AUTO_INCREMENT,
  
ame VARCHAR(255) DEFAULT NULL,
  email VARCHAR(255) DEFAULT NULL,
  subject VARCHAR(255) DEFAULT NULL,
  message TEXT DEFAULT NULL,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------
-- Table: user
-- --------------------------------------------------------
CREATE TABLE IF NOT EXISTS user (
  id INT NOT NULL AUTO_INCREMENT,
  FirstName VARCHAR(255) NOT NULL,
  Email VARCHAR(255) NOT NULL,
  Password VARCHAR(255) NOT NULL,
  Gender VARCHAR(50) DEFAULT NULL,
  Address TEXT DEFAULT NULL,
  Number VARCHAR(50) DEFAULT NULL,
  Specialist VARCHAR(255) DEFAULT NULL,
  Position VARCHAR(255) DEFAULT NULL,
  licencenumber VARCHAR(255) DEFAULT NULL,
  Image VARCHAR(500) DEFAULT NULL,
  status VARCHAR(100) DEFAULT 'Available',
  dmin VARCHAR(10) NOT NULL DEFAULT '0',
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------
-- Seed Data
-- --------------------------------------------------------
INSERT INTO user (id, FirstName, Email, Password, Gender, Address, Number, Specialist, Position, licencenumber, Image, status, dmin) VALUES
(7, 'Admin', 'admin@admin.com', '123456', 'male', 'Ahmedabad', '9876543210', 'Head of Clinic', 'Chief Medical Officer', 'ADM-998877', NULL, 'Available', '1'),
(8, 'Rajesh Sharma', 'raj@gmail.com', '123456', 'male', 'Ahmedabad', '9630124578', 'General Dentist', 'Senior Consultant', 'DNT-785412', 'user_profiles/doctor1.jpg', 'Available', '2'),
(9, 'Neha Patel', 'neha@gmail.com', '123456', 'female', 'Ahmedabad', '7890123456', 'General Dentist', 'Dental Surgeon', 'DNT-741206', 'user_profiles/doctor4.jpg', 'Available', '2'),
(10, 'Lakhan Verma', 'lakhan@gmail.com', '123456', 'male', 'Ahmedabad', '9874563012', 'Orthodontist', 'Orthodontic Specialist', 'ORT-896523', 'user_profiles/doctor2.jpg', 'Available', '2'),
(11, 'Nirav Joshi', 'nirav@gmail.com', '123456', 'male', 'Ahmedabad', '9874561025', 'Orthodontist', 'Senior Orthodontist', 'ORT-987456', 'user_profiles/doctor5.jpg', 'Available', '2'),
(12, 'Aarti Mehta', 'aarti@gmail.com', '123456', 'female', 'Ahmedabad', '9630124578', 'Prosthodontist', 'Prosthodontics Expert', 'PRS-745698', 'user_profiles/doctor3.jpg', 'Available', '2'),
(13, 'Jashabirsinh', 'patient@gmail.com', '123456', 'male', 'Ahmedabad', '6351737448', NULL, NULL, NULL, NULL, 'Available', '0');

INSERT INTO ppointment (id, user_id, Name, date, 	ime, Email, DoctorId, 	oken, payment_status, azorpay_payment_id, description, CustomerNumber) VALUES
(1, '13', 'Jashabirsinh Bhatiya', '2026-09-05', 'Morning', 'patient@gmail.com', '8', '1', 'Success', 'pay_demo_test_upi_101', 'Routine scaling and checkup', '6351737448'),
(2, '13', 'Jashabirsinh Bhatiya', '2026-09-12', 'Evening', 'patient@gmail.com', '10', '2', 'Success', 'pay_demo_test_upi_102', 'Orthodontic alignment consultation', '6351737448');

SET FOREIGN_KEY_CHECKS=1;
