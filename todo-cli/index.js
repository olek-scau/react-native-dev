const prompt = require('prompt-sync')();
console.log('Welcome to the To-Do CLI!');
const task = prompt('Enter a task: ');
console.log(`You added: ${task}`);