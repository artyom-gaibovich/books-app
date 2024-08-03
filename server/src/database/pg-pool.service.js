import { inject, injectable } from 'inversify';
import { DIConstants } from '../../types';

@injectable()
export class PgPoolService {
  logger;

  constructor(
    @inject(DIConstants.Logger) logger,
    @inject(DIConstants.PgPoolFactory) pgPoolFactory
  ) {
    this.client = pgPoolFactory.createPool();
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
