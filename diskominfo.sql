-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Oct 28, 2024 at 04:50 AM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `diskominfo`
--

-- --------------------------------------------------------

--
-- Table structure for table `departments`
--

CREATE TABLE `departments` (
  `id` int(11) NOT NULL,
  `name` longtext DEFAULT NULL,
  `address` longtext DEFAULT NULL,
  `phone` longtext DEFAULT NULL,
  `status` longtext DEFAULT NULL,
  `created_at` datetime(3) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `departments`
--

INSERT INTO `departments` (`id`, `name`, `address`, `phone`, `status`, `created_at`) VALUES
(3, 'Test11', 'Test11', '1', 'Active', '2024-10-21 14:54:35.000'),
(4, 'Test112', 'Test11', '1', 'Active', '2024-10-22 13:14:17.000');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` longtext NOT NULL,
  `nip` longtext NOT NULL,
  `email` varchar(191) DEFAULT NULL,
  `phone` longtext NOT NULL,
  `password` longtext NOT NULL,
  `department` longtext NOT NULL,
  `created_at` datetime(3) DEFAULT NULL,
  `role` longtext DEFAULT NULL,
  `n_ip` varchar(191) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `nip`, `email`, `phone`, `password`, `department`, `created_at`, `role`, `n_ip`) VALUES
(4, 'test22222', '1', 'tes1@gmail.com', '12', '222222', 'Test112', '2024-10-28 08:27:32.025', 'user', NULL),
(5, 'admin', '1', 'admin@gmail.com', '12', 'admin', 'Test112', '2024-10-28 08:53:35.555', 'admin', NULL),
(6, 'Admin', '', 'admin@admin.com', '08123456789', 'admin123', 'IT', NULL, 'admin', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `visitors`
--

CREATE TABLE `visitors` (
  `id` int(11) NOT NULL,
  `name` longtext DEFAULT NULL,
  `gender` longtext DEFAULT NULL,
  `purpose` longtext DEFAULT NULL,
  `address` longtext DEFAULT NULL,
  `institution` longtext DEFAULT NULL,
  `phone` longtext DEFAULT NULL,
  `department` longtext DEFAULT NULL,
  `visit_date` datetime(3) DEFAULT NULL,
  `created_at` datetime(3) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `visitors`
--

INSERT INTO `visitors` (`id`, `name`, `gender`, `purpose`, `address`, `institution`, `phone`, `department`, `visit_date`, `created_at`) VALUES
(7, 'test2', 'Laki-laki', '1', 'Test11', '1', '1', 'Test11', '0001-01-16 07:00:00.000', '2024-10-23 02:38:30.000'),
(8, 'test11111', 'Laki-laki', '1', 'Test11', '1', '1', 'Test11', '2024-10-23 07:00:00.000', '2024-10-24 06:59:41.854');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `departments`
--
ALTER TABLE `departments`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `uni_users_email` (`email`);

--
-- Indexes for table `visitors`
--
ALTER TABLE `visitors`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `departments`
--
ALTER TABLE `departments`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `visitors`
--
ALTER TABLE `visitors`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
