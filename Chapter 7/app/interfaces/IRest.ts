import { Request, Response } from 'express';

export type TParams = {
  search?: string;
  page?: number;
  size?: number;
};

export interface IRestModel<T> {
  show: (id: string) => void;
  list: (params?: TParams) => void;
  create: (payload: T) => void;
  update: (id: string, payload: T) => void;
  remove: (id: string) => void;
}

export interface IRestController {
  show: (req: Request, res: Response) => void;
  list: (req: Request, res: Response) => void;
  create: (req: Request, res: Response) => void;
  update: (req: Request, res: Response) => void;
  remove: (req: Request, res: Response) => void;
}
