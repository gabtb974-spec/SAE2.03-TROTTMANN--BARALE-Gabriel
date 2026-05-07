let templateFile = await fetch(new URL('./template.html', import.meta.url));
let template = await templateFile.text();

let FeaturedManager = {};

FeaturedManager.format = function(results = null) {
  let html = template;
  if (results !== null) {
    html = html.replace('{{featuredResults}}', FeaturedManager.formatResults(results));
  } else {
    html = html.replace('{{featuredResults}}', '<p class="featured-search__placeholder">Tapez un titre pour lancer la recherche.</p>');
  }
  return html;
};

FeaturedManager.formatResults = function(movies) {
  if (!movies || movies.length === 0) {
    return '<p>Aucun film trouvé.</p>';
  }
  
  const moviesHtml = movies.map(movie => {
    const isFeatured = movie.is_featured == 1 || movie.is_featured === true;
    const buttonLabel = isFeatured ? 'Retirer de la mise en avant' : 'Mettre en avant';
    const buttonClass = isFeatured ? 'featured-search__button--featured' : 'featured-search__button--not-featured';
    
    return `
      <div class="featured-search__result-item">
        <div class="featured-search__result-info">
          <h3>${movie.name}</h3>
          <p>Catégorie : ${movie.category || 'N/A'}</p>
          <p>Statut : ${isFeatured ? '✓ Mis en avant' : 'Non mis en avant'}</p>
        </div>
        <button type="button" class="featured-search__button ${buttonClass}" onclick="C.handlerToggleFeatured('${movie.id}', ${isFeatured})">
          ${buttonLabel}
        </button>
      </div>
    `;
  }).join('');
  
  return `<div class="featured-search__results-list">${moviesHtml}</div>`;
};

export { FeaturedManager };
