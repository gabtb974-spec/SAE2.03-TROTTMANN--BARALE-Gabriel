let HOST_URL = "https://trottmann-sae203.mmi-limoges.fr/";

let DataMovie = {};

DataMovie.getCategories = async function() {
	let response = await fetch(`${HOST_URL}/server/script.php?todo=getcategories`);
	let data = await response.json();
	return data;
};

DataMovie.addMovie = async function(formData) {
	let response = await fetch(`${HOST_URL}/server/script.php?todo=addmovie`, {
		method: 'POST',
		body: formData
	});
	let data = await response.json();
	return data;
};

DataMovie.searchMovies = async function(keyword) {
	try {
		let answer = await fetch(HOST_URL + "/server/script.php?todo=searchmovies&keyword=" + encodeURIComponent(keyword) + "&include_featured=true");
		let data = await answer.json();
		return data;
	} catch (error) {
		console.error('Recherche de films échouée:', error);
		return [];
	}
};

DataMovie.updateFeatured = async function(movieId, isFeatured) {
	let formData = new FormData();
	formData.append('movie_id', movieId);
	formData.append('is_featured', isFeatured ? 1 : 0);
	
	try {
		let answer = await fetch(HOST_URL + "/server/script.php?todo=updatefeatured", {
			method: 'POST',
			body: formData
		});
		let data = await answer.json();
		return data;
	} catch (error) {
		console.error('Mise à jour du statut featured échouée:', error);
		return { success: false, message: 'Erreur réseau lors de la mise à jour.' };
	}
};

export { DataMovie };