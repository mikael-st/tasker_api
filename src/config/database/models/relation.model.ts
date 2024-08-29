import { Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript"
import { User } from "./user.model";

@Table
export class Relation extends Model {
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    allowNull: false,
    unique: true,
    primaryKey: true
  })
  id: string;

  @ForeignKey(() => User)
  @Column({
    type: DataType.STRING,
    allowNull: false,
    references: {
      model: User,
      key: 'username'
    },
    unique: true
  })
  user: string;

  @ForeignKey(() => User)
  @Column({
    type: DataType.STRING,
    allowNull: false,
    references: {
      model: User,
      key: 'username'
    },
    unique: true
  })
  related: string;
}