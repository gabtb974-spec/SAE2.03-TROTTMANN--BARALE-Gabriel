-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Hôte : localhost
-- Généré le : jeu. 07 mai 2026 à 16:12
-- Version du serveur : 10.11.14-MariaDB-0+deb12u2
-- Version de PHP : 8.3.24

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `trottmannbara1`
--

-- --------------------------------------------------------
CREATE DATABASE IF NOT EXISTS `SAE203`DEFAULT CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci; USE `SAE203`;
--
-- Structure de la table `Category`
--

CREATE TABLE `Category` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

--
-- Déchargement des données de la table `Category`
--

INSERT INTO `Category` (`id`, `name`) VALUES
(1, 'Action'),
(2, 'Comédie'),
(3, 'Drame'),
(4, 'Science-fiction'),
(5, 'Animation'),
(6, 'Thriller'),
(7, 'Horreur'),
(8, 'Aventure'),
(9, 'Fantaisie'),
(10, 'Documentaire');

-- --------------------------------------------------------

--
-- Structure de la table `Favorite`
--

CREATE TABLE `Favorite` (
  `id` int(11) NOT NULL,
  `profile_id` int(11) NOT NULL,
  `movie_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

--
-- Déchargement des données de la table `Favorite`
--

INSERT INTO `Favorite` (`id`, `profile_id`, `movie_id`) VALUES
(1, 3, 7);

-- --------------------------------------------------------

--
-- Structure de la table `Movie`
--

CREATE TABLE `Movie` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `year` int(11) DEFAULT NULL,
  `length` int(11) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `director` varchar(255) DEFAULT NULL,
  `id_category` int(11) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `trailer` varchar(255) DEFAULT NULL,
  `min_age` int(11) DEFAULT NULL,
  `is_featured` tinyint(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

--
-- Déchargement des données de la table `Movie`
--

INSERT INTO `Movie` (`id`, `name`, `year`, `length`, `description`, `director`, `id_category`, `image`, `trailer`, `min_age`, `is_featured`) VALUES
(7, 'Interstellar', 2014, 169, 'Un groupe d\'explorateurs voyage à travers un trou de ver pour sauver l\'humanité.', 'Christopher Nolan', 4, 'interstellar.jpg', 'https://www.youtube.com/embed/VaOijhK3CRU?si=76Ke4uw4LYjuLuQ6', 12, NULL),
(12, 'La Liste de Schindler', 1993, 195, 'Un industriel allemand sauve des milliers de Juifs pendant l\'Holocauste.', 'Steven Spielberg', 3, 'schindler.webp', 'https://www.youtube.com/embed/ONWtyxzl-GE?si=xC3ASGGPy5Ib-aPn', 16, NULL),
(17, 'Your Name', 2016, 107, 'Deux adolescents échangent leurs corps de manière mystérieuse.', 'Makoto Shinkai', 5, 'your_name.jpg', 'https://www.youtube.com/embed/AROOK45LXXg?si=aUQyGk2VMCb_ToUL', 10, NULL),
(27, 'Le Bon, la Brute et le Truand', 1966, 161, 'Trois hommes se lancent à la recherche d\'un trésor caché.', 'Sergio Leone', 8, 'bon_brute_truand.jpg', 'https://www.youtube.com/embed/WA1hCZFOPqs?si=TwNZAoM4oj4KpGja', 12, NULL),
(32, 'qsfsqfqs', 1999, 50, 'sdqsdqsdsq', 'fsqfqs', 1, 's-l1200.jpg', 'qsdqsdq', 18, NULL),
(33, 'Pirates des Caraïbes', 2003, 143, 'Pour secourir Elizabeth Swann, enlevée par un équipage de pirates maudits, le pirate Jack Sparrow et le forgeron Will Turner s\'allient dans une course-poursuite périlleuse à travers les Caraïbes pour lever une malédiction surnaturelle.', 'Gore Verbinski', 8, 'jFmc6zbnx6mSoxejECYvdi3IHIs.webp', 'https://www.youtube.com/embed/uYPbbksJxIg?si=lcOJQ_xm-cQj5NaW', 10, NULL),
(34, 'Joker', 2019, 122, 'L’histoire sombre d’un homme marginal qui devient le célèbre criminel Joker.', 'Todd Phillips', 3, 'tWjJ3ILjsbTwKgXxEv48QAbYZ19.webp', 'https://www.youtube.com/embed/HL3EuCbcOAo?si=uIYD5zHs_AR2EIgB', 16, NULL),
(35, 'Pacific Rim', 2013, 130, 'Face à l\'invasion de monstrueux Kaiju, l\'humanité déploie les Jaegers, des robots géants pilotés par deux humains en symbiose télépathique. Pour éviter une extinction imminente, un pilote brisé et une apprentie font équipe aux commandes d\'une machine légendaire, devenant le dernier espoir pour sauver le monde.', 'Guillermo del Toro', 4, 'g1vCUUxa9MJw2kEEgaTAW5b23xh.webp', 'https://www.youtube.com/watch?v=tL7dIYEI4os', 0, 1),
(36, 'Pacific Rim : Uprising', 2018, 111, 'e conflit planétaire qui oppose les Kaiju, créatures extraterrestres, aux Jaegers, robots géants pilotés par des humains, n’était que la première vague d’une attaque massive contre l’Humanité. Jake Pentecost, un jeune pilote de Jaeger prometteur dont le célèbre père a sacrifié sa vie pour sauver l’Humanité des monstrueux Kaiju a depuis abandonné son entraînement et s’est retrouvé pris dans l’engrenage du milieu criminel.', 'Steven S. DeKnight', 4, 'g9d0PK7PgaoNs6kSBKnjeYmPBfF.webp', 'https://www.youtube.com/watch?v=dpDN0CIoVV0', 12, NULL),
(37, 'Godzilla', 2014, 116, 'Le physicien Joseph Brody a perdu sa femme il y a 15 ans quand un incident nucléaire a irradié la région de Tokyo. La thèse officielle parle de tremblement de terre mais le scientifique est sceptique et mène son enquête avec son fils Ford, soldat dans la Navy. En fait de catastrophe naturelle, il s\'agit plutôt des dégâts d\'une créature gigantesque créée à la suite d\'essais nucléaires dans le Pacifique. D\'autres monstres menacent l\'archipel d\'Hawaï et la côte Ouest des États-Unis. L\'armée est mobilisée et menée par l\'Amiral William Stenz. Au même moment, la compagne de Ford, infirmière et jeune maman, gère les blessés dans un hôpital de San Francisco…', 'Gareth Edwards', 4, 'tphkjmQq8WebuVwNXelmjLUXuPJ.jpg', 'https://www.youtube.com/watch?v=sNpYD4s7GFo', 0, 1),
(38, 'Le Seigneur des anneaux : La Communauté de l\'anneau', 2001, 179, 'Le jeune hobbit Frodon Sacquet hérite d\'un anneau. Il s\'agit de l\'Anneau Unique, instrument de pouvoir absolu qui permettrait à Sauron, de régner sur la Terre du Milieu et de réduire en esclavage ses peuples… À moins que Frodon et ses fidèles compagnons ne parviennent à emporter l\'Anneau jusqu\'en Mordor, lieu où il a été forgé, et à le détruire pour toujours…', 'Peter Jackson', 9, '5OPg6M0yHr21Ovs1fni2H1xpKuF.webp', 'https://www.themoviedb.org/movie/120-the-lord-of-the-rings-the-fellowship-of-the-ring?language=fr#play=uEMJ_yr4x0w', 0, NULL),
(40, 'Le Seigneur des anneaux : Le Retour du roi', 2003, 201, 'La bataille pour la Terre du Milieu a commencé. Frodon et Sam, guidés par Gollum, poursuivent leur mission à travers les terres du Mordor pour détruire l\'Anneau Unique. Tandis que le pouvoir de Sauron grandit, Aragorn, l\'héritier du trône du Gondor, rassemble l\'armée des Hommes contre les forces du Mal, afin de laisser une chance au porteur de l\'Anneau d\'accomplir sa quête…', 'Peter Jackson', 9, 'ypUCFOvOf07bcHy81jng9LyMUfi.webp', 'https://www.youtube.com/watch?v=HQRTu6kgvmU', 12, NULL),
(41, 'Le Seigneur des anneaux : Les Deux Tours', 2002, 180, 'La Communauté est dissoute, mais la quête pour détruire l\'Anneau Unique se poursuit. Accompagné par son fidèle Sam et guidé par l\'étrange Gollum, Frodon cherche un moyen d\'entrer en Mordor. Alors que l\'armée de Saroumane se met en marche, les autres compagnons de la Communauté se préparent à la bataille. La Guerre de l\'Anneau a commencé !', 'Peter Jackson', 9, 'qVHBqQYLDRs7ESjP9q6o9iPHLWj.webp', 'https://www.youtube.com/watch?v=wqMsK0KyZi8', 0, 1),
(42, 'Godzilla II : Roi des Monstres', 2019, 132, 'L\'agence crypto-zoologique Monarch doit faire face à une vague de monstres titanesques, comme Godzilla, Mothra, Rodan et surtout le redoutable roi Ghidorah à trois têtes. Un combat sans précédent entre ces créatures considérées jusque-là comme chimériques menace d\'éclater. Alors qu\'elles cherchent toutes à dominer la planète, l\'avenir même de l\'humanité est en jeu…', 'Michael Dougherty', 4, '5cf5cgTrZyZAXOGQTepPaHLWMt8.webp', 'https://www.youtube.com/watch?v=WapM6Gnqggw', 12, NULL),
(43, 'Godzilla vs. Kong', 2021, 113, 'À une époque où les monstres parcourent la Terre, et alors que l’humanité lutte pour son avenir, Godzilla et King Kong, les deux forces les plus puissantes de la nature, entrent en collision dans une bataille spectaculaire inédite. Alors que Monarch se lance dans une mission périlleuse en terrain inconnu, et qu’il découvre des indices sur les origines des Titans, un complot humain menace d’éradiquer ces créatures – qu’elles soient bonnes ou mauvaises – de la surface de la planète.', 'Adam Wingard', 4, '4bTShLVFnVKK31cowgjdAIZV84T.webp', 'https://www.youtube.com/watch?v=0534Kt-Obv0', 0, NULL),
(44, 'Godzilla x Kong : Le Nouvel Empire', 2024, 115, 'Le surpuissant Kong et le redoutable Godzilla sont opposés à une force colossale terrée dans notre monde, qui menace leur existence et la nôtre. \"Godzilla x Kong : Le Nouvel Empire\" approfondit l\'histoire de ces titans et leurs origines, ainsi que les mystères de Skull Island et au-delà, tout en levant le voile sur la bataille mythique qui a forgé ces êtres extraordinaires et les a liés à l\'humanité à jamais.', 'Adam Wingard', 4, 'nKnWr062zhRvk48NtK27zz3oLgS.webp', 'https://www.youtube.com/watch?v=A_bERKuGCJM&source_ve_path=MjM4NTE&embeds_referring_euri=https%3A%2F%2Fwww.themoviedb.org%2F&embeds_referring_origin=https%3A%2F%2Fwww.themoviedb.org', 0, NULL),
(45, 'Django Unchained', 2012, 165, 'Dans le sud des États-Unis, deux ans avant la guerre de Sécession, le chasseur de primes d\'origine allemande, le Dr King Schultz, fait l\'acquisition de Django, un esclave qui peut l\'aider à traquer les frères Brittle. En échange, Schultz promet de libérer Django et de l\'aider à retrouver sa femme, Broomhilda, retenue par le redoutable propriétaire d\'une plantation, Calvin Candie.', 'Quentin Tarantino', 1, 'jiLmLrkZMVGIWexQyQU5urDdxCH.jpg', 'https://www.youtube.com/embed/0fUCuvNlOCg?si=ZKmmiNlWSJxD5fZq', 16, 0),
(46, 'Super Mario Galaxy, le film', 2026, 99, 'À peine installés au Royaume Champignon, un mystérieux appel à l\'aide va pousser Mario et Luigi à reprendre du service et plonger dans les zones d’ombre du passé de la princesse Peach. Une mission qui va propulser nos héros et leur nouvelle constellation d’amis, très loin de chez eux, à travers un périple intergalactique, à la découverte de nouveaux mondes où se forgeront des alliances pour le moins inattendues.', 'Matthew Fogel', 5, 'aSQktALDmbunDbwkuZbZFMEWVFr.webp', 'https://www.youtube.com/embed/BHRN7Oufjw4?si=vwajVGtRqbUUNsIf', 0, 1),
(47, 'Star Wars, épisode I : La Menace fantôme', 1999, 136, 'Avant de devenir un célèbre chevalier Jedi, et bien avant de se révéler l\'âme la plus noire de la galaxie, Anakin Skywalker est un jeune esclave sur la planète Tatooine. La Force est déjà puissante en lui et il est un remarquable pilote de Podracer. Le maître Jedi Qui-Gon Jinn le découvre et entrevoit alors son immense potentiel. Pendant ce temps, l\'armée de droïdes de l\'insatiable Fédération du Commerce a envahi Naboo dans le cadre d\'un plan secret des Sith visant à accroître leur pouvoir.', 'George Lucas', 4, 'fpEC910v5DrMvZteRNlKzXeHiHY.jpg', 'https://www.youtube.com/embed/bD7bpG-zDJQ?si=W5B7P99yUqF1SWtJ', 0, 1),
(48, 'James Bond Skyfall', 2012, 143, 'Lorsqu’une mission tourne mal à Istanbul, James Bond est porté disparu et présumé mort. Peu après, le MI6 subit une attaque informatique qui vise directement M, révélant qu’un ennemi intime connaît ses secrets et cherche à la détruire. Bond réapparaît et reprend du service malgré une condition physique affaiblie, déterminé à identifier l’auteur de ces attaques.\r\n\r\nSon enquête le mène jusqu’à Raoul Silva, ancien agent du MI6 devenu cyber‑terroriste, animé par une vengeance personnelle contre M. Pour protéger son service et affronter ce passé qui ressurgit, Bond doit repousser ses limites et revenir sur les traces de son enfance, jusqu’au manoir familial de Skyfall, où se joue l’affrontement final.', 'Sam Mendes', 1, 'nNFECkwmrYoUQ17EnPTcSlRictV.webp', 'https://www.youtube.com/embed/6kw1UVovByw?si=wogrRbNA36Iywf9E', 12, NULL),
(49, 'Le Diable s\'habille en Prada 2', 2026, 119, 'Près de vingt ans après, Meryl Streep, Anne Hathaway, Emily Blunt et Stanley Tucci reprennent leurs rôles emblématiques de Miranda, Andy, Emily et Nigel, et nous replongent dans l’univers impitoyable et glamour du magazine Runway et des rues new-yorkaises où l’élégance est une arme redoutable.', 'David Frankel', 3, 'pD5fSVgDW2L5993eAlDd2GFXwIp.webp', 'https://www.youtube.com/watch?v=N8VuVMl9xq4&source_ve_path=MjM4NTE&embeds_referring_euri=https%3A%2F%2Fwww.themoviedb.org%2F&embeds_referring_origin=https%3A%2F%2Fwww.themoviedb.org', 0, NULL),
(50, 'Titanic', 1997, 194, 'Southampton, 10 avril 1912. Le paquebot le plus grand et le plus moderne du monde, réputé pour son insubmersibilité, le \"Titanic\", appareille pour son premier voyage. Quatre jours plus tard, il heurte un iceberg. A son bord, un artiste pauvre et une grande bourgeoise tombent amoureux.', 'James Cameron', 3, '811lT7khIrL.jpg', 'https://www.youtube.com/embed/CHekzSiZjrY?si=TW7cGyQ78jHwp2km', 12, NULL),
(51, 'Bee Movie', 2007, 91, 'Une abeille intente un procès contre les humains pour exploitation du miel.', 'Simon J. Smith, Steve Hickner', 5, '18807204.jpg', 'https://www.youtube.com/embed/VONRQMx78YI?si=v1xnIcLjeu3i18a-', 0, NULL),
(52, 'Dragons', 2010, 98, 'Un jeune Viking se lie d’amitié avec un dragon, changeant la vision de son peuple.', 'Chris Sanders, Dean DeBlois', 5, '19343191.jpg', 'https://www.youtube.com/embed/8rR_zgI-cmk?si=5looR7YRSDI4HlRt', 0, NULL),
(53, 'Kung fu panda', 2008, 132, 'Un panda maladroit devient un maître du kung-fu pour sauver la vallée de la paix.', 'Mark Osborne', 5, '18944269.jpg', 'https://www.youtube.com/embed/PXi3Mv6KMzY?si=bZecgzuHoYRfZieg', 0, NULL),
(54, 'Sonic 1, le film', 2020, 99, 'L\'histoire du hérisson bleu le plus rapide du monde qui arrive sur Terre, sa nouvelle maison. Sonic et son nouveau meilleur ami Tom font équipe pour sauver la planète du diabolique Dr. Robotnik, bien déterminé à régner sur le monde entier.', 'Jeff Fowler', 8, '0746079.jpg', 'https://www.youtube.com/embed/szby7ZHLnkA?si=H1AHTqHHQvM97Yo_', 0, NULL),
(55, 'Sonic 2, le film', 2022, 122, 'Bien installé dans la petite ville de Green Hills, Sonic veut maintenant prouver qu’il a l’étoffe d\' un véritable héros. Un défi de taille se présente à lui quand le Dr Robotnik refait son apparition. Accompagné de son nouveau complice Knuckles, ils sont en quête d’une émeraude dont le pouvoir permettrait de détruire l’humanité toute entière. Pour s’assurer que l’émeraude ne tombe entre de mauvaises mains, Sonic fait équipe avec Tails. Commence alors un voyage à travers le monde, plein de péripéties.', 'Jeff Fowler', 8, '4137538.jpg', 'https://www.youtube.com/embed/G5kzUpWAusI?si=mCmGW5k7YT2XYVDI', 0, NULL),
(56, 'Sonic 3, le film', 2024, 109, 'Sonic, Knuckles et Tails se retrouvent face à un nouvel adversaire, Shadow, mystérieux et puissant ennemi aux pouvoirs inédits. Dépassée sur tous les plans, la Team Sonic va devoir former une alliance improbable pour tenter d’arrêter Shadow et protéger notre planète.', 'Jeff Fowler', 8, '85e77c51c172da4aec13679210295a11.jpg', 'https://www.youtube.com/embed/qSu6i2iFMO0?si=-hcAWWSTQLedm69Z', 0, NULL),
(57, 'Inglourious Basterds', 2009, 153, 'Dans la France occupée, le lieutenant Aldo Raine forme un commando de soldats juifs pour terroriser les nazis par des méthodes brutales. En parallèle, Shosanna Dreyfus, rescapée du massacre de sa famille par le colonel Hans Landa, gère un cinéma à Paris sous une fausse identité. Les deux destins se rejoignent lors d\'une première de film où l\'élite du Troisième Reich est réunie. Shosanna et les Basterds tentent alors, chacun de leur côté, d\'éliminer les hauts dirigeants allemands pour mettre fin à la guerre.', 'Quentin Tarantino', 1, '7736093674_2e8414a35_OK_WEB.webp', 'https://www.youtube.com/embed/KnrRy6kSFF0', 16, NULL),
(58, 'Top Gun', 1986, 110, 'Jeune as du pilotage et tête brûlée d\'une école réservée à l\'élite de l\'aéronavale US (\"Top Gun\"), Pete Mitchell, dit \"Maverick\", tombe sous le charme d\'une instructrice alors qu\'il est en compétition pour le titre du meilleur pilote...', 'Jim Cash, Jack Epps Jr.', 1, '262811.jpg', 'https://www.youtube.com/embed/xa_z57UatDY?si=pZuh4guhgxVrxRNA', 12, NULL),
(59, 'Top Gun: Maverick', 2022, 131, 'Après avoir été l’un des meilleurs pilotes de chasse de la Marine américaine pendant plus de trente ans, Pete “Maverick\" Mitchell continue à repousser ses limites en tant que pilote d\'essai. Il refuse de monter en grade, car cela l’obligerait à renoncer à voler. Il est chargé de former un détachement de jeunes diplômés de l’école Top Gun pour une mission spéciale qu’aucun pilote n\'aurait jamais imaginée. Lors de cette mission, Maverick rencontre le lieutenant Bradley “Rooster” Bradshaw, le fils de son défunt ami, le navigateur Nick “Goose” Bradshaw. Face à un avenir incertain, hanté par ses fantômes, Maverick va devoir affronter ses pires cauchemars au cours d’une mission qui exigera les plus grands des sacrifices.', 'Christopher McQuarrie, Ehren Kruger', 1, '0827894.jpg', 'https://www.youtube.com/embed/qSqVVswa420?si=cabyT0kamRmRbBjY', 0, NULL),
(60, 'À la croisée des mondes : La Boussole d\'or', 2007, 113, 'Dans un monde parallèle où l\'âme humaine prend la forme d\'un animal familier, une courageuse orpheline nommée Lyra voyage vers le Grand Nord pour sauver ses amis kidnappés et percer le mystère d\'une particule cosmique appelée la Poussière.', 'Chris Weitz', 9, '18844311.jpg', 'https://www.youtube.com/embed/LHYoOGfBObU?si=f0g7gMp_RjwBCYA5', 10, NULL),
(61, 'Coraline', 2009, 100, 'Coraline Jones est une fillette intrépide qui découvre une porte secrète dans sa nouvelle maison. Elle débouche sur un monde parallèle qui ressemble étrangement au sien, mais en mieux. Cependant, cette aventure fantastique devient dangereuse quand sa \"L\'Autre Mère\" tente de la garder prisonnière à jamais.', 'Henry Selick', 9, '263026.jpg', 'https://www.youtube.com/embed/MZBDf37W3rM?si=vC3qdnLQvzQG5tPx', 0, NULL);

-- --------------------------------------------------------

--
-- Structure de la table `UserProfile`
--

CREATE TABLE `UserProfile` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `min_age` int(11) NOT NULL DEFAULT 0,
  `avatar` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

--
-- Déchargement des données de la table `UserProfile`
--

INSERT INTO `UserProfile` (`id`, `name`, `min_age`, `avatar`) VALUES
(1, 'Ado', 16, NULL),
(2, 'Enfant', 12, NULL),
(3, 'Adulte', 0, NULL);

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `Category`
--
ALTER TABLE `Category`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `Favorite`
--
ALTER TABLE `Favorite`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `profile_movie` (`profile_id`,`movie_id`);

--
-- Index pour la table `Movie`
--
ALTER TABLE `Movie`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_category` (`id_category`);

--
-- Index pour la table `UserProfile`
--
ALTER TABLE `UserProfile`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `Category`
--
ALTER TABLE `Category`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT pour la table `Favorite`
--
ALTER TABLE `Favorite`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT pour la table `Movie`
--
ALTER TABLE `Movie`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=62;

--
-- AUTO_INCREMENT pour la table `UserProfile`
--
ALTER TABLE `UserProfile`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `Movie`
--
ALTER TABLE `Movie`
  ADD CONSTRAINT `movie_ibfk_1` FOREIGN KEY (`id_category`) REFERENCES `Category` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
