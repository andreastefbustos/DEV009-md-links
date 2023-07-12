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

module.exports = { mdLinks };

