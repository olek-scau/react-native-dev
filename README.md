# React Native Development Portfolio

![GitHub last commit](https://img.shields.io/github/last-commit/olek-scau/react-native-dev)
![GitHub license](https://img.shields.io/github/license/olek-scau/react-native-dev)

Welcome to my development portfolio, showcasing my transition from Python to JavaScript and React Native. This repository contains projects built as part of my path to create cross-platform mobile apps.

## About
This repository is a collection of projects demonstrating my skills in JavaScript, Node.js, and React Native. I’m following a structured learning path to build real-world applications, with a focus on clean code, CI/CD, and professional documentation. Tools used:
- **VS Code** with GitLens for development and Git integration.
- **GitHub** for version control and CI/CD with GitHub Actions.
- **Node.js**.
- **React Native** and **Firebase**.

## Setup
Each project has its own setup instructions in its respective `README.md`. Clone the repository and navigate to the project folder to get started:
```bash
git clone https://github.com/olek-scau/react-native-dev.git
cd react-native-dev/<project-folder>
```

## Projects
### 📋 Todo CLI
- **Description**: A command-line to-do list application built with Node.js and ES6+ JavaScript, designed to manage tasks efficiently.
- **Features**:
  - Add, list, mark as complete, and delete tasks.
  - Persistent storage using a JSON file.
  - Modular code with error handling and unit tests.
- **Tech Stack**: Node.js, JavaScript (ES6+), Jest, ESLint.
- **CI Status**: [![Run Tests](https://github.com/olek-scau/react-native-dev/workflows/Run%20Tests/badge.svg)](https://github.com/olek-scau/react-native-dev/actions/workflows/test.yml)
- **Location**: [todo-cli/](todo-cli/)
- **Setup**: [README.md](todo-cli/README.md)
- **Data Storage**: Tasks are stored in `todo-cli/data/tasks.json`, committed to GitHub for persistence and testing.

### 🌐 API Fetcher
- **Description**:A Node.js script that fetches and displays posts and users from the JSONPlaceholder API, demonstrating asynchronous programming and API integration.
- **Features**:
  - Fetch and display the first 5 posts and all users (name and email).
  - Error handling for network issues.
  - Unit tests for reliable functionality.
- **Tech Stack**: Node.js, JavaScript (ES6+), node-fetch, Jest, ESLint.
- **CI Status**: [![Run Tests](https://github.com/olek-scau/react-native-dev/workflows/Run%20Tests/badge.svg)](https://github.com/olek-scau/react-native-dev/actions/workflows/test.yml)
- **Location**: [api-fetcher/](api-fetcher/)
- **Setup**: [README.md](api-fetcher/README.md)
- **Data Storage**: No persistent storage; optional sample-posts.json committed to GitHub for testing.

*More projects (e.g., React Native note-taking app, e-commerce app) will be added as I progress through my learning path.*

## License
MIT License

## Contact
- **GitHub**: <https://github.com/olek-scau>
- **Email**: olek.pogorilyi@gmail.com
