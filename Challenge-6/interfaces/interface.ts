import { Request, Response } from "express";

export type Login = {
  username: string;
  password: string;
};

export interface IUser {
  id?: string;
  username?: string;
  email?: string;
  password?: string;
  role?: string;
  created_at?: string;
  updated_at?: string;
}

export interface UserModel<T> {
  getUsers: () => void;
  getUser: (id: string) => void;
  createUser: (params: T) => void;
  updateUser: (id: string, params: T) => void;
  deleteUser: (id: string) => void;
}

export interface UserController {
  getUsers: (req: Request, res: Response) => void;
  getUser: (req: Request, res: Response) => void;
  getCurrentUser: (req: Request, res: Response) => void;
  createUserMember: (req: Request, res: Response) => void;
  createUserAdmin: (req: Request, res: Response) => void;
  updateUser: (req: Request, res: Response) => void;
  deleteUser: (req: Request, res: Response) => void;
}

export interface ICars {
  id?: string;
  created_by?: string;
  title?: string;
  price?: string;
  picture?: string;
  available?: boolean;
  status?: string;
  deleted_by?: string;
  edited_by?: string;
  created_at?: string;
  updated_at?: string;
}

export interface CarModel<T> {
  getCars: () => void;
  getCar: (id: string) => void;
  createCar: (params: T) => void;
  updateCar: (id: string, params: T) => void;
  deleteCar: (id: string, params: T) => void;
}

export interface CarController {
  getCars: (req: Request, res: Response) => void;
  getCar: (req: Request, res: Response) => void;
  createCar: (req: Request, res: Response) => void;
  updateCar: (req: Request, res: Response) => void;
  deleteCar: (req: Request, res: Response) => void;
}
