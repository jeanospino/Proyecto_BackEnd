import { Model, DataTypes } from "sequelize";
import { database } from "../database/db";
import { ReturnRecord} from "./ReturnRecord";
import { Users } from "./Users";

export class Penalties extends Model {
  public id!: number;
  public return_id!: number;
  public user_id!: number;
  public amount!: number;
  public reason!: string;
  public penalty_date!: Date;
}

export interface PenaltiesI {
  id?: number; // Opcional porque puede ser autogenerado
  return_id: number;
  user_id: number;
  amount: number;
  reason: string;
  penalty_date?: Date; // Opcional porque tiene un valor por defecto
}

Penalties.init(
  {
    amount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    reason: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    penalty_date: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    tableName: "Penalties",
    sequelize: database,
    timestamps: false,
  }
);

Penalties.belongsTo(ReturnRecord, { foreignKey: "returnRecord_id", as: "returnRecord" });
Penalties.belongsTo(Users, { foreignKey: "user_id", as: "user" });
