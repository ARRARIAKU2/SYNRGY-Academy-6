import jwt from "jsonwebtoken";
import { Response, Request, NextFunction } from "express";

// Extend Request type to include the 'user' property
interface AuthenticatedRequest extends Request {
  user?: any; // Adjust the type according to your decoded user type
}

class CheckAuthorization {
  constructor() {}

  check(req: Request, res: Response, next: NextFunction) {
    const headers = req.headers;

    if (!(headers && headers.authorization)) {
      return res.status(403).json({
        meta: {
          message: "Not Authorized",
          success: false,
          code: 403,
        },
        data: null,
      });
    }

    const decode = jwt.verify(
      headers.authorization,
      "JWT_KEY",
      (err, decoded) => {
        if (err) {
          return res.status(403).json({
            meta: {
              message: err.message,
              code: 403,
              success: false,
            },
            data: null,
          });
        }
        return decoded;
      }
    );
    (req as AuthenticatedRequest).user = decode;
    next();
  }
}

export default new CheckAuthorization();
