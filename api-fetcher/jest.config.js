export default {
    // Using Node.js with ESM
    testEnvironment: 'node',
    // Transform JavaScript files with Babel to handle ESM
    transform: {
      '^.+\\.js$': 'babel-jest',
    },
};