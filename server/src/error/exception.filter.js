const { HTTPError } = require('./http-error');

const { ErrorCodes } = require('../constants/error.constants');

class ExceptionFilter {
  constructor(logger) {
    this.logger = logger;
  }

  catch(err, req, res, _) {
    if (err instanceof HTTPError) {
      this.logger.error(
        `[ ${err.context} ] Error ${err.statusCode}: ${err.message}`
      );
      res.status(err.statusCode).send({ err: err.message });
    } else {
      this.logger.error(`${err.message}`);
      res.status(ErrorCodes.ServerError).send({ err: err.message });
    }
  }
}

module.exports = { ExceptionFilter };
