const fs = require ('fs');
const pathFile = require('path');
const { extractLinkText, pathExists, isMarkdownFile, validateUrl } = require('./data.js')

// Funcion global 
const mdLinks = (path, validate = false) => {
  if (typeof path !== 'string') {
    throw new Error('The argument must be a string.');
  }

  if (!isMarkdownFile(path)) {
    throw new Error('The file is not a Markdown file (.md).');
  }

  return new Promise((resolve, reject) => {
    const absolutePath = pathFile.resolve(path);

    if (!pathExists(absolutePath)) {
      reject(new Error('The route does not exist.'));
      return;
    }

    fs.readFile(absolutePath, 'utf8', (error, fileContent) => {
      const linkObjects = extractLinkText(fileContent);

      if(validate) {
        const validatePromises = linkObjects.map((link) => {
          return validateUrl(link.href)
            .then(validateResult => {
              return {
                href: link.href,
                text: link.text,
                file: absolutePath,
                status: validateResult.status,
                ok: validateResult.ok
              };
            })
        })
        // validatePromises es un array de promesas, es decir, Promise.all(validatePromises) devuelve 
        // una nueva promesa que se resuelve cuando todas las promesas en el array validatePromises se han resuelto.
        // De esta manera, el código que consume esta promesa puede trabajar con un array de resultados en lugar de un array de promesas.
        Promise.all(validatePromises).then(links => resolve(links));
      } else {
        const links = linkObjects.map((link) => {
          return {
            href: link.href,
            text: link.text,
            file: absolutePath,
          };
        });
        
        resolve(links);
      }
    });
  });
};

// La diferencia es que en el caso del if (validate), estoy trabajando con un array de promesas y necesito asegurarme de que todas se hayan 
// resuelto antes de continuar. En el caso del else, estoy trabajando con un array de objetos, por lo que se puede resolver la promesa principal 
// inmediatamente.

module.exports = { mdLinks };

