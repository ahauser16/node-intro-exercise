# Intro to Node JS

## step1.js notes

This script does the following:

1. Defines the `cat` function to read and print the contents of a file.
2. Uses `process.argv` to get the command-line arguments.
3. Checks if exactly one argument is provided; if not, it prints a usage message and exits.
4. Calls the `cat` function with the provided file path.

You can run this script from the command line as follows:

```
node step1.js one.txt
```

## step2.js notes

This script does the following:

1. Defines the `cat` function to read and print the contents of a file.
2. Defines the `webCat` function to fetch and print the contents of a URL using axios.
3. Uses `process.argv` to get the command-line arguments.
4. Checks if exactly one argument is provided; if not, it prints a usage message and exits.
5. Determines if the argument is a URL or a file path and calls the appropriate function (`webCat` or `cat`).

You can run this script from the command line as follows:

```
node step2.js one.txt
```

or

```
node step2.js http://google.com
```

## step3.js notes

To add the feature where you can optionally provide an argument to output to a file instead of printing to the console, you can modify the `cat` and `webCat` functions to accept an optional output file path. Here's how you can do it:

1. Update the `cat` function to write to a file if an output file path is provided.
2. Update the `webCat` function to write to a file if an output file path is provided.
3. Modify the argument parsing logic to handle the `--out` option.

This code introduces a `handleOutput` function to manage writing to a file or printing to the console. The `cat` and `webCat` functions are updated to call `handleOutput` with the data and optional output file path. The argument parsing logic is also updated to handle the `--out` option.

### Running the Script

Here are the instructions on how to run each possible command based on the updated codebase:

### Running the Script

1. **Print the contents of a file to the console:**

   ```sh
   node step3.js <file-path>
   ```

   Example:

   ```sh
   node step3.js one.txt
   ```

2. **Print the contents of a URL to the console:**

   ```sh
   node step3.js <url>
   ```

   Example:

   ```sh
   node step3.js http://google.com
   ```

3. **Write the contents of a file to another file:**

   ```sh
   node step3.js --out <output-filename> <file-path>
   ```

   Example:

   ```sh
   node step3.js --out new.txt one.txt
   ```

4. **Write the contents of a URL to a file:**

   ```sh
   node step3.js --out <output-filename> <url>
   ```

   Example:

   ```sh
   node step3.js --out new.txt http://google.com
   ```

### Error Handling

- If the output file path is invalid or cannot be written to, you will see an error message like this:

  ```sh
  Couldn't write /no/dir/new.txt:
    Error: ENOENT: no such file or directory, open '/no/dir/new.txt'
  ```

- If the input file path is invalid or cannot be read, you will see an error message like this:

  ```sh
  Error reading <file-path>:
    <error-details>
  ```

- If the URL cannot be fetched, you will see an error message like this:

  ```sh
  Error fetching <url>:
    <error-details>
  ```

### Usage Summary

- To print contents to the console:

  ```sh
  node step3.js <file-path-or-url>
  ```

- To write contents to a file:
  ```sh
  node step3.js --out <output-filename> <file-path-or-url>
  ```

## step4.js notes

The following refactored code is an attempt to make the functions smaller, more testable, and to minimize duplication, you can break down the tasks into smaller functions and reuse common logic.

### Changes Made:

1. Separated Concerns: Each function now does one thing:
   - `readFile`: Reads a file and returns a promise.
   - `fetchUrl`: Fetches data from a URL and returns a promise.
   - `writeFile`: Writes data to a file and returns a promise.
   - `handleOutput`: Handles output to either console or file.
   - `processInput`: Determines whether to read from a file or URL and handles the output.
   - `parseArguments`: Parses command-line arguments.
   - `main`: Main function to orchestrate the script.
2. Error Handling: Improved error handling with promises and `try-catch` blocks.
3. Code Reuse: Removed duplication by reusing `handleOutput` and `processInput`.

### How to use this file (`step4.js`)

To run the commands using the provided code in step4.js, follow these instructions:

1. Print Contents to the Console
   To print the contents of a file or URL to the console, use the following command:

```
node step4.js <file-path-or-url>
```

Example:

```
node step4.js one.txt
```

2. Write Contents to a File
   To write the contents of a file or URL to an output file, use the following command:

```
node step4.js --out <output-filename> <file-path-or-url>
```

Example:

```
node step4.js --out output.txt one.txt
```

**Notes**

- Replace <file-path-or-url> with the path to the file or the URL you want to read.
- Replace <output-filename> with the name of the file where you want to write the output.

**Error Handling**

If the command-line arguments are incorrect, the script will display an error message and exit. Ensure you follow the usage instructions correctly to avoid errors.
