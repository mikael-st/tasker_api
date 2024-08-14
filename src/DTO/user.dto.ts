import { IsNotEmpty, IsString, IsDefined, MinLength, Matches, MaxLength } from 'class-validator';

export class UserDTO {
  readonly id?: string;
  @IsDefined()
  readonly name: string;

  @IsDefined()
  readonly username: string;
  
  readonly password: string;

  readonly email: string;

  readonly invites: any[]
}