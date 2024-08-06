import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { SchemaTypes } from "mongoose";

@Schema()
export class User {
  @Prop()
  name: string;

  @Prop({ unique: [ true, 'Already exists' ] })
  username: string;

  // @Prop({ unique: [ true, 'Already exists' ] })
  // email: string;

  @Prop()
  password: string;

  // @Prop()
  // enterprise: boolean;

  // @Prop({ type: [ SchemaTypes.ObjectId ], ref: User })
  // affiliations: User[];
}

export const UserSchema = SchemaFactory.createForClass(User);