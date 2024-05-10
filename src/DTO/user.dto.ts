import { IsNotEmpty, IsString, IsDefined, MinLength, Matches, MaxLength } from 'class-validator';

export class UserDTO {
  @IsDefined()
  readonly name: string;

  @IsDefined()
  readonly username: string;
  
  readonly password: string;
}