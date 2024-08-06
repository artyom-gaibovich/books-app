const { User } = require('./user.entity');

class UsersService {
  constructor(configService, usersRepository, rolesRepository, rolesService) {
    this.configService = configService;
    this.usersRepository = usersRepository;
    this.rolesRepository = rolesRepository;
    this.rolesService = rolesService;
  }

  async createUser({ email, username, password }) {
    const newUser = new User(email, username);
    const salt = this.configService.get('SALT');
    await newUser.setPassword(password, Number(salt));
    const existedUser = await this.usersRepository.find(username, email);
    if (existedUser) {
      return null;
    }
    const createdUser = await this.usersRepository.create(newUser);
    await this.rolesRepository.create(createdUser.id, [
      this.rolesService.getUserRole(),
    ]);
    return createdUser;
  }

  async validateUser({ username, password }) {
    const existedUser = await this.usersRepository.find(username);
    if (!existedUser) {
      return false;
    }
    const newUser = new User(
      existedUser.email,
      existedUser.username,
      existedUser.password
    );
    return newUser.comparePassword(password);
  }

  async findRoles(userId) {
    const result = await this.rolesRepository.findByUserId(userId);
    if (!result) {
      return null;
    }
    return result.roles;
  }

  async findAll() {
    const result = await this.usersRepository.findAll()
    if (!result) {
      return null;
    }
    return result;
  }

  async getUserInfo(username) {
    const result = await this.usersRepository.find(username);
    if (!result) {
      return null;
    }
    return result;
  }

  async updateRoles(userId, newRoles) {
    await this.rolesRepository.deleteByUserId(userId);
    await this.rolesRepository.create(userId, newRoles);
    const result = this.rolesRepository.findByUserId(userId);
    if (!result) {
      return null;
    }
    return result;
  }
}

module.exports = { UsersService };
