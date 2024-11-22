-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 21, 2024 at 03:42 AM
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
(1, 'Tamu', 'Tamu@gnaul.com', '0835333333', 'Tamu', '2024-11-18 14:43:20.282', '2024-11-18 14:43:20.282', NULL),
(11, 'Badan Pusat Statistik (BPS)', 'bps@gmail.com', '0835345622', 'Jakarta', '2024-11-15 08:20:57.853', '2024-11-15 08:20:57.853', NULL);

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
(1, 'Bidanng BPS 1', 'Jakarta', '0835345622', 'inactive', 'bps@gmail.com', 11, '2024-11-15 09:10:01.276', '2024-11-20 09:46:39.600', NULL),
(7, 'Bidanng BPS 2', 'Jakarta', '0899945622', 'active', 'bps@gmail.com', 11, '2024-11-20 13:27:58.248', '2024-11-20 13:51:10.049', NULL),
(8, 'Bidanng BPS 3', 'Jakarta', '0855645622', 'Active', 'bps@gmail.com', 11, '2024-11-20 13:52:16.331', '2024-11-20 13:52:16.331', NULL);

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
(1, 'Admin', '2100018365', 'admin@gmail.com', '08123456789', 'admin', '2024-11-11 13:22:30.000', 'admin', '222217676', '/uploads\\profiles\\1_Screenshot 2024-11-13 230846.png', NULL),
(51, 'Admin1', '', 'admin1@gmail.com', '083534222', 'admin1', '2024-11-15 09:00:01.857', 'admin', '123432', '', 11),
(55, 'User', '', 'user@gmail.com', '0835343646', 'user', '2024-11-15 13:59:40.182', 'user', '1234', '', 11),
(56, 'Spectator', '', 'spec@gmail.com', '0835343611', 'spec', '2024-11-15 14:28:13.092', 'spectator', '123111', '', 11),
(70, 'Testis', '', 'tamu@gmail.com', '13334443', 'asdadada', '2024-11-19 11:13:53.926', 'spectator', '12122', '', 1),
(71, 'Admin', '', 'admin@admin.com', '08123456789', 'admin123', '2024-11-19 15:48:00.824', 'admin', '', '', 1);

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
  `created_at` datetime(3) DEFAULT NULL,
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp() COMMENT 'Waktu terakhir diupdate'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `visitors`
--

INSERT INTO `visitors` (`id`, `name`, `gender`, `purpose`, `address`, `institution`, `phone`, `department`, `visit_date`, `created_at`, `updated_at`) VALUES
(6, 'Jojo', 'Laki-laki', 'jo', 'Jakarta', 'Badan Pusat Statistik (BPS)', '0835345622', 'Bidanng BPS 1', '2024-11-20 07:00:00.000', '2024-11-20 14:20:34.967', '2024-11-20 07:20:34');

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
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_visit_date` (`visit_date`),
  ADD KEY `idx_department` (`department`(768)),
  ADD KEY `idx_institution` (`institution`(768));

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `agencies`
--
ALTER TABLE `agencies`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `departments`
--
ALTER TABLE `departments`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=72;

--
-- AUTO_INCREMENT for table `visitors`
--
ALTER TABLE `visitors`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

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
