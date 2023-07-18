const fs = require ('fs');
const path = require('path');
const axios = require('axios');

// Función para identificar si la ruta existe 
const pathExists = (file) => {
  return fs.existsSync(file);
}

// Función para leer directorios y subdirectorios
const readDir = (dir) => {
  const entities = fs.readdirSync(dir);
  let mdFiles = [];

  entities.forEach(entity => {
    const fullPath = path.join(dir, entity);
    const entityStats = fs.statSync(fullPath);
    // console.log(entityStats)

    if (entityStats.isFile() && entity.endsWith('.md')) {
      mdFiles.push(fullPath);
    } else if (entityStats.isDirectory()) {
      // Recursion
      mdFiles = mdFiles.concat(readDir(fullPath));
    }
  });

  if (mdFiles.length === 0) {
    throw new Error('No Markdown files found in the directory or subdirectories.');
  }

  return mdFiles;
}

// ------------> Verificación de archivo Markdown <-------------------
// Función que verifica si el archivo es markdown devolviendo un booleano
const isMarkdownFile = (file) => {
  const fileExtension = path.extname(file);
  return fileExtension === '.md';
}

// Función para verificar si el archivo es de tipo Markdown devolviendo una promesa
const verifyMarkdown = (file) => {
if (!isMarkdownFile(file)) {
  return Promise.reject(new Error('The file is not a Markdown (.md).'));
}
return Promise.resolve(file);
}
// ---------------------------------------------------------------------

// Función para leer el contenido del archivo
function readFileContent(file) {
  return new Promise((resolve, reject) => {
    fs.readFile(file, 'utf-8', (error, fileContent) => {
      if (error) {
        return reject(error);
      }
      resolve({ file, fileContent });
    });
  });
}

// -----------> En este bloque se extrae el link y text <-----------------
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

// Función para extraer los links del contenido del archivo
const extractLinks = ({ file, fileContent }) => {
  const linkObjects = extractLinkText(fileContent);
  return linkObjects.map((link) => ({
    href: link.href,
    text: link.text,
    file: file,
  }));
}
// -----------------------------------------------------------------
  
// -------------> Validación URL <--------------------------------------
// Función para obtener los status de los links
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

// Función para validar los links
const validateLinks = (links, validate) => {
  if(!validate) {
    return Promise.resolve(links);
  }

  const validatePromises = links.map((link) => {
    return validateUrl(link.href).then((validateResult) => ({
      ...link,
      status: validateResult.status,
      ok: validateResult.ok,
    }))
  });

  return Promise.all(validatePromises);
}
// ----------------------------------------------------------------------

module.exports = { extractLinkText, extractLinks, pathExists, isMarkdownFile, verifyMarkdown, validateUrl, validateLinks, readFileContent, readDir };
