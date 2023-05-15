const core = require('@actions/core');
const github = require('@actions/github');
const JiraApi = require('jira-client');

async function run() {
  try {
    // Get input parameters
    const jiraBaseUrl = core.getInput('jira_base_url');
    const jiraUserEmail = core.getInput('jira_user_email');
    const jiraApiToken = core.getInput('jira_api_token');
    const issueTransition = core.getInput('issue_transition');

    // Initialize Jira client
    var jira = new JiraApi({
      protocol: 'https',
      host: jiraBaseUrl,
      username: jiraUserEmail,
      password: jiraApiToken,
      apiVersion: '2',
      strictSSL: true
    });

    // Get commit message from GitHub context
    const commitMessage = github.context.payload.commits[0].message;

    // Extract issue key from commit message
    const issueKey = extractIssueKeyFromCommit(commitMessage);

    if (issueKey) {
      // Transition issue
      await jira.transitionIssue(issueKey, {
        transition: {
          id: issueTransition
        }
      });
    } else {
      console.log('No Jira issue key found in commit message.');
    }

  } catch (error) {
    core.setFailed(error.message);
  }
}

function extractIssueKeyFromCommit(commitMessage) {
  // TODO: Implement this function to extract the Jira issue key from the commit message
  // This will depend on your specific use case and how issue keys are formatted in your commit messages
}

run();

