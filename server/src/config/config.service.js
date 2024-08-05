const { DIConstants } = require('../../types');

const dotenv = require('dotenv');

class ConfigService {
  constructor(logger) {
    this.logger = logger;
    const result = dotenv.config();
    if (result.error) {
      this.logger.error(
        `[ ${Symbol.keyFor(DIConstants.ConfigService)} ] cannot read .env`
      );
    } else {
      this.logger.log(
        `[ ${Symbol.keyFor(
          DIConstants.ConfigService
        )} ] Configuration .env has been loaded`
      );
      this.config = result.parsed;
    }
  }

  get(key) {
    return this.config[key];
  }
}

module.exports = { ConfigService };
