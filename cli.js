const { mdLinks } = require('./index.js')

// Resolución de la promesa mdLinks con validación
// mdLinks('test.md')
//   .then((result) => {
//     console.log(result);
//   })
//   .catch((error) => {
//     console.error(error);
// });

mdLinks('test.md', true)
  .then((result) => {
    console.log(result);
  })
  .catch((error) => {
    console.error(error);
});

// mdLinks('test.md', false)
//   .then((result) => {
//     console.log(result);
//   })
//   .catch((error) => {
//     console.error(error);
// });
