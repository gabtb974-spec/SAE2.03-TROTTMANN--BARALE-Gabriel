let templateFile = await fetch(new URL('./template.html', import.meta.url));
let template = await templateFile.text();

let ProfileForm = {};

ProfileForm.format = function(profiles = []) {
    let profileOptions = '';
    profiles.forEach(profile => {
        profileOptions += `<option value="${profile.id}">${profile.name}</option>`;
    });
    let html = template.replace('{{profileOptions}}', profileOptions);
    return html;
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

ProfileForm.loadProfile = function(profile, form) {
    if (!profile) return;
    form.querySelector('#profile-id').value = profile.id || '';
    form.querySelector('#name').value = profile.name || '';
    form.querySelector('#age').value = profile.min_age || '0';
    document.querySelector('#submit-btn').textContent = 'Modifier le profil';
};

ProfileForm.resetForm = function(form) {
    form.querySelector('#profile-id').value = '';
    form.querySelector('#name').value = '';
    form.querySelector('#age').value = '0';
    form.querySelector('#avatar').value = '';
    document.querySelector('#profile-select').value = '';
    document.querySelector('#submit-btn').textContent = 'Ajouter le profil';
};

ProfileForm.submitForm = async function(event, addProfileFn, updateProfileFn) {
    event.preventDefault();
    const form = event.target;
    const validation = ProfileForm.validate(form);
    if (!validation.valid) {
        alert(validation.message);
        return;
    }
    const profileId = form.querySelector('#profile-id').value;
    const formData = ProfileForm.getFormData(form);
    try {
        const fn = profileId ? updateProfileFn : addProfileFn;
        const result = await fn(formData);
        if (result.success) {
            alert(result.message || (profileId ? 'Le profil a été modifié avec succès.' : 'Le profil a été ajouté avec succès.'));
            ProfileForm.resetForm(form);
            location.reload();
        } else {
            alert('Erreur : ' + (result.message || 'Impossible de traiter le profil.'));
        }
    } catch (error) {
        console.error('Erreur lors du traitement du profil :', error);
        alert('Erreur réseau ou serveur : ' + error.message);
    }
};

export { ProfileForm };