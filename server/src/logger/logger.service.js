const { createLogger, format, transports } = require('winston');
const {DIConstants} = require("../../types");
const { combine, timestamp, printf, colorize } = format;


class LoggerService {
    constructor() {
        this.logger = createLogger({
            level: 'info',
            format: combine(
                colorize(),
                timestamp(),
                printf(({ level, message, timestamp }) => {
                    return `${timestamp} [${level}]: ${message}`;
                })
            ),
            transports: [
                new transports.Console({
                    format: combine(
                        colorize(),
                        printf(({ level, message, timestamp }) => {
                            return `${timestamp} [${level}]: ${message}`;
                        })
                    )
                })
            ]
        });
        console.log(Symbol.keyFor(DIConstants.Logger))
    }

    log(...args) {
        this.logger.info(args.join(' '));
    }

    error(...args) {
        this.logger.error(args.join(' '));
    }

    warn(...args) {
        this.logger.warn(args.join(' '));
    }
}

module.exports = {LoggerService};
