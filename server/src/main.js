const { App } = require('./app');
const { LoggerService } = require('./logger/logger.service');
const { PgPoolService } = require('./database/pg-pool.service');
const { PgPoolFactory } = require('./factory/pg-pool.factory');
const { ConfigService } = require('./config/config.service');
const { UserController } = require('./users/users.controller');
const { UsersService } = require('./users/users.service');
const { UsersRepository } = require('./users/users.repository');
const { RolesService } = require('./roles/roles.service');
const { ExceptionFilter } = require('./error/exception.filter');
const { RoutesService } = require('./routes/routes');
const { BookController } = require('./books/books.controller');
const { BookService } = require('./books/books.service');
const { BookRepository } = require('./books/books.repository');

async function bootstrap() {
  const logger = new LoggerService();
  const configService = new ConfigService(logger);
  const pgPoolService = new PgPoolService(
    logger,
    new PgPoolFactory(configService)
  );

  const rolesService = new RolesService(configService);

  const app = new App(
    logger,
    pgPoolService,
    new UserController(
      logger,
      new UsersService(
        configService,
        new UsersRepository(pgPoolService),
        rolesService
      ),
      configService,
      rolesService
    ),
    new BookController(
      logger,
      new BookService(new BookRepository(pgPoolService)),
      rolesService
    ),
    new ExceptionFilter(logger),
    configService,
    new RoutesService(configService)
  );
  app.init();
}

bootstrap();


//    logger,
//     database,
//     userController,
//     exceptionFilter,
//     configService,
//     routesService
