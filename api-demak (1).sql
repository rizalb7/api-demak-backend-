-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 25, 2022 at 07:32 AM
-- Server version: 10.4.22-MariaDB
-- PHP Version: 7.4.27

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `api-demak`
--

-- --------------------------------------------------------

--
-- Table structure for table `opd`
--

CREATE TABLE `opd` (
  `id` int(11) NOT NULL,
  `namaOpd` varchar(255) DEFAULT NULL,
  `aliasNamaOpd` varchar(255) DEFAULT NULL,
  `deskripsi` text DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `opd`
--

INSERT INTO `opd` (`id`, `namaOpd`, `aliasNamaOpd`, `deskripsi`, `createdAt`, `updatedAt`) VALUES
(1, 'Sekretariat Daerah', 'Setda', NULL, '2022-04-23 13:03:37', '2022-04-23 13:03:37'),
(2, 'Dinas Komunikasi dan Informatika', 'Dinkominfo', NULL, '2022-04-23 16:46:36', '2022-04-23 16:46:36'),
(3, 'Dinas Kesehatan', 'Dinkes', NULL, '2022-04-24 02:11:33', '2022-04-24 02:11:33');

-- --------------------------------------------------------

--
-- Table structure for table `pegawai_kontrak`
--

CREATE TABLE `pegawai_kontrak` (
  `id` int(11) NOT NULL,
  `nama` varchar(255) DEFAULT NULL,
  `nik` bigint(20) DEFAULT NULL,
  `tempatLahir` varchar(255) DEFAULT NULL,
  `tanggalLahir` date DEFAULT NULL,
  `agama` varchar(255) DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL,
  `pendidikanTerakhir` varchar(255) DEFAULT NULL,
  `foto` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `opdId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `pegawai_kontrak`
--

INSERT INTO `pegawai_kontrak` (`id`, `nama`, `nik`, `tempatLahir`, `tanggalLahir`, `agama`, `status`, `pendidikanTerakhir`, `foto`, `createdAt`, `updatedAt`, `opdId`) VALUES
(5, 'Orang 1', 3243242341125567, 'demak', '1999-06-11', 'islam', 'Belum Menikah', 'S1-Ekonomi', 'assets\\foto\\10683-PngItem_800194.png', '2022-04-25 03:50:58', '2022-04-25 03:50:58', 1),
(6, 'Orang 2', 3243242341125567, 'demak', '1999-06-11', 'islam', 'Belum Menikah', 'S1-Ekonomi', 'assets\\foto\\76080-PngItem_800194.png', '2022-04-25 04:43:50', '2022-04-25 04:43:50', 1),
(7, 'Orang 3', 3243242341125567, 'demak', '1999-06-11', 'islam', 'Belum Menikah', 'S1-Ekonomi', NULL, '2022-04-25 04:44:12', '2022-04-25 04:44:12', 2),
(8, 'Orang 4', 3243242341125567, 'demak', '1999-06-11', 'islam', 'Belum Menikah', 'S1-Ekonomi', NULL, '2022-04-25 04:44:47', '2022-04-25 04:44:47', 2);

-- --------------------------------------------------------

--
-- Table structure for table `role`
--

CREATE TABLE `role` (
  `id` int(11) NOT NULL,
  `nama` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `role`
--

INSERT INTO `role` (`id`, `nama`, `createdAt`, `updatedAt`) VALUES
(1, 'superadmin', '2022-04-21 09:01:57', '2022-04-21 09:01:57'),
(2, 'admin_opd', '2022-04-21 09:01:57', '2022-04-21 09:01:57'),
(3, 'user', '2022-04-21 09:01:57', '2022-04-21 09:01:57');

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `nama` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `refreshToken` text DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `opdId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id`, `nama`, `email`, `password`, `refreshToken`, `createdAt`, `updatedAt`, `opdId`) VALUES
(1, 'cek0', 'cek0@gmail.com', '$2b$10$HOE.GeXVLNQk9dAGiQVUJOzrs97X.tsO/e6pcaPQBYgOCCYzqTVPa', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsIm5hbWEiOiJjZWswIiwiZW1haWwiOiJjZWswQGdtYWlsLmNvbSIsIm9wZElkIjpudWxsLCJpYXQiOjE2NTA4NjE4MTksImV4cCI6MTY1MDk0ODIxOX0.ud226jIMSIFDnHCFTR02pArrITR2_0OgQxi2qoSBZpQ', '2022-04-22 02:01:26', '2022-04-25 04:43:39', NULL),
(2, 'cek', 'cek@gmail.com', '$2b$10$g3A0GTbAKpDKMlBCYYwRU.I2UubgBt3s3RiFsj5jcKWACIuoLxfHq', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjIsIm5hbWEiOiJjZWsiLCJlbWFpbCI6ImNla0BnbWFpbC5jb20iLCJvcGRJZCI6bnVsbCwiaWF0IjoxNjUwNzY2MzYwLCJleHAiOjE2NTA4NTI3NjB9.oTo6GhYZF05_WLUBzSZEPod7iptEpm3B2JehtqELX0U', '2022-04-22 02:53:29', '2022-04-24 02:12:40', NULL),
(28, 'setda', 'setda@gmail.com', '$2b$10$UiEZmKr6Rr1d/2qfK5mVi.vFqSCmXvF8oeZU30a8zD32KF.oATFMm', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjI4LCJuYW1hIjoic2V0ZGEiLCJlbWFpbCI6InNldGRhQGdtYWlsLmNvbSIsIm9wZElkIjoxLCJpYXQiOjE2NTA4NTc4MjMsImV4cCI6MTY1MDk0NDIyM30.gDDHlcFVXXGKhF5hsM_0CMqFxhufybKfSTHNQXwLcaM', '2022-04-23 16:39:18', '2022-04-25 03:37:03', 1),
(29, 'kom', 'kom@gmail.com', '$2b$10$ctIiT0NMlxvzLR1wmsFmzONOrZbgoapXUa.mMUoxa32OpethJw.MS', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjI5LCJuYW1hIjoia29tIiwiZW1haWwiOiJrb21AZ21haWwuY29tIiwib3BkSWQiOjIsImlhdCI6MTY1MDg1NzU1NiwiZXhwIjoxNjUwOTQzOTU2fQ.dSGaBz_gFaeJGnnzAyPeWsmKbEpWFj61mbuIu9U4VyE', '2022-04-24 01:46:48', '2022-04-25 03:32:36', 2),
(31, 'kes', 'kes@gmail.com', '$2b$10$ImNCEWKxoN9RZh1YZBi6qOQ7/.XY56YVH7mt6PUZ3OEcSSc897yTi', NULL, '2022-04-24 02:14:47', '2022-04-24 02:14:47', 3),
(32, 'org', 'org@gmail.com', '$2b$10$1iDAQ3UUFToMDc8aBlIgNu9BCVyGikflsYgW7utQbWFH5Qq33.02S', NULL, '2022-04-24 02:16:02', '2022-04-24 02:16:02', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `user_role`
--

CREATE TABLE `user_role` (
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `roleId` int(11) NOT NULL,
  `userId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `user_role`
--

INSERT INTO `user_role` (`createdAt`, `updatedAt`, `roleId`, `userId`) VALUES
('2022-04-22 02:01:26', '2022-04-22 02:01:26', 1, 1),
('2022-04-23 16:39:18', '2022-04-23 16:39:18', 2, 28),
('2022-04-24 01:46:49', '2022-04-24 01:46:49', 2, 29),
('2022-04-24 02:14:47', '2022-04-24 02:14:47', 2, 31),
('2022-04-22 02:53:29', '2022-04-22 02:53:29', 3, 2),
('2022-04-24 02:16:02', '2022-04-24 02:16:02', 3, 32);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `opd`
--
ALTER TABLE `opd`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `pegawai_kontrak`
--
ALTER TABLE `pegawai_kontrak`
  ADD PRIMARY KEY (`id`),
  ADD KEY `opdId` (`opdId`);

--
-- Indexes for table `role`
--
ALTER TABLE `role`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`),
  ADD KEY `opdId` (`opdId`);

--
-- Indexes for table `user_role`
--
ALTER TABLE `user_role`
  ADD PRIMARY KEY (`roleId`,`userId`),
  ADD KEY `userId` (`userId`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `opd`
--
ALTER TABLE `opd`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `pegawai_kontrak`
--
ALTER TABLE `pegawai_kontrak`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=33;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `pegawai_kontrak`
--
ALTER TABLE `pegawai_kontrak`
  ADD CONSTRAINT `pegawai_kontrak_ibfk_1` FOREIGN KEY (`opdId`) REFERENCES `opd` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `user`
--
ALTER TABLE `user`
  ADD CONSTRAINT `user_ibfk_1` FOREIGN KEY (`opdId`) REFERENCES `opd` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `user_role`
--
ALTER TABLE `user_role`
  ADD CONSTRAINT `user_role_ibfk_1` FOREIGN KEY (`roleId`) REFERENCES `role` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `user_role_ibfk_2` FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
