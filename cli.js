#!/usr/bin/env node
/* eslint-disable no-undef */
const { mdLinks } = require('./index.js');
const { handleError, showStats } = require('./data.js');
const colors = require('ansi-colors');

const argv = process.argv;
const mdPath = process.argv[2];
const validOptions = ["--validate", "--stats"];

const cli = (path, argv) => {
  if (argv.includes("--help")) {
    console.log(colors.bold.greenBright('Explore the mdLinks Library.\n'));
    console.log('\nUsage: md-links <path> [options]\n');
    console.log('Commands:');
    console.log(colors.bold.cyan('md-links ./docs'), '                        Analyze links in the "docs" folder');
    console.log(colors.bold.cyan('md-links ./docs --validate'), '             Verify links and their status');
    console.log(colors.bold.cyan('md-links ./docs --stats'), '                Get statistics of total and unique links');
    console.log(colors.bold.cyan('md-links ./docs --validate --stats'), '     Get complete link analysis including broken links');
    return;
  }

  if(argv.length < 3) {
    console.error(colors.bold.red("Error: The argument 'Path' is required."))
    return;
  }

  if(argv[3] !== undefined && !validOptions.includes(argv[3])) {
    console.error(colors.bold.red(`Error: The argument '${argv[3]}' is invalid, the valid options are: ${validOptions.join(", ")}`))
    return;
  }

  if(argv[4] !== undefined && !validOptions.includes(argv[4])) {
    console.error(colors.bold.red(`Error: The argument '${argv[4]}' is invalid, the valid options are: ${validOptions.join(", ")}`))
    return;
  }

  let options = {validate: false};
  if (argv.includes("--validate")) {
    options.validate = true;
  }

  mdLinks(path, options)
    .then((result) => {
      if(argv.includes("--stats")) {
        console.log(showStats(result, options.validate))
      } else{
        console.log(result);
      }
    })
    .catch(handleError);
}

cli(mdPath, argv);
