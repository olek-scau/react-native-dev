import fs from 'fs/promises';
import { addTask, loadTasks, markTaskDone, removeTask } from '../src/tasks.js';

describe('Todo CLI Logic', () => {
  beforeEach(async () => {
    await fs.writeFile('./tasks.json', JSON.stringify([]));
  });

  test('should add a task with valid description', async () => {
    await addTask('Test task');
    const tasks = await loadTasks();
    expect(tasks).toHaveLength(1);
    expect(tasks[0].description).toBe('Test task');
    expect(tasks[0].done).toBe(false);
  });

  test('should trim whitespace from task description', async () => {
    await addTask('  Test task with spaces  ');
    const tasks = await loadTasks();
    expect(tasks).toHaveLength(1);
    expect(tasks[0].description).toBe('Test task with spaces');
    expect(tasks[0].done).toBe(false);
  });

  test('should reject empty task description', async () => {
    await expect(addTask('')).rejects.toThrow('Task description cannot be empty or whitespace-only.');
    await expect(addTask('   ')).rejects.toThrow('Task description cannot be empty or whitespace-only.');
    const tasks = await loadTasks();
    expect(tasks).toHaveLength(0);
  });

  test('should reject non-string task description', async () => {
    await expect(addTask(123)).rejects.toThrow('Task description must be a string.');
    await expect(addTask(null)).rejects.toThrow('Task description must be a string.');
    const tasks = await loadTasks();
    expect(tasks).toHaveLength(0);
  });

  test('should reject task description longer than 100 characters', async () => {
    const longDescription = 'A'.repeat(101);
    await expect(addTask(longDescription)).rejects.toThrow('Task description cannot exceed 100 characters.');
    const tasks = await loadTasks();
    expect(tasks).toHaveLength(0);
  });

  test('should mark a task as done', async () => {
    await addTask('Test task');
    await markTaskDone(1);
    const tasks = await loadTasks();
    expect(tasks[0].done).toBe(true);
  });

  test('should list tasks', async () => {
    await addTask('Test task');
    const tasks = await loadTasks();
    expect(tasks).toHaveLength(1);
    expect(tasks[0].description).toBe('Test task');
  });

  test('should remove a task by ID', async () => {
    await addTask('Test task');
    await removeTask(1);
    const tasks = await loadTasks();
    expect(tasks).toHaveLength(0);
  });
  
  test('should throw error for non-existent task ID in remove', async () => {
    await expect(removeTask(999)).rejects.toThrow('Task with ID 999 not found.');
  });
});