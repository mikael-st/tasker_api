import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { SECRET } from 'src/config/env.config';
import { AuthService } from '../auth.service';
import { JwtStrategy } from './auth.strategy';
import { UserModule } from 'src/modules/user.module';

@Module({
  imports: [
    UserModule,
    JwtModule.register({
      global: true,
      secret: SECRET,
      signOptions: { expiresIn: '60s' /*CHANGE TO 24h*/ }
    })
  ],
  providers: [ AuthService, JwtStrategy ],
  controllers: [ AuthController ],
  exports: [ AuthService ]
})
export class AuthModule {}
