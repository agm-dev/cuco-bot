const moment = require('moment')
const config = require('../config/index')

class Bot {
  constructor () {
    this.chatId = null
    this.originalDate = null
    this.probToTakeAShot = config.SHOT_PROB
    this.sentShots = 0
    this.maxShots = config.MAX_SHOTS
    this.period = 3 // hours
    this.initialized = false
  }

  init (data) {
    if (!this.initialized) {
      this.chatId = data.chat
      this.originalDate = moment(data.date * 1000)
      this.initialized = true
      return true
    }
    return false
  }

  shouldWeTakeAShot () {
    const rand = this.generateRandomInteger(1, 100)
    const shot = rand <= this.probToTakeAShot
    const now = moment.now()
    let origin = moment(this.originalDate)
    const timeKey = config.ENV === 'dev' ? 'm' : 'h' // this.period will be evaluated in minutes if dev environment and hours in prod

    if (origin.add(this.period, timeKey) <= now) { // clean period
      console.log('time to clean period')
      this.originalDate = now
      this.sentShots = 0
    }

    if (shot && this.sentShots < this.maxShots) {
      console.log('we should take a shot')
      this.sentShots++
      return true
    }
    console.log('noope shot')
    return false
  }

  generateRandomInteger (min, max) {
    return Math.floor(min + Math.random() * (max + 1 - min))
  }
}

module.exports = Bot
