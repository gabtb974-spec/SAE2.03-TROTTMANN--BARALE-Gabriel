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
define("DBNAME", "trottmannbara1");
define("DBLOGIN", "trottmannbara1");
define("DBPWD", "trottmannbara1");


function getAllMovies(){
    // Connexion à la base de données
    $cnx = new PDO("mysql:host=".HOST.";dbname=".DBNAME, DBLOGIN, DBPWD);
    // Requête SQL pour récupérer le menu avec des paramètres
    $sql = "SELECT Movie.id, Movie.name, Movie.image, Movie.director, Movie.year, Movie.length, Movie.description, Movie.id_category, Movie.trailer, Movie.min_age, Category.name AS category FROM Movie LEFT JOIN Category ON Movie.id_category = Category.id";
    // Prépare la requête SQL
    $stmt = $cnx->prepare($sql);
    // Exécute la requête SQL
    $stmt->execute();
    // Récupère les résultats de la requête sous forme d'objets
    $res = $stmt->fetchAll(PDO::FETCH_OBJ);
    return $res; // Retourne les résultats
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