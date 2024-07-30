const fs = require('fs');
const axios = require('axios');
const url = require('url');

function cat(filePath) {
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error(`Error reading ${filePath}:\n  ${err}`);
      process.exit(1);
    } else {
      console.log(data);
    }
  });
}

async function webCat(webUrl) {
  try {
    const response = await axios.get(webUrl);
    console.log(response.data);
  } catch (err) {
    console.error(`Error fetching ${webUrl}:\n  ${err}`);
    process.exit(1);
  }
}

//This line extracts command-line arguments passed to the script, excluding the first two default arguments (node and the script name).
const args = process.argv.slice(2);

//This block checks if exactly one argument is provided.
//If not, it logs a usage message and exits the process with a status code of 1.
if (args.length !== 1) {
  console.error('Usage: node step2.js <file-path-or-url>');
  process.exit(1);
}

//This line assigns the first command-line argument to the variable input.
const input = args[0];

// This block checks if the input is a URL by parsing it and checking for a protocol.
// If it is a URL, it calls the webCat function with input.
// If it is not a URL, it calls the cat function with input.
if (url.parse(input).protocol) {
  webCat(input);
} else {
  cat(input);
}