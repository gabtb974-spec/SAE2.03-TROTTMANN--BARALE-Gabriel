// URL où se trouve le répertoire "server" sur mmi.unilim.fr
let HOST_URL = "..";

let DataMovie = {};

DataMovie.requestMovies = async function(){
    let answer = await fetch(HOST_URL + "/server/script.php?todo=readmovies");
    let data = await answer.json();
    return data;
}

DataMovie.getMovieById = async function(id) {
    let movies = await DataMovie.requestMovies();
    return movies.find(movie => String(movie.id) === String(id)) || null;
}

export {DataMovie};
