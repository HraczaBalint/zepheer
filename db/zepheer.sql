-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Gép: 127.0.0.1
-- Létrehozás ideje: 2022. Jan 17. 15:44
-- Kiszolgáló verziója: 10.4.21-MariaDB
-- PHP verzió: 8.0.11

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Adatbázis: `zepheer`
--

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `encounters`
--

CREATE TABLE `encounters` (
  `encounter_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `user_id_rated` int(11) NOT NULL,
  `rating` tinyint(1) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- A tábla adatainak kiíratása `encounters`
--

INSERT INTO `encounters` (`encounter_id`, `user_id`, `user_id_rated`, `rating`, `created_at`) VALUES
(1, 1, 3, 1, '0000-00-00 00:00:00'),
(2, 3, 1, 1, '0000-00-00 00:00:00'),
(3, 2, 1, 1, '0000-00-00 00:00:00'),
(4, 1, 2, 0, '0000-00-00 00:00:00'),
(5, 1, 2, 3, '0000-00-00 00:00:00'),
(6, 1, 1, 0, '0000-00-00 00:00:00'),
(7, 1, 2, 0, '0000-00-00 00:00:00'),
(8, 1, 3, 0, '0000-00-00 00:00:00'),
(13, 1, 2, 1, '2022-01-17 14:31:27'),
(14, 1, 1, 0, '2022-01-17 14:31:38'),
(15, 1, 2, 0, '2022-01-17 14:31:40'),
(16, 1, 1, 0, '2022-01-17 14:31:44'),
(17, 1, 1, 0, '2022-01-17 14:31:45'),
(18, 1, 1, 0, '2022-01-17 14:31:45'),
(19, 1, 1, 0, '2022-01-17 14:31:54'),
(20, 1, 2, 0, '2022-01-17 14:31:55'),
(21, 1, 3, 0, '2022-01-17 14:31:55'),
(22, 1, 1, 0, '2022-01-17 14:32:00'),
(23, 1, 1, 0, '2022-01-17 14:32:01'),
(24, 1, 1, 0, '2022-01-17 14:32:01'),
(25, 1, 2, 0, '2022-01-17 14:32:01'),
(26, 1, 3, 0, '2022-01-17 14:32:01'),
(27, 1, 1, 0, '2022-01-17 14:32:18'),
(28, 1, 2, 0, '2022-01-17 14:32:19'),
(29, 1, 3, 0, '2022-01-17 14:32:20'),
(30, 1, 1, 0, '2022-01-17 14:33:02'),
(31, 1, 2, 0, '2022-01-17 14:33:02'),
(32, 1, 3, 0, '2022-01-17 14:33:03'),
(33, 1, 1, 1, '2022-01-17 14:35:41'),
(34, 1, 2, 1, '2022-01-17 14:35:41'),
(35, 1, 3, 1, '2022-01-17 14:35:42'),
(36, 1, 1, 1, '2022-01-17 14:35:49'),
(37, 1, 3, 1, '2022-01-17 14:35:49'),
(38, 1, 2, 1, '2022-01-17 14:35:49'),
(39, 1, 1, 1, '2022-01-17 14:35:52'),
(40, 1, 2, 1, '2022-01-17 14:35:52'),
(41, 1, 3, 1, '2022-01-17 14:35:53'),
(42, 1, 1, 0, '2022-01-17 14:35:56'),
(43, 1, 2, 0, '2022-01-17 14:35:56'),
(44, 1, 3, 0, '2022-01-17 14:35:56'),
(45, 1, 1, 0, '2022-01-17 14:36:57'),
(46, 1, 2, 0, '2022-01-17 14:36:57'),
(47, 1, 3, 0, '2022-01-17 14:36:58'),
(48, 1, 1, 0, '2022-01-17 14:37:23'),
(49, 1, 2, 0, '2022-01-17 14:37:24'),
(50, 1, 3, 0, '2022-01-17 14:37:24'),
(51, 1, 1, 0, '2022-01-17 14:37:34'),
(52, 1, 2, 1, '2022-01-17 14:37:35'),
(53, 1, 3, 0, '2022-01-17 14:37:35');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `matches`
--

CREATE TABLE `matches` (
  `match_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `user_id_matched` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- A tábla adatainak kiíratása `matches`
--

INSERT INTO `matches` (`match_id`, `user_id`, `user_id_matched`, `created_at`) VALUES
(2, 3, 1, '2021-12-08 18:48:37');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `messages`
--

CREATE TABLE `messages` (
  `message_id` int(11) NOT NULL,
  `match_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `message_text` varchar(511) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `pictures`
--

CREATE TABLE `pictures` (
  `picture_id` int(11) NOT NULL,
  `picture_name` varchar(63) NOT NULL,
  `user_id` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- A tábla adatainak kiíratása `pictures`
--

INSERT INTO `pictures` (`picture_id`, `picture_name`, `user_id`, `created_at`) VALUES
(1, 'fdgfdg.jpg', 3, '2022-01-16 20:11:44'),
(2, 'fgfg.jpg', 1, '2022-01-16 20:22:12'),
(3, 'ssdfdsf.jpg', 2, '2022-01-16 20:22:46'),
(4, 'hjjjghjhg.jpg', 1, '2022-01-16 20:22:59');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `tokens`
--

CREATE TABLE `tokens` (
  `token_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `token` varchar(1000) COLLATE utf8_unicode_ci DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- A tábla adatainak kiíratása `tokens`
--

INSERT INTO `tokens` (`token_id`, `user_id`, `token`, `created_at`) VALUES
(10, 1, '65b09b151d4379a5ac8de26c02f51a31688e96e150ebc831f3e6a0a62ade4759428881636c625b85222181176e7be5d10b9f704d09bc6fee7ad13fce55a9d697', '2022-01-16 20:20:12'),
(11, 9, '524f83f599d27531716499b9835d2057bb828226c4c4ee2bc6b60f872e2012c48b0c7349883b4c529e6c8be6fdc94b565ba409c36459bb2118908a168dce095a', '2022-01-17 13:58:08'),
(12, 9, 'd672ce472d6ceaac81d45fd0bf1dfe843fb017ff31c05fba2e17d4d21ee0314f8187ef304dd49cb5250caa0512aae59fdfc81ee4c9cffcdf07471a5758a5bf9c', '2022-01-17 14:40:42');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `users`
--

CREATE TABLE `users` (
  `user_id` int(11) NOT NULL,
  `user_name` varchar(31) NOT NULL,
  `user_password` varchar(515) NOT NULL,
  `user_email` varchar(63) NOT NULL,
  `user_gender` tinyint(1) NOT NULL,
  `user_gender_preference` tinyint(1) NOT NULL,
  `user_age` tinyint(2) NOT NULL,
  `user_age_preference` decimal(5,3) NOT NULL,
  `user_description` varchar(511) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- A tábla adatainak kiíratása `users`
--

INSERT INTO `users` (`user_id`, `user_name`, `user_password`, `user_email`, `user_gender`, `user_gender_preference`, `user_age`, `user_age_preference`, `user_description`, `created_at`, `updated_at`) VALUES
(1, 'Dani', 'asd123', 'balazs@gmail.com', 1, 0, 22, '20.768', 'Hello', '2022-01-17 14:17:37', '2022-01-17 14:17:37'),
(2, 'Ági', 'asd123', 'agi@gmail.com', 1, 0, 22, '20.768', 'Hello', '2022-01-17 14:17:37', '2022-01-17 14:17:37'),
(3, 'Sári', 'ujjelszo', 'sari@gmail.com', 1, 0, 22, '20.768', 'Hello', '2022-01-17 14:17:37', '2022-01-17 14:17:37'),
(9, '', '$2y$10$iPIgGulCktU1ID8MHmuVAOMqbNM.XwQfgXQdA3lKNsZGhQtBGdahC', 'test@gmail.com', 0, 0, 0, '0.000', '', '2022-01-17 14:17:37', '2022-01-17 14:17:37'),
(10, '', '$2y$10$lJE8OE7jT6LgM/HEonj6NurO7YEZm1cXe4Qsuh1aTK8Z.jG6acv9G', 'test2@gmail.com', 0, 0, 0, '0.000', '', '2022-01-17 14:42:09', '2022-01-17 14:42:09');

--
-- Indexek a kiírt táblákhoz
--

--
-- A tábla indexei `encounters`
--
ALTER TABLE `encounters`
  ADD PRIMARY KEY (`encounter_id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `user_id_rated` (`user_id_rated`);

--
-- A tábla indexei `matches`
--
ALTER TABLE `matches`
  ADD PRIMARY KEY (`match_id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `user_id_matched` (`user_id_matched`);

--
-- A tábla indexei `messages`
--
ALTER TABLE `messages`
  ADD PRIMARY KEY (`message_id`),
  ADD KEY `match_id` (`match_id`);

--
-- A tábla indexei `pictures`
--
ALTER TABLE `pictures`
  ADD PRIMARY KEY (`picture_id`),
  ADD KEY `user_id` (`user_id`);

--
-- A tábla indexei `tokens`
--
ALTER TABLE `tokens`
  ADD PRIMARY KEY (`token_id`),
  ADD KEY `user_id` (`user_id`);

--
-- A tábla indexei `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`),
  ADD UNIQUE KEY `user_email` (`user_email`);

--
-- A kiírt táblák AUTO_INCREMENT értéke
--

--
-- AUTO_INCREMENT a táblához `encounters`
--
ALTER TABLE `encounters`
  MODIFY `encounter_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=54;

--
-- AUTO_INCREMENT a táblához `matches`
--
ALTER TABLE `matches`
  MODIFY `match_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT a táblához `messages`
--
ALTER TABLE `messages`
  MODIFY `message_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT a táblához `pictures`
--
ALTER TABLE `pictures`
  MODIFY `picture_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT a táblához `tokens`
--
ALTER TABLE `tokens`
  MODIFY `token_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT a táblához `users`
--
ALTER TABLE `users`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- Megkötések a kiírt táblákhoz
--

--
-- Megkötések a táblához `encounters`
--
ALTER TABLE `encounters`
  ADD CONSTRAINT `encounters_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `encounters_ibfk_2` FOREIGN KEY (`user_id_rated`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Megkötések a táblához `matches`
--
ALTER TABLE `matches`
  ADD CONSTRAINT `matches_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `matches_ibfk_2` FOREIGN KEY (`user_id_matched`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Megkötések a táblához `messages`
--
ALTER TABLE `messages`
  ADD CONSTRAINT `messages_ibfk_1` FOREIGN KEY (`match_id`) REFERENCES `matches` (`match_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Megkötések a táblához `pictures`
--
ALTER TABLE `pictures`
  ADD CONSTRAINT `pictures_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Megkötések a táblához `tokens`
--
ALTER TABLE `tokens`
  ADD CONSTRAINT `tokens_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
