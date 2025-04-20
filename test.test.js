import fs from 'fs/promises';
import { exec } from 'child_process';
import util from 'util';

const execPromise = util.promisify(exec);

describe('Todo CLI', () => {
  beforeEach(async () => {
    // Clear tasks.json before each test
    await fs.writeFile('./tasks.json', JSON.stringify([]));
  });

  test('should add a task', async () => {
    await execPromise('echo "Test task" | todo add');
    const tasks = JSON.parse(await fs.readFile('./tasks.json', 'utf8'));
    expect(tasks).toHaveLength(1);
    expect(tasks[0].description).toBe('Test task');
  });

  test('should list tasks', async () => {
    await fs.writeFile('./tasks.json', JSON.stringify([{ id: 1, description: 'Test task', done: false }]));
    const { stdout } = await execPromise('todo list');
    expect(stdout).toContain('Test task');
  });
});