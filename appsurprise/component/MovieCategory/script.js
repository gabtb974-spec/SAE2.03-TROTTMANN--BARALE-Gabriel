import { MoviesList } from '../Movies_List/script.js';
let templateFile = await fetch(new URL('./template.html', import.meta.url));
let template = await templateFile.text();

let MovieCategory = {};

MovieCategory.format = function(movies, hSelectMovie, hRemoveFavorite = null) {
  if (movies.length === 0) {
    return '<p>Aucun film disponible pour votre tranche d\'âge.</p>';
  }
  const grouped = {};
  movies.forEach(movie => {
    const category = movie.category || 'Autres';
    if (!grouped[category]) grouped[category] = [];
    grouped[category].push(movie);
  });

  let categorySections = '';
  for (const category in grouped) {
    const categoryMovies = grouped[category];
    const moviesHtml = MoviesList.format(categoryMovies, hSelectMovie, hRemoveFavorite);
    categorySections += `
      <section class="movie-category__section">
        <h2>${category}</h2>
        ${moviesHtml}
      </section>
    `;
  }

  let html = template;
  html = html.replace('{{categorySections}}', categorySections);
  return html;
};

export { MovieCategory };
