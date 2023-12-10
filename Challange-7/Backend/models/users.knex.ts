import knex from "../database/knex/knex";

import { IUser, UserModel } from "../interfaces/interface";

class Users implements UserModel<IUser> {
  private users;
  constructor() {
    this.users = knex;
  }

  async getUsers() {
    try {
      const result = await this.users
        .select("*")
        .from("users")
        .orderBy("id", "asc");
      return result;
    } catch (error) {
      return error;
    }
  }

  async getUser(id: string) {
    try {
      const result = await this.users
        .select("*")
        .from("users")
        .where("id", "=", id);
      return result;
    } catch (error) {
      return error;
    }
  }

  async createUser(params: IUser) {
    try {
      const result = await this.users("users").insert(params).returning("*");
      return result;
    } catch (error) {
      return error;
    }
  }

  async updateUser(id: string, params: IUser) {
    try {
      const result = await this.users("users")
        .where("id", "=", id)
        .update(params)
        .returning("*");
      return result;
    } catch (error) {
      return error;
    }
  }

  async deleteUser(id: string) {
    try {
      const result = await this.users("users").where("id", "=", id).del();
      return result;
    } catch (error) {
      return error;
    }
  }
}

export default new Users();
