<?php
/**
 * Ce fichier contient toutes les fonctions qui réalisent des opérations
 * sur la base de données, telles que les requêtes SQL pour insérer, 
 * mettre à jour, supprimer ou récupérer des données.
 */

/**
 * Définition des constantes de connexion à la base de données.
 *
 * HOST : Nom d'hôte du serveur de base de données, ici "localhost".
 * DBNAME : Nom de la base de données
 * DBLOGIN : Nom d'utilisateur pour se connecter à la base de données.
 * DBPWD : Mot de passe pour se connecter à la base de données.
 */
define("HOST", "localhost");
define("DBNAME", "SAE203");
define("DBLOGIN", "userSAE203");
define("DBPWD", "Gab974Limo!@");


function getAllMovies($age = 0){
    // Connexion à la base de données
    $cnx = new PDO("mysql:host=".HOST.";dbname=".DBNAME, DBLOGIN, DBPWD);
    // Requête SQL pour récupérer le menu avec des paramètres
    $sql = "SELECT Movie.id, Movie.name, Movie.image, Movie.director, Movie.year, Movie.length, Movie.description, Movie.id_category, Movie.trailer, Movie.min_age, Category.name AS category FROM Movie LEFT JOIN Category ON Movie.id_category = Category.id WHERE Movie.min_age <= :age";
    // Prépare la requête SQL
    $stmt = $cnx->prepare($sql);
    $stmt->bindParam(':age', $age, PDO::PARAM_INT);
    // Exécute la requête SQL
    $stmt->execute();
    // Récupère les résultats de la requête sous forme d'objets
    $res = $stmt->fetchAll(PDO::FETCH_OBJ);
    return $res; // Retourne les résultats
}

function getFeaturedMovies($age = 0){
    try {
        $cnx = new PDO("mysql:host=".HOST.";dbname=".DBNAME, DBLOGIN, DBPWD);
        $sql = "SELECT Movie.id, Movie.name, Movie.image, Movie.director, Movie.year, Movie.length, Movie.description, Movie.id_category, Movie.trailer, Movie.min_age, Category.name AS category FROM Movie LEFT JOIN Category ON Movie.id_category = Category.id WHERE Movie.min_age <= :age AND Movie.is_featured = 1";
        $stmt = $cnx->prepare($sql);
        $stmt->bindParam(':age', $age, PDO::PARAM_INT);
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_OBJ);
    } catch (Exception $e) {
        error_log('Erreur BDD getFeaturedMovies: ' . $e->getMessage());
        return [];
    }
}

function addMovie($title, $director, $release_year, $duration, $synopsis, $genre, $image, $trailer, $age){
    try {
        $cnx = new PDO("mysql:host=".HOST.";dbname=".DBNAME, DBLOGIN, DBPWD);
        $cnx->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        
        $sql = "INSERT INTO Movie (name, director, year, length, description, id_category, image, trailer, min_age) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";
        $stmt = $cnx->prepare($sql);
        
        $success = $stmt->execute([$title, $director, $release_year, $duration, $synopsis, $genre, $image, $trailer, $age]);
        
        return $success;
    } catch (PDOException $e) {
        error_log('Erreur BDD addMovie: ' . $e->getMessage());
        return false;
    }
}

function addProfile($name, $age, $avatar = null){
    try {
        $cnx = new PDO("mysql:host=".HOST.";dbname=".DBNAME, DBLOGIN, DBPWD);
        $cnx->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        $sql = "INSERT INTO UserProfile (name, min_age, avatar) VALUES (?, ?, ?)";
        $stmt = $cnx->prepare($sql);
        return $stmt->execute([$name, $age, $avatar]);
    } catch (PDOException $e) {
        error_log('Erreur BDD addProfile: ' . $e->getMessage());
        return false;
    }
}

function getAllCategories(){
    try {
        $cnx = new PDO("mysql:host=".HOST.";dbname=".DBNAME, DBLOGIN, DBPWD);
        $sql = "SELECT id, name FROM Category";
        $stmt = $cnx->prepare($sql);
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_OBJ);
    } catch (Exception $e) {
        return false;
    }
}

function getAllProfiles(){
    try {
        $cnx = new PDO("mysql:host=".HOST.";dbname=".DBNAME, DBLOGIN, DBPWD);
        $sql = "SELECT id, name, min_age, avatar FROM UserProfile ORDER BY name";
        $stmt = $cnx->prepare($sql);
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_OBJ);
    } catch (Exception $e) {
        error_log('Erreur BDD getAllProfiles: ' . $e->getMessage());
        return false;
    }
}

function ensureFavoriteTable($cnx){
    $sql = "CREATE TABLE IF NOT EXISTS Favorite (
        id INT AUTO_INCREMENT PRIMARY KEY,
        profile_id INT NOT NULL,
        movie_id INT NOT NULL,
        UNIQUE KEY profile_movie (profile_id, movie_id)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8;";
    $cnx->exec($sql);
}

function getFavoritesByProfile($profileId){
    try {
        $cnx = new PDO("mysql:host=".HOST.";dbname=".DBNAME, DBLOGIN, DBPWD);
        ensureFavoriteTable($cnx);
        $sql = "SELECT Movie.id, Movie.name, Movie.image, Movie.director, Movie.year, Movie.length, Movie.description, Movie.id_category, Movie.trailer, Movie.min_age, Category.name AS category
                FROM Favorite
                JOIN Movie ON Favorite.movie_id = Movie.id
                LEFT JOIN Category ON Movie.id_category = Category.id
                WHERE Favorite.profile_id = :profile_id";
        $stmt = $cnx->prepare($sql);
        $stmt->bindParam(':profile_id', $profileId, PDO::PARAM_INT);
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_OBJ);
    } catch (Exception $e) {
        error_log('Erreur BDD getFavoritesByProfile: ' . $e->getMessage());
        return [];
    }
}

function favoriteExists($profileId, $movieId){
    try {
        $cnx = new PDO("mysql:host=".HOST.";dbname=".DBNAME, DBLOGIN, DBPWD);
        ensureFavoriteTable($cnx);
        $sql = "SELECT COUNT(*) FROM Favorite WHERE profile_id = :profile_id AND movie_id = :movie_id";
        $stmt = $cnx->prepare($sql);
        $stmt->bindParam(':profile_id', $profileId, PDO::PARAM_INT);
        $stmt->bindParam(':movie_id', $movieId, PDO::PARAM_INT);
        $stmt->execute();
        return $stmt->fetchColumn() > 0;
    } catch (Exception $e) {
        error_log('Erreur BDD favoriteExists: ' . $e->getMessage());
        return false;
    }
}

function addFavorite($profileId, $movieId){
    try {
        $cnx = new PDO("mysql:host=".HOST.";dbname=".DBNAME, DBLOGIN, DBPWD);
        ensureFavoriteTable($cnx);
        $sql = "INSERT INTO Favorite (profile_id, movie_id) VALUES (:profile_id, :movie_id)";
        $stmt = $cnx->prepare($sql);
        $stmt->bindParam(':profile_id', $profileId, PDO::PARAM_INT);
        $stmt->bindParam(':movie_id', $movieId, PDO::PARAM_INT);
        return $stmt->execute();
    } catch (Exception $e) {
        error_log('Erreur BDD addFavorite: ' . $e->getMessage());
        return false;
    }
}

function removeFavorite($profileId, $movieId){
    try {
        $cnx = new PDO("mysql:host=".HOST.";dbname=".DBNAME, DBLOGIN, DBPWD);
        $sql = "DELETE FROM Favorite WHERE profile_id = :profile_id AND movie_id = :movie_id";
        $stmt = $cnx->prepare($sql);
        $stmt->bindParam(':profile_id', $profileId, PDO::PARAM_INT);
        $stmt->bindParam(':movie_id', $movieId, PDO::PARAM_INT);
        return $stmt->execute();
    } catch (Exception $e) {
        error_log('Erreur BDD removeFavorite: ' . $e->getMessage());
        return false;
    }
}

function getTotalProfiles(){
    try {
        $cnx = new PDO("mysql:host=".HOST.";dbname=".DBNAME, DBLOGIN, DBPWD);
        $sql = "SELECT COUNT(*) FROM UserProfile";
        $stmt = $cnx->prepare($sql);
        $stmt->execute();
        return $stmt->fetchColumn();
    } catch (Exception $e) {
        return 0;
    }
}

function getAverageFavorites(){
    try {
        $cnx = new PDO("mysql:host=".HOST.";dbname=".DBNAME, DBLOGIN, DBPWD);
        $sql = "SELECT AVG(fav_count) FROM (SELECT COUNT(*) AS fav_count FROM Favorite GROUP BY profile_id) AS sub";
        $stmt = $cnx->prepare($sql);
        $stmt->execute();
        $result = $stmt->fetchColumn();
        return $result ? round($result, 2) : 0;
    } catch (Exception $e) {
        return 0;
    }
}

function getTotalFilms(){
    try {
        $cnx = new PDO("mysql:host=".HOST.";dbname=".DBNAME, DBLOGIN, DBPWD);
        $sql = "SELECT COUNT(*) FROM Movie";
        $stmt = $cnx->prepare($sql);
        $stmt->execute();
        return $stmt->fetchColumn();
    } catch (Exception $e) {
        return 0;
    }
}

function getTopFavoriteFilm(){
    try {
        $cnx = new PDO("mysql:host=".HOST.";dbname=".DBNAME, DBLOGIN, DBPWD);
        $sql = "SELECT Movie.name, COUNT(Favorite.movie_id) AS fav_count FROM Favorite JOIN Movie ON Favorite.movie_id = Movie.id GROUP BY Favorite.movie_id ORDER BY fav_count DESC LIMIT 1";
        $stmt = $cnx->prepare($sql);
        $stmt->execute();
        $result = $stmt->fetch(PDO::FETCH_ASSOC);
        return $result ? $result['name'] : 'Aucun';
    } catch (Exception $e) {
        return 'Aucun';
    }
}

function getTopCategory(){
    try {
        $cnx = new PDO("mysql:host=".HOST.";dbname=".DBNAME, DBLOGIN, DBPWD);
        $sql = "SELECT Category.name, COUNT(Favorite.id) AS fav_count FROM Favorite JOIN Movie ON Favorite.movie_id = Movie.id JOIN Category ON Movie.id_category = Category.id GROUP BY Category.id ORDER BY fav_count DESC LIMIT 1";
        $stmt = $cnx->prepare($sql);
        $stmt->execute();
        $result = $stmt->fetch(PDO::FETCH_ASSOC);
        return $result ? $result['name'] : 'Aucune';
    } catch (Exception $e) {
        return 'Aucune';
    }
}

function searchMovies($keyword, $age = 0){
    try {
        $cnx = new PDO("mysql:host=".HOST.";dbname=".DBNAME, DBLOGIN, DBPWD);
        $sql = "SELECT Movie.id, Movie.name, Movie.image, Movie.director, Movie.year, Movie.length, Movie.description, Movie.id_category, Movie.trailer, Movie.min_age, Movie.is_featured, Category.name AS category FROM Movie LEFT JOIN Category ON Movie.id_category = Category.id WHERE Movie.name LIKE :keyword AND Movie.min_age <= :age";
        $stmt = $cnx->prepare($sql);
        $searchKeyword = '%' . $keyword . '%';
        $stmt->bindValue(':keyword', $searchKeyword, PDO::PARAM_STR);
        $stmt->bindParam(':age', $age, PDO::PARAM_INT);
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_OBJ);
    } catch (Exception $e) {
        error_log('Erreur BDD searchMovies: ' . $e->getMessage());
        return [];
    }
}

function updateFeaturedStatus($movieId, $isFeatured){
    try {
        $cnx = new PDO("mysql:host=".HOST.";dbname=".DBNAME, DBLOGIN, DBPWD);
        $sql = "UPDATE Movie SET is_featured = :is_featured WHERE id = :movie_id";
        $stmt = $cnx->prepare($sql);
        $stmt->bindParam(':is_featured', $isFeatured, PDO::PARAM_INT);
        $stmt->bindParam(':movie_id', $movieId, PDO::PARAM_INT);
        return $stmt->execute();
    } catch (Exception $e) {
        error_log('Erreur BDD updateFeaturedStatus: ' . $e->getMessage());
        return false;
    }
}