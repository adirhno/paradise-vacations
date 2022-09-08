-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 26, 2022 at 09:41 PM
-- Server version: 10.4.24-MariaDB
-- PHP Version: 7.4.29

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `project3`
--

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `first_name` varchar(222) NOT NULL,
  `last_name` varchar(22) NOT NULL,
  `user_name` varchar(22) NOT NULL,
  `password` int(22) NOT NULL,
  `permi` int(2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `first_name`, `last_name`, `user_name`, `password`, `permi`) VALUES
(1, 'adir', 'hino', 'admin', 12345, 1),
(33, 'adir', 'hino', 'user', 12345, 0);

-- --------------------------------------------------------

--
-- Table structure for table `vacations`
--

CREATE TABLE `vacations` (
  `id` int(11) NOT NULL,
  `description` varchar(22) NOT NULL,
  `destination` varchar(22) NOT NULL,
  `pic` varchar(11) NOT NULL,
  `start_date` date NOT NULL,
  `arriv_date` date NOT NULL,
  `price` int(11) NOT NULL,
  `followers` int(11) NOT NULL,
  `favourites` int(22) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `vacations`
--

INSERT INTO `vacations` (`id`, `description`, `destination`, `pic`, `start_date`, `arriv_date`, `price`, `followers`, `favourites`) VALUES
(143, 'dsd', 'sadsadsa', '', '1900-01-05', '0000-00-00', 0, 32, 0),
(144, 'ds', 'dsds', '0', '1903-12-16', '0000-00-00', 0, 42, 0),
(146, 'ds', 'sd', '0', '1900-01-16', '0000-00-00', 0, 0, 0),
(147, 'ds', 'ds', '0', '1900-01-24', '0000-00-00', 0, 0, 0),
(148, 'qq', 'qq', '0', '1900-01-16', '0000-00-00', 0, 0, 0),
(149, 'q', 'fv', '0', '1900-01-15', '0000-00-00', 0, 1, 0),
(153, '', 'mmmm', '0', '2020-07-22', '0000-00-00', 0, 1, 0),
(154, '', 'kkk', '0', '2027-12-24', '0000-00-00', 0, 1, 0),
(155, '', 'kkkk', '0', '2022-07-21', '0000-00-00', 0, 1, 0),
(156, 'ytyty', 'ttt', '0', '2022-07-04', '0000-00-00', 0, 0, 0),
(157, 'fdf', 'dfdfd', '0', '2022-07-05', '0000-00-00', 0, 1, 0),
(158, 'sdsd', 'sdsds', '0', '2022-07-06', '2022-07-28', 222, 4, 0),
(159, 'new ', '2222', '0', '0000-00-00', '0000-00-00', 0, 10, 0),
(160, 'adir nre nre', 'dd', '0', '0000-00-00', '0000-00-00', 0, 9, 0),
(164, 'dsad', 'dsadas', '0', '0000-00-00', '0000-00-00', 0, 5, 0);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `vacations`
--
ALTER TABLE `vacations`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=34;

--
-- AUTO_INCREMENT for table `vacations`
--
ALTER TABLE `vacations`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=165;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
