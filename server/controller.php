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


function validateMovieData($postData, $filesData) {
    $title = trim($postData['title'] ?? '');
    $director = trim($postData['director'] ?? '');
    $release_year = (int)($postData['release_year'] ?? 0);
    $duration = (int)($postData['duration'] ?? 0);
    $synopsis = trim($postData['synopsis'] ?? '');
    $genre = (int)($postData['genre'] ?? 0);
    $trailer = trim($postData['trailer'] ?? '');
    $age = (int)($postData['age'] ?? 0);

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

    $image = '';
    if (isset($filesData['poster']) && $filesData['poster']['error'] == 0) {
        $image = basename($filesData['poster']['name']);
        $targetPath = 'images/' . $image;
        if (!move_uploaded_file($filesData['poster']['tmp_name'], $targetPath)) {
            return ['success' => false, 'message' => 'Erreur : Impossible de télécharger l\'image.'];
        }
    }

    return ['success' => true, 'data' => [$title, $director, $release_year, $duration, $synopsis, $genre, $image, $trailer, $age]];
}


function readMoviesController(){
    $age = (int)($_REQUEST['age'] ?? 0);
    if ($age < 0) $age = 0;
    $movies = getAllMovies($age);
    return $movies;
}

function readFeaturedMoviesController(){
    $age = (int)($_REQUEST['age'] ?? 0);
    if ($age < 0) $age = 0;
    return getFeaturedMovies($age);
}

function addMovieController(){
    $validation = validateMovieData($_POST, $_FILES);
    if (!$validation['success']) {
        return $validation;
    }
    list($title, $director, $release_year, $duration, $synopsis, $genre, $image, $trailer, $age) = $validation['data'];

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

function validateProfileData($postData, $filesData) {
    $name = trim($postData['name'] ?? '');
    $age = (int)($postData['age'] ?? -1);

    if (empty($name)) {
        return ['success' => false, 'message' => 'Erreur : Le nom du profil est obligatoire.'];
    }

    $allowedAges = [0, 12, 16, 18];
    if (!in_array($age, $allowedAges, true)) {
        return ['success' => false, 'message' => 'Erreur : La restriction d\'âge doit être 0, 12, 16 ou 18.'];
    }

    $avatar = null;
    if (isset($filesData['avatar']) && $filesData['avatar']['error'] === UPLOAD_ERR_OK) {
        $avatarInfo = pathinfo($filesData['avatar']['name']);
        $extension = strtolower($avatarInfo['extension'] ?? '');
        $allowedExtensions = ['jpg', 'jpeg', 'png', 'gif'];
        if (!in_array($extension, $allowedExtensions, true)) {
            return ['success' => false, 'message' => 'Erreur : L\'avatar doit être une image JPG, PNG ou GIF.'];
        }
        $avatar = uniqid('profile_') . '.' . $extension;
        $targetPath = 'images/' . $avatar;
        if (!move_uploaded_file($filesData['avatar']['tmp_name'], $targetPath)) {
            return ['success' => false, 'message' => 'Erreur : Impossible de télécharger l\'avatar.'];
        }
    }

    return ['success' => true, 'data' => [$name, $age, $avatar]];
}


function readProfilesController(){
    return getAllProfiles();
}

function addProfileController(){
    $validation = validateProfileData($_POST, $_FILES);
    if (!$validation['success']) {
        return $validation;
    }
    list($name, $age, $avatar) = $validation['data'];

    $result = addProfile($name, $age, $avatar);
    if ($result) {
        return ['success' => true, 'message' => 'Le profil a été ajouté avec succès.'];
    }
    return ['success' => false, 'message' => 'Erreur lors de l\'ajout du profil en base de données.'];
}

function readFavoritesController(){
    $profileId = (int)($_REQUEST['profile_id'] ?? 0);
    if ($profileId <= 0) {
        return [];
    }
    return getFavoritesByProfile($profileId);
}

function addFavoriteController(){
    $profileId = (int)($_POST['profile_id'] ?? 0);
    $movieId = (int)($_POST['movie_id'] ?? 0);

    if ($profileId <= 0 || $movieId <= 0) {
        return ['success' => false, 'message' => 'Erreur : profil ou film invalide.'];
    }

    if (favoriteExists($profileId, $movieId)) {
        return ['success' => false, 'message' => 'Ce film est déjà dans vos favoris.'];
    }

    if (addFavorite($profileId, $movieId)) {
        return ['success' => true, 'message' => 'Le film a été ajouté à vos favoris.'];
    }
    return ['success' => false, 'message' => 'Erreur lors de l\'ajout aux favoris.'];
}

function removeFavoriteController(){
    $profileId = (int)($_POST['profile_id'] ?? 0);
    $movieId = (int)($_POST['movie_id'] ?? 0);

    if ($profileId <= 0 || $movieId <= 0) {
        return ['success' => false, 'message' => 'Erreur : profil ou film invalide.'];
    }

    if (!favoriteExists($profileId, $movieId)) {
        return ['success' => false, 'message' => 'Ce film n\'est pas dans vos favoris.'];
    }

    if (removeFavorite($profileId, $movieId)) {
        return ['success' => true, 'message' => 'Le film a été retiré de vos favoris.'];
    }
    return ['success' => false, 'message' => 'Erreur lors de la suppression des favoris.'];
}

function readStatsController(){
    return [
        'totalProfiles' => getTotalProfiles(),
        'averageFavorites' => getAverageFavorites(),
        'totalFilms' => getTotalFilms(),
        'topFavoriteFilm' => getTopFavoriteFilm(),
        'topCategory' => getTopCategory()
    ];
}

function searchMoviesController(){
    $keyword = trim($_REQUEST['keyword'] ?? '');
    $age = (int)($_REQUEST['age'] ?? 0);
    if ($age < 0) $age = 0;
    if (empty($keyword)) {
        return [];
    }
    return searchMovies($keyword, $age);
}

function updateFeaturedController(){
    $movieId = (int)($_POST['movie_id'] ?? 0);
    $isFeatured = (int)($_POST['is_featured'] ?? -1);
    if ($movieId <= 0 || ($isFeatured !== 0 && $isFeatured !== 1)) {
        return ['success' => false, 'message' => 'Paramètres invalides.'];
    }
    if (updateFeaturedStatus($movieId, $isFeatured)) {
        return ['success' => true, 'message' => 'Le statut du film a été mis à jour avec succès.'];
    }
    return ['success' => false, 'message' => 'Erreur lors de la mise à jour du statut du film.'];
}