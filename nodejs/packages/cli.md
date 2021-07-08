# cli.js sample   
<br/>   

```
  import arg from 'arg';
  import inquirer from 'inquirer';
  import {createProject} from './main';

  function parseArgumentsToOptions(rawArgs){
    const args = arg(
      {
        "--git":Boolean,
        "--yes":Boolean,
        "--install":Boolean,
        "-g":"--git",
        "-y":"--yes",
        "-i":"--install"
      },
      {
        argv: rawArgs.slice(2),
      }
    );
    return {
      skipPrompts: args['--yes'] || false,
      git: args['--git'] || false,
      template: args._[0],
      runInstall: args['--install'] || false
    };
  }

  async function promptForMissingOptions(options) {
    const defaultTemplate = "JavaScript";

    if(options.skipPrompts){
      return {
        ...options,
        template: options.template || defaultTemplate
      };
    }// end if .skipPrompts

    const questions = [];

    if(!options.template){
      questions.push({
        type: "list",
        name: "template",
        message: "Please choose which project template to use",
        choices: ["JavaScript", "Typescript"],
        default: defaultTemplate
      });
    }// end if !.template

    if(!options.git){
      questions.push({
        type: "confirm",
        name: "git",
        message: "Initialize a git repository?",
        default: false
      })
    }// end if !.git

    const answers = await inquirer.prompt(questions);

    return {
      ...options,
      template: options.template || answers.template,
      git: options.git || answers.git
    }// return
  }// promptForMissingOptions

  export async function cli (args) {
    let options = parseArgumentsToOptions(args);
    options = await promptForMissingOptions(options);

    // console.log(options);
    await createProject(options);
  }

```
