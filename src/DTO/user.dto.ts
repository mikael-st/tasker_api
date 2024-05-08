import { IsNotEmpty, IsString, IsDefined, MinLength, Matches } from 'class-validator';

export class User {
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
  @MinLength(8, {message: "A senha deve ter no mínimo 8 caracteres"})
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[_.#@])^/, {message: 'A senha deve conter pelo menos uma letra maiúscula, um número e um caractere especial.'})
  readonly password: string;
}