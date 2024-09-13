import { BelongsTo, Column, DataType, Model, Table } from "sequelize-typescript";
import { User } from "./user.model";
import { Project } from "./project.model";
import { ProjectMember } from "./project_member.model";

export enum TaskStage {
  PENDING = 'PENDING',
  IN_PROGRESS = 'IN_PROGRESS',
  REVIEW = 'REVIEW',
  DONE = 'DONE',
}

export enum TaskPriority {
  LOW = 'LOW',
  MEDIUM = 'MEDIUM',
  HIGH = 'HIGH',
  EXTREME = 'EXTREME',
}

@Table
export class Task extends Model {
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    allowNull: false,
    unique: true,
  })
  id: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
    primaryKey: true
  })
  code: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  name: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  description: string;

  @Column({
    type: DataType.UUID,
    allowNull: false,
    references: {
      model: Project,
      key: 'id'
    }
  })
  project: Project;

  @Column({
    type: DataType.UUID,
    allowNull: false,
    references: {
      model: ProjectMember,
      key: 'id'
    }
  })
  owner: string;

  @Column({
    type: DataType.ENUM(...Object.values(TaskStage)),
    defaultValue: TaskStage.PENDING,
    allowNull: false
  })
  stage: TaskStage;

  @Column({
    type: DataType.ENUM(...Object.values(TaskPriority)),
    defaultValue: TaskPriority.LOW,
    allowNull: false
  })
  priority: TaskPriority;

  @Column({
    type: DataType.DATE,
    allowNull: false
  })
  due_date: Date;
}