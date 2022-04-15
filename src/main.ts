import * as core from "@actions/core";
import * as github from "@actions/github";
import sendMessage from "./sendMessage";
import { PullRequestEvent } from "@octokit/webhooks-definitions/schema";

async function run(): Promise<void> {
  try {
    let botToken = core.getInput("bot_token");
    let chatId = core.getInput("chat_id");

    if (github.context.eventName !== "pull_request") {
      throw new Error("This action only works on pull_request events");
    }

    const payload = github.context.payload as PullRequestEvent;

    if (!botToken || !chatId) {
      throw new Error("bot-token and chat-id are required");
    }

    const uri = `https://api.telegram.org/bot${botToken}/sendMessage`;
    const message = formatMessage(payload);

    await sendMessage(chatId, message, uri);

    core.debug(`Message sent!`);
    core.setOutput("Finshed time", new Date().toTimeString());
  } catch (error) {
    if (error instanceof Error) core.setFailed(error.message);
  }
}

// Format the message based on the event type, new pull or review request.
// TODO: create a better markdown message
const formatMessage = (payload: PullRequestEvent): string => {
  const { action, pull_request, repository, sender, number } = payload;
  const { name, owner } = repository;
  const { title } = pull_request;
  let message = "";

  // replace if with switch statement
  switch (action) {
    case "opened":
      message = `🔄 *Pull Request* \\#${number}
      On [${owner.login}/${name}](https://github.com/${owner.login}/${name}/pull/${number})
      *Title:* ${title}
      *By:* [${sender.login}](https://github.com/${sender.login})
      [View Pull Request](https://github.com/${owner.login}/${name}/pull/${number})
      `;
      return message;

    case "review_requested":
      const { requested_reviewer } = payload;
      const { login: reviewer } = requested_reviewer;
      message = `📝  *Review Request* 
      On \\#${number} [${owner.login}/${name}](https://github.com/${owner.login}/${name}/pull/${number}) 
      *Title:* ${title}
      *By:* [${sender.login}](
      *For:* [${reviewer}](https://github.com/${reviewer})
      [View Request](https://github.com/${owner.login}/${name}/pull/${number})
      `;
      return message;
    default:
      throw new Error(`Unsupported action: ${action}`);
  }
};

run();
