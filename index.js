const fs = require ('fs');
const pathFile = require('path');
const { extractLinks, pathExists, verifyMarkdown, validateLinks, readFileContent, readDir } = require('./data.js');

// Funcion global 

const mdLinks = (path, options = { validate: false }) => {
  return new Promise((resolve, reject) => {
    // cuando el argumento no es un string
    if (typeof path !== 'string') {
      reject(new Error('The argument must be a string.'));
      return; // return aquí para evitar que el código siga ejecutándose
    }

    const absolutePath = pathFile.resolve(path);

    // cuando el directorio no existe
    if (!pathExists(absolutePath)) {
      reject(new Error('The route does not exist.'));
      return; // return aquí para evitar que el código siga ejecutándose
    }

    // Check si el path es un directorio
    const isDirectory = fs.lstatSync(absolutePath).isDirectory();

    // Si es un directorio, obten todos los .md files
    let files = isDirectory ? readDir(absolutePath) : [absolutePath];
    if (files.length == 0) {
      reject(new Error('No Markdown files found in the directory or subdirectories.'));
      return; // return aquí para evitar que el código siga ejecutándose
    }

    // Loop a través de todos los files.
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
      .then(arrays => arrays.flat())
      .then(resolve) // Resuelve la promesa externa con el resultado
      .catch(reject); // Captura cualquier error dentro de las promesas y rechaza la promesa externa
  });
};

module.exports = { mdLinks };

