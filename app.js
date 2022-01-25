const fs = require('fs');
const inquirer = require('inquirer')
const generatePage = require('./src/page-template');

const promptUser = () => {
    return inquirer
        .prompt([
            {
                type: 'input',
                name: 'name',
                message: 'What is your name?(required)',
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
                        console.log('Please enter your GitHub username!(reequired)');
                        return false;
                    }
                }
            },
            {
                type: 'confirm',
                name: 'confirmAbout',
                message: 'Would you like to enter some information about yourself for an "About" section?',
                default: true
            },
            {
                type: 'input',
                name: 'about',
                message: 'provide some information about yourself:',
                when: ({ confirmAbout }) => {
                    if (confirmAbout) {
                        return true;
                    } else {
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

const promptProject = portfolioData => {
    console.log(`
=================
Add a New Project
=================
`);

    //if theres no 'projects' arrary property,create one
    if (!portfolioData.projects) {
        portfolioData.projects = [];
    }

    return inquirer
        .prompt([
            {
                type: 'input',
                name: 'project',
                message: 'What is the name of your project?(required)',
                validate: projectInput => {
                    if (projectInput) {
                        return true;
                    } else {
                        console.log('Please enter your projects name!');
                        return false;
                    }
                }

            },
            {
                type: 'input',
                name: 'description',
                message: 'Provide a desctiption of the project:(required)',
                validate: descriptionInput => {
                    if (descriptionInput) {
                        return true;
                    } else {
                        console.log('Please provide a description of the project!');
                        return false;
                    }
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

        const mockData = {
            name: 'Lernantino',
            github: 'lernantino',
            confirmAbout: true,
            about:
                'Duis consectetur nunc nunc. Morbi finibus non sapien nec pharetra. Fusce nec dignissim orci, ac interdum ipsum. Morbi mattis justo sed commodo pellentesque. Nulla eget fringilla nulla. Integer gravida magna mi, id efficitur metus tempus et.',
            projects: [
                {
                    name: 'Run Buddy',
                    description:
                        'Duis consectetur nunc nunc. Morbi finibus non sapien nec pharetra. Fusce nec dignissim orci, ac interdum ipsum. Morbi mattis justo sed commodo pellentesque. Nulla eget fringilla nulla. Integer gravida magna mi, id efficitur metus tempus et. Nam fringilla elit dapibus pellentesque cursus.',
                    languages: ['HTML', 'CSS'],
                    link: 'https://github.com/lernantino/run-buddy',
                    feature: true,
                    confirmAddProject: true
                },
                {
                    name: 'Taskinator',
                    description:
                        'Duis consectetur nunc nunc. Morbi finibus non sapien nec pharetra. Fusce nec dignissim orci, ac interdum ipsum. Morbi mattis justo sed commodo pellentesque. Nulla eget fringilla nulla. Integer gravida magna mi, id efficitur metus tempus et. Nam fringilla elit dapibus pellentesque cursus.',
                    languages: ['JavaScript', 'HTML', 'CSS'],
                    link: 'https://github.com/lernantino/taskinator',
                    feature: true,
                    confirmAddProject: true
                },
                {
                    name: 'Taskmaster Pro',
                    description:
                        'Duis consectetur nunc nunc. Morbi finibus non sapien nec pharetra. Fusce nec dignissim orci, ac interdum ipsum. Morbi mattis justo sed commodo pellentesque. Nulla eget fringilla nulla. Integer gravida magna mi, id efficitur metus tempus et. Nam fringilla elit dapibus pellentesque cursus.',
                    languages: ['JavaScript', 'jQuery', 'CSS', 'HTML', 'Bootstrap'],
                    link: 'https://github.com/lernantino/taskmaster-pro',
                    feature: false,
                    confirmAddProject: true
                },
                {
                    name: 'Robot Gladiators',
                    description:
                        'Duis consectetur nunc nunc. Morbi finibus non sapien nec pharetra. Fusce nec dignissim orci, ac interdum ipsum. Morbi mattis justo sed commodo pellentesque.',
                    languages: ['JavaScript'],
                    link: 'https://github.com/lernantino/robot-gladiators',
                    feature: false,
                    confirmAddProject: false
                }
            ]
        };

        const pageHTML = generatePage(mockData);

        fs.writeFile('./index.html', pageHTML, err => {
            if (err) throw new Error(err);

            console.log('Portfoio complete! Check out index.html to see the output!');
        });

    });
