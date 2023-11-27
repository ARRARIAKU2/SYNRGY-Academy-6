import { Response, Request, NextFunction } from "express";
import ServiceAuth from "../services/auth.service";

interface AuthenticatedRequest extends Request {
  user?: any; // Adjust the type according to your decoded user type
}

class Authorization {
  constructor() {}

  async Auth(req: Request, res: Response, next: NextFunction) {
    const headers = req.headers;

    if (!headers.authorization) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    const token = headers.authorization;

    const decoded = (await ServiceAuth.verifyToken(token)) as any;

    if (decoded.message === "jwt expired") {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    (req as AuthenticatedRequest).user = decoded;
    next();
  }

  async AuthSuperAndAdmin(req: Request, res: Response, next: NextFunction) {
    const headers = req.headers;

    if (!headers.authorization) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    const token = headers.authorization;

    const decoded = (await ServiceAuth.verifyToken(token)) as any;

    if (decoded.message === "jwt expired") {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    if (decoded.role !== "superadmin" && decoded.role !== "admin") {
      return res.status(403).json({
        message: "Not Super Admin or Admin",
      });
    }

    (req as AuthenticatedRequest).user = decoded;
    next();
  }

  async AuthSuperAdmin(req: Request, res: Response, next: NextFunction) {
    const headers = req.headers;

    if (!headers.authorization) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    const token = headers.authorization;

    const decoded = (await ServiceAuth.verifyToken(token)) as any;

    if (decoded.message === "jwt expired") {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    if (decoded.role !== "superadmin") {
      return res.status(403).json({
        message: "Not Super Admin",
      });
    }

    (req as AuthenticatedRequest).user = decoded;
    next();
  }
}

export default new Authorization();
