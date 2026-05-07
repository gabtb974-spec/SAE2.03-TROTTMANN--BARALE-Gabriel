let templateFile = await fetch(new URL('./template.html', import.meta.url));
let template = await templateFile.text();

let ProfileBanner = {};

ProfileBanner.format = function(profile) {
  const avatar = profile.avatar
    ? `<img class="profile-banner__avatar-img" src="../server/images/${profile.avatar}" alt="${profile.name}" />`
    : `<div class="profile-banner__avatar-empty">${profile.name.charAt(0).toUpperCase()}</div>`;

  const ageLabel = profile.min_age === 0 ? 'Tous publics' : `${profile.min_age}+`;

  let html = template;
  html = html.replace('{{avatar}}', avatar);
  html = html.replace('{{name}}', profile.name);
  html = html.replace('{{age}}', ageLabel);
  return html;
};

export { ProfileBanner };