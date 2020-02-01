const inquirer = require('inquirer');
const Engineer = require('./lib/Engineer');
const Intern = require('./lib/Intern');
const Manager = require('./lib/Manager');
const Employee = require('./lib/Employee');
const fs = require('fs');
const pdf = require('html-pdf');

let questionOne = [
    {
        type: 'list',
        name: 'employeeCount',
        message: 'How big is your team?',
        choices: ['1','2','3','4','5']
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
        html += '<div class="card col-md" style="width:20%; margin:25px" > <div class="card-body"><h1>' + await employeeRoster[i].getName() + '</h1>' 
            +'<p>'+ employeeRoster[i].getRole() + '</p>'
            +'<p>' + employeeRoster[i].getEmail() + '</p>'
            + '<p> id: '+ await employeeRoster[i].getId()+'</p>';

            if(employeeRoster[i].getRole() === "Engineer" ){
                html+=  '<p> Github: '+employeeRoster[i].getGithub() +'</p>'
            }
            else if(employeeRoster[i].getRole() === "Intern" ){
                html+= '<p>University: '+ employeeRoster[i].getSchool() + '</p>'
            }
            else if(employeeRoster[i].getRole() === "Manager" ){
                html+= '<p> Office Number: ' +employeeRoster[i].getOfficeNumber() +'</p>';
            }
            else{}
           html +='</div></div>';
    }
    //end HTML
    html += `</div></main>
            </body>
            </html>` ;

    fs.appendFile('TeamPage.html',html,(err)=>{if(err){throw(err)}})
    var solution = await pdf.create(html, {format:'Letter'}).toFile('./teamPreview.pdf', (err,res)=>{
        if(err) return console.log(err);
    })
    console.log('Complete...')
}  




teamBuilder();

