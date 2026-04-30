let HOST_URL = "..";

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

export { DataMovie };