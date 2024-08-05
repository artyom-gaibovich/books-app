const { Router } = require('express');
const { SuccessCodes } = require('../constants/succes.constants');

class BaseController {
  constructor(logger, resource) {
    this.logger = logger;
    this.resource = resource;
    this._router = Router();
  }

  get router() {
    return this._router;
  }

  send(res, code, message) {
    res.type('application/json');
    return res.status(code).json(message);
  }

  ok(res, message) {
    return this.send(res, SuccessCodes.OK, message);
  }

  bindRoutes(routes) {
    for (const route of routes) {
      this.logger.log(
        `[ ${route.method.toUpperCase()} ] /${this.resource}${route.path}`
      );

      const middleware = route.middlewares?.map((m) => m.execute.bind(m));
      const handler = route.func.bind(this);


      const pipeline = middleware ? [...middleware, handler] : handler;
      this.router[route.method](route.path, pipeline);
    }
  }
}

module.exports = { BaseController };
