import { model } from "mongoose";
import { UserSchema } from "../schemas/user.schema";
import { IUser } from "../interfaces/user.interface";

const User = model<IUser>('user', UserSchema);

export { User }