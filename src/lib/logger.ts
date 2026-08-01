import winston from 'winston'

const logger = winston.createLogger({
  level:
    process.env.NODE_ENV === 'production' ? 'warn' : 'info',
  format:
    process.env.NODE_ENV === 'production'
      ? winston.format.combine(
          winston.format.timestamp(),
          winston.format.json()
        )
      : winston.format.combine(
          winston.format.colorize(),
          winston.format.simple()
        ),
  transports: [new winston.transports.Console()],
})

export default logger
