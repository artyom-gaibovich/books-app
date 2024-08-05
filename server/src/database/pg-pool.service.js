const { DIConstants } = require('../../types');

export class PgPoolService {
  constructor(logger, pgPoolFactory) {
    this.client = pgPoolFactory.createPool();
    this.logger = logger;
  }

  async connect() {
    try {
      await this.client.connect();
      this.logger.log(
        `[ ${Symbol.keyFor(
          DIConstants.PgPoolService
        )} ] Successfully connected to the database`
      );
    } catch (e) {
      if (e instanceof Error) {
        this.logger.error(
          `[ ${Symbol.keyFor(
            DIConstants.PgPoolService
          )} ] Error connecting to the database: ` + e.message
        );
      }
    }
  }

  async disconnect() {
    await this.client.end();
  }

  async query(query, params = []) {
    const client = await this.client.connect();
    try {
      const res = await client.query(query, params);
      return res.rows;
    } catch (e) {
      this.logger.log(`[ PgPoolService ] Error when you make query ${e}`);
    } finally {
      client.release();
    }
  }
}
