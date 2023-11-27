import { Request, Response } from "express";
export interface IRestController {
  list: (req: Request, res: Response) => void;
  create: (req: Request, res: Response) => void;
  show: (req: Request, res: Response) => void;
  update: (req: Request, res: Response) => void;
  delete: (req: Request, res: Response) => void;
}

export type TParams = {
  search?: string;
  page?: number;
  size?: number;
};

export interface IRestModel<T> {
  list: (params?: TParams) => Promise<T[]>;
  create: (payload: T) => Promise<T>;
  show: (id: string) => Promise<T>;
  update: (id: string, payload: T) => Promise<T>;
  delete: (id: string) => Promise<T>;
}
