const { getPoolConfig } = require('../config/pg-pool.config');
const { Pool } = require('pg');

class PgPoolFactory {
  constructor(configService) {
    this.configService = configService;
  }

  createPool() {
    return new Pool(getPoolConfig(this.configService));
  }
}

module.exports = { PgPoolFactory };
