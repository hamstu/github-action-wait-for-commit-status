const core = require("@actions/core");
const github = require("@actions/github");

async function run() {
  const myToken = core.getInput("github-token");
  const octokit = github.getOctokit(myToken);
  const context = core.getInput('status-context');
  const waitForState = core.getInput('wait-for-state');
}

run();
