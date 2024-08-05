const { ErrorCodes } = require('../constants/error.constants');
const { verify } = require('jsonwebtoken');

class AuthMiddleware {
  constructor(secret, ignoreJWTRoutes) {
    this.secret = secret;
    this.ignoreJWTRoutes = ignoreJWTRoutes;
  }

  execute(req, res, next) {
    if (this.ignoreJWTRoutes.includes(req.originalUrl)) {
      return next();
    }
    if (req.headers.authorization) {
      verify(
        req.headers.authorization.split(' ')[1],
        this.secret,
        (err, payload) => {
          if (err) {
            return next();
          }
          if (payload) {
            req.username = payload.username;
            req.roles = payload.roles.map((role) => role.role_value);
            if (!req.roles) {
              return res
                .status(ErrorCodes.Forbidden)
                .send({ err: 'Invalid JWT TOKEN. Dont set roles' });
            }
            if (!req.username) {
              return res
                .status(ErrorCodes.Forbidden)
                .send({ err: 'Invalid JWT TOKEN. Dont set username' });
            }
            if (req.username || req.roles) {
              return next();
            }
          }
        }
      );
    } else {
      res.status(ErrorCodes.Forbidden).send({ error: 'Invalid JWT TOKEN' });
    }
  }
}

module.exports = { AuthMiddleware };
