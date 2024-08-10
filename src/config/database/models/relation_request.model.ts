import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Schema as MongooseSchema } from "mongoose";
import { User } from "./user.model";

@Schema()
export class RelationRequest {
  @Prop({ type: Boolean })
  peding: boolean;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User' })
  sender: MongooseSchema.Types.ObjectId;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User' })
  receiver: MongooseSchema.Types.ObjectId;
}

export const RelationSchema = SchemaFactory.createForClass(RelationRequest)