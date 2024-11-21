import { Model, DataTypes } from "sequelize";
import { database } from "../database/db";
import { ResourceType } from "./ResourceType";

export class Resources extends Model {
  public id!: number;
  public title!: string;
  public description!: string;
  public resource_type_id!: number;
}

export interface ResourcesI {
  id?: number; // Opcional porque puede ser autogenerado
  title: string;
  description?: string; // Opcional porque es nullable
  resource_type_id: number;
}

Resources.init(
  {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
    },
  },
  {
    tableName: "Resources",
    sequelize: database,
    timestamps: false,
  }
);

Resources.belongsTo(ResourceType, {
  foreignKey: "resource_type_id",
  as: "resourceType",
});
