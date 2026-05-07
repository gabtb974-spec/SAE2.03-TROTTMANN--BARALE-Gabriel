let templateFile = await fetch(new URL('./template.html', import.meta.url));
let template = await templateFile.text();

let FeaturedSection = {};

FeaturedSection.format = function(movies, hSelectMovie) {
  if (!movies || movies.length === 0) {
    return `
      <section class="featured-section">
        <div class="featured-section__header">
          <h2>Films mis en avant</h2>
        </div>
        <p class="featured-section__empty">Aucun film mis en avant pour le moment.</p>
      </section>
    `;
  }

  const cards = movies.map(movie => {
    let backgroundImage = movie.featuredImage ? movie.featuredImage : movie.image;
    
    if (movie.name) {
      
      const movieNameLower = movie.name.toLowerCase();

     
      if (movieNameLower.includes('pacific rim')) {
        backgroundImage = 'pacificrim.webp'; 
      } else if (movieNameLower.includes('godzilla')) {
        backgroundImage = 'Godzilla.webp';
      } else if (movieNameLower.includes('super mario galaxy')) {
        backgroundImage = 'SuperMarioGalaxy.webp';
      } else if (movieNameLower.includes('star wars la menace fantôme')) {
        backgroundImage = 'StarWarsLaMenaceFantome.webp'; 
      } else if (movieNameLower.includes("le seigneur des anneaux : la communauté de l'anneau")) {
        backgroundImage = 'LeSeigneurDesAnneauxLaCommunauteDeLAnneau.webp';
      }
    }

    return `
      <article class="featured-card" style="background-image: url('../server/images/${backgroundImage}')" onclick="${hSelectMovie}('${movie.id}')">
        <div class="featured-card__overlay">
          <div class="featured-card__body">
            <h3 class="featured-card__title">${movie.name}</h3>
          </div>
        </div>
      </article>
    `;
  }).join('');

  let html = template;
  html = html.replace('{{featuredCards}}', cards);
  return html;
};

FeaturedSection.attachScrollBoundary = function() {
  const cardsContainer = document.querySelector('.featured-section__cards');
  if (!cardsContainer) return;

  cardsContainer.addEventListener('wheel', function(event) {
    const atTop = cardsContainer.scrollTop <= 0;
    const atBottom = cardsContainer.scrollTop + cardsContainer.clientHeight >= cardsContainer.scrollHeight - 1;
    const deltaY = event.deltaY;

    if ((deltaY > 0 && atBottom) || (deltaY < 0 && atTop)) {
      event.preventDefault();
      window.scrollBy({ top: deltaY, left: 0, behavior: 'auto' });
    }
  }, { passive: false });
};

export { FeaturedSection };