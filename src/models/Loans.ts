import { Model, DataTypes } from "sequelize";
import { database } from "../database/db";
import { Resources } from "./Resources";
import { Users } from "./Users";
import { Librarians } from "./Librarians";

export class Loans extends Model {
  public id!: number;
  public resource_id!: number;
  public user_id!: number;
  public librarian_id!: number;
  public loan_date!: Date;
  public return_date!: Date;
  public status!: string;
}

export interface LoansI {
  id?: number; // Opcional porque puede ser autogenerado
  resource_id: number;
  user_id: number;
  librarian_id: number;
  loan_date?: Date; // Opcional porque tiene valor por defecto
  return_date: Date;
  status: string;
}

Loans.init(
  {
    loan_date: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    return_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "Loans",
    sequelize: database,
    timestamps: false,
  }
);

Loans.belongsTo(Resources, { foreignKey: "resource_id", as: "resource" });
Loans.belongsTo(Users, { foreignKey: "user_id", as: "user" });
Loans.belongsTo(Librarians, { foreignKey: "librarian_id", as: "librarian" });
