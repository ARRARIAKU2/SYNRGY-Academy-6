import { Response } from 'express';

class ResponseBuilder {
  constructor() {}
  static response<T = any>({
    meta = {
      page: 1,
      size: 10,
      totalData: 0,
      totalPages: 0,
    },
    ...params
  }: {
    res: Response;
    code: number;
    data: T;
    message?: string;
    meta?: {
      page: number;
      size: number;
      totalPages?: number;
      totalData: number;
    };
  }) {
    return params.res.status(params.code).json({
      message: params.message,
      data: params.data,
      meta,
    });
  }
}

export default ResponseBuilder;
