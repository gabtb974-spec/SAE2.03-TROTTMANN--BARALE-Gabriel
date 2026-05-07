let templateFile = await fetch(new URL('./template.html', import.meta.url));
let template = await templateFile.text();

let Footer = {};

Footer.format = function() {
  return template;
};

export { Footer };