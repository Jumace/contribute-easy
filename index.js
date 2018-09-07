const fs = require('fs-extra');
const inquirer = require('inquirer');
// const fetch = require('node-fetch');
const openIssues = require('./test-data/open-issues.json');
const questions = require('./questions');

const configPath = 'cb-easy-log.json';

function createIssueArray() {
	// noramlly we should fetch the data
	// try {
	//     const issues = await fetch('https://api.github.com/repos/sinnerschrader/patternplate/issues');
	// } catch (e) {
	//     console.log('Sorry we couldn\'t get the list of open issues. Please try again later');
	//     return;
	// }

	// for now we use local test-data
	return openIssues.map((issue, index) => {
		return `${issue.number}: ${issue.title}`;
	});
}

async function main() {
	// if there is a cb-easy.json the contribution started already
	// so we ask the contributer if the contribution should be submitted
	const cbConfig = fs.existsSync(configPath) ? fs.readJsonSync(configPath) : undefined;

	let answers = {};

	if (cbConfig) {
		// we have config so the contribution started already
		// ask the user if he's done

		Object.assign(answers, await inquirer.prompt(questions.submitContribution));

		if (answers.submitContribution) {
			// create a PR

			// after successfull PR creation delete the config
			fs.remove(configPath);
			return;
		}
	}

	// seems like there is no config yet so let's start
	console.log('First of all thanks that you want to contribute!!!');

	// check if it's the first contribution on that project (that's kind of an important feature to encourage new people more)

	Object.assign(answers, await inquirer.prompt(questions.firstTimer));

	if (answers.firstTime) {
		// give the contributor more information about the contribution guidelines on the project
	}

	questions.issue[1].choices = createIssueArray();

	Object.assign(answers, await inquirer.prompt(questions.issue));

	fs.writeJsonSync(configPath, answers);
}

main();
