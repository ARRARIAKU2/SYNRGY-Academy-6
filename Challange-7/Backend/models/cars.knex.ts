import knex from "../database/knex/knex";

import { ICars, CarModel } from "../interfaces/interface";

class Cars implements CarModel<ICars> {
  private cars;
  constructor() {
    this.cars = knex;
  }

  async getCars(params?: any) {
    const size = params?.size ? Number(params?.size) : 10;
    const page = params?.page ? Number(params?.page) - 1 : 0;
    try {
      const data = (await this.cars
        .select("*")
        .limit(size)
        .offset(page * size)
        .from("cars")
        .where("status", "=", "available")
        .where("available", "=", true)
        .orderBy("created_at", "desc")) as any;

      if (params?.search) {
        data
          .whereILike("title", `%${params?.search}%`)
          .orWhereILike("author", `%${params?.search}%`);
      }
      return data;
    } catch (error) {
      return error;
    }
  }

  async getCar(id: string) {
    try {
      const data = await this.cars
        .select("*")
        .from("cars")
        .where("id", "=", id);
      return data[0];
    } catch (error) {
      return error;
    }
  }

  async createCar(params: ICars) {
    try {
      const result = await this.cars("cars").insert(params).returning("*");
      return result;
    } catch (error) {
      return error;
    }
  }

  async updateCar(id: string, params: ICars) {
    try {
      const result = await this.cars("cars")
        .where("id", "=", id)
        .update(params)
        .returning("*");
      return result;
    } catch (error) {
      return error;
    }
  }

  async deleteCar(id: string, params: ICars) {
    try {
      const result = await this.cars("cars")
        .where("id", "=", id)
        .update(params)
        .returning("*");
      return result;
    } catch (error) {
      return error;
    }
  }
}

export default new Cars();
