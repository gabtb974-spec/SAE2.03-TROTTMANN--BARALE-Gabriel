let templateFile = await fetch(new URL('./template.html', import.meta.url));
let template = await templateFile.text();

let NavBar = {};

NavBar.format = function (hAbout, hHome, hStats, hProfile) {
  let html = template;
  html = html.replace("{{hAbout}}", hAbout);
  html = html.replace("{{hListe}}", hHome);
  html = html.replace("{{hStats}}", hStats);
  html = html.replace("{{hProfile}}", hProfile || '');
  return html;
};

export { NavBar };
