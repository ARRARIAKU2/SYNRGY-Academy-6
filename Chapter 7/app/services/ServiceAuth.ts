import Users, { IUsers } from '../models/Users';
import bcrypt, { genSalt, genSaltSync } from 'bcrypt';
import jwt from 'jsonwebtoken';
import RepoUsers, { IRegisterUser } from '../repositories/RepoUsers';
import ClientError from '../utils/ClientError';

export type TLoginPayload = {
  username: string;
  password: string;
};

export const JWT_KEY = 'RENTAL_BOOK_JWT_KEY';

export interface IServiceAuth {
  login(payload: TLoginPayload): Promise<IUsers | string>;
}
class ServiceAuth implements IServiceAuth {
  private _repoUser: RepoUsers;
  constructor(repoUser: RepoUsers) {
    this._repoUser = repoUser;
  }

  async login(payload: TLoginPayload): Promise<IUsers | string> {
    const user = await this._repoUser.findByUsername(payload.username);
    if (!user) {
      throw new ClientError('user tidak ditemukan', 404);
    }
    const validatePassword = bcrypt.compareSync(
      payload.password,
      user.password
    );
    if (!validatePassword) {
      throw new ClientError('username dan password anda salah', 404);
    }
    return this.generateToken(user);
  }

  async register(payload: IRegisterUser) {
    const password = this.encryptPassword(payload.password);
    const create = await this._repoUser.create({
      ...payload,
      password,
    });
    return create;
  }

  async getUserById(id: string) {
    const user = await this._repoUser.findById(id);
    return user;
  }

  generateToken(user: IUsers) {
    const token = jwt.sign({ ...user }, JWT_KEY);
    return token;
  }
  validateToken(token: string) {
    const decoded = jwt.verify(token, JWT_KEY);
    return decoded as IUsers;
  }
  validateRole(user: IUsers, role: string) {
    return user.role === role;
  }
  encryptPassword(password: string): string {
    return bcrypt.hashSync(password, genSaltSync(5));
  }
}

export default ServiceAuth;
