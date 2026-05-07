let templateFile = await fetch(new URL('./template.html', import.meta.url));
let template = await templateFile.text();

let MoviesList = {};

MoviesList.format = function (movies, hSelectMovie, hRemoveFavorite = null) {
  
  
  const listClass = hRemoveFavorite ? ' movies__list--favorites' : '';
  let html = `<ul class="movies__list${listClass}">`;
  movies.forEach(movie => {
    const isFavorited = movie.isFavorited === true;
    let favoriteButtonHtml = '';
    if (hRemoveFavorite) {
      
      favoriteButtonHtml = `<button class="movies__favorite-button movies__remove-button" type="button" onclick="event.stopPropagation(); ${hRemoveFavorite}('${movie.id}')">Retirer des favoris</button>`;
    } else {
     
      const favoriteLabel = isFavorited ? 'Ajouté' : 'Ajouter aux favoris';
      const favoriteClass = isFavorited ? 'movies__favorite-button--added' : '';
      favoriteButtonHtml = `<button class="movies__favorite-button ${favoriteClass}" type="button" onclick="event.stopPropagation(); C.handlerToggleFavorite('${movie.id}')" ${isFavorited ? 'disabled' : ''}>${favoriteLabel}</button>`;
    }
    let movieHtml = template
      .replaceAll('{{name}}', movie.name)
      .replace('{{image}}', `../server/images/${movie.image}`)
      .replace('{{hSelectMovie}}', `${hSelectMovie}('${movie.id}')`)
      .replace('{{favoriteButton}}', favoriteButtonHtml);
    html += movieHtml;
  });
  html += '</ul>';
  return html;
};

export { MoviesList };
