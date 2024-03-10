import { Column, Model, Table } from "sequelize-typescript";

@Table({
  tableName: "products",
  timestamps: true,
})
export default class ProductModel extends Model {
  @Column({
    primaryKey: true,
    allowNull: false,
  })
  id: string;

  @Column({ allowNull: false })
  name: string;

  @Column({ allowNull: false })
  description: string;

  @Column({ allowNull: false })
  salesPrice: number;
}