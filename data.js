const fs = require ('fs');
const path = require('path');
const axios = require('axios');

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
  
// Función para identificar si la ruta existe 
const pathExists = (file) => {
    return fs.existsSync(file);
}

// Función que verifica si el archivo es markdown
const isMarkdownFile = (file) => {
    const fileExtension = path.extname(file);
    return fileExtension === '.md';
}

// Función que me valida si validate = false ó undefined, validate = true
const validateUrl = (url) => {
  return axios.get(url)
    .then(response => {
      return {
        status: response.status,
        ok: response.status >= 200 && response.status < 400 ? 'ok' : 'fail'
      };
    })
    .catch(error => {
      return {
        status: error.response ? error.response.status : 'No Response',
        ok: 'fail'
      };
    });
};

module.exports = { extractLinkText, pathExists, isMarkdownFile, validateUrl };
