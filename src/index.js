const core = require("@actions/core");
const github = require("@actions/github");

async function run() {
  const myToken = core.getInput("github-token");
  const octokit = github.getOctokit(myToken);
  const context = core.getInput("status-context");
  const timeout = core.getInput("timeout");

  // const commit = await octokit.repos.getCommit({
  //   owner: github.context.payload.repository.owner.login,
  //   repo: github.context.payload.repository.name,
  //   sha: github.context.sha,
  // });

  // console.log(`commit ${github.context.sha}`);

  // console.log("----------------------", "github.context", github.context);
  const statuses = await octokit.repos.listCommitStatusesForRef({
    owner: github.context.payload.repository.owner.login,
    repo: github.context.payload.repository.name,
    ref: github.context.payload.head_commit.id,
  });

  console.log(statuses);
}

run();
