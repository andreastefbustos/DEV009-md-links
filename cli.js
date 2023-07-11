const { mdLinks } = require('./index.js')

// Resolución de la promesa mdLinks
mdLinks('test.md')
  .then((result) => {
    console.log(result);
  })
  .catch((error) => {
    console.error(error);
});

