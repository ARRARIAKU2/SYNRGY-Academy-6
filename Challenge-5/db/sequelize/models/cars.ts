import { DataTypes } from "sequelize";
import sequelize from "../sequelize";

const Cars = sequelize.define(
  "cars",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
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

export default Cars;
