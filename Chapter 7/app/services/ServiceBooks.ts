import { IBooks } from '../models/Books';
import { IUsers } from '../models/Users';
import RepoBooks, { IParams } from '../repositories/RepoBooks';

class ServiceBooks {
  private _repoBook: RepoBooks;
  private _user: IUsers | undefined;

  constructor(repoBook: RepoBooks) {
    this._repoBook = repoBook;
  }

  async create(bookData: IBooks) {
    const user = this.getUser as IUsers;
    const books = await this._repoBook.create(user, bookData);
    return books;
  }

  async remove(id: string) {
    const user = this.getUser as IUsers;
    const books = await this._repoBook.remove(user, id);
    return books;
  }

  async update(id: string, bookData: IBooks) {
    const user = this.getUser as IUsers;
    const books = await this._repoBook.update(user, id, bookData);
    return books;
  }

  async list(params?: IParams) {
    const books = await this._repoBook.list(params);
    return books;
  }

  async count(params?: IParams) {
    const result = await this._repoBook.count(params);
    return result;
  }

  async show(id: string) {
    const books = await this._repoBook.show(id);
    return books;
  }

  set setUser(userData: IUsers) {
    this._user = userData;
  }

  get getUser() {
    return this._user;
  }
}

export default ServiceBooks;
