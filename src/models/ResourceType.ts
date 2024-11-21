import { Model, DataTypes } from "sequelize";
import { database } from "../database/db";

export class ResourceType extends Model {
  public id!: number;
  public type!: string;
}

export interface ResourceTypeI {
  id?: number; // Opcional porque puede ser autogenerado
  type: string;
}

ResourceType.init(
  {
    type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "ResourceType",
    sequelize: database,
    timestamps: false,
  }
);
