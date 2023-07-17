const { mdLinks } = require('./index.js')

const cli = (path, validate) => {
  if (validate === undefined) {
    mdLinks(path)
      .then((result) => {
      console.log(result);
      })
      .catch((error) => {
        if (error.message === 'The route does not exist.') {
          console.error('Error: The provided path does not exist. Please provide a valid path.');
        } else if (error.message === 'The argument must be a string.') {
          console.error('Error: The argument is not a string.');
        }
        else {
          console.error(error);
        }
      });
  } else if (validate === true) {
    mdLinks(path, true)
      .then((result) => {
        console.log(result);
      })
      .catch((error) => {
        if (error.message === 'The route does not exist.') {
          console.error('Error: The provided path does not exist. Please provide a valid path.');
        } else if (error.message === 'The argument must be a string.'){
          console.error('Error: The argument is not a string.');
        } else {
          console.error(error);
        }
      });
  } else if (validate === false){
    mdLinks( path, false)
      .then((result) => {
      console.log(result);
      })
      .catch((error) => {
        if (error.message === 'The route does not exist.') {
          console.error('Error: The provided path does not exist. Please provide a valid path.');
        } else if (error.message === 'The argument must be a string.') {
          console.error('Error: The argument is not a string.');
        } else {
        console.error(error);
        }
    });
  }
}

cli('./testDirectory', true);
