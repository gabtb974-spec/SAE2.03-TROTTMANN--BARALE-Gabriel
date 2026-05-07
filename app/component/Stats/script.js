let templateFile = await fetch(new URL('./template.html', import.meta.url));
let template = await templateFile.text();

let Stats = {};

Stats.format = function(stats) {
  let html = template;
  html = html.replace('{{totalProfiles}}', stats.totalProfiles || 0);
  html = html.replace('{{averageFavorites}}', stats.averageFavorites || 0);
  html = html.replace('{{totalFilms}}', stats.totalFilms || 0);
  html = html.replace('{{topFavoriteFilm}}', stats.topFavoriteFilm || 'Aucun');
  html = html.replace('{{topCategory}}', stats.topCategory || 'Aucune');
  return html;
};

export { Stats };
