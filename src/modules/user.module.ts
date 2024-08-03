import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { UserSchema } from "src/config/database/models/user.model";
import { UserController } from "src/controller/user.controller";
import { UserRepository } from "src/repositories/user.repository";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'User', schema: UserSchema }
    ])
  ],
  controllers: [ UserController ],
  providers: [ UserRepository ]
})
export class UserModule {}