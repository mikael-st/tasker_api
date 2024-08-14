import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Schema as MongooseSchema } from "mongoose";
import { Invite } from "./invite.model";
import { Project } from "./project.model";

@Schema()
export class User {
  @Prop()
  name: string;

  @Prop({ unique: [ true, 'Already exists' ] })
  username: string;

  @Prop({ unique: [ true, 'Already exists'] })
  email: string;

  @Prop()
  password: string;

  @Prop({ type: [ MongooseSchema.Types.ObjectId ], ref: 'RelationRequest', default: [] })
  invites: MongooseSchema.Types.ObjectId[]

  // @Prop({ type: [ SchemaTypes.ObjectId ], ref: () => Project, default: [] })
  // projects: Project[]

  // @Prop()
  // enterprise: boolean;

  // @Prop({ type: [ SchemaTypes.ObjectId ], ref: User })
  // affiliations: User[];
}

export const UserSchema = SchemaFactory.createForClass(User);