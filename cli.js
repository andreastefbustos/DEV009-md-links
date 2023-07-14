const { mdLinks } = require('./index.js')

const cli = (path, argument) => {
  if (argument === undefined) {
    mdLinks(path)
      .then((result) => {
      console.log(result);
      })
      .catch((error) => {
      console.error(error);
      });
  } else if (argument === true) {
    mdLinks(path, argument)
      .then((result) => {
        console.log(result);
      })
      .catch((error) => {
        console.error(error);
      });
  } else if (argument === false){
    mdLinks( path, false)
      .then((result) => {
      console.log(result);
    })
    .catch((error) => {
      console.error(error);
    });
  }
}

cli('test-noLinks.md');
