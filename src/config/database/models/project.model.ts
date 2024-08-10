import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { SchemaTypes } from "mongoose";
import { User } from "./user.model";

enum ProjectStates {
  PENDING = 'pending',
  IN_PROGRESS = 'in progress',
  PAUSED = 'paused',
  DONE = 'done',
}

@Schema()
export class Project {
  @Prop()
  title: string;

  @Prop()
  description: string;

  @Prop({ type: SchemaTypes.ObjectId, ref: () => User })
  owner: User;

  @Prop({ type: [ SchemaTypes.ObjectId ], ref: () => User, default: [] })
  members: User[];

  @Prop({ type: String, enum: ProjectStates, default: ProjectStates.PENDING })
  progress: ProjectStates;

  // @Prop()
  // tasks: REF TASK SCHEMA ( TO_DO )

  // @Prop()
  // check_points: REF CHECK_POINT SCHEMA ( TO_DO )

  @Prop({ type: Date, default: Date.now() })
  created_at: Date;
}

export const ProjectSchema = SchemaFactory.createForClass(Project);