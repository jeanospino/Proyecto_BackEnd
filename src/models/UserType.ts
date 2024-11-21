import { Model, DataTypes } from "sequelize";
import { database } from "../database/db";

export class UserType extends Model {
  public id!: number;
  public type!: string;
}

export interface UserTypeI {
  id?: number; // Opcional porque puede ser autogenerado
  type: string;
}

UserType.init(
  {
    type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "UserType",
    sequelize: database,
    timestamps: false,
  }
);
