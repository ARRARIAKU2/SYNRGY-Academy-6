import knex from "../database/knex/knex";

class Auth {
  private auth;
  constructor() {
    this.auth = knex;
  }

  public getLogin(params: any) {
    try {
      return this.auth
        .select("*")
        .from("users")
        .where("username", params.username)
        .first();
    } catch (error) {
      return error;
    }
  }
}

export default new Auth();
