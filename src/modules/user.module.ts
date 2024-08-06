import { Module } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { MongooseModule } from "@nestjs/mongoose";
import { UserSchema } from "@models/user.model";
import { UserController } from "src/controller/user.controller";
import { UserRepository } from "src/repositories/user.repository";
import { AuthService } from "src/services/auth.service";
import { JwtAuthGuard } from "src/services/auth/auth.guard";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'User', schema: UserSchema }
    ]),
  ],
  controllers: [ UserController ],
  providers: [ UserRepository, AuthService, JwtService, JwtAuthGuard ]
})
export class UserModule {}