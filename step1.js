const fs = require('fs');

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

const args = process.argv.slice(2);
if (args.length !== 1) {
  console.error('Usage: node step1.js <file-path>');
  process.exit(1);
}

const filePath = args[0];
cat(filePath);