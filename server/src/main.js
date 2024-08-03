const LoggerService = require('./logger/logger.service');
const logger = new LoggerService();

logger.log('This is an info message');
logger.warn('This is a warning message');
logger.error('This is an error message');
