const core = require("@actions/core");
const github = require("@actions/github");
const { stat } = require("fs");

const myToken = core.getInput("github-token", { required: true });
const octokit = github.getOctokit(myToken);
const statusContext = core.getInput("status-context", { required: true });
const checkInterval = Number(core.getInput("check-interval")) || 10000;

let timer = null;

async function getCurrentCommitStatus({ context }) {
  let statuses = [];
  try {
    const response = await octokit.repos.listCommitStatusesForRef({
      owner: github.context.payload.repository.owner.login,
      repo: github.context.payload.repository.name,
      ref: github.context.payload.head_commit.id,
    });
    if (response) {
      statuses = response.data;
    }
  } catch (error) {
    return null;
  }
  const status = statuses.find((s) => s.context === context);
  return status;
}

async function check({ context }) {
  const status = await getCurrentCommitStatus({ context });
  if (status) {
    if (status.state === "failure") {
      core.setFailed(`Status ${status.context} failed`);
      process.exit(1);
    } else if (status.state === 'success') {
      core.setOutput("status", status);
      process.exit(0);
    }
  }
  timer = setTimeout(check.bind(null, { context }), checkInterval);
}

async function run() {
  check({ context: statusContext });
}

run();
