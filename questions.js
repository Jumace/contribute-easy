const submitContribution = [
	{
		type: 'confirm',
		name: 'submitContribution',
		message: 'Are you finished and want to create a Pull Request?'
	}
];

const firstTimer = [
	{
		type: 'confirm',
		name: 'firstTimer',
		message: 'Is that your first contribution?'
	}
];

const issue = [
	{
		type: 'confirm',
		name: 'openIssue',
		message: 'Do you want to solve an open issue with your contribution?'
	},
	{
		type: 'list',
		name: 'selectIssue',
		message: 'What issue do you want to work on?',
		paginated: true,
		choices: [],
		when: function(answers) {
			return answers.onIssue;
		}
	}
];

module.exports.submitContribution = submitContribution;
module.exports.firstTimer = firstTimer;
module.exports.issue = issue;