const inquireAction = require('./prompts/action');

const startApp = () => {
    console.log(`\nWelcome to Employee Tracker! 
This program allows you to interact with yourbase.\n`);
    inquireAction();
};

startApp();

