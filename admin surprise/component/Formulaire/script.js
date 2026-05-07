let templateFile = await fetch('./component/Formulaire/template.html');
let template = await templateFile.text();

let Formulaire = {};

Formulaire.format = function(genresHtml) {
    let html = template;
    html = html.replace("{{genres}}", genresHtml);
    return html;
};


Formulaire.validate = function(form) {
    const title = form.querySelector('#title').value.trim();
    const director = form.querySelector('#director').value.trim();
    const release_year = form.querySelector('#release_year').value.trim();
    const duration = form.querySelector('#duration').value.trim();
    const synopsis = form.querySelector('#synopsis').value.trim();
    const genre = form.querySelector('#genre').value.trim();
    const age = form.querySelector('#age').value.trim();
    const trailer = form.querySelector('#trailer').value.trim();

    if (!title) {
        return { valid: false, message: 'Le titre du film est obligatoire.' };
    }
    if (!director) {
        return { valid: false, message: 'Le réalisateur est obligatoire.' };
    }
    if (!release_year || isNaN(release_year) || release_year < 1800 || release_year > new Date().getFullYear()) {
        return { valid: false, message: 'L\'année de sortie doit être un nombre entre 1800 et ' + new Date().getFullYear() + '.' };
    }
    if (!duration || isNaN(duration) || duration <= 0) {
        return { valid: false, message: 'La durée doit être un nombre positif.' };
    }
    if (!synopsis) {
        return { valid: false, message: 'Le synopsis est obligatoire.' };
    }
    if (!genre) {
        return { valid: false, message: 'Le genre est obligatoire.' };
    }
    const allowedAges = ['0', '10', '12', '16', '18'];
    if (!age || !allowedAges.includes(age)) {
        return { valid: false, message: 'La restriction d\'âge doit être l\'une des valeurs suivantes : Tout public, 10, 12, 16, 18.' };
    }
    if (!trailer) {
        return { valid: false, message: 'Le lien de la bande annonce est obligatoire.' };
    }

    return { valid: true };
};

Formulaire.getFormData = function(form) {
    return new FormData(form);
};

Formulaire.submitForm = async function(event, addMovieFn) {
    event.preventDefault();
    const form = event.target;
    const validation = Formulaire.validate(form);
    if (!validation.valid) {
        alert(validation.message);
        return;
    }
    const formData = Formulaire.getFormData(form);
    if (typeof addMovieFn !== 'function') {
        console.error('addMovieFn n\'est pas une fonction');
        alert('Impossible de soumettre le formulaire.');
        return;
    }
    try {
        const result = await addMovieFn(formData);
        if (result.success) {
            alert(result.message || 'Film ajouté avec succès !');
            form.reset();
        } else {
            alert('Erreur : ' + (result.message || 'Impossible d\'ajouter le film'));
        }
    } catch (error) {
        console.error('Erreur lors de l\'ajout du film:', error);
        alert('Erreur réseau ou serveur : ' + error.message);
    }
};

export { Formulaire };