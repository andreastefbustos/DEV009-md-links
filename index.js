const fs = require ('fs');
const pathFile = require('path');
const { extractLinkText, pathExists, isMarkdownFile } = require('./data.js')

// Funcion global 
const mdLinks = (path) => {
  if (typeof path !== 'string') {
    throw new Error('The argument must be a string.');
  }

  if (!isMarkdownFile(path)) {
    throw new Error('The file is not a Markdown file (.md).');
  }

  return new Promise((resolve, reject) => {
    const absolutePath = pathFile.resolve(path);

    if (!pathExists(absolutePath)) {
      reject(new Error('La ruta no existe.'));
      return;
    }

    fs.readFile(absolutePath, 'utf8', (error, fileContent) => {
      const linkObjects = extractLinkText(fileContent);

      const links = linkObjects.map((link) => {
        return {
          href: link.href,
          text: link.text,
          file: absolutePath,
        };
      });
    
      resolve(links);
    });
  });
};

module.exports = { mdLinks };

