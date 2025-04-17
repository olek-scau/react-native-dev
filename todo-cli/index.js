// Import required modules
const fs = require('fs');
const prompt = require('prompt-sync')();

// Load tasks from tasks.json, or initialize an empty array if the file doesn't exist
let tasks = [];
try {
    const data = fs.readFileSync('tasks.json', 'utf8');
    tasks = JSON.parse(data);
} catch (error) {
    tasks = [];
    saveTasks(); // Create tasks.json if it doesn't exist
}

// Function to save tasks to tasks.json
function saveTasks() {
    fs.writeFileSync('tasks.json', JSON.stringify(tasks, null, 2));
}

// Function to add a task
function addTask() {
    const task = prompt('Enter a task: ');
    if (task.trim() === '') {
        console.log('Task cannot be empty!');
        return;
    }
    tasks.push(task);
    saveTasks();
    console.log(`Added: ${task}`);
}

// Function to remove a task
function removeTask() {
    listTasks();
    const index = prompt('Enter the task number to remove: ');
    const taskIndex = parseInt(index) - 1;
    if (isNaN(taskIndex) || taskIndex < 0 || taskIndex >= tasks.length) {
        console.log('Invalid task number!');
        return;
    }
    const removedTask = tasks.splice(taskIndex, 1)[0];
    saveTasks();
    console.log(`Removed: ${removedTask}`);
}

// Function to list all tasks
function listTasks() {
    if (tasks.length === 0) {
        console.log('No tasks found.');
        return;
    }
    console.log('Tasks:');
    tasks.forEach((task, index) => {
        console.log(`${index + 1}. ${task}`);
    });
}

// Main menu loop
console.log('Welcome to the To-Do CLI!');
while (true) {
    console.log('\n1. Add task\n2. Remove task\n3. List tasks\n4. Exit');
    const choice = prompt('Choose an option (1-4): ');
    
    if (choice === '1') {
        addTask();
    } else if (choice === '2') {
        removeTask();
    } else if (choice === '3') {
        listTasks();
    } else if (choice === '4') {
        console.log('Goodbye!');
        break;
    } else {
        console.log('Invalid choice. Please enter 1, 2, 3, or 4.');
    }
}