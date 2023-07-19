const { mdLinks } = require('./index.js');

// const cli = (path, validate) => {
//   if (validate === undefined) {
//     mdLinks(path)
//       .then((result) => {
//       console.log(result);
//       })
//       .catch((error) => {
//         if (error.message === 'The route does not exist.') {
//           console.error('Error: The provided path does not exist. Please provide a valid path.');
//         } else if (error.message === 'The argument must be a string.') {
//           console.error('Error: The argument is not a string.');
//         } else if (error.message === 'The file is not a Markdown (.md).'){
//           console.error('Error: The file is not a Markdown.')
//         }
//         else {
//           console.error(error);
//         }
//       });
//   } else if (validate === true) {
//     mdLinks(path, true)
//       .then((result) => {
//         console.log(result);
//       })
//       .catch((error) => {
//         if (error.message === 'The route does not exist.'){
//           console.error('Error: The provided path does not exist. Please provide a valid path.');
//         } else if (error.message === 'The argument must be a string.'){
//           console.error('Error: The argument is not a string.');
//         } else if (error.message === 'The file is not a Markdown (.md).'){
//           console.error('Error: The file is not a Markdown.')
//         }
//         else {
//           console.error(error);
//         }
//       });
//   } else if (validate === false){
//     mdLinks( path, false)
//       .then((result) => {
//       console.log(result);
//       })
//       .catch((error) => {
//         if (error.message === 'The route does not exist.') {
//           console.error('Error: The provided path does not exist. Please provide a valid path.');
//         } else if (error.message === 'The argument must be a string.') {
//           console.error('Error: The argument is not a string.');
//         } else if (error.message === 'The file is not a Markdown (.md).'){
//           console.error('Error: The file is not a Markdown.')
//         }
//         else {
//         console.error(error);
//         }
//     });
//   }
// }

const handleError = (error) => {
  switch (error.message) {
    case 'The route does not exist.':
      console.error('Error: The provided path does not exist. Please provide a valid path.');
      break;
    case 'The argument must be a string.':
      console.error('Error: The argument is not a string.');
      break;
    case 'The file is not a Markdown (.md).':
      console.error('Error: The file is not a Markdown.');
      break;
    case 'No Markdown files found in the directory or subdirectories.':
      console.error('Error: No Markdown files found in the directory or subdirectories.');
      break;
    default:
      console.error(error);
  }
};

const cli = (path, validate) => {
  if (typeof validate === 'undefined' || typeof validate === 'boolean') {
    mdLinks(path, validate)
      .then((result) => {
        console.log(result);
      })
      .catch(handleError);
  }
}

cli('subFolders', true);
