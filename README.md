# Cuco Bot

The bot that will tell you when it's time to take a shot! Originally coded for animating the first __ScaleFest__ :D

## Instructions

- Add [@cuco_bot](https://telegram.me/cuco_bot) to your Telegram's group (or your own bot running this code).
- Send `/init` command.

That's all! Cuco bot will tell you when it's time to take a shot :)


## Installation

Just clone and install dependencies:

```
git clone git@github.com:agm-dev/cuco-bot.git
cd cuco-bot
npm install
```

Then rename `.env.sample` to `.env` and edit the environment variables inside.

| Key | Value |
|-----|-------|
| TELEGRAM_TOKEN | Your Telegram's bot api token, check [Telegram's bots documentation](https://core.telegram.org/bots) |
| ADMINS | The admin's user ids separated by commas. Talk to [@useridbot](https://telegram.me/useridbot) to find out which one is yours |
| ENVIRONMENT | Accepts _dev_ or _prod_, and _prod_ is the default value. Dev environment initializes some variables so testing is easier |

Once ready, exec `npm run prod` on production, or `npm start` on development.

## Commands

| Command | Description |
|---------|-------------|
| `/init` | Initializes the bot |
| `/ping` | Tests bot connectivity |
| `/admin` | Tells if user has admin rights |
| `/getshotsprob` | Tells probability of taking a shot and when is evaluated |
| `/shotsprob` | Allows admins to set shots probability |
| `/getmaxshots` | Tells limit of shots in a period of time |
| `/maxshots` | Allows admins to set max number of shots in a period of time |
| `/code` | Returns url to repository |
