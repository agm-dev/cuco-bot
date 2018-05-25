const Telebot = require('telebot')
const Bot = require('./src/bot')
const config = require('./config/index')

const telegram = new Telebot({
  token: config.TELEGRAM_TOKEN,
  polling: {
    interval: 1000,
    timeout: 0,
    limit: 100,
    retryTimeout: 5000
  }
})

const bot = new Bot()
let minutesInterval = config.MINUTES_INTERVAL
const isAdmin = userId => config.ADMINS.includes(userId)
const getIntFromText = text => {
  const sections = text.toString().trim().split(' ')
  if (sections.length < 2 || !Number(parseInt(sections[1]))) {
    return null
  }
  const rawNumber = parseInt(sections[1])
  return rawNumber < 0 ? 0 : rawNumber > 100 ? 100 : rawNumber
}

// Telegram listeners:

telegram.on('start', () => console.log('telegram bot has started'))

telegram.on('/init', msg => {
  // console.log(msg)
  const userId = msg.from.id.toString()
  const data = {
    chat: msg.chat.id,
    date: msg.date
  }
  if (!isAdmin(userId)) {
    return msg.reply.text(`only admins can do that :/`)
  }
  if (bot.initialized) {
    return msg.reply.text(`i have been already initialized, don't worry, you will have your shots!`)
  }
  const response = bot.init(data)
  if (response) {
    setInterval(function () {
      const isShotTime = bot.shouldWeTakeAShot()
      if (isShotTime) return telegram.sendMessage(data.chat, `it's time to take a shot!`)
    }, 1000 * 60 * minutesInterval)
    return msg.reply.text(`initialized! Be prepared for the shots! :)`)
  }
  return msg.reply.text(`error initializing :/`)
})

telegram.on('/admin', msg => {
  const userId = msg.from.id.toString()
  const username = msg.from.username
  if (isAdmin(userId)) {
    return msg.reply.text(`@${username} is admin`)
  } else {
    return msg.reply.text(`@${username} is just a peasant`)
  }
})

telegram.on('/shotsprob', msg => {
  const userId = msg.from.id.toString()
  const username = msg.from.username

  if (isAdmin(userId)) {
    const newValue = getIntFromText(msg.text)
    if (newValue === null) return msg.reply.text(`i need a integer to do that :/`)
    bot.probToTakeAShot = newValue
    return msg.reply.text(`@${username} has changed shot's probability to ${newValue}%`)
  } else {
    return msg.reply.text(`@${username} can't modify shot's probability`)
  }
})

telegram.on('/maxshots', msg => {
  const userId = msg.from.id.toString()
  const username = msg.from.username

  const newValue = getIntFromText(msg.text)
  if (newValue === null) return msg.reply.text(`i need a integer to do that :/`)
  if (isAdmin(userId)) {
    bot.maxShots = newValue
    return msg.reply.text(`@${username} has changed shot's limit to ${newValue} per period (3 hours)`)
  } else {
    return msg.reply.text(`@${username} can't modify shot's limit`)
  }
})

telegram.on('/getshotsprob', msg => msg.reply.text(`there is ${bot.probToTakeAShot}% probabilities of taking a shot each ${config.MINUTES_INTERVAL} minute/s`))

telegram.on('/getmaxshots', msg => msg.reply.text(`there is a limit of ${bot.maxShots} shots every ${bot.period} hours`))

telegram.on('/code', msg => msg.reply.text(`you can check the code at https://github.com/agm-dev/cuco-bot`))

telegram.on('/ping', msg => {
  return msg.reply.text('pong')
})

telegram.start()
