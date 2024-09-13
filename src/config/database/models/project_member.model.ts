import { Column, DataType, ForeignKey, HasMany, Model, Table } from "sequelize-typescript";
import { Project } from "./project.model";
import { User } from "./user.model";
import { Task } from "./task.model";

export enum MemberRole {
  OWNER = 'OWNER',
  MEMBER = 'MEMBER'
}

@Table
export class ProjectMember extends Model {
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    allowNull: false,
    unique: true,
    primaryKey: true
  })
  id: string;

  @ForeignKey(() => Project)
  @Column({
    type: DataType.UUID,
    allowNull: false,
    references: {
      model: Project,
      key: 'id'
    }
  })
  project: string;

  @ForeignKey(() => User)
  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
    references: {
      model: User,
      key: 'username'
    }
  })
  user: User;

  @Column({
    type: DataType.ENUM(...Object.values(MemberRole)),
    defaultValue: MemberRole.MEMBER,
    allowNull: false
  })
  role: MemberRole;

  @HasMany(() => Task, 'owner')
  tasks: Task[];
}