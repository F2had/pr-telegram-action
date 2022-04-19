# Telegram Pull Request Notifcation
---
A simple Github action that sends a Telegram message when:
1. Pull request open
2. Pull request review requested
---
## Usage
To use this action you need setup your workflow to trigger on pull request events with the following types.
1. opened 
2. review_requested

#### Example 

```yml 
on:
  pull_request:
    types: [opened, review_requested]
```
<br/>
You can include this action in your workflow as follow

```yml
- name: Pull Request Telegram
  uses: F2had/pr-telegram-action@v1.0.0
  with: 
    bot_token: '${{ secrets.BotToken }}' # Your bot token from github secrets
    chat_id: '${{ secrets.CHATID }}' # Your chat id from github secrets
```


`Github Secrets:` To add your bot toekn and chat id as a github secret  you can refer to [Github docs](https://docs.github.com/en/actions/security-guides/encrypted-secrets#creating-encrypted-secrets-for-a-repository). <br>

`Bot Token:` To get a bot token you need to use [BotFather](https://t.me/botfather) on Telegram
or refer to [this](https://core.telegram.org/bots#3-how-do-i-create-a-bot) on how to create a bot.

`Chat ID:` You may use this [RawDataBot](https://t.me/RawDataBot) to get the chat id the for a group or a channel.

---

### Full workflow example.
[workflow-example.yml](https://github.com/F2had/pr-telegram-action/blob/master/workflow-example.yml).

---
### Action output: 

1. Pull Request Open
<img width="415" alt="image" src="https://user-images.githubusercontent.com/42780409/163938002-ee566972-16d7-4be2-a745-603300c84c3a.png">


2. Review Request
<img width="326" alt="image" src="https://user-images.githubusercontent.com/42780409/163938110-7e5287f5-5e2b-42e3-b1f4-57583051ac8b.png">


---

### Notes
When a review is requested this action will run for every reviewer.

