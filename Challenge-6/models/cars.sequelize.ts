import { DataTypes } from "sequelize";
import sequelize from "../database/sequelize/sequelize";

class Cars {
  private cars;
  constructor() {
    this.cars = sequelize.define(
      "cars",
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        created_by: {
          type: DataTypes.STRING,
        },
        title: {
          type: DataTypes.STRING,
        },
        price: {
          type: DataTypes.STRING,
        },
        picture: {
          type: DataTypes.STRING,
        },
        available: {
          type: DataTypes.BOOLEAN,
        },
        status: {
          type: DataTypes.STRING,
        },
        created_at: {
          type: DataTypes.DATE,
        },
        updated_at: {
          type: DataTypes.DATE,
        },
      },
      {
        timestamps: false,
        underscored: true,
      }
    );
  }

  async getCars() {
    try {
      const data = await this.cars.findAll();
      return data;
    } catch (error) {
      return error;
    }
  }

  async getCar(id: string) {
    try {
      const data = await this.cars.findOne({ where: { id: id } });
      return data;
    } catch (error) {
      return error;
    }
  }

  async createCar(data: any) {
    try {
      const result = await this.cars.create(data);
      return result;
    } catch (error) {
      return error;
    }
  }

  async updateCar(id: string, data: any) {
    try {
      const result = await this.cars.update(data, { where: { id: id } });
      return result;
    } catch (error) {
      return error;
    }
  }

  async deleteCar(id: string) {
    try {
      const result = await this.cars.destroy({ where: { id: id } });
      return result;
    } catch (error) {
      return error;
    }
  }
}

export default new Cars();
