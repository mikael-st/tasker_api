import { model, Schema, Document } from "mongoose";

export interface IUser extends Document {
  readonly _id: Schema.Types.ObjectId;
  readonly name: string;
  readonly username: string;
  readonly password: string;
}

export const UserSchema = new Schema({
  name: {type: String, required: true},
  username: {type: String, required: true, unique: true},
  password: {type: String, required: true},
})

export const User = model<IUser>('user', UserSchema);