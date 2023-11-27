import knex from "../database/knex/knex";

import { ICars, CarModel } from "../interfaces/interface";

class Cars implements CarModel<ICars> {
  private cars;
  constructor() {
    this.cars = knex;
  }

  async getCars() {
    try {
      const data = await this.cars
        .select("*")
        .from("cars")
        .where("status", "=", "available")
        .where("available", "=", true)
        .orderBy("id", "asc");
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
      return data;
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
