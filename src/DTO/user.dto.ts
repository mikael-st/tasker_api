import { IsNotEmpty, IsString, IsDefined, MinLength, Matches, MaxLength } from 'class-validator';

export class UserDTO {
  readonly name: string;
  readonly username: string;
  readonly password: string;
}