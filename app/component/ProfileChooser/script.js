let templateFile = await fetch(new URL('./template.html', import.meta.url));
let template = await templateFile.text();

let ProfileChooser = {};

ProfileChooser.format = function(profiles) {
  let profilesHtml = '';
  profiles.forEach(profile => {
    const avatar = profile.avatar
      ? `<img class="profile-chooser__avatar" src="../server/images/${profile.avatar}" alt="${profile.name}" />`
      : `<div class="profile-chooser__avatar profile-chooser__avatar--empty">P</div>`;
    const age = profile.min_age === 0 ? 'Tous publics' : `${profile.min_age}+`;
    const item = `
      <button class="profile-chooser__item" type="button" onclick="C.handlerSelectProfile('${profile.id}')">
        ${avatar}
        <span class="profile-chooser__name">${profile.name}</span>
        <span class="profile-chooser__age">${age}</span>
      </button>
    `;
    profilesHtml += item;
  });

  let html = template;
  html = html.replace('{{profiles}}', profilesHtml);
  return html;
};

export { ProfileChooser };