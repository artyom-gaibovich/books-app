const express = require('express');
const { AuthMiddleware } = require('./common/auth.middleware');
const { json } = require('express');

class App {
  constructor(
    logger,
    database,
    userController,
    bookController,
    exceptionFilter,
    configService,
    routesService
  ) {
    this.app = express();
    //this.port = Number(this.configService.get('APP_PORT'));
    this.port = 8151
    this.database = database;
    this.logger = logger;
    this.userController = userController;
    this.bookController = bookController;
    this.exceptionFilter = exceptionFilter;
    this.configService = configService;
    this.routesService = routesService;
  }

  useMiddleware() {
    this.app.use(json());
    const authMiddleware = new AuthMiddleware(
      this.configService.get('SECRET'),
      [this.routesService.login(), this.routesService.register()]
    );
    this.app.use(authMiddleware.execute.bind(authMiddleware));
  }

  useRoutes() {
    this.app.use(this.routesService.books(), this.bookController.router);
    this.app.use(this.routesService.users(), this.userController.router);
  }

  useExceptionFilters() {
    this.app.use(this.exceptionFilter.catch.bind(this.exceptionFilter));
  }

  async init() {
    this.useMiddleware();
    this.useRoutes();
    this.useExceptionFilters();
    this.server = this.app.listen(this.port);
    this.logger.log(`Server start on http://localhost:${this.port}`);
    await this.database.connect();
  }

  close() {
    this.server.close();
  }
}

module.exports = { App };
