const { mdLinks } = require('../index.js');
const { validateUrl } = require('../data.js')
const axios = require('axios');
const mockAxios = require('../test/__mock__/axios.js');

// Sobrescribe la instancia de axios con el mock
axios.get = mockAxios.get;

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

  // --------> Test sobre function validateUrl data.js <---------
  // Testea cuando validate es true
  it('Should add status and ok properties when validate is true', () => {
    const markdownPath = 'test.md';
    return mdLinks(markdownPath, true)
      .then(links => {
        // Verifica que cada objeto de enlace tenga las propiedades correctas
        links.forEach(link => {
          expect(link).toHaveProperty('href');
          expect(link).toHaveProperty('text');
          expect(link).toHaveProperty('file');
          expect(link).toHaveProperty('status');
          expect(link).toHaveProperty('ok');
        });
      });
  });

  // Testea si el URL no existe
  it('Returns "fail" when the URL does not exist', () => {
    return validateUrl('https://nonexistent-url.com')
      .then(response => {
        expect(response).toEqual({
          status: 'No Response',
          ok: 'fail'
        });
      });
  });

  // Testea si el URL es exitoso
  it('Returns "ok" when the URL is successful', () => {
    return validateUrl('https://successful-url.com')
      .then(response => {
        expect(response).toEqual({
          status: 200,
          ok: 'ok'
        });
      });
  });

  // Testea si el URL tiene un estado de respuesta no exitoso
  it('Returns "fail" when the status is not between 200 and 399', () => {
    return validateUrl('https://unsuccessful-url.com')
      .then(response => {
        expect(response).toEqual({
          status: 500,
          ok: 'fail'
        });
      });
  });

  // Testea si el URL tiene un error de respuesta no existente
  it('Returns "No Response" when the response does not exist', () => {
    mockAxios.get.mockImplementation(() =>
      Promise.reject({ response: undefined })
    );

    return validateUrl('https://error-url.com')
      .then(response => {
        expect(response).toEqual({
          status: 'No Response',
          ok: 'fail'
        });
      });
  });
  // --------> Hasta aqui llegan los test completos sobre la funcion de validar el URL <---------
});