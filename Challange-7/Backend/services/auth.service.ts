import bcrypt from "bcrypt";
import Jwt from "jsonwebtoken";

import authKnex from "../models/auth.knex";
// import authSequelize from "../models/auth.sequelize";

const JWT_KEY = "hehe";

class ServiceAuth {
  constructor() { }

  async getLogin(params: any) {
    try {
      const data = (await authKnex.getLogin(params)) as any;

      if (!data) {
        return {
          message: "User not found",
          succes: false,
        };
      }

      const validatePassword = bcrypt.compareSync(
        params.password,
        data.password
      );

      if (!validatePassword) {
        return {
          message: "Password not match",
          succes: false,
        };
      }

      return {
        success: true,
        data: data,
      };
    } catch (error) {
      return error;
    }
  }

  generateToken(data: any) {
    try {
      const token = Jwt.sign(data, JWT_KEY);
      return token;
    } catch (error) {
      return error;
    }
  }

  async verifyToken(token: string) {
    try {
      const decoded = Jwt.verify(token, JWT_KEY);
      return decoded;
    } catch (error) {
      return error;
    }
  }
}

export default new ServiceAuth();
``;
