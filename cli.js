#!/usr/bin/env node
/* eslint-disable no-undef */
const { mdLinks } = require('./index.js');
const { handleError, showStats } = require('./data.js');

const argv = process.argv;
const mdPath = process.argv[2];
const validOptions = ["--validate", "--stats"];

const cli = (path, argv) => {
  if(argv.length < 3) {
    console.error("Error: The argument 'Path' is required.")
    return
  }

  if(argv[3] !== undefined && !validOptions.includes(argv[3])) {
    console.error(`Error: The argument '${argv[3]}' is invalid, the valid options are: ${validOptions.join(", ")}`)
    return;
  }

  if(argv[4] !== undefined && !validOptions.includes(argv[4])) {
    console.error(`Error: The argument '${argv[4]}' is invalid, the valid options are: ${validOptions.join(", ")}`)
    return;
  }


  let options = {validate: false};
  if (argv.includes("--validate")) {
    options.validate = true;
  }

  mdLinks(path, options)
    .then((result) => {
      if(argv.includes("--stats")) {
        console.log(options)
        console.log(showStats(result, options.validate))
      } else{
        console.log(result);
      }
    })
    .catch(handleError);
}

cli(mdPath, argv);
