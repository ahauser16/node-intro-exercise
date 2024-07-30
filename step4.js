// this is a refactor of `step3.js`
const fs = require('fs');
const axios = require('axios');
const url = require('url');

function readFile(filePath) {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) {
        reject(`Error reading ${filePath}:\n  ${err}`);
      } else {
        resolve(data);
      }
    });
  });
}

async function fetchUrl(webUrl) {
  try {
    const response = await axios.get(webUrl);
    return response.data;
  } catch (err) {
    throw new Error(`Error fetching ${webUrl}:\n  ${err}`);
  }
}

function writeFile(outFile, data) {
  return new Promise((resolve, reject) => {
    fs.writeFile(outFile, data, 'utf8', (err) => {
      if (err) {
        reject(`Couldn't write ${outFile}:\n  ${err}`);
      } else {
        resolve();
      }
    });
  });
}

function handleOutput(data, outFile) {
  if (outFile) {
    return writeFile(outFile, data);
  } else {
    console.log(data);
    return Promise.resolve();
  }
}

async function processInput(input, outFile) {
  try {
    let data;
    if (url.parse(input).protocol) {
      data = await fetchUrl(input);
    } else {
      data = await readFile(input);
    }
    await handleOutput(data, outFile);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

function parseArguments(args) {
  let outFile;
  let input;

  if (args[0] === '--out') {
    if (args.length !== 3) {
      throw new Error('Usage: node step3.js [--out output-filename.txt] <file-path-or-url>');
    }
    outFile = args[1];
    input = args[2];
  } else {
    if (args.length !== 1) {
      throw new Error('Usage: node step3.js [--out output-filename.txt] <file-path-or-url>');
    }
    input = args[0];
  }

  return { outFile, input };
}

function main() {
  const args = process.argv.slice(2);
  try {
    const { outFile, input } = parseArguments(args);
    processInput(input, outFile);
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
}

main();