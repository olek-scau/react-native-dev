#!/usr/bin/env node

import { Command } from 'commander';
import inquirer from 'inquirer';
import chalk from 'chalk';
import { addTask, loadTasks, markTaskDone, removeTask } from './tasks.js';

const program = new Command();

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
    const tasks = await addTask(answers.task);
    const newTask = tasks[tasks.length - 1];
    console.log(chalk.green(`Task ${newTask.id}. ${newTask.description} added!`));
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
      await markTaskDone(taskId); // Removed unused 'tasks' variable
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
      await removeTask(taskId); // Removed unused 'tasks' variable
      console.log(chalk.green(`Task ${taskId} removed!`));
    } catch (error) {
      console.log(chalk.red(error.message));
    }
  });

  program.parse(process.argv, { from: 'user' });