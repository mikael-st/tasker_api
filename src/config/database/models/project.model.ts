import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.model";

export enum ProjectProgress {
  PENDING = 'PENDING',
  IN_PROGRESS = 'IN_PROGRESS',
  PAUSED='PAUSED',
  COMPLETED = 'COMPLETED',
}

@Entity()
export class Project {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({})
  title: string;

  @ManyToOne(() => User, (user) => user.projects)
  owner: string;

  @Column({
    type: 'enum',
    enum: ProjectProgress,
    default: ProjectProgress.PENDING })
  progress: ProjectProgress
}