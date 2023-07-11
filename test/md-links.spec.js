const { mdLinks } = require('../index.js');
const { validateURL } = require('../data.js');


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
});

describe('validateURL', () => {
  test('Should return true if the URL is valid', () => {
    const validURL = 'https://example.com';
    expect(validateURL(validURL)).toBe(true);
  });
  
  test('Should return true if the URL is not valid', () => {
    const invalidURL = 'example.com';
    expect(validateURL(invalidURL)).toBe(false);
  });
})




