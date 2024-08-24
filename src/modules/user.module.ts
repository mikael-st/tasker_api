import { Module } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
// import { UserSchema } from "@models/user.model";
import { UserController } from "src/controller/user.controller";
import { UserRepository } from "src/repositories/user.repository";
import { AuthService } from "src/services/auth.service";
import { JwtAuthGuard } from "src/services/auth/auth.guard";
import { InvitesRepository } from "@repositories/invites.repository";
import { RelationService } from "@services/relation.service";
import { User } from "@models/user.model";
import { Invite } from "@models/invite.model";
import { SequelizeModule } from "@nestjs/sequelize";

@Module({
  imports: [
    SequelizeModule.forFeature([ User, Invite ]),
  ],
  controllers: [ UserController ],
  providers: [
    UserRepository,
    InvitesRepository,
    RelationService,
    AuthService,
    JwtService,
    JwtAuthGuard ]
})
export class UserModule {}