// URL où se trouve le répertoire "server" sur mmi.unilim.fr
let HOST_URL = "https://trottmann-sae203.mmi-limoges.fr";

let DataMovie = {};

DataMovie.requestMovies = async function(age = 0){
    let url = HOST_URL + "/server/script.php?todo=readmovies&age=" + age;
    let answer = await fetch(url);
    
    // 1. On lit la réponse brute en texte d'abord
    let text = await answer.text(); 
    
    try {
        // 2. On essaie de la convertir en JSON manuellement
        let data = JSON.parse(text); 
        return data;
    } catch (error) {
        // 3. Affichage de l'erreur
        console.error("🚨 Le serveur n'a pas renvoyé de JSON valide.");
        console.error("URL appelée :", url);
        console.error("Réponse reçue du serveur :", text); 
        return []; 
    }
}

DataMovie.requestFeatured = async function(age = 0){
    let answer = await fetch(HOST_URL + "/server/script.php?todo=readfeaturedmovies&age=" + age);
    let text = await answer.text();
    try {
        return JSON.parse(text);
    } catch (error) {
        console.error("🚨 Erreur JSON sur requestFeatured :", text);
        return [];
    }
}

DataMovie.getMovieById = async function(id) {
    let movies = await DataMovie.requestMovies();
    return movies.find(movie => String(movie.id) === String(id)) || null;
}

DataMovie.searchMovies = async function(keyword, age = 0) {
    let answer = await fetch(HOST_URL + "/server/script.php?todo=searchmovies&keyword=" + encodeURIComponent(keyword) + "&age=" + age);
    let text = await answer.text();
    try {
        return JSON.parse(text);
    } catch (error) {
         console.error("🚨 Erreur JSON sur searchMovies :", text);
         return [];
    }
}

// LIGNE INDISPENSABLE POUR QUE L'INDEX.HTML PUISSE L'UTILISER :
export {DataMovie};