import { Model } from "sequelize";
import { User } from "./user.model";
import { BelongsTo, Column, DataType, Table } from "sequelize-typescript";

export enum ProjectProgress {
  PENDING = 'PENDING',
  IN_PROGRESS = 'IN_PROGRESS',
  PAUSED='PAUSED',
  COMPLETED = 'COMPLETED',
}

@Table
export class Project extends Model {
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    allowNull: false,
    unique: true
  })
  id: string;

  @Column({})
  title: string;


  owner: string;

  progress: ProjectProgress
}