const fs = require ('fs');
const pathFile = require('path');
const { extractLinks, pathExists, verifyMarkdown, validateLinks, readFileContent, readDir } = require('./data.js');

// Funcion global 
const mdLinks = (path, options = { validate: false }) => {
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
  let files = isDirectory ? readDir(absolutePath) : [absolutePath];
  if (files.length == 0) {
    return Promise.reject(new Error('No Markdown files found in the directory or subdirectories.'));
  }

  // Loop a traves de todos los files.
  const filePromises = files.map(file => {
    return verifyMarkdown(file)
      .then(readFileContent)
      .then(extractLinks)
      .then(links => validateLinks(links, options))
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

