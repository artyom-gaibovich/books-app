const { getPoolConfig } = require('../config/pg-pool.config');
const { Pool } = require('pg');

require('../config/pg-pool.config');

export class PgPoolFactory {
  constructor(configService) {
    this.configService = configService;
  }

  createPool() {
    return new Pool(getPoolConfig(this.configService));
  }
}
