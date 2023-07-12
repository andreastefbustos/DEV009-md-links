const { mdLinks } = require('../index.js');
const { dataMock } = require('./mockData.js');

describe('mdLinks', () => {
  // Testea si es un promise y retorna un array 
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

  // Testea si la ruta no existe
  test('Should reject the promise if the path does not exist', () => {
    expect.assertions(1); // Asegura que se realice al menos una afirmación dentro de la prueba
  
    const nonExistentPath = '/ruta/no/existente.md';
  
    return expect(mdLinks(nonExistentPath)).rejects.toThrow('The route does not exist.');
  });

  // Testea si el parametro enviado a la función de mdLinks es un caracter de strings
  test('Should throw an error if the argument is not a string', () => {
    expect(() => mdLinks(123)).toThrow('The argument must be a string.');
  });

  // Testea si el archivo tiene la extension .md 
  test('Should throw an error if the file is not a markdown file', () => {
    expect(() => mdLinks('test.txt')).toThrow('The file is not a Markdown file (.md).');
  });

  // Testea la validacion de la URL
  it('Returns correct data when validate is false', () => {
    return mdLinks(dataMock.pathFile, false)
      .then(links => {
        expect(links).toEqual(dataMock.validateFalse);
      });
  });

  it('Returns correct data when validate is true', () => {
    return mdLinks(dataMock.pathFile, true)
      .then(links => {
        expect(links).toEqual(dataMock.validateTrue);
      });
  });
});