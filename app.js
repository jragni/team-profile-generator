const inquirer = require('inquirer');
const Engineer = require('./lib/Engineer');
const Intern = require('./lib/Intern');
const Manager = require('./lib/Manager');
const Employee = require('./lib/Employee');


let questionOne = [
    {
        type: 'list',
        name: 'employeeCount',
        message: 'How big is your team?',
        choices: ['1','2','3','4','5','6']    
    }
];

let questionTwo = [
    {
        type: 'input',
        name: 'employeeName',
        message: 'Please enter the name of the employee:',
    },
    {
        type: 'input',
        name:'email',
        message:'Please enter the user email:'

    },
    {
        type: 'list', 
        name: 'role',
        message: 'Role of employee: ',
        choices: ['Manager','Engineer','Employee','Intern']
    }
];

let questionEngineer = [
    {
        type:'input',
        name:'github',
        message:`What is this employee's GitHub username?`
    }
];

let questionManager = [
    {
        type:'input',
        name:'officeNumber',
        message:"What is the Manager's office number?" 
    }
];
let questionIntern = [
    {
        type:'input',
        name:'school',
        message:'What school do you currently attend?'
    }
]

async function teamBuilder(){
    // Ask how many employees there are
    const firstQuestion = await inquirer.prompt(questionOne);
    const numberOfEmployee = await parseInt(firstQuestion.employeeCount);
    const employeeRoster = []
    for( let i = 0; i < numberOfEmployee; i++ ){
        // gather information
        const secondQuestion = await inquirer.prompt(questionTwo);
        let name = secondQuestion.employeeName;
        let email = secondQuestion.email; 

        // fore each number of employee, 
        let employee_id = i+1;

        switch(secondQuestion.role){

            case "Engineer":
                const engineerPrompt = await inquirer.prompt(questionEngineer);
                let git = engineerPrompt.github;
                let engineer = await  new Engineer(name,employee_id,email,git);
                let stall = await employeeRoster.push(engineer)
                break;

            case "Manager":
                const managerPrompt = await inquirer.prompt(questionManager);
                let office = managerPrompt.officeNumber; 
                let manager = await  new Manager(name,employee_id,email,office);
                let stall = await employeeRoster.push(manager);
                break;

            case "Intern":
                const internPrompt = await inquirer.prompt(questionIntern);
                let school = internPrompt.school;
                let intern = await new Intern(name, employee_id,email,school);
                let stall = await employeeRoster.push(intern);
                break;
        }
        console.log('--------------------------------------------------------------------------');
        // collect name, id, email an generate 

    }
}

teamBuilder();
