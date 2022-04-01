-- phpMyAdmin SQL Dump
-- version 4.8.4
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Dec 17, 2021 at 04:35 AM
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
(7, '2021-12-05 11:20:40', 23, 2, 'a@a', 1, 3, '3000.00', 0),
(8, '2021-12-08 14:53:07', 23, 1, 'a@a', 1, 2, '2000.00', 0),
(10, '2021-12-05 12:30:08', 22, 2, 'a@a', 1, 1, '0.00', 0),
(11, '2021-12-07 08:55:32', 25, 2, 'a@a', 1, 4, '848.00', 1),
(12, '2021-12-08 15:19:41', 26, 2, 'a@a', 1, 5, '1615.00', 1),
(13, '2021-12-16 11:01:53', 31, 12, 'rr@r.com', 1, 3, '699.00', 1),
(14, '2021-12-16 22:15:28', 34, 12, 'rr@r.com', 1, 4, '932.00', 1),
(15, '2021-12-16 22:35:09', 34, 12, 'rr@r.com', 1, 4, '932.00', 1);

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
  `filename` text
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `events`
--

INSERT INTO `events` (`id`, `title`, `hostby`, `etype`, `venue`, `dfrom`, `dto`, `cdetail`, `edescp`, `seats`, `price`, `no_slots`, `cname`, `status`, `filepath`, `filename`) VALUES
(28, 'dddsdfsdfds', 2, 2, 'sdds', '2021-12-22 00:00:00', '2021-12-22 00:00:00', '434', '434', 4, '43.00', 14, '32443', 0, NULL, NULL),
(29, 'Event 1234', 2, 2, 'ABC D ABCD ABC D', '2021-12-22 00:00:00', '2021-12-22 00:00:00', '32244', 'sdfsdfsd sdfsdc sdcwds', 100, '250.00', 2, 'Adsdds', 0, NULL, NULL),
(30, 'My EVENT', 2, 3, 'ABC ABC ABC ', '2021-12-17 00:00:00', '2021-12-17 00:00:00', '9893434994', ' This is user created event.This is user created event.This is user created event.This is user created event.This is user created event.\nThis is user created event.\n\nThis is user created event.\n\nThis is user created event.This is user created event.This is user created event.This is user created event.\n\nThis is user created event.This is user created event.', 15, '100.00', 1, 'Mr. ABC', 0, NULL, NULL),
(31, 'Another Event', 2, 2, 'sdfdsfds', '2021-12-23 00:00:00', '2021-12-23 00:00:00', 'e2esd', 'qweqw2321', 21, '233.00', 1, '23233', 2, NULL, NULL),
(32, 'New Movie', 2, 1, 'sdfsd', '2021-12-16 00:00:00', '2021-12-16 00:00:00', 'cdetail', 'sdfsdf', 22, '322.00', 2, '-', 0, NULL, NULL),
(33, 'Testing New Movie ', 12, 1, 'sdfdsf', '2021-12-23 00:00:00', '2021-12-23 00:00:00', 'cdetail', 'sdfdsfds', 233, '323.00', 12, '-', 0, NULL, NULL),
(34, 'Another MOVIE', 12, 1, 'sdfdsfsd', '2021-12-24 00:00:00', '2021-12-24 00:00:00', 'cdetail', 'dfsdfdsfs', 122, '233.00', 1, '-', 0, '/246286816_4936563586371577_216340040282617179_n.jpg', '246286816_4936563586371577_216340040282617179_n.jpg');

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `events`
--
ALTER TABLE `events`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=35;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
