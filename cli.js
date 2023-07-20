#!/usr/bin/env node
const { mdLinks } = require('./index.js');

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

const cli = (path, options) => {
  // if (typeof options.validate === 'undefined' || typeof options.validate === 'boolean') {
    mdLinks(path, options)
      .then((result) => {
        console.log(result);
      })
      .catch(handleError);
  // }
}

cli('subFolders', {validate: true});
