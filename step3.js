const fs = require('fs');
const axios = require('axios');
const url = require('url');

function cat(filePath, outFile) {
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error(`Error reading ${filePath}:\n  ${err}`);
      process.exit(1);
    } else {
      handleOutput(data, outFile);
    }
  });
}

async function webCat(webUrl, outFile) {
  try {
    const response = await axios.get(webUrl);
    handleOutput(response.data, outFile);
  } catch (err) {
    console.error(`Error fetching ${webUrl}:\n  ${err}`);
    process.exit(1);
  }
}

function handleOutput(data, outFile) {
  if (outFile) {
    fs.writeFile(outFile, data, 'utf8', (err) => {
      if (err) {
        console.error(`Couldn't write ${outFile}:\n  ${err}`);
        process.exit(1);
      }
    });
  } else {
    console.log(data);
  }
}

const args = process.argv.slice(2);

let outFile;
let input;

if (args[0] === '--out') {
  if (args.length !== 3) {
    console.error('Usage: node step3.js [--out output-filename.txt] <file-path-or-url>');
    process.exit(1);
  }
  outFile = args[1];
  input = args[2];
} else {
  if (args.length !== 1) {
    console.error('Usage: node step3.js [--out output-filename.txt] <file-path-or-url>');
    process.exit(1);
  }
  input = args[0];
}

if (url.parse(input).protocol) {
  webCat(input, outFile);
} else {
  cat(input, outFile);
}