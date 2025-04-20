import fs from 'fs/promises';

const TASKS_FILE = './tasks.json';

export async function loadTasks() {
  try {
    const data = await fs.readFile(TASKS_FILE, 'utf8');
    return JSON.parse(data);
  } catch (err) {
    if (err.code === 'ENOENT') {
    // File doesn't exist, return empty array
    return [];
    }
    throw err; // Re-throw other errors (e.g., JSON parsing issues)
  }
}

export async function saveTasks(tasks) {
  await fs.writeFile(TASKS_FILE, JSON.stringify(tasks, null, 2));
}

export async function addTask(description) {
  const tasks = await loadTasks();
  tasks.push({ id: tasks.length + 1, description, done: false });
  await saveTasks(tasks);
  return tasks;
}

export async function markTaskDone(id) {
    const tasks = await loadTasks();
    const task = tasks.find((t) => t.id === parseInt(id));
    if (!task) {
      throw new Error(`Task with ID ${id} not found.`);
    }
    task.done = true;
    await saveTasks(tasks);
    return tasks;
  }

export async function removeTask(id) {
    const tasks = await loadTasks();
    const taskIndex = tasks.findIndex((t) => t.id === parseInt(id));
    if (taskIndex === -1) {
      throw new Error(`Task with ID ${id} not found.`);
    }
    tasks.splice(taskIndex, 1);
    // Reassign IDs to maintain consecutive numbering
    tasks.forEach((task, index) => {
      task.id = index + 1;
    });
    await saveTasks(tasks);
    return tasks;
  }