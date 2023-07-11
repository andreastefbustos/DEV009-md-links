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

  test('Should reject the promise if the path does not exist', () => {
    expect.assertions(1); // Asegura que se realice al menos una afirmación dentro de la prueba
  
    const nonExistentPath = '/ruta/no/existente.md';
  
    return expect(mdLinks(nonExistentPath)).rejects.toThrow('La ruta no existe.');
  });

  test('Should throw an error if the argument is not a string', () => {
    expect(() => mdLinks(123)).toThrow('The argument must be a string.');
  });
});