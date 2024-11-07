-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 07, 2024 at 07:38 AM
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
-- Table structure for table `agencies`
--

CREATE TABLE `agencies` (
  `id` int(11) UNSIGNED NOT NULL,
  `name` longtext DEFAULT NULL,
  `email` longtext DEFAULT NULL,
  `phone` longtext DEFAULT NULL,
  `address` longtext DEFAULT NULL,
  `created_at` datetime(3) DEFAULT NULL,
  `updated_at` datetime(3) DEFAULT NULL,
  `deleted_at` datetime(3) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `agencies`
--

INSERT INTO `agencies` (`id`, `name`, `email`, `phone`, `address`, `created_at`, `updated_at`, `deleted_at`) VALUES
(3, 'Kominfo', 'kominfo@gmail.com', '08123456789', 'yogya', '2024-11-05 08:36:33.294', '2024-11-05 08:36:33.294', NULL),
(4, 'Komidigi', 'komidigi@gmail.com', '08123456786', 'komidigi', '2024-11-06 13:41:52.150', '2024-11-06 13:41:52.150', NULL),
(5, 'Komidigi1', 'komidigi@gmail.com', '08123456786', 'Di Yogyakarta, Kota Yogyakarta', '2024-11-06 14:54:50.326', '2024-11-06 14:54:50.326', NULL),
(6, 'Test', 'test@gmail.com', '12282821', 'Jogja', '2024-11-07 07:01:48.144', '2024-11-07 07:01:48.144', NULL);

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
  `email` longtext DEFAULT NULL,
  `agency_id` int(11) UNSIGNED NOT NULL,
  `created_at` datetime(3) DEFAULT NULL,
  `updated_at` datetime(3) DEFAULT NULL,
  `deleted_at` datetime(3) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `departments`
--

INSERT INTO `departments` (`id`, `name`, `address`, `phone`, `status`, `email`, `agency_id`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, 'Tamu 22q', 'Jogja', '1228282', NULL, '', 4, '2024-11-07 08:40:25.947', '2024-11-07 08:40:25.947', NULL);

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
  `created_at` datetime(3) DEFAULT NULL,
  `role` longtext DEFAULT NULL,
  `n_ip` longtext DEFAULT NULL,
  `profile_picture` longtext DEFAULT NULL,
  `agency_id` int(11) UNSIGNED DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `nip`, `email`, `phone`, `password`, `created_at`, `role`, `n_ip`, `profile_picture`, `agency_id`) VALUES
(30, 'Spectator', '', 'spectator@gmail.com', '08123456789', 'spec', NULL, 'spectator', '2', '', NULL),
(32, 'User', '', 'user@gmail.com', '1228282', 'user', NULL, 'user', '11', '/uploads\\profiles\\32_A.jpg', 3),
(38, 'Admin', '', 'admin@gmail.com', '08123456799', 'admin', '2024-11-07 13:36:13.792', 'admin', '1234', '', 3);

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
(8, 'test11111', 'Laki-laki', '1', 'Test11', '1', '1', 'Test11', '2024-10-23 07:00:00.000', '2024-10-24 06:59:41.854'),
(9, 'Tamu 1', 'Laki-laki', 'Test', 'Jogja', 'Test', '1228282', 'APTIKA', '2024-10-29 07:00:00.000', '2024-10-29 16:36:24.040'),
(10, 'Tamu 1', 'Perempuan', 'Test', 'Jogja', 'Test', '1228282', 'APTIKA', '2024-10-18 07:00:00.000', '2024-10-30 11:28:43.212'),
(11, 'Tamu 1', 'Laki-laki', 'Test', 'Jogja', 'Test', '1228282', 'APTIKA', '2024-10-24 07:00:00.000', '2024-10-30 13:28:05.492'),
(12, 'Tamu 1', 'Laki-laki', 'Test', 'Jogja', 'Test', '1228282', 'APTIKA', '2024-09-25 07:00:00.000', '2024-10-30 13:28:37.421'),
(13, 'Tamu 1', 'Laki-laki', 'Test', 'Jogja', 'Test', '1228282', 'APTIKA', '2024-10-30 07:00:00.000', '2024-10-30 13:48:02.536');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `agencies`
--
ALTER TABLE `agencies`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_agencies_deleted_at` (`deleted_at`);

--
-- Indexes for table `departments`
--
ALTER TABLE `departments`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_department_agency` (`agency_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `uni_users_email` (`email`),
  ADD UNIQUE KEY `uni_users_n_ip` (`n_ip`) USING HASH,
  ADD KEY `fk_user_agency` (`agency_id`);

--
-- Indexes for table `visitors`
--
ALTER TABLE `visitors`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `agencies`
--
ALTER TABLE `agencies`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `departments`
--
ALTER TABLE `departments`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=39;

--
-- AUTO_INCREMENT for table `visitors`
--
ALTER TABLE `visitors`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `departments`
--
ALTER TABLE `departments`
  ADD CONSTRAINT `fk_department_agency` FOREIGN KEY (`agency_id`) REFERENCES `agencies` (`id`);

--
-- Constraints for table `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `fk_user_agency` FOREIGN KEY (`agency_id`) REFERENCES `agencies` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
