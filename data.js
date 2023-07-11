const fs = require ('fs');
const path = require('path');

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

module.exports = { extractLinkText, pathExists, isMarkdownFile };
