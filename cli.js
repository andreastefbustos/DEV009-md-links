const { mdLinks } = require('./index.js')

// Resolución de la promesa mdLinks
// mdLinks('test.md')
//   .then((result) => {
//     console.log(result);

//     //Ejemplo adicional: Obtener solo los hrefs de los enlaces
//     // const text = result.map((link) => link.text);
//     // console.log(text); // Imprimir solo los hrefs
//   })
//   .catch((error) => {
//     console.error(error);
// });

// mdLinks('test-empty.md')
//   .then((result) => {
//     console.log(result);

//     //Ejemplo adicional: Obtener solo los hrefs de los enlaces
//     // const text = result.map((link) => link.text);
//     // console.log(text); // Imprimir solo los hrefs
//   })
//   .catch((error) => {
//     console.error(error);
// });

mdLinks('test-noLinks.md')
  .then((result) => {
    console.log(result);

    //Ejemplo adicional: Obtener solo los hrefs de los enlaces
    // const text = result.map((link) => link.text);
    // console.log(text); // Imprimir solo los hrefs
  })
  .catch((error) => {
    console.error(error);
});

// mdLinks('tes.md')
//   .then((result) => {
//     console.log(result);

//     //Ejemplo adicional: Obtener solo los hrefs de los enlaces
//     // const text = result.map((link) => link.text);
//     // console.log(text); // Imprimir solo los hrefs
//   })
//   .catch((error) => {
//     console.error(error);
// });

