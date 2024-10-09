#!/usr/bin/env node
// index.mjs or index.js (with "type": "module" in package.json)
import readline from "readline";
import chalk from "chalk";
import clipboardy from "clipboardy"; // Use clipboardy for clipboard operations

// Hardcoded base prompt with placeholders
const basePrompt = `
I'm learning about [Y] in [X]. Please provide:

1. A concise explanation of [Y], including its purpose and when it's commonly used.

2. A simple code example demonstrating [Y].

3. Three common mistakes or misconceptions beginners often have about [Y], and how to avoid them.

4. Two real-world applications or scenarios where [Y] is particularly useful.

5. Three progressively challenging exercises that will help me practice using [Y]. Please don't provide solutions, only the problem statements.

After providing this information, please ask me a thought-provoking question about [Y] that will encourage me to think deeper about its applications or implications.
`;

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Ask user for inputs for [X] and [Y]
rl.question(chalk.blue("Enter a value for [X](Main Topic): "), (valueX) => {
  rl.question(chalk.blue("Enter a value for [Y](Sub Topic): "), (valueY) => {
    // Replace occurrences of [X] and [Y] with user inputs
    const result = basePrompt
      .replace(/\[X\]/g, valueX)
      .replace(/\[Y\]/g, valueY);

    // Copy the result to the clipboard using clipboardy
    clipboardy
      .write(result)
      .then(() => {
        // Display the modified prompt in the command line with colors
        console.log(chalk.green("\nGenerated Prompt:\n"));
        console.log(chalk.yellow(result));
        console.log(
          chalk.green("\nThe prompt has been copied to your clipboard!\n")
        );
      })
      .catch((err) => {
        console.error(chalk.red("Failed to copy to clipboard!"), err);
      })
      .finally(() => {
        rl.close();
      });
  });
});
