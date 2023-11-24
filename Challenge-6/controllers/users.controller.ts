import { Request, Response } from "express";
import bcrypt from "bcrypt";

import ServiceUsers from "../services/users.service";
import ServiceAuth from "../services/auth.service";
import { IUser, UserController } from "../interfaces/interface";

class ControllerUsers implements UserController {
  constructor() {}

  async getUsers(req: Request, res: Response) {
    try {
      const users = (await ServiceUsers.getUsers()) as IUser[];

      if (users.length === 0) {
        res.status(404).json({
          message: "Data Not Found!",
        });
      } else {
        res.status(200).json({
          message: "Success Get Data!",
          data: users,
        });
      }
    } catch (error) {
      res.status(500).json({
        message: (error as Error).message,
      });
    }
  }

  async getUser(req: Request, res: Response) {
    const id = req.params.id;
    try {
      const user: any = (await ServiceUsers.getUser(id)) as IUser[];

      if (user.length === 0) {
        res.status(404).json({
          message: "Data Not Found!",
        });
      } else {
        res.status(200).json({
          message: "Success Get Data!",
          data: user,
        });
      }
    } catch (error) {
      res.status(500).json({
        message: (error as Error).message,
      });
    }
  }

  async getCurrentUser(req: Request, res: Response) {
    try {
      const headers = req.headers;
      const token = headers.authorization as string;
      const decoded = (await ServiceAuth.verifyToken(token)) as IUser;

      res.status(200).json({
        data: decoded,
      });
    } catch (error) {
      res.status(500).json({
        message: (error as Error).message,
      });
    }
  }

  async createUserMember(req: Request, res: Response) {
    try {
      const password: string = await bcrypt.hash(req.body.password, 10);
      const params: IUser = {
        username: req.body.username,
        email: req.body.email,
        password: password,
        role: "member",
      };
      const user = (await ServiceUsers.createUser(params)) as IUser;
      res.status(200).json({
        message: "Success Create Data!",
        data: user,
      });
    } catch (error) {
      res.status(500).json({
        message: (error as Error).message,
      });
    }
  }

  async createUserAdmin(req: Request, res: Response) {
    try {
      const password: string = await bcrypt.hash(req.body.password, 10);
      const params: IUser = {
        username: req.body.username,
        email: req.body.email,
        password: password,
        role: "admin",
      };
      const user = (await ServiceUsers.createUser(params)) as IUser;
      res.status(200).json({
        message: "Success Create Data!",
        data: user,
      });
    } catch (error) {
      res.status(500).json({
        message: (error as Error).message,
      });
    }
  }

  async updateUser(req: Request, res: Response) {
    const id = req.params.id;
    const params: IUser = {
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
      updated_at: String(new Date()),
    };
    try {
      const user = (await ServiceUsers.updateUser(id, params)) as IUser;
      res.status(200).json({
        message: "Success Update Data!",
        data: user,
      });
    } catch (error) {
      res.status(500).json({
        message: (error as Error).message,
      });
    }
  }

  async deleteUser(req: Request, res: Response) {
    const id = req.params.id;
    try {
      const user = (await ServiceUsers.deleteUser(id).then((data) => {
        if (data === 1) {
          res.status(200).json({
            message: "Success Delete Data!",
          });
        } else {
          res.status(404).json({
            message: "Data Not Found!",
          });
        }
      })) as IUser;
    } catch (error) {
      res.status(500).json({
        message: (error as Error).message,
      });
    }
  }
}

export default new ControllerUsers();
