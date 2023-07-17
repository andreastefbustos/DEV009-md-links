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
      // console.log('Data:', response.data);  // Cuerpo de la respuesta
      // console.log('Headers:', response.headers);  // Encabezados de la respuesta
      // console.log('Status:', response.status); // Estado de la respuesta
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

const readDir = (dir) => {
  const pathDir = fs.readdirSync(dir);

  //filtar solo los file con la extensión .md
  const mdFiles = pathDir.filter(filename => filename.endsWith('.md'));

  if (mdFiles.length === 0) {
    throw new Error('No Markdown files found in the directory.');
  }

  // Devuelve rutas completas -> .testDirectory/testDir.md
  return mdFiles.map(filename => path.join(dir, filename));
}

module.exports = { extractLinkText, pathExists, isMarkdownFile, validateUrl, readDir };
