import { ErrorCodes } from '../constants/error.constants';
import {validate, ValidationTypes as ObjectId} from 'class-validator';
import {plainToClass} from "class-transformer";

export class ValidateMiddleware {
  constructor(classToValidate) {
    this.classToValidate = classToValidate;
  }

  execute({ body }, res, next) {
    const instance = plainToClass(this.classToValidate, body);
    validate(instance).then((errors) => {
      if (errors.length > 0) {
        res.status(ErrorCodes.FailedDependency).send(errors);
      } else {
        next();
      }
    });
  }
}

export class ValidateParamIdIsMongoStringMiddleware {
  constructor(paramName) {
    this.paramName = paramName;
  }

  execute(req, res, next) {
    const paramValue = req.params[this.paramName];
    if (!ObjectId.isValid(paramValue)) {
      res
        .status(ErrorCodes.BadRequest)
        .send({ err: 'Invalid ID format. ID should be a Mongo String' });
    } else {
      next();
    }
  }
}

class ValidateParamIdIsNumberMiddleware {
  constructor(paramName) {
    this.paramName = paramName;
  }

  execute(req, res, next) {
    const paramValue = req.params[this.paramName];
    if (isNaN(Number(paramValue))) {
      res
        .status(ErrorCodes.BadRequest)
        .send({ err: 'Invalid ID format. ID shout be a Number.' });
    } else {
      next();
    }
  }
}
