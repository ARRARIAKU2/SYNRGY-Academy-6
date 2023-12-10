import Books, { IBooks } from '../models/Books';
import { IUsers } from '../models/Users';

export interface IParams {
  page?: number;
  size?: number;
  search?: string;
}

class RepoBooks {
  constructor() {}

  async count(params?: IParams) {
    const allBooks = Books.query().count('id').where('published', true);
    if (params?.search) {
      allBooks
        .whereILike('title', `%${params?.search}%`)
        .orWhereILike('author', `%${params?.search}%`);
    }

    return Number(
      ((await allBooks) as unknown as { count: number }[])[0].count
    );
  }

  async list(params?: IParams) {
    const size = params?.size ? Number(params?.size) : 10;
    const page = params?.page ? Number(params?.page) - 1 : 0;

    const books = Books.query()
      .select('*')
      .page(page, size)
      // .limit(size)
      // .offset(page * size)
      .where('published', true);
    // .orderBy('createdAt', 'asc');

    if (params?.search) {
      books
        .whereILike('title', `%${params?.search}%`)
        .orWhereILike('author', `%${params?.search}%`);
    }

    books.orderBy('created_at', 'desc', 'first');

    return await books;
  }

  async show(id: string) {
    const books = await Books.query().findById(id);
    return books;
  }

  async create(user: IUsers, bookData: IBooks) {
    const book = await Books.query().insert({
      ...bookData,
      created_by: user.id,
    });

    return book;
  }

  async remove(user: IUsers, id: string) {
    const books = await Books.query()
      .update({
        published: false,
        updated_by: user.id,
        updated_at: new Date().toISOString(),
      })
      .where('id', id);
    return books;
  }

  async update(user: IUsers, id: string, bookData: IBooks) {
    const books = await Books.query()
      .update({
        ...bookData,
        updated_by: user.id,
        updated_at: new Date().toISOString(),
      })
      .where('id', `${id}`);
    return books;
  }
}

export default RepoBooks;
