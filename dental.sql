-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Apr 15, 2023 at 07:05 AM
-- Server version: 8.0.31
-- PHP Version: 8.0.26

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `dental`
--

-- --------------------------------------------------------

--
-- Table structure for table `appointment`
--

DROP TABLE IF EXISTS `appointment`;
CREATE TABLE IF NOT EXISTS `appointment` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` varchar(500) DEFAULT NULL,
  `Name` text NOT NULL,
  `date` text NOT NULL,
  `time` text NOT NULL,
  `Email` text NOT NULL,
  `DoctorId` text NOT NULL,
  `token` varchar(500) DEFAULT NULL,
  `payment_status` varchar(500) DEFAULT 'Pending',
  `razorpay_payment_id` varchar(500) DEFAULT NULL,
  `description` varchar(500) DEFAULT NULL,
  `CustomerNumber` varchar(500) DEFAULT NULL,
  `created` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `appointment`
--

INSERT INTO `appointment` (`id`, `user_id`, `Name`, `date`, `time`, `Email`, `DoctorId`, `token`, `payment_status`, `razorpay_payment_id`, `description`, `CustomerNumber`, `created`) VALUES
(4, '13', 'abc', '2023-04-13', 'Morning', 'abc@gmail.com', '11', '1', 'Success', 'pay_LdMd2clyc2AmIP', 'abc', '7441258963', '2023-04-13 23:19:05'),
(3, '13', 'patient', '2023-04-13', 'Morning', 'patient@gmail.com', '9', '1', 'Success', 'pay_LdLMeMIofV4fj2', 'test', '8547963102', '2023-04-13 22:05:09');

-- --------------------------------------------------------

--
-- Table structure for table `contactus`
--

DROP TABLE IF EXISTS `contactus`;
CREATE TABLE IF NOT EXISTS `contactus` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(500) DEFAULT NULL,
  `email` varchar(500) DEFAULT NULL,
  `subject` varchar(500) DEFAULT NULL,
  `message` varchar(500) DEFAULT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
CREATE TABLE IF NOT EXISTS `user` (
  `id` int NOT NULL AUTO_INCREMENT,
  `FirstName` varchar(500) NOT NULL,
  `Email` varchar(500) DEFAULT NULL,
  `Password` varchar(500) DEFAULT NULL,
  `Gender` varchar(500) DEFAULT NULL,
  `Address` varchar(500) DEFAULT NULL,
  `Number` varchar(500) DEFAULT NULL,
  `Specialist` text,
  `Position` text,
  `licencenumber` text,
  `Image` text,
  `status` text,
  `admin` varchar(50) NOT NULL DEFAULT '0',
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id`, `FirstName`, `Email`, `Password`, `Gender`, `Address`, `Number`, `Specialist`, `Position`, `licencenumber`, `Image`, `status`, `admin`, `created_at`) VALUES
(12, 'Aarti', 'aarti@gmaiol.com', '123456', 'female', NULL, '9630124578', 'Prosthodontist', NULL, '745698', 'user_profiles/doctor3.jpg', 'Available', '2', '2023-04-13 22:01:33'),
(11, 'Nirav', 'nirav@gmail.com', '123456', 'male', NULL, '9874561025', 'Orthodontist', NULL, '987456', 'user_profiles/doctor5.jpg', 'Available', '2', '2023-04-13 22:00:14'),
(10, 'Lakhan', 'lakhan@gmail.com', '123456', 'male', NULL, '9874563012', 'Orthodontist', NULL, '8965230', 'user_profiles/doctor2.jpg', 'Available', '2', '2023-04-13 21:59:25'),
(9, 'Neha', 'neha@gmail.com', '123456', 'female', NULL, '7890123456', 'General Dentist', NULL, '7412069', 'user_profiles/doctor4.jpg', 'Available', '2', '2023-04-13 21:58:39'),
(8, 'raj', 'raj@gmail.com', '123456', 'male', NULL, '9630124578', 'General Dentist', NULL, '7854120', 'user_profiles/doctor1.jpg', 'Available', '2', '2023-04-13 21:57:41'),
(7, '', 'admin@admin.com', '123456', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '1', '2023-04-13 21:36:46'),
(13, 'Patient', 'patient@gmail.com', '123456', 'male', 'Ahamdabad', '8547963102', NULL, NULL, NULL, 'user_profiles/doctor1.jpg', NULL, '0', '2023-04-13 22:04:02'),
(14, 'Demo', 'demo@gmail.com', '123456', 'Female', 'test', '9874563210', NULL, NULL, NULL, NULL, NULL, '0', '2023-04-14 21:25:51');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
