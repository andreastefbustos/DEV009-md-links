const { URL } = require('url');
const fs = require ('fs');

// función para identificar si la URL es encontrada
const validateURL = (urlString) => {
    try {
      new URL(urlString);
      return true;
    } catch (error) {
      return false;
    }
};

// const url1 = 'https://example.com';
// const url2 = 'invalid-url';

// if (validateURL(url1)) {
//   console.log('La URL es válida.');
// } else {
//   console.log('La URL no es válida.');
// }

// if (validateURL(url2)) {
//   console.log('La URL es válida.');
// } else {
//   console.log('La URL no es válida.');
// }

// Función para extraer el link del text
const extractLinkText = (content) => {
    const regex = /\[([^[]+)\]\(([^()]+)\)/g;
    const linkObjects = [];
    let match;
  
    while ((match = regex.exec(content)) !== null) {
      linkObjects.push({
        href: match[2],
        text: match[1],
      });
    }
  
    return linkObjects;
};
  
// Ejemplo de uso
// const markdownContent = `
//   Este es un [enlace](https://example.com) a un sitio web.
//   Aquí hay otro [enlace](https://example.org) a otro sitio web.
// `;
  
// const linkTexts = extractLinkText(markdownContent);
// console.log('Textos de los enlaces:', linkTexts);

// Función para identificar si la ruta existe 
const pathExists = (file) => {
    return fs.existsSync(file);
}
  
// const file = 'README.md'
// if (pathExists(file)) {
//   console.log('La ruta existe.');
// } else {
//   console.log('La ruta no existe.');
// }

module.exports = { validateURL, extractLinkText, pathExists };
