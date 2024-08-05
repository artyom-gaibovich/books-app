class RolesService {
  constructor(configService) {
    this.configService = configService;
  }

  getAdminRole() {
    return this.configService.get('ADMIN_ROLE');
  }

  getUserRole() {
    return this.configService.get('USER_ROLE');
  }
}

module.exports = { RolesService };
