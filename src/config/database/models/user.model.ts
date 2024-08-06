import { model, Schema, Document } from "mongoose";

// import { Prop, Schema } from "@nestjs/mongoose";

// @Schema()
// export class User {
//   @Prop()
//   name: string

//   @Prop({ unique: [ true, 'Already exists' ] })
//   username: string

//   @Prop()
//   password: string
// }

export interface User extends Document {
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

export const User = model<User>('User', UserSchema);