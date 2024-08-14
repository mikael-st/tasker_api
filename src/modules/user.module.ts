import { Module } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { MongooseModule } from "@nestjs/mongoose";
import { UserSchema } from "@models/user.model";
import { UserController } from "src/controller/user.controller";
import { UserRepository } from "src/repositories/user.repository";
import { AuthService } from "src/services/auth.service";
import { JwtAuthGuard } from "src/services/auth/auth.guard";
import { ProjectSchema } from "@models/project.model";
import { InvitesRepository } from "@repositories/invites.repository";
import { InviteSchema } from "@models/invite.model";
import { RelationService } from "@services/relation.service";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Project', schema: ProjectSchema },
      { name: 'User', schema: UserSchema },
      { name: 'RelationRequest', schema: InviteSchema }
    ]),
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