import carsKnex from "../models/cars.knex";
import carsSequelize from "../models/cars.sequelize";

import { ICars } from "../interfaces/interface";

class ServiceCars {
  constructor() {}

  async getCars(params?: any) {
    try {
      const data = await carsKnex.getCars(params); // Knex
      //   const data = await carsSequelize.getCars(); // Sequelize
      return data;
    } catch (error) {
      return error;
    }
  }

  async getCar(id: string) {
    try {
      const data = await carsKnex.getCar(id); // Knex
      // const data = await carsSequelize.getCar(id); // Sequelize
      return data;
    } catch (error) {
      return error;
    }
  }

  async createCar(params: ICars) {
    try {
      const data = await carsKnex.createCar(params); // Knex
      // const data = await carsSequelize.createCar(params); // Sequelize
      return data;
    } catch (error) {
      return error;
    }
  }

  async updateCar(id: string, params: ICars) {
    try {
      const data = await carsKnex.updateCar(id, params); // Knex
      // const data = await carsSequelize.updateCar(id, params); // Sequelize
      return data;
    } catch (error) {
      return error;
    }
  }

  async deleteCar(id: string, params: ICars) {
    try {
      const data = await carsKnex.deleteCar(id, params); // Knex
      // const data = await carsSequelize.deleteCar(id); // Sequelize
      return data;
    } catch (error) {
      return error;
    }
  }
}

export default new ServiceCars();
