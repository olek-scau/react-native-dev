#!/usr/bin/env node

import { Command } from 'commander';
import inquirer from 'inquirer';
import chalk from 'chalk';
import { addTask, loadTasks, markTaskDone, removeTask } from './tasks.js';

const program = new Command();

program
  .name('todo')
  .description('A simple command-line to-do list application')
  .version('1.0.0');

program
  .command('add')
  .description('Add a new task')
  .action(async () => {
    const answers = await inquirer.prompt([
      {
        type: 'input',
        name: 'task',
        message: 'Enter the task description:',
      },
    ]);
    try {
      const tasks = await addTask(answers.task);
      const newTask = tasks[tasks.length - 1];
      console.log(chalk.green(`Task ${newTask.id}. ${newTask.description} added!`));
    } catch (error) {
      console.log(chalk.red(`Error adding task: ${error.message}`));
    }
  });

program
  .command('list')
  .description('List all tasks')
  .action(async () => {
    try {
      const tasks = await loadTasks();
      if (tasks.length === 0) {
        console.log(chalk.yellow('No tasks found.'));
        return;
      }
      tasks.forEach((task) => {
        const status = task.done ? chalk.green('✔') : chalk.red('✘');
        console.log(`${status} ${task.id}. ${task.description}`);
      });
    } catch (error) {
      console.log(chalk.red(`Error listing tasks: ${error.message}`));
    }
  });

program
  .command('done <id>')
  .description('Mark a task as done')
  .action(async (id) => {
    try {
      const taskId = parseInt(id);
      if (isNaN(taskId)) {
        throw new Error('Task ID must be a number.');
      }
      await markTaskDone(taskId);
      console.log(chalk.green(`Task ${taskId} marked as done!`));
    } catch (error) {
      console.log(chalk.red(error.message));
    }
  });

program
  .command('remove <id>')
  .description('Remove a task by ID')
  .action(async (id) => {
    try {
      const taskId = parseInt(id);
      if (isNaN(taskId)) {
        throw new Error('Task ID must be a number.');
      }
      await removeTask(taskId);
      console.log(chalk.green(`Task ${taskId} removed!`));
    } catch (error) {
      console.log(chalk.red(error.message));
    }
  });

console.log('Registered commands:', program.commands.map(cmd => cmd.name()));

// Handle unknown commands or no arguments
program.on('command:*', () => {
  console.error(chalk.red('Invalid command. See "todo --help" for available commands.'));
  process.exit(1);
});

console.log('Arguments:', process.argv);

// Parse arguments, with error handling
try {
  program.parse(process.argv);
  // If no arguments provided, show help
  if (!process.argv.slice(2).length) {
    program.outputHelp();
  }
} catch (error) {
  console.error(chalk.red(`Error: ${error.message}`));
  process.exit(1);
}