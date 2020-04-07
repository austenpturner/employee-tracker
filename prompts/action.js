const inquirer = require('inquirer');
const inquireUpdate = require('./update');
const inquireInsert = require('./insert');
const inquireView = require('./view');
const inquireDelete = require('./delete');


const inquireAction =   () => {
    inquirer.prompt([
        {
            type: 'list',
            message: `Please select an action:`,
            name: 'action',
            choices: [
                'View',
                'Add',
                'Update',
                'Delete',
                'Exit'
            ]
        }
    ]).then( ({action}) => {
        if (action ==='View') {
            inquireView();
        } else if (action === 'Add') {
            inquireInsert();
        } else if (action === 'Update') {
            inquireUpdate();
        } else if (action === 'Delete') {
            inquireDelete();
        } else {
            console.log('Thanks for using Employee Tracker.')
            process.exit();
        }
    })
};

    // inquireAgain: () => {
    //     inquirer.prompt([
    //         {
    //             type: 'confirm',
    //             message: 'Would you like to select another action?',
    //             name: 'resume'
    //         }
    //     ]).then( ({resume}) => {
    //         if (resume) {
    //             // UnhandledPromiseRejectionWarning: 
    //             // TypeError: inquireAction is not a function
    //             inquireAction();
    //         } else {
    //             console.log(`\nThank you for using Employee Tracker!\n`);
    //             process.exit();
    //         }
    //     });
    // }


module.exports = inquireAction;