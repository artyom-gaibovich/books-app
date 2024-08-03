const { createLogger, format, transports } = require('winston');
const { combine, timestamp, printf, colorize } = format;
/**
 * @interface ILoggerService
 * @property {function(...any): void} log - Log information messages.
 * @property {function(...any): void} error - Log error messages.
 * @property {function(...any): void} warn - Log warning messages.
 */

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

module.exports = LoggerService;
