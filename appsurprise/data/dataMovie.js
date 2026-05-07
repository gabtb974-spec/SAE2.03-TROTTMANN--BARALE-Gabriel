// URL où se trouve le répertoire "server" sur mmi.unilim.fr
let HOST_URL = "https://trottmann-sae203.mmi-limoges.fr";

let DataMovie = {};

DataMovie.requestMovies = async function(age = 0){
    let url = HOST_URL + "/server/script.php?todo=readmovies&age=" + age;
    let answer = await fetch(url);
    
    // 1. On lit la réponse brute en texte d'abord (ça ne plante jamais, même si c'est vide)
    let text = await answer.text(); 
    
    try {
        // 2. On essaie de la convertir en JSON manuellement
        let data = JSON.parse(text); 
        return data;
    } catch (error) {
        // 3. Si ça plante, on affiche le vrai coupable dans la console !
        console.error("🚨 Le serveur n'a pas renvoyé de JSON valide.");
        console.error("URL appelée :", url);
        console.error("Réponse reçue du serveur :", text); // C'est ici que tu verras l'erreur PHP !
        
        // On retourne un tableau vide pour éviter que le reste du site plante
        return []; 
    }
}
