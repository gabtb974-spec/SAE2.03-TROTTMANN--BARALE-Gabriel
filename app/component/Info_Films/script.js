let templateFile = await fetch(new URL('./template.html', import.meta.url));
let template = await templateFile.text();

let InfoFilms = {};

InfoFilms.format = function(movie) {
  let html = template;
  const title = movie.name || '';
  const image = movie.image ? `../server/images/${movie.image}` : '';
  const synopsis = movie.description || '';
  const trailer = movie.trailer || '#';
  const category = movie.category || '';
  const age = movie.min_age === 0 ? 'Tous publics' : `${movie.min_age}+`;
  const year = movie.year || '';
  const director = movie.director || '';

  html = html.replace('{{movie.title}}', title);
  html = html.replace('{{movie.image}}', image);
  html = html.replace('{{movie.synopsis}}', synopsis);
  html = html.replace('{{movie.trailer}}', trailer);
  html = html.replace('{{movie.category}}', category);
  html = html.replace('{{movie.age_restriction}}', age);
  html = html.replace('{{movie.release_year}}', year);
  html = html.replace('{{movie.director}}', director);
  return html;
};

export { InfoFilms };   