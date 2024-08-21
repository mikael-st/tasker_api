import { Invite } from "./invite.model";
import { Project } from "./project.model";

import { Column, Entity, Generated, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
  @Generated()
  id: string
  
  @PrimaryColumn({ unique: true })
  username: string
  
  @Column()
  name: string

  @Column()
  password: string;

  @Column({ unique: true })
  email: string;

  @Column({
    type: 'boolean',
    default: false
  })
  enterprise: boolean;

  @OneToMany(() => Invite, (invite) => invite.sender)
  sent_invites: Invite[];

  @OneToMany(() => Invite, (invite) => invite.receiver)
  received_invites: Invite[];

  @OneToMany(() => Project, (project) => project.owner)
  projects: Project[];
}