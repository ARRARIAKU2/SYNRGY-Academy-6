import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { IUsers } from '../models/Users';
import { JWT_KEY } from '../services/ServiceAuth';

export interface IRequestWithAuth extends Request {
  user?: IUsers;
}
class Auth {
  constructor() {}
  authorize(req: IRequestWithAuth, res: Response, next: NextFunction) {
    const headers = req.headers;

    if (!headers.authorization) {
      return res.status(403).json({
        data: 'not authorized',
      });
    }

    const token = req.headers.authorization;

    const userData = jwt.verify(`${token}`, JWT_KEY) as IUsers | undefined;

    if (!userData) {
      return res.status(403).json({
        data: 'not authorized',
      });
    }

    req.user = userData;
    next();
  }
  async authorizeSuperAdmin(
    req: IRequestWithAuth,
    res: Response,
    next: NextFunction
  ) {
    const headers = req.headers;

    if (!headers.authorization) {
      return res.status(403).json({
        data: 'not authorized',
      });
    }

    const token = req.headers.authorization;

    const userData = jwt.verify(`${token}`, 'RENTAL_BOOK_JWT_KEY') as IUsers;

    if (!(userData.role === 'superadmin')) {
      return res.status(403).json({
        data: 'not authorized, only superadmin role',
      });
    }

    req.user = userData;
    next();
  }
}

export default Auth;
