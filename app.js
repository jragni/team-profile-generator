const inquirer = require('inquirer');
const Engineer = require('./lib/Engineer');
const Intern = require('./lib/Intern');
const Manager = require('./lib/Manager');
const Employee = require('./lib/Employee');
const fs = require('fs');
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
    const employeeRoster = [];
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
                var stall = await employeeRoster.push(engineer);
                break;

            case "Manager":
                const managerPrompt = await inquirer.prompt(questionManager);
                let office = managerPrompt.officeNumber; 
                let manager = await  new Manager(name,employee_id,email,office);
                var stall = await employeeRoster.push(manager);
                break;

            case "Intern":
                const internPrompt = await inquirer.prompt(questionIntern);
                let school = internPrompt.school;
                let intern = await new Intern(name, employee_id,email,school);
                var stall = await employeeRoster.push(intern);
                break;
            case "Employee":
                let employee = await  new Employee(name,employee_id,email);             
                var stall = await employeeRoster.push(employee);
                    break;
        }
        console.log('--------------------------------------------------------------------------');
        // collect name, id, email an generate 

    }
    console.log('Completed Roster');

    // create an HTML file for the team
    let html =`<!DOCTYPE html><html lang='en'>
        <head>
            <title> Team Generator</title>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
            <link rel="stylesheet" href="path/to/font-awesome/css/font-awesome.min.css">
            <!-- Bootstrap CSS -->
            <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossorigin="anonymous"></link>
        <head>
        <body>
            <header>
                <div class='container'>
                    <div class='jumbotron text-center'>
                    <h1> My Team </h1>
                    </div>
                </div>
            </header>
            <main class="container"><div class="row">`;

    for(let i = 0; i<numberOfEmployee;i++){
        html += '<div class="card" style="width: 15rem; margin:25px" > <div class="card-body"><h1>' + await employeeRoster[i].getName() + '</h1>' 
            +'<h2>'+ employeeRoster[i].getRole() + '</h2>'+ '<h3>'+ await employeeRoster[i].getId()+'</h3>';

            if(employeeRoster[i].getRole() === "Engineer" ){
                html+=  '<h3> Github: '+employeeRoster[i].getGithub() +'</h3>'
            }
            else if(employeeRoster[i].getRole() === "Intern" ){
                html+= '<h3>University: '+ employeeRoster[i].getSchool() + '</h3>'
            }
            else if(employeeRoster[i].getRole() === "Manager" ){
                html+= '<h3> Office Number: ' +employeeRoster[i].getOfficeNumber() +'</h3>';
            }
            else{}
           html +='</div></div>';
    }
    //end HTML
    html += `</div></main>
            </body>
            </html>` ;

    fs.appendFile('test.html',html,(err)=>{if(err){throw(err)}})
}  




teamBuilder();

