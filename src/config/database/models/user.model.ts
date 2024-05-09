import { model, Schema, Document } from "mongoose";

export interface IUser extends Document {
  readonly _id: Schema.Types.ObjectId;
  readonly nome: string;
  readonly username: string;
  readonly password: string;
}

export const UserSchema = new Schema({
  nome: String,
  username: String,
  password: String,
})

export const User = model<IUser>('user', UserSchema);