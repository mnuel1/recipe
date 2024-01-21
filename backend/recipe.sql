-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jan 20, 2024 at 08:57 PM
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
-- Database: `recipe`
--

-- --------------------------------------------------------

--
-- Table structure for table `comments`
--

CREATE TABLE `comments` (
  `id` int(11) NOT NULL,
  `comment` varchar(255) NOT NULL,
  `userId` int(11) NOT NULL,
  `recipeId` int(11) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `likes`
--

CREATE TABLE `likes` (
  `id` int(11) NOT NULL,
  `rating` float NOT NULL,
  `userId` int(11) NOT NULL,
  `recipeId` int(11) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `recipes`
--

CREATE TABLE `recipes` (
  `id` int(11) NOT NULL,
  `image` char(255) DEFAULT NULL,
  `name` varchar(255) NOT NULL,
  `calories` int(11) NOT NULL,
  `serving` int(11) NOT NULL,
  `difficulty` enum('Easy','Medium','Hard') NOT NULL,
  `meal` enum('Breakfast','Lunch','Meryenda','Dinner') NOT NULL,
  `prepTime` int(11) NOT NULL,
  `cookTime` int(11) NOT NULL,
  `ingredients` varchar(800) NOT NULL,
  `directions` varchar(800) NOT NULL,
  `description` varchar(800) NOT NULL,
  `userId` int(11) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `recipes`
--

INSERT INTO `recipes` (`id`, `image`, `name`, `calories`, `serving`, `difficulty`, `meal`, `prepTime`, `cookTime`, `ingredients`, `directions`, `description`, `userId`, `createdAt`, `updatedAt`) VALUES
(16, 'images/ak', 'Adobong Kangkong', 120, 4, 'Easy', 'Dinner', 15, 15, '1 bunch kangkong (water spinach), Cleaned and chopped,, 1/4 cup soy sauce ,, 1/4 cup vinegar ,,  1 onion, chopped ,  3 cloves garlic, minced ,,  1 tsp pepper ,,  1 tsp sugar ,,  2 tbsp cooking oil ', 'Step 1: In a pan, sauté garlic and onion until they\'re soft. ,,  Step 2: Add kangkong and cook until wilted. ,,  Step 3: Mix soy sauce, vinegar, pepper, and sugar. Pour over the kangkong and cook for an additional 5 minutes. ', '', 1, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(17, 'images/ap', 'Adobong Pusit', 300, 4, 'Medium', 'Dinner', 25, 40, ' 1 kg squid, cleaned and sliced ,,  1/2 cup soy sauce ,,  1/4 cup vinegar ,,  1 onion, minced ,,  4 cloves garlic, minced ,,  1 tsp peppercorns ,,  2 bay leaves ', ' Step 1: In a bowl, marinate squid in soy sauce, vinegar, onion, garlic, peppercorns, and bay leaves. Let it sit for 15 minutes. ,,  Step 2: In a pan, sauté the marinated squid until cooked and tender. ,,  Step 3: Serve hot and enjoy! ', '', 1, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(18, 'images/bt', 'Bistek Tagalog', 450, 4, 'Easy', 'Dinner', 15, 30, ' 1 kg beef sirloin, thinly sliced ,,  1/2 cup soy sauce ,,  1/4 cup calamansi juice ,,  1 onion, sliced into rings ,,  4 cloves garlic, minced ,,  1 tsp sugar ,  Salt and pepper for taste ', ' Step 1: In a bowl, marinate beef slices in soy sauce, calamansi juice, sugar, salt, and pepper. Let it sit for 15 minutes. ,,  Step 2: In a pan, heat oil and sauté garlic until golden brown. Remove garlic and set aside. ,,  Step 3: In the same pan, fry marinated beef until browned. Add onions and cook until softened. ,  Step 4: Serve hot, garnished with fried garlic. ', '', 1, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(19, 'images/ccb', 'Canned Corned Beef', 300, 2, 'Easy', 'Lunch', 5, 10, ' 1 can corned beef ,,  1 onion, chopped ,,  3 cloves garlic, minced ,,  2 tbsp cooking oil ,  Salt and pepper for taste ', ' Step 1: In a pan, sauté garlic and onion in cooking oil until they\'re soft and fragrant. ,,  Step 2: Add canned corned beef and cook until it\'s slightly browned. ,,  Step 3: Season with salt and pepper. Serve hot and enjoy with rice or bread. ', '', 1, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(20, 'images/fh', 'Fried Hotdogs', 250, 4, 'Easy', 'Meryenda', 10, 15, ' 8 pcs hotdogs ,,  2 tbsp cooking oil ,  Ketchup and mustard for dipping (optional) ', ' Step 1: Heat oil in a pan over medium heat. ,,  Step 2: Add hotdogs and fry until they are golden brown on all sides. ,,  Step 3: Serve hot with your favorite condiments like ketchup and mustard. ', '', 1, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(21, 'images/b', 'Inihaw na Bangus', 280, 4, 'Easy', 'Dinner', 30, 20, ' 2 pcs milkfish (bangus), cleaned and butterflied ,,  1/2 cup soy sauce ,,  1/4 cup calamansi juice ,,  4 cloves garlic, minced ,,  1 tsp pepper ,,  Banana leaves for wrapping ', ' Step 1: In a bowl, mix soy sauce, calamansi juice, minced garlic, and pepper to create the marinade. ,,  Step 2: Rub the marinade on both sides of the milkfish. Let it marinate for at least 15 minutes. ,,  Step 3: Grill the milkfish in banana leaves until cooked, occasionally basting with the marinade. ', '', 1, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(22, 'images/ir', 'Instant Ramen', 400, 1, 'Easy', 'Meryenda', 2, 5, ' 1 packet instant ramen noodles ,,  2 cups water ,,  1 egg (optional) ,,  Soy sauce and green onions for garnish ', ' Step 1: Boil water in a pot and cook the instant ramen noodles according to the package instructions. ,,  Step 2: If desired, add an egg to the boiling noodles and cook until the egg is done to your liking. ,,  Step 3: Remove from heat, garnish with soy sauce and green onions. Serve hot. ', '', 1, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(23, 'images/km', 'Kinalabasang Manok', 350, 4, 'Medium', 'Lunch', 20, 45, ' 1 kg chicken, cut into serving pieces ,,  1 banana heart, sliced ,,  1 cup coconut milk ,,  1 onion, chopped ,,  3 cloves garlic, minced ,,  1 ginger, sliced ,,  Salt and pepper for taste ', ' Step 1: In a pot, sauté garlic, onion, and ginger until fragrant. ,,  Step 2: Add chicken pieces and cook until they\'re slightly browned. ,,  Step 3: Add banana heart, coconut milk, salt, and pepper. Simmer until the chicken is cooked and the banana heart is tender. ', '', 1, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(24, 'images/lb', 'La Paz Batchoy', 400, 4, 'Medium', 'Lunch', 30, 45, ' 400g pork offal (liver, kidney, heart), sliced ,,  300g pork meat, thinly sliced ,,  200g miki noodles ,,  1 onion, minced ,,  4 cloves garlic, minced ,,  1 tbsp fish sauce ,,  2 hard-boiled eggs, sliced ,,  Chopped green onions and fried garlic for garnish ', ' Step 1: In a pot, sauté garlic and onion until they\'re soft. ,,  Step 2: Add pork offal and pork meat. Cook until browned. ,,  Step 3: Add fish sauce and enough water to cover the meat. Simmer until the meat is tender. ,,  Step 4: Cook miki noodles according to package instructions. Drain. ,,  Step 5: Assemble by placing noodles in a bowl, adding the meat mixture, and topping with sliced eggs, green onions, and fried garlic. ', '', 1, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(25, 'images/pm', 'Pancit Malabon', 380, 4, 'Medium', 'Lunch', 25, 30, ' 400g thick rice noodles (bihon Malabon) ,,  200g cooked shrimp, peeled and deveined ,,  200g smoked fish flakes (tinapa) ,,  1 cup ground pork, cooked ,,  1 cup chicharrón (pork cracklings), crushed ,,  4 hard-boiled eggs, sliced ,,  1/2 cup annatto (achuete) oil ,,  4 cloves garlic, minced ,,  1 onion, chopped ,,  Fish sauce and pepper to taste ,,  Chopped green onions and calamansi wedges for garnish ', ' Step 1: Cook rice noodles according to package instructions. Set aside. ,,  Step 2: In a pan, sauté garlic and onion until they\'re soft. ,,  Step 3: Add ground pork and cook until browned. Season with fish sauce and pepper. ,,  Step 4: Assemble by placing noodles on a serving plate, topping with shrimp, smoked fish flakes, cooked pork, crushed pork cracklings, and sliced eggs. ,,  Step 5: Drizzle with annatto oil and garnish with chopped green onions. Serve with calamansi wedges. ', '', 1, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(26, 'images/pmanok', 'Pinaupong Manok', 300, 4, 'Medium', 'Lunch', 30, 45, ' 1 whole chicken, cleaned ,,  1/2 cup rock salt ,,  2 bundles lemongrass (tanglad) ,,  4 cups water ,,  3 cloves garlic, minced ,,  1 onion, sliced ', ' Step 1: Rub chicken with rock salt, making sure to season it well. ,,  Step 2: In a pot, place lemongrass and water. Set a rack or improvised stand and position the chicken on it. ,,  Step 3: Steam the chicken for 30-40 minutes or until fully cooked. Serve hot with garlic and onion on top. ', '', 1, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(27, 'images/se', 'Scrambled Egg', 120, 2, 'Easy', 'Breakfast', 3, 5, ' 4 eggs ,,  2 tbsp milk ,,  Salt and pepper to taste ,,  2 tbsp butter ', ' Step 1: In a bowl, beat eggs with milk. Season with salt and pepper. ,,  Step 2: Heat butter in a pan over medium-low heat. ,,  Step 3: Pour the egg mixture into the pan and stir continuously until the eggs are cooked but still soft. Serve hot. ', '', 1, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(28, 'images/sm', 'Sinampalukang Manok', 350, 4, 'Medium', 'Dinner', 20, 45, ' 1 kg chicken, cut into serving pieces ,,  2 cups young tamarind leaves ,,  1 onion, chopped ,,  4 cloves garlic, minced ,,  1 ginger, sliced ,,  1 tbsp fish sauce ,,  Salt and pepper to taste ', ' Step 1: In a pot, sauté garlic, onion, and ginger until fragrant. ,,  Step 2: Add chicken pieces and cook until they\'re slightly browned. ,,  Step 3: Add young tamarind leaves, fish sauce, salt, and pepper. Simmer until the chicken is cooked and the flavors meld. ', '', 1, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(29, 'images/s', 'Sinangag na Kanin', 150, 4, 'Easy', 'Lunch', 15, 20, ' 4 cups cooked rice, preferably day-old ,,  4 cloves garlic, minced ,,  2 tbsp cooking oil ,,  Salt to taste ', ' Step 1: In a pan, heat cooking oil and sauté garlic until golden brown. ,,  Step 2: Add cooked rice and toss until well-coated with garlic and oil. ,,  Step 3: Season with salt to taste. Serve hot as a delicious side dish. ', '', 1, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(30, 'images/ssu', 'Sunny Side Up Egg', 70, 1, 'Easy', 'Breakfast', 2, 5, ' 1 egg ,,  1 tbsp cooking oil ,,  Salt and pepper to taste ', ' Step 1: Heat oil in a pan over medium-low heat. ,,  Step 2: Crack the egg into the pan, taking care not to break the yolk. ,,  Step 3: Cook until the egg white is set but the yolk remains runny. Season with salt and pepper. Serve hot. ', '', 1, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(36, 'images/champurado', 'Champurado', 300, 1, 'Medium', 'Breakfast', 10, 20, '1 cup glutinous rice,, 4 cups water,, 1/2 cup cocoa powder,, 1 cup sugar,, 1/2 cup evaporated milk', 'Step 1: Rinse glutinous rice under cold water until the water runs clear.,, Step 2: Combine rice and water in a pot, bring to a boil.,, Step 3: Reduce heat and simmer until rice is tender, stirring occasionally.,, Step 4: Add cocoa powder and sugar, stir until well combined.,, Step 5: Continue to simmer until the mixture thickens.,, Step 6: Pour in evaporated milk and stir until fully incorporated.,, Step 7: Simmer for an additional 5 minutes.,, Step 8: Serve hot and enjoy your Champurado!', '', 1, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(37, 'images/tapsilog', 'Tapsilog', 500, 1, 'Medium', 'Breakfast', 15, 20, '200g beef sirloin,, thinly sliced,, 2 cups cooked rice,, 1 fried egg,, 2 tablespoons soy sauce,, 1 tablespoon vinegar,, 1 clove garlic, minced,, Salt and pepper to taste', 'Step 1: Marinate beef slices in soy sauce, vinegar, minced garlic, salt, and pepper for 15 minutes.,, Step 2: Heat oil in a pan.,, Step 3: Fry the marinated beef until browned and cooked to your liking.,, Step 4: In a separate pan, cook a fried egg to your preference.,, Step 5: Serve the beef over a bed of rice with a fried egg on top.,, Step 6: Enjoy your Tapsilog!', '', 1, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(38, 'images/sinigang', 'Sinigang', 400, 1, 'Medium', 'Lunch', 20, 45, '500g pork ribs,, 1 large radish, sliced,, 1 eggplant, sliced,, 1 bunch string beans, cut into 2-inch pieces,, 1 packet sinigang mix,, 1 medium-sized onion, sliced,, 2 liters water,, Salt and pepper to taste', 'Step 1: In a pot, bring water to a boil.,, Step 2: Add pork ribs and simmer until meat is tender, about 20 minutes.,, Step 3: Add radish, eggplant, string beans, and sliced onions.,, Step 4: Simmer until vegetables are tender.,, Step 5: Stir in sinigang mix, salt, and pepper.,, Step 6: Adjust seasoning according to taste.,, Step 7: Serve hot and enjoy your Sinigang!', '', 1, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(39, 'images/bilo-bilo', 'Bilo-bilo', 200, 1, 'Hard', 'Meryenda', 30, 30, '1 cup glutinous rice flour,, 1/2 cup water,, 1/2 cup sweet potato, cubed,, 1/2 cup banana, sliced,, 1/2 cup jackfruit, sliced,, 1/2 cup tapioca pearls,, 4 cups coconut milk,, 1 cup brown sugar,, 1 pandan leaf', 'Step 1: Mix glutinous rice flour with water to form a dough.,, Step 2: Shape into small balls (bilo-bilo).,, Step 3: In a pot, combine coconut milk, pandan leaf, and brown sugar.,, Step 4: Bring to a simmer.,, Step 5: Add sweet potato, banana, jackfruit, and tapioca pearls.,, Step 6: Cook until fruits and pearls are tender.,, Step 7: Drop bilo-bilo into the pot and cook until they float to the surface., Step 8: Serve hot and enjoy your Bilo-bilo!', '', 1, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(40, 'images/pork-bistek', 'Pork Bistek', 600, 1, 'Easy', 'Dinner', 15, 30, '500g pork belly, sliced,, 1/2 cup soy sauce,, 1/4 cup calamansi juice,, 1 large onion, sliced into rings,, 3 cloves garlic,, minced, 1 tsp sugar,, Salt and pepper to taste,, Cooking oil for frying', 'Step 1: Marinate pork slices in soy sauce, calamansi juice, minced garlic, sugar, salt, and pepper for 15 minutes.,, Step 2: Heat oil in a pan.,, Step 3: Fry marinated pork until browned and crispy.,, Step 4: Set aside.,, Step 5: In the same pan, sauté sliced onions until softened.,, Step 6: Add the fried pork back to the pan.,, Step 7: Stir well to combine all flavors., Step 8: Serve hot and enjoy your Pork Bistek!', '', 1, '0000-00-00 00:00:00', '0000-00-00 00:00:00');

-- --------------------------------------------------------

--
-- Table structure for table `replies`
--

CREATE TABLE `replies` (
  `id` int(11) NOT NULL,
  `comment` varchar(255) NOT NULL,
  `commentId` int(11) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `sessions`
--

CREATE TABLE `sessions` (
  `sid` varchar(36) NOT NULL,
  `expires` datetime DEFAULT NULL,
  `data` text DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `username`, `password`, `createdAt`, `updatedAt`) VALUES
(1, 'admin', 'admin', '$2b$10$DP3bZLGASLkhzAlHK79hiet5Ea8EZdwcOFWALtQB4BfiiL8fvYoEG', '2024-01-20 17:42:03', '2024-01-20 17:42:03');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `comments`
--
ALTER TABLE `comments`
  ADD PRIMARY KEY (`id`),
  ADD KEY `userId` (`userId`),
  ADD KEY `recipeId` (`recipeId`);

--
-- Indexes for table `likes`
--
ALTER TABLE `likes`
  ADD PRIMARY KEY (`id`),
  ADD KEY `userId` (`userId`),
  ADD KEY `recipeId` (`recipeId`);

--
-- Indexes for table `recipes`
--
ALTER TABLE `recipes`
  ADD PRIMARY KEY (`id`),
  ADD KEY `userId` (`userId`);

--
-- Indexes for table `replies`
--
ALTER TABLE `replies`
  ADD PRIMARY KEY (`id`),
  ADD KEY `commentId` (`commentId`);

--
-- Indexes for table `sessions`
--
ALTER TABLE `sessions`
  ADD PRIMARY KEY (`sid`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `comments`
--
ALTER TABLE `comments`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `likes`
--
ALTER TABLE `likes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `recipes`
--
ALTER TABLE `recipes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=41;

--
-- AUTO_INCREMENT for table `replies`
--
ALTER TABLE `replies`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `comments`
--
ALTER TABLE `comments`
  ADD CONSTRAINT `comments_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `comments_ibfk_2` FOREIGN KEY (`recipeId`) REFERENCES `recipes` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `likes`
--
ALTER TABLE `likes`
  ADD CONSTRAINT `likes_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `likes_ibfk_2` FOREIGN KEY (`recipeId`) REFERENCES `recipes` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `recipes`
--
ALTER TABLE `recipes`
  ADD CONSTRAINT `recipes_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `replies`
--
ALTER TABLE `replies`
  ADD CONSTRAINT `replies_ibfk_1` FOREIGN KEY (`commentId`) REFERENCES `comments` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
