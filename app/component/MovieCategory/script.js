import { MoviesList } from '../Movies_List/script.js';
let templateFile = await fetch('./component/MovieCategory/template.html');
let template = await templateFile.text();

let MovieCategory = {};

function slugify(text) {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

MovieCategory.format = function(movies, hSelectMovie) {
  const grouped = movies.reduce((acc, movie) => {
    const category = movie.category || 'Autres';
    if (!acc[category]) acc[category] = [];
    acc[category].push(movie);
    return acc;
  }, {});

  const categories = Object.keys(grouped);

  const categorySections = categories
    .map(category => {
      const id = slugify(category);
      const categoryMovies = grouped[category];
      const moviesHtml = categoryMovies.length > 0 
        ? MoviesList.format(categoryMovies, hSelectMovie)
        : '<p class="movie-category__empty">Aucun film disponible pour le moment</p>';
      return `
        <section class="movie-category__section" id="${id}">
          <h2>${category}</h2>
          ${moviesHtml}
        </section>
      `;
    })
    .join('');

  let html = template;
  html = html.replace('{{categorySections}}', categorySections);
  return html;
};

export { MovieCategory };