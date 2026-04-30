let templateFile = await fetch(new URL('./template.html', import.meta.url));
let template = await templateFile.text();

let ProfileForm = {};

ProfileForm.format = function() {
    return template;
};

ProfileForm.validate = function(form) {
    const name = form.querySelector('#name').value.trim();
    const age = form.querySelector('#age').value;
    const avatarInput = form.querySelector('#avatar');
    if (!name) {
        return { valid: false, message: 'Le nom du profil est requis.' };
    }
    const allowedAges = ['0', '12', '16', '18'];
    if (!allowedAges.includes(age)) {
        return { valid: false, message: 'Choisissez une restriction d\'âge valide.' };
    }
    if (avatarInput && avatarInput.files.length > 0) {
        const file = avatarInput.files[0];
        const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
        if (!allowedTypes.includes(file.type)) {
            return { valid: false, message: 'L\'avatar doit être une image JPG, PNG ou GIF.' };
        }
        if (file.size > 5 * 1024 * 1024) {
            return { valid: false, message: 'L\'avatar doit faire moins de 5 Mo.' };
        }
    }
    return { valid: true };
};

ProfileForm.getFormData = function(form) {
    return new FormData(form);
};

ProfileForm.submitForm = async function(event, addProfileFn) {
    event.preventDefault();
    const form = event.target;
    const validation = ProfileForm.validate(form);
    if (!validation.valid) {
        alert(validation.message);
        return;
    }
    const formData = ProfileForm.getFormData(form);
    try {
        const result = await addProfileFn(formData);
        if (result.success) {
            alert(result.message || 'Le profil a été ajouté avec succès.');
            form.reset();
        } else {
            alert('Erreur : ' + (result.message || 'Impossible d\'ajouter le profil.'));
        }
    } catch (error) {
        console.error('Erreur lors de l\'ajout du profil :', error);
        alert('Erreur réseau ou serveur : ' + error.message);
    }
};

export { ProfileForm };