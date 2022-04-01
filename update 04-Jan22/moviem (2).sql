-- phpMyAdmin SQL Dump
-- version 4.8.4
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Jan 04, 2022 at 01:17 AM
-- Server version: 5.5.45
-- PHP Version: 7.3.13

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `moviem`
--

-- --------------------------------------------------------

--
-- Table structure for table `booking`
--

CREATE TABLE `booking` (
  `id` int(11) NOT NULL,
  `bookingdate` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `eventid` int(11) NOT NULL,
  `userid` int(11) NOT NULL,
  `email` varchar(100) NOT NULL,
  `etype` int(11) DEFAULT '1',
  `no_tickets` int(11) NOT NULL DEFAULT '0',
  `booking_amt` decimal(10,2) DEFAULT '0.00',
  `status` int(11) DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `booking`
--

INSERT INTO `booking` (`id`, `bookingdate`, `eventid`, `userid`, `email`, `etype`, `no_tickets`, `booking_amt`, `status`) VALUES
(25, '2022-01-01 11:46:56', 34, 12, 'rr@r.com', 1, 2, '466.00', 1),
(26, '2022-01-01 11:59:10', 34, 12, 'rr@r.com', 1, 3, '0.00', 1),
(27, '2022-01-01 12:09:34', 34, 12, 'rr@r.com', 1, 3, '0.00', 1),
(28, '2022-01-01 12:24:33', 34, 12, 'rr@r.com', 1, 1, '0.00', 1),
(29, '2022-01-01 12:30:37', 34, 12, 'rr@r.com', 1, 8, '1864.00', 1),
(30, '2022-01-01 12:31:16', 34, 12, 'rr@r.com', 1, 5, '0.00', 1),
(31, '2022-01-01 17:40:00', 35, 2, 'a@a', 1, 4, '0.00', 1),
(32, '2022-01-01 17:40:33', 35, 2, 'a@a', 1, 2, '0.00', 1),
(33, '2022-01-03 06:52:51', 29, 2, 'a@a', 1, 5, '1250.00', 1);

-- --------------------------------------------------------

--
-- Table structure for table `events`
--

CREATE TABLE `events` (
  `id` int(11) NOT NULL,
  `title` varchar(100) NOT NULL,
  `hostby` int(11) NOT NULL DEFAULT '0',
  `etype` int(11) NOT NULL DEFAULT '1' COMMENT '1-movie',
  `venue` text NOT NULL,
  `dfrom` datetime NOT NULL,
  `dto` datetime NOT NULL,
  `cdetail` varchar(30) NOT NULL,
  `edescp` text NOT NULL,
  `seats` int(11) NOT NULL DEFAULT '0',
  `price` decimal(10,2) NOT NULL COMMENT 'Price per person',
  `no_slots` int(11) NOT NULL DEFAULT '1',
  `cname` varchar(200) NOT NULL,
  `status` int(11) NOT NULL DEFAULT '0',
  `filepath` text,
  `filename` text,
  `gtype` int(11) DEFAULT NULL,
  `ryear` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `events`
--

INSERT INTO `events` (`id`, `title`, `hostby`, `etype`, `venue`, `dfrom`, `dto`, `cdetail`, `edescp`, `seats`, `price`, `no_slots`, `cname`, `status`, `filepath`, `filename`, `gtype`, `ryear`) VALUES
(28, 'dddsdfsdfds', 2, 2, 'sdds', '2021-12-22 00:00:00', '2021-12-22 00:00:00', '434', '434', 4, '43.00', 14, '32443', 0, NULL, NULL, NULL, NULL),
(29, 'Event 1234', 2, 2, 'ABC D ABCD ABC D', '2021-12-22 00:00:00', '2021-12-22 00:00:00', '32244', 'sdfsdfsd sdfsdc sdcwds', 100, '250.00', 2, 'Adsdds', 0, NULL, NULL, NULL, NULL),
(30, 'My EVENT', 2, 3, 'ABC ABC ABC ', '2021-12-17 00:00:00', '2021-12-17 00:00:00', '9893434994', ' This is user created event.This is user created event.This is user created event.This is user created event.This is user created event.\nThis is user created event.\n\nThis is user created event.\n\nThis is user created event.This is user created event.This is user created event.This is user created event.\n\nThis is user created event.This is user created event.', 15, '100.00', 1, 'Mr. ABC', 2, NULL, NULL, NULL, NULL),
(31, 'Another Event', 2, 2, 'sdfdsfds', '2021-12-23 00:00:00', '2021-12-23 00:00:00', 'e2esd', 'qweqw2321', 21, '233.00', 1, '23233', 2, NULL, NULL, NULL, NULL),
(32, 'New Movie', 2, 1, 'sdfsd', '2021-12-16 00:00:00', '2021-12-16 00:00:00', 'cdetail', 'sdfsdf', 22, '322.00', 2, '-', 0, NULL, NULL, NULL, NULL),
(33, 'Testing New Movie ', 12, 1, 'sdfdsf', '2021-12-23 00:00:00', '2021-12-23 00:00:00', 'cdetail', 'sdfdsfds', 233, '323.00', 12, '-', 0, NULL, NULL, NULL, NULL),
(34, 'Another MOVIE', 12, 1, 'sdfdsfsd', '2021-12-24 00:00:00', '2021-12-24 00:00:00', 'cdetail', 'dfsdfdsfs', 122, '233.00', 1, '-', 0, '/246286816_4936563586371577_216340040282617179_n.jpg', '246286816_4936563586371577_216340040282617179_n.jpg', NULL, NULL),
(35, 'Rose Love', 2, 1, 'Rose ROse', '2022-01-02 00:00:00', '2022-01-02 00:00:00', 'cdetail', 'Rose ROseRose ROseRose ROseRose ROseRose ROseRose ROseRose ROse', 50, '250.00', 1, '-', 2, '/12834623_196989367333707_886154398_n.jpg', '12834623_196989367333707_886154398_n.jpg', 1, 2006),
(36, 'Testing EVENT', 2, 2, 'Testing testing testing', '2022-01-20 00:00:00', '2022-01-20 00:00:00', '989344444', 'Desscription ', 23, '233.00', 1, 'Mr. ABC', 0, '/aaaa.jpg', 'aaaa.jpg', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `seats`
--

CREATE TABLE `seats` (
  `id` int(11) NOT NULL,
  `bookingid` int(11) NOT NULL,
  `eventid` int(11) NOT NULL,
  `seatno` int(11) NOT NULL,
  `userid` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `seats`
--

INSERT INTO `seats` (`id`, `bookingid`, `eventid`, `seatno`, `userid`) VALUES
(21, 26, 34, 2, 12),
(22, 26, 34, 3, 12),
(23, 26, 34, 4, 12),
(24, 27, 34, 4, 12),
(25, 27, 34, 5, 12),
(26, 27, 34, 14, 12),
(27, 28, 34, 27, 12),
(28, 29, 34, 2, 12),
(29, 29, 34, 3, 12),
(30, 29, 34, 4, 12),
(31, 29, 34, 5, 12),
(32, 29, 34, 6, 12),
(33, 29, 34, 7, 12),
(34, 29, 34, 13, 12),
(35, 29, 34, 14, 12),
(36, 30, 34, 8, 12),
(37, 30, 34, 9, 12),
(38, 30, 34, 10, 12),
(39, 30, 34, 11, 12),
(40, 30, 34, 15, 12),
(41, 31, 35, 25, 2),
(42, 31, 35, 26, 2),
(43, 31, 35, 33, 2),
(44, 31, 35, 34, 2),
(45, 32, 35, 1, 2),
(46, 32, 35, 2, 2);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `fullname` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(50) NOT NULL,
  `mobile` varchar(20) NOT NULL,
  `squestion` text,
  `answer` text
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `fullname`, `email`, `password`, `mobile`, `squestion`, `answer`) VALUES
(2, 'A!', 'a@a', '2345', '09999', 'a', 'a'),
(7, 'RR', 'r@r', '111', '12', 'What was the make and model of your first car?', '1288'),
(8, 'RR', 'r@r', '111', '12', 'What was the make and model of your first car?', '1288'),
(9, 'tt', 't@t', '1234', 'we', 'What was your favorite school teacher’s name?', '23'),
(10, 'sd', 'sd@sd', '11', '1211', 'In what city or town did your parents meet?', '12'),
(11, 'sd', 's@s', 's', 'ss', 'What was your favorite school teacher’s name?', 'ss'),
(12, 'Ram J', 'rr@r.com', '1234', '989989989', 'What was the make and model of your first car?', 'AABBB');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `booking`
--
ALTER TABLE `booking`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `events`
--
ALTER TABLE `events`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `seats`
--
ALTER TABLE `seats`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `booking`
--
ALTER TABLE `booking`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=34;

--
-- AUTO_INCREMENT for table `events`
--
ALTER TABLE `events`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=37;

--
-- AUTO_INCREMENT for table `seats`
--
ALTER TABLE `seats`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=47;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
