let templateFile = await fetch(new URL('./template.html', import.meta.url));
let template = await templateFile.text();

let NavBar = {};

NavBar.format = function (hAbout, hHome) {
  let html = template;
  html = html.replace("{{hAbout}}", hAbout);
  html = html.replace("{{hListe}}", hHome);
  return html;
};

export { NavBar };
