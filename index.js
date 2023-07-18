const fs = require ('fs');
const pathFile = require('path');
const { extractLinkText, pathExists, isMarkdownFile, validateUrl, readDir } = require('./data.js');
// const { error } = require('console');

// Funcion global 
const mdLinks = (path, validate = false) => {
  // cuando el argumento no es un string
  if (typeof path !== 'string') {
    return Promise.reject(new Error('The argument must be a string.'));
  }

  const absolutePath = pathFile.resolve(path);

  // cuando el directorio no existe
  if (!pathExists(absolutePath)) {
    return Promise.reject(new Error('The route does not exist.'));
  }

  // Check si el path es un directorio
  const isDirectory = fs.lstatSync(absolutePath).isDirectory();

  // Si es un directorio, obten todos los .md files
  let files;
  try {
    files = isDirectory ? readDir(absolutePath) : [absolutePath];
  } catch (error){
    console.error(error.message);
    return Promise.resolve([]); // Retorna un array vacio si no se encontraron files .md
  }
  
  // Loop a traves de todos los files.
  const filePromises = files.map(file => {
    return new Promise((resolve, reject) => {
      // Verifica si el archivo es un .md (markdown)
      if (!isMarkdownFile(file)) {
        reject(new Error('The file is not a Markdown (.md).'));
        return;
      }
      
      fs.readFile(file, 'utf-8', (error, fileContent) => {
        const linkObjects = extractLinkText(fileContent);
        // console.log(`Links from ${file}:`, linkObjects)
        if(validate) {
          const validatePromises = linkObjects.map((link) => {
            return validateUrl(link.href)
              .then(validateResult => {
                return {
                  href: link.href,
                  text: link.text,
                  file: file,
                  status: validateResult.status,
                  ok: validateResult.ok
                }
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
              file: file,
            };
          });
          resolve(links);
        }
      });
    });
  });
  
  // Devuelve una promesa que se resuelve cuando todas las promesas del array filePromises se resuelven.
  // para no devolver un array de arrays se puede aplanar el array de arrays antes de devolverlo. 
  // Esto podría hacerse utilizando la función Array.prototype.flat
  return Promise.all(filePromises)
    .then(arrays => arrays.flat());
};

// La diferencia es que en el caso del if (validate), estoy trabajando con un array de promesas y necesito asegurarme de que todas se hayan 
// resuelto antes de continuar. En el caso del else, estoy trabajando con un array de objetos, por lo que se puede resolver la promesa principal 
// inmediatamente.

module.exports = { mdLinks };

