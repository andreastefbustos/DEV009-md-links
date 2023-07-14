const mockAxios = {
    get: jest.fn((url) => {
      // Simula una respuesta exitosa para ciertas URL
      if (url === 'https://successful-url.com') {
        return Promise.resolve({
          status: 200,
          ok: 'ok'
        });
      }

      // Testea si el URL tiene un estado de respuesta no exitoso
      if (url === 'https://unsuccessful-url.com') {
        return Promise.resolve({
          status: 500,
          ok: 'fail'
        });
      }
  
      // Simula una respuesta de error para otras URL
      return Promise.reject({
        response: {
          status: 'No Response',
          ok: 'fail'
        }
      });
    })
};
  
module.exports = mockAxios;