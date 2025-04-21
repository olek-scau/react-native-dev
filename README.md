# To-Do List CLI

A command-line to-do list app built with Node.js, Commander, Inquirer, and Chalk.

## Installation

1. Clone the repository:
   ```bash
   git clone <your-repo-url>
   ```

2. Navigate to the project directory:
   ```bash
   cd todo-cli
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Link the CLI:
   ```bash
   npm link
   ```

## Usage

- Add a task:
   ```bash
   node index.js add
   ```
   or
   ```bash
   todo add
   ```

- List all tasks:
   ```bash
   todo list
   ```

- Mark a task as done:
   ```bash
   todo done <id>
   ```

- Remove a task:
   ```bash
   todo remove <id>
   ```

- Show help:
   ```bash
   todo --help
   ```

## Testing

Run tests with:
   ```bash
   npm test
   ```

