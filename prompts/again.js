const inquirer = require('inquirer');
const inquireAction = require('./action');

const inquireAgain = () => {
    inquirer.prompt([
        {
            type: 'confirm',
            message: 'Would you like to select another action?',
            name: 'resume'
        }
    ]).then( ({resume}) => {
        if (resume) {
            // UnhandledPromiseRejectionWarning: 
            // TypeError: inquireAction is not a function
            inquireAction();
        } else {
            console.log(`\nThank you for using Employee Tracker!\n`);
            process.exit();
        }
    });
};

module.exports = inquireAgain;