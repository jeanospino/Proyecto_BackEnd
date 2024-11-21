import { Model, DataTypes } from "sequelize";
import { database } from "../database/db";
import { Loans } from "./Loans";
import { Librarians } from "./Librarians";

export class ReturnRecord extends Model {
  public id!: number;
  public loan_id!: number;
  public librarian_id!: number;
  public return_date!: Date;
}

export interface ReturnRecordI {
  loan_id: number;
  librarian_id: number;
  return_date: Date;
}

ReturnRecord.init(
  {
    loan_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Loans,
        key: 'id'
      },
    },
    librarian_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Librarians,
        key: 'id'
      },
    },
    return_date: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    }
  },
  {
    tableName: "returnRecord",  // Cambié el nombre de la tabla a "returns" (opcional)
    sequelize: database,
    timestamps: false,
  }
);

// Relaciones
ReturnRecord.belongsTo(Loans, { foreignKey: "loan_id", as: "loan" });
ReturnRecord.belongsTo(Librarians, { foreignKey: "librarian_id", as: "librarian" });
