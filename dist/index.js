/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 105:
/***/ ((module) => {

module.exports = eval("require")("@actions/core");


/***/ }),

/***/ 82:
/***/ ((module) => {

module.exports = eval("require")("@actions/github");


/***/ }),

/***/ 994:
/***/ ((module) => {

module.exports = eval("require")("jira-client");


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __nccwpck_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		var threw = true;
/******/ 		try {
/******/ 			__webpack_modules__[moduleId](module, module.exports, __nccwpck_require__);
/******/ 			threw = false;
/******/ 		} finally {
/******/ 			if(threw) delete __webpack_module_cache__[moduleId];
/******/ 		}
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat */
/******/ 	
/******/ 	if (typeof __nccwpck_require__ !== 'undefined') __nccwpck_require__.ab = __dirname + "/";
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
const core = __nccwpck_require__(105);
const github = __nccwpck_require__(82);
const JiraApi = __nccwpck_require__(994);

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


})();

module.exports = __webpack_exports__;
/******/ })()
;