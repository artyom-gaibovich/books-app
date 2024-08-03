import { inject, injectable } from 'inversify';

@injectable()
export class PgPoolFactory {
	constructor(@inject(TYPES.ConfigService) configService: ConfigService) {}

	createPool() {
		return new Pool(getPoolConfig(this.configService));
	}
}
