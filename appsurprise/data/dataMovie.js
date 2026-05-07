// URL où se trouve le répertoire "server" sur mmi.unilim.fr

let HOST_URL = "..";



let DataMovie = {};



DataMovie.requestMovies = async function(age = 0){

let answer = await fetch(HOST_URL + "/server/script.php?todo=readmovies&age=" + age);

let data = await answer.json();

return data;

}



DataMovie.requestFeatured = async function(age = 0){

let answer = await fetch(HOST_URL + "/server/script.php?todo=readfeaturedmovies&age=" + age);

let data = await answer.json();

return data;

}



DataMovie.getMovieById = async function(id) {

let movies = await DataMovie.requestMovies();

return movies.find(movie => String(movie.id) === String(id)) || null;

}



DataMovie.searchMovies = async function(keyword, age = 0) {

let answer = await fetch(HOST_URL + "/server/script.php?todo=searchmovies&keyword=" + encodeURIComponent(keyword) + "&age=" + age);

let data = await answer.json();

return data;

}



export {DataMovie};

