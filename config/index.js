require('dotenv').config()

const admins = process.env.ADMINS ? process.env.ADMINS.split(',') : []

const env = process.env.ENVIRONMENT && ['dev', 'prod'].includes(process.env.ENVIRONMENT) ? process.env.ENVIRONMENT : 'prod'

module.exports = {
  TELEGRAM_TOKEN: process.env.TELEGRAM_TOKEN || '',
  ADMINS: admins,
  ENV: env,
  MINUTES_INTERVAL: env === 'dev' ? 1 / 60 : 1,
  SHOT_PROB: env === 'dev' ? 80 : 2,
  MAX_SHOTS: env === 'dev' ? 10 : 3
}
