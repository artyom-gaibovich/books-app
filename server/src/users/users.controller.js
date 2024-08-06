const {
  ValidateMiddleware,
  ValidateParamIdIsNumberMiddleware,
} = require('../common/validate.midddleware');

const { SuccessCodes } = require('../constants/succes.constants');
const { AuthGuard, AuthAdminGuard } = require('../common/auth.guard');
const { BaseController } = require('../common/base.controller');
const { HTTPError } = require('../error/http-error');

class UserController extends BaseController {
  constructor(loggerService, userService, configService, rolesService) {
    super(loggerService, 'users');
    this.bindRoutes([
      {
        path: '',
        method: 'get',
        func: this.findAll,
        middlewares: [],
      },
      {
        path: '/register',
        method: 'post',
        func: this.register,
        middlewares: [
          /*new ValidateMiddleware(UserRegisterDto)*/
        ],
      },
      {
        path: '/login',
        method: 'post',
        func: this.login,
        middlewares: [
          /*new ValidateMiddleware(UserLoginDto)*/
        ],
      },
      {
        path: '/me',
        method: 'get',
        func: this.info,
        middlewares: [
          /*new AuthGuard()*/
        ],
      },
    ]);
    this.userService = userService;
    this.loggerService = loggerService;
    this.configService = configService;
    this.rolesService = rolesService;
  }

  async login(req, res, next) {
    this.loggerService.log('[login] Attempting to login user');
    const result = await this.userService.validateUser(req.body);
    if (!result) {
      this.loggerService.log('[login] User not found');
      return next(
        new HTTPError(ErrorCodes.NotFound, 'user not found', 'login')
      );
    }
    const user = await this.userService.getUserInfo(req.body.username);
    const userRoles = await this.userService.findRoles(user.id);
    const jwt = await this.signJWT(
      userRoles,
      req.body.username,
      this.configService.get('SECRET')
    );
    this.loggerService.log('[login] User successfully logged in');
    this.send(res, SuccessCodes.Created, { jwt });
  }

  async register({ body }, res, next) {
    this.loggerService.log('[ register ] Attempting to register new user');
    const user = await this.userService.createUser(body);
    if (!user) {
      this.loggerService.log('[ register ] User already exists');
      return next(
        new HTTPError(ErrorCodes.Conflict, 'User is already exists', 'register')
      );
    }
    this.loggerService.log(
      `[ register ] User registered successfully with ID ${user.id}`
    );
    this.send(res, SuccessCodes.Created, {
      username: user.username,
      email: user.email,
      id: user.id,
    });
  }

  async findAll(req, res, _) {
    const users = await this.userService.findAll();
    this.ok(res, { users });
    this.loggerService.log(
        `Find all users: ${users?.length ? users?.length : 0} found`
    );
  }
  async info({ username, roles }, res, _) {
    const userInfo = await this.userService.getUserInfo(username);
    if (!userInfo) {
      this.loggerService.log(`[ info ] User with ${username} not found`);
      this.send(res, ErrorCodes.NotFound, {
        status: ErrorCodes.NotFound,
        message: `User with id ${username} not found`,
      });
    } else {
      this.loggerService.log(`[ info ] User info retrieved for ${username}`);
      this.ok(res, {
        username: userInfo?.username,
        email: userInfo?.email,
        id: userInfo?.id,
        roles: roles,
      });
    }
  }
}

module.exports = { UserController };
