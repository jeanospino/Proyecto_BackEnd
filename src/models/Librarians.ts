import { Model, DataTypes } from "sequelize";
import { database } from "../database/db";

export class Librarians extends Model {
  public id!: number;
  public first_name!: string;
  public last_name!: string;
  public email!: string;
  public password!: string;
}

export interface LibrariansI {
  id?: number; // Opcional porque puede ser autogenerado
  first_name: string;
  last_name: string;
  email: string;
  password: string;
}

Librarians.init(
  {
    first_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "Librarians",
    sequelize: database,
    timestamps: false,
  }
);