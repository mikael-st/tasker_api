import { IsNotEmpty, IsString, IsDefined, MinLength, Matches, MaxLength } from 'class-validator';

export class UserDTO {
  @IsDefined()
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @IsDefined()
  @IsNotEmpty()
  @IsString()
  readonly username: string;
  
  @IsDefined()
  @IsNotEmpty()
  @IsString()
  @MinLength(8, {message: 'password must have at least 8 characters'})
  @MaxLength(12)
  readonly password: string;
}