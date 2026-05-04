<?php

/** ARCHITECTURE PHP SERVEUR  : Rôle du fichier controller.php
 * 
 *  Dans ce fichier, on va définir les fonctions de contrôle qui vont traiter les requêtes HTTP.
 *  Les requêtes HTTP sont interprétées selon la valeur du paramètre 'todo' de la requête (voir script.php)
 *  Pour chaque valeur différente, on déclarera une fonction de contrôle différente.
 * 
 *  Les fonctions de contrôle vont éventuellement lire les paramètres additionnels de la requête, 
 *  les vérifier, puis appeler les fonctions du modèle (model.php) pour effectuer les opérations
 *  nécessaires sur la base de données.
 *  
 *  Si la fonction échoue à traiter la requête, elle retourne false (mauvais paramètres, erreur de connexion à la BDD, etc.)
 *  Sinon elle retourne le résultat de l'opération (des données ou un message) à includre dans la réponse HTTP.
 */

/** Inclusion du fichier model.php
 *  Pour pouvoir utiliser les fonctions qui y sont déclarées et qui permettent
 *  de faire des opérations sur les données stockées en base de données.
 */
require("model.php");


function readMoviesController(){
    $movies = getAllMovies();
    return $movies;
}

function addMovieController(){
    // Récupérer les données POST
    $title = trim($_POST['title'] ?? '');
    $director = trim($_POST['director'] ?? '');
    $release_year = (int)($_POST['release_year'] ?? 0);
    $duration = (int)($_POST['duration'] ?? 0);
    $synopsis = trim($_POST['synopsis'] ?? '');
    $genre = (int)($_POST['genre'] ?? 0);
    $trailer = trim($_POST['trailer'] ?? '');
    $age = (int)($_POST['age'] ?? 0);

    // Validation côté serveur
    if (empty($title)) {
        return ['success' => false, 'message' => 'Erreur : Le titre du film est obligatoire.'];
    }
    if (empty($director)) {
        return ['success' => false, 'message' => 'Erreur : Le réalisateur est obligatoire.'];
    }
    if ($release_year < 1800 || $release_year > date('Y')) {
        return ['success' => false, 'message' => 'Erreur : L\'année de sortie doit être entre 1800 et ' . date('Y') . '.'];
    }
    if ($duration <= 0) {
        return ['success' => false, 'message' => 'Erreur : La durée doit être un nombre positif.'];
    }
    if (empty($synopsis)) {
        return ['success' => false, 'message' => 'Erreur : Le synopsis est obligatoire.'];
    }
    if ($genre <= 0) {
        return ['success' => false, 'message' => 'Erreur : Un genre valide est requis.'];
    }
    $allowedAges = [0, 10, 12, 16, 18];
    if (!in_array($age, $allowedAges, true)) {
        return ['success' => false, 'message' => 'Erreur : La restriction d\'âge doit être Tout public, 10, 12, 16 ou 18.'];
    }
    if (empty($trailer)) {
        return ['success' => false, 'message' => 'Erreur : Le lien de la bande annonce est obligatoire.'];
    }

    // Gestion de l'upload de l'image
    $image = '';
    if (isset($_FILES['poster']) && $_FILES['poster']['error'] == 0) {
        $image = basename($_FILES['poster']['name']);
        $targetPath = 'images/' . $image;
        if (!move_uploaded_file($_FILES['poster']['tmp_name'], $targetPath)) {
            return ['success' => false, 'message' => 'Erreur : Impossible de télécharger l\'image.'];
        }
    }

    // Ajouter le film à la base de données
    $result = addMovie($title, $director, $release_year, $duration, $synopsis, $genre, $image, $trailer, $age);
    if ($result) {
        return ['success' => true, 'message' => 'Le film a été ajouté avec succès !'];
    } else {
        return ['success' => false, 'message' => 'Erreur lors de l\'ajout du film à la base de données.'];
    }
}

function getCategoriesController(){
    return getAllCategories();
}

function readProfilesController(){
    return getAllProfiles();
}

function addProfileController(){
    $name = trim($_POST['name'] ?? '');
    $age = (int)($_POST['age'] ?? -1);

    if (empty($name)) {
        return ['success' => false, 'message' => 'Erreur : Le nom du profil est obligatoire.'];
    }

    $allowedAges = [0, 12, 16, 18];
    if (!in_array($age, $allowedAges, true)) {
        return ['success' => false, 'message' => 'Erreur : La restriction d\'âge doit être 0, 12, 16 ou 18.'];
    }

    $avatar = null;
    if (isset($_FILES['avatar']) && $_FILES['avatar']['error'] === UPLOAD_ERR_OK) {
        $avatarInfo = pathinfo($_FILES['avatar']['name']);
        $extension = strtolower($avatarInfo['extension'] ?? '');
        $allowedExtensions = ['jpg', 'jpeg', 'png', 'gif'];
        if (!in_array($extension, $allowedExtensions, true)) {
            return ['success' => false, 'message' => 'Erreur : L\'avatar doit être une image JPG, PNG ou GIF.'];
        }
        $avatar = uniqid('profile_') . '.' . $extension;
        $targetPath = 'images/' . $avatar;
        if (!move_uploaded_file($_FILES['avatar']['tmp_name'], $targetPath)) {
            return ['success' => false, 'message' => 'Erreur : Impossible de télécharger l\'avatar.'];
        }
    }

    $result = addProfile($name, $age, $avatar);
    if ($result) {
        return ['success' => true, 'message' => 'Le profil a été ajouté avec succès.'];
    }
    return ['success' => false, 'message' => 'Erreur lors de l\'ajout du profil en base de données.'];
}