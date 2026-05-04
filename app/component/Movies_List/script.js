let templateFile = await fetch(new URL('./template.html', import.meta.url));
let template = await templateFile.text();

let MoviesList = {};

MoviesList.format = function (movies, hSelectMovie) {
  // Génère le HTML pour chaque film
  let html = '<ul class="movies__list">';
  movies.forEach(movie => {
    let movieHtml = template
      .replace("{{name}}", movie.name)
      .replace("{{image}}", `../server/images/${movie.image}`)
      .replace("{{hSelectMovie}}", `${hSelectMovie}('${movie.id}')`);
    html += movieHtml;
  });
  html += '</ul>';
  return html;
};

export { MoviesList };
