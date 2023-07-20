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

function showStats(result) {
  return {
      'Total': result.length,
      'Unique': new Set(result.map((link) => link.href)).size
  }

}

const cli = (path, argv) => {
  let options = {validate: false};
  if (argv.includes("--validate")) {
    options.validate = true;
  }

  mdLinks(path, options)
    .then((result) => {
      if(argv.includes("--stats")) {
        console.log(showStats(result))
      } else{
        console.log(result);
      }
    })
    .catch(handleError);
}

if(process.argv.length < 3) {
  console.error("Error: The argument 'Path' is required.")
  return
}

cli(process.argv[2], process.argv);
