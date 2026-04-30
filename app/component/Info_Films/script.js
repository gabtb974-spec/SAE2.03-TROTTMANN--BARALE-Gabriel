let templateFile = await fetch('./component/Info_Films/template.html');
let template = await templateFile.text();

let InfoFilms = {};

InfoFilms.format = function(movie) {
  let html = template;
  const title = movie.name || movie.title || '';
  const image = movie.image ? `../server/images/${movie.image}` : '';
  const synopsis = movie.description || movie.synopsis || '';
  const trailer = movie.trailer || movie.trailer_url || '#';
  const category = Array.isArray(movie.category) ? movie.category.join(', ') : (movie.category || '');
  const categoryValue = category || (movie.id_category ? `Catégorie ${movie.id_category}` : '');
  const age = movie.min_age !== undefined && movie.min_age !== null
    ? (Number(movie.min_age) === 0 ? 'Tout public' : `${movie.min_age}+`)
    : (movie.restriction_age || '');
  const year = movie.year || movie.annee_sortie || '';
  const director = movie.director || movie.realisateur || '';

  html = html.replaceAll('{{movie.title}}', title);
  html = html.replaceAll('{{movie.image}}', image);
  html = html.replace('{{movie.synopsis}}', synopsis);
  html = html.replace('{{movie.trailer}}', trailer);
  html = html.replace('{{movie.category}}', categoryValue);
  html = html.replace('{{movie.age_restriction}}', age);
  html = html.replace('{{movie.release_year}}', year);
  html = html.replace('{{movie.director}}', director);
  return html;
};

export { InfoFilms };   