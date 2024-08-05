class RoutesService {
  constructor(configService) {
    this.configService = configService;
  }

  users() {
    return this.configService.get('USERS_ROUTE');
  }

  books() {
    return this.configService.get('BOOKS_ROUTE');
  }

  login() {
    return this.configService.get('LOGIN_ROUTE');
  }

  register() {
    return this.configService.get('REGISTER_ROUTE');
  }
}

module.exports = { RoutesService };
