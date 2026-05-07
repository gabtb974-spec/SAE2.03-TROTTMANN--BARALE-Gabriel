let templateFile = await fetch(new URL('./template.html', import.meta.url));
let template = await templateFile.text();

let InfoFilms = {};

InfoFilms.format = function(movie) {
  const replacements = {
    '{{movie.title}}': movie.name || '',
    '{{movie.image}}': movie.image ? `../server/images/${movie.image}` : '',
    '{{movie.synopsis}}': movie.description || '',
    '{{movie.trailer}}': movie.trailer || '#',
    '{{movie.category}}': movie.category || '',
    '{{movie.age_restriction}}': movie.min_age === 0 ? 'Tous publics' : `${movie.min_age}+`,
    '{{movie.release_year}}': movie.year || '',
    '{{movie.director}}': movie.director || '',
    '{{movie.id}}': movie.id || '',
    '{{favoriteLabel}}': (movie.isFavorited ? 'Déjà favori' : 'Ajouter aux favoris'),
    '{{favoriteClass}}': (movie.isFavorited ? 'movie_favorite_button--added' : ''),
    '{{favoriteDisabled}}': (movie.isFavorited ? 'disabled' : '')
  };

  let html = template;
  for (const [key, value] of Object.entries(replacements)) {
    html = html.replace(key, value);
  }
  return html;
};

export { InfoFilms };   