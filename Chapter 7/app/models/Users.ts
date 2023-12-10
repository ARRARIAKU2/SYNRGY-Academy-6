import database from '../config/database';
import { Model } from 'objection';

Model.knex(database);

export interface IUsers {
  id: string;
  username: string;
  password: string;
  email: string;
  createdAt: string;
  updatedAt: string;
  role: string;
}

class Users extends Model {
  static get tableName() {
    return 'users';
  }
  static get idColumn() {
    return 'id';
  }
}

export default Users;
