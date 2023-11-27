import { DataTypes } from "sequelize";
import sequelize from "../database/sequelize/sequelize";

class Users {
  private users;
  constructor() {
    this.users = sequelize.define(
      "users",
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        username: {
          type: DataTypes.STRING,
        },
        email: {
          type: DataTypes.STRING,
        },
        password: {
          type: DataTypes.STRING,
        },
        role: {
          type: DataTypes.STRING,
        },
        created_at: {
          type: DataTypes.DATE,
        },
        updated_at: {
          type: DataTypes.DATE,
        },
      },
      {
        timestamps: false,
        underscored: true,
      }
    );
  }

  async getLogin(username: string) {
    try {
      const data = await this.users.findOne({ where: { username: username } });
      return data;
    } catch (error) {
      return error;
    }
  }
}

export default new Users();
