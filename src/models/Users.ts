import { Model, DataTypes } from "sequelize";
import { database } from "../database/db";
import { UserType } from "./UserType";

export class Users extends Model {
  public id!: number;
  public first_name!: string;
  public last_name!: string;
  public email!: string;
  public password!: string;
  public user_type_id!: number;
}

export interface UsersI {
  id?: number; // Opcional porque puede ser autogenerado
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  user_type_id: number;
}

Users.init(
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
    tableName: "Users",
    sequelize: database,
    timestamps: false,
  }
);

Users.belongsTo(UserType, {
  foreignKey: "user_type_id",
  as: "userType",
});
