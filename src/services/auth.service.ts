import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { SECRET } from 'src/config/env.config';
import { UserDTO } from 'src/DTO/user.dto';
import { UserRepository } from 'src/repositories/user.repository';
import { WrongPasswordException } from 'src/utils/errors/wrong_password.exception';

@Injectable()
export class AuthService {
  constructor (
    private readonly userRepository: UserRepository,
    private readonly jwt:            JwtService
  ){}

  async validate(data: { username: string, pass: string }) {
    const user = await this.userRepository.find(data.username);

    if (user?.password !== data.pass) {
      throw new WrongPasswordException();
    }

    const payload = { sub: user.id!, username: user.username };

    return {
      access_token: await this.jwt.signAsync(
        payload,
        {
          secret: SECRET,
          expiresIn: '60s'
        }
      )
    }
  }

  async login(user: UserDTO) { /* TO DO */ }
}
