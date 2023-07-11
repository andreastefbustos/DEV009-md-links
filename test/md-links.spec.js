const { mdLinks } = require('../index.js');


describe('mdLinks', () => {
  it('Should return a Promise', (done) => {
    mdLinks('test.md')
      .then((links) => {
        expect(links).toBeInstanceOf(Array);
        done(); // Llama a done() para indicar que la prueba ha finalizado
      })
      .catch((error) => {
        done(error); // Llama a done(error) si ocurre un error durante la prueba
      });
  });
});
