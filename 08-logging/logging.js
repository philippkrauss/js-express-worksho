const { createLogger, format, transports } = require('winston');
const { combine, timestamp, printf } = format;

const myFormat = printf(({level, message, timestamp, ...metadata}) => {
  let msg = `${timestamp} [${level}] : ${message} `
  if (metadata && Object.keys(metadata).length !== 0) {
    msg += JSON.stringify(metadata)
  }
  return msg
})

const logger = createLogger({
  level: 'debug',
  format: combine(
      format.colorize(),
      timestamp(),
      myFormat
  ),
  transports: [
    new transports.Console(),
  ]
})

const loggerInjector = (req, res, next) => {
  req.logger = logger
  next()
}
module.exports = {loggerInjector}
