import { ErrorCodes } from '../constants/error.constants';

export class AuthGuard {
  execute(req, res, next) {
    if (req.roles && req.username) {
      return next();
    }
    res
      .status(ErrorCodes.NotAuthorized)
      .send({ error: 'You are not authorized' });
  }
}

export class AuthAdminGuard {
  constructor(rolesService) {
    this.rolesService = rolesService;
  }

  execute(req, res, next) {
    if (!req.username) {
      res
        .status(ErrorCodes.Forbidden)
        .send({
          error: 'Unauthorized invalid JWT token. You dont set username',
        });
    }
    if (!req.roles.includes(this.rolesService.getAdminRole())) {
      res.status(ErrorCodes.Forbidden).send({ error: 'You are not admin' });
    }
    if (req.roles && req.roles.includes('ADMIN')) {
      return next();
    }
  }
}
