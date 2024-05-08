import { Document } from 'mongoose';

export interface IUser extends Document {
  nome: string;
  username: string;
  password: string;
}