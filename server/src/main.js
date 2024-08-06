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

async function bootstrap() {
  const logger = new LoggerService();
  const configService = new ConfigService(logger);
  const pgPoolService = new PgPoolService(
    logger,
    new PgPoolFactory(configService)
  );

  const usersRepository = new UsersRepository(pgPoolService);
  const rolesService = new RolesService(configService);
  const userService = new UsersService(
    configService,
    usersRepository,
    rolesService
  );

  const userController = new UserController(
    logger,
    userService,
    configService,
    rolesService
  );
  const exceptionFilter = new ExceptionFilter(logger);
  const routesService = new RoutesService(configService);
  const bookController = new BookController(
    logger,
    new BookService(),
    rolesService
  );
  const app = new App(
    logger,
    pgPoolService,
    userController,
    bookController,
    exceptionFilter,
    configService,
    routesService
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
