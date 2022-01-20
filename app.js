const inquirer = require('inquirer')
// const fs = require('fs');
// const generatePage = require('./src/page-template.js');

// const pageHTML = generatePage(name, github);

// fs.writeFile('index.html', pageHTML, err => {
//     if (err) throw err;

//     console.log('Portfoio complete! Check out index.html to see the output!');
// });


const promptUser = () => {
    return inquirer
        .prompt([
            {
                type: 'input',
                name: 'name',
                message: 'What is your name?',
                validate: nameInput => {
                    if (nameInput) {
                        //if name input exists 
                        return true;
                    } else {
                        // if no name is entered
                        console.log('Please enter your name!');
                        return false;
                    }
                }
            },
            {
                type: 'input',
                name: 'github',
                message: 'What is your GitHub username?',
                validate: githubInput => {
                    if (githubInput) {
                        return true;
                    } else {
                        console.log('Please enter your GitHub username!');
                        return false;
                    }
                }
            },
            {
                type: 'input',
                name: 'about',
                message: 'Provide some information about yourself:'
            }
        ]);
};

console.log(`
=================
Add a New Project
=================
`);

const promptProject = portfolioData => {
    //if theres no 'projects' arrary property,create one
    if (!portfolioData.projects) {
        portfolioData.projects = [];
    }

    return inquirer
        .prompt([
            {
                type: 'input',
                name: 'project',
                message: 'What is the name of your project?'
            },
            {
                type: 'input',
                name: 'description',
                message: 'Provide a desctiption of the project:(required)',
                validate: descriptionInput => {
                    if (descriptionInput) {
                        return true
                    } else {
                        console.log('Please provide a description of the project!');
                    };
                }
            },
            {
                type: 'checkbox',
                name: 'stack',
                message: 'What did you build this project with? (Check all that apply)',
                choices: ['JavaScript', 'HTML', 'CSS', 'ES6', 'jQuery', 'Bootstrap', 'Node'],
            },
            {
                type: 'input',
                name: 'link',
                message: 'Enter the GitHUb link to your project. (required)',
                validate: githubLinkInput => {
                    if (githubLinkInput) {
                        return true;
                    } else {
                        console.log('Please enter a GitHub project link!');
                        return false;
                    }
                }
            },
            {
                type: 'confirm',
                name: 'feature',
                message: 'Would you like to feature this project?',
                default: false
            },
            {
                type: 'confirm',
                name: 'confirmAddProject',
                message: 'Would you like to enter another project?',
                default: false
            }

        ])
        .then(projectData => {
            portfolioData.projects.push(projectData);
            // if user confirms add more objcet
            if (projectData.confirmAddProject) {
                return promptProject(portfolioData);
            } else {
                // if not return the users data in object 
                return portfolioData;
            }
        });
};

promptUser()
    .then(promptProject)
    .then(portfolioData => {
        console.log(portfolioData);
    })
