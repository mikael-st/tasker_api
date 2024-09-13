import { Column, DataType, Model, Table } from "sequelize-typescript";
import { Project } from "./project.model";

@Table
export class Checkpoint extends Model {
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    allowNull: false,
    unique: true,
    primaryKey: true
  })
  id: string;

  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  tag: string;

  @Column({
    type: DataType.UUID,
    allowNull: false,
    references: {
      model: Project,
      key: 'id'
    }
  })
  project: string;

  @Column({
    type: DataType.DATE,
    allowNull: false
  })
  date: Date;
}