import { Column, DataType, HasMany, Table, Model } from "sequelize-typescript";
import { Invite } from "./invite.model";
import { Project } from "./project.model";
import { Relation } from "./relation.model";

@Table
export class User extends Model {
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    allowNull: false,
    unique: true
  })
  id: string
  
  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
    primaryKey: true
  })
  username: string
  
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  password: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true
  })
  email: string;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
    defaultValue: false
  })
  enterprise: boolean;

  @HasMany(() => Invite, 'sender' && 'receiver')
  invites: Invite[];

  @HasMany(() => Relation, 'user')
  relations: Relation[];

  @HasMany(() => Relation, 'related')
  related: Relation[];

  @HasMany(() => Project, 'owner')
  projects: Project[];
}