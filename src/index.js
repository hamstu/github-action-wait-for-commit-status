const core = require("@actions/core");
const github = require("@actions/github");

async function run() {
  const myToken = core.getInput("github-token");
  const octokit = github.getOctokit(myToken);
  const context = core.getInput("status-context");
  const timeout = core.getInput("timeout");

  // const commit = await octokit.repos.getCommit({
  //   owner: github.context.owner,
  //   repo: github.context.repo,
  //   sha: github.context.sha,
  // });

  console.log(`commit ${github.context.sha}`);

  console.log("----------------------", "github.context", github.context);
}

run();
