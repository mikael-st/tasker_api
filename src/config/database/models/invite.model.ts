import { User } from "./user.model";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Invite {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'boolean', default: true })
  pending: boolean;

  @Column({ type: 'uuid', unique: true })
  @ManyToOne(() => User, (user) => user.sent_invites)
  sender: string;

  @Column({ type: 'uuid', unique: true })
  @ManyToOne(() => User, (user) => user.received_invites)
  receiver: string;
}