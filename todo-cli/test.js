import fs from 'fs/promises';
import { addTask, loadTasks, markTaskDone } from './tasks.js';

describe('Todo CLI Logic', () => {
  beforeEach(async () => {
    await fs.writeFile('./tasks.json', JSON.stringify([]));
  });

  test('should add a task', async () => {
    await addTask('Test task');
    const tasks = await loadTasks();
    expect(tasks).toHaveLength(1);
    expect(tasks[0].description).toBe('Test task');
    expect(tasks[0].done).toBe(false);
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
});