let HOST_URL = "htps://trottmann-sae203.mmi-limoges.fr";

let DataFavorite = {};

DataFavorite.read = async function(profileId) {
  const response = await fetch(`${HOST_URL}/server/script.php?todo=readfavorites&profile_id=${profileId}`);
  const data = await response.json();
  return data;
};

DataFavorite.add = async function(profileId, movieId) {
  let formData = new FormData();
  formData.append('profile_id', profileId);
  formData.append('movie_id', movieId);

  const response = await fetch(`${HOST_URL}/server/script.php?todo=addfavorite`, {
    method: 'POST',
    body: formData
  });
  const data = await response.json();
  return data;
};

DataFavorite.remove = async function(profileId, movieId) {
  let formData = new FormData();
  formData.append('profile_id', profileId);
  formData.append('movie_id', movieId);

  const response = await fetch(`${HOST_URL}/server/script.php?todo=removefavorite`, {
    method: 'POST',
    body: formData
  });
  const data = await response.json();
  return data;
};

export { DataFavorite };