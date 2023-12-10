import Users, { IUsers } from '../models/Users';

export interface IRegisterUser {
  username: string;
  password: string;
  email: string;
  role: string;
}

class RepoUsers {
  constructor() {}
  async findByUsername(username: string): Promise<IUsers> {
    const user = await Users.query().findOne('username', username);
    return user as unknown as IUsers;
  }
  async findById(id: string) {
    const user = await Users.query().findById(id);
    return user;
  }
  async create(userData: IRegisterUser) {
    const user = await Users.query().insert(userData);
    return user;
  }
}

export default RepoUsers;
