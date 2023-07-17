const { mdLinks } = require('./index.js')

const cli = (path, validate) => {
  if (validate === undefined) {
    mdLinks(path)
      .then((result) => {
      console.log(result);
      })
      .catch((error) => {
      console.error(error);
      });
  } else if (validate === true) {
    mdLinks(path, true)
      .then((result) => {
        console.log(result);
      })
      .catch((error) => {
        console.error(error);
      });
  } else if (validate === false){
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
