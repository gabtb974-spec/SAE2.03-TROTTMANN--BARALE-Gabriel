-getAllMovies : Elle va chercher tous les films de la bibliothèque que tu as le droit de regarder, selon ton âge.

-getFeaturedMovies : Elle fait la même chose, mais elle ne ramène que les films "à l'affiche" (la sélection du moment).

-addMovie : Elle ajoute un tout nouveau film dans la bibliothèque (avec son titre, son résumé, etc.).

-addProfile : Elle crée un nouveau profil utilisateur (exactement comme quand tu ajoutes un profil "Enfant" ou "Papa" sur ton Netflix).

-getAllCategories : Elle liste simplement tous les genres de films qui existent (Action, Comédie, Drame...).

-getAllProfiles : Elle récupère la liste de tous les profils créés, triés par ordre alphabétique, pour l'écran de choix du profil.

-ensureFavoriteTable : C'est l'outil de bricolage. Elle vérifie si le carnet pour noter les favoris existe. S'il n'existe pas, elle le fabrique.

-getFavoritesByProfile : Elle lit le carnet pour aller chercher tous les films qu'un profil précis a mis en "coup de cœur".

-favoriteExists : Elle pose une question par oui ou par non : "Est-ce que ce film est déjà dans tes favoris ?" (très pratique pour savoir si on affiche un cœur rouge ou un cœur vide).

-addFavorite : Elle note un nouveau film dans ta liste de coups de cœur.

-removeFavorite : Elle gomme un film de ta liste de coups de cœur.

-getTotalProfiles : Elle compte combien il y a de profils en tout sur le site (pour faire des statistiques).

-getAverageFavorites : Elle calcule une moyenne : en général, combien de films les gens mettent-ils dans leurs favoris ?

-getTotalFilms : Elle compte tout simplement le nombre de films disponibles dans la bibliothèque.

-getTopFavoriteFilm : Elle cherche la star de la bibliothèque : le film qui a reçu le plus de cœurs par tout le monde.

-getTopCategory : Elle cherche le genre de film préféré de tes utilisateurs au global (ex: "Ah, c'est l'Action qui plaît le plus !").

-searchMovies : C'est la barre de recherche. Elle fouille dans la bibliothèque pour trouver les films qui contiennent le mot que tu as tapé (toujours en vérifiant ton âge).

-updateFeaturedStatus : C'est l'interrupteur. Elle permet de décider si un film doit être mis "à l'affiche" sur l'accueil, ou si on l'enlève de la sélection.


Cardinalités : 

Pour la relation "appartenir", j'ai mis (1,1) du côté Movie car, dans mon système, un film doit obligatoirement être rangé dans une et une seule catégorie principale. En face, la table Category est en (0,n) car un genre peut regrouper plein de films, ou aucun s'il est vide. Concernant les "Favoris", j'ai logiquement mis du (0,n) des deux côtés : un profil a le droit de n'avoir aucun film en favori ou d'en lister plusieurs, et un film peut très bien n'être le favori de personne comme il peut être ajouté par une multitude d'utilisateurs.