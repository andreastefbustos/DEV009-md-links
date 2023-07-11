// Esto es una libreria estrandar 
const { URL } = require('url');
const fs = require ('fs');
const pathFile = require('path');

// const links = [{
//   href: 'https://es.wikipedia.org/wiki/Markdown',
//   text: 'Markdown',
//   file: 'RADME.md'
// },
// {
//   href: 'https://nodejs.org/',
//   text: 'Node.js',
//   file: 'RADME.md'
// },
// {
//   href: 'https://developers.google.com/v8/',
//   text: 'motor de JavaScript V8 de Chrome',
//   file: 'RADME.md'
// },
// ];

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

// Funcion global 
const mdLinks = (path) => {
  return new Promise((resolve, reject) => {
    const absolutePath = pathFile.resolve(path);

    if (!pathExists(absolutePath)) {
      reject(new Error('La ruta no existe.'));
      return;
    }

    fs.readFile(absolutePath, 'utf8', (error, fileContent) => {
      if (error) {
        reject(error);
        return;
      }

      const linkObjects = extractLinkText(fileContent);

      const links = linkObjects.map((link) => {
        return {
          href: validateURL(link.href) ? link.href : undefined,
          text: link.text,
          file: absolutePath,
        };
      });

      resolve(links);
    });
  });
};

// Ejemplo de uso
mdLinks('test.md')
  .then((result) => {
    console.log(result);

    // Ejemplo adicional: Obtener solo los hrefs de los enlaces
    // const text = result.map((link) => link.text);
    // console.log(text); // Imprimir solo los hrefs
  })
  .catch((error) => {
    console.error(error);
  });

module.exports = { mdLinks };

