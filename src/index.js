const core = require("@actions/core");
const github = require("@actions/github");

async function run() {
  const myToken = core.getInput("github-token");
  const octokit = github.getOctokit(myToken);
  const context = core.getInput("status-context");
  const waitForState = core.getInput("wait-for-state");
  const timeout = core.getInput("timeout");

  const commit = await octokit.repos.getCommit(github.context.sha);

  console.log("commit", commit);

  console.log("context", github.context);
}

run();
