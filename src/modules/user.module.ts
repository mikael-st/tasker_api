import { Module } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { MongooseModule } from "@nestjs/mongoose";
import { UserSchema } from "@models/user.model";
import { UserController } from "src/controller/user.controller";
import { UserRepository } from "src/repositories/user.repository";
import { AuthService } from "src/services/auth.service";
import { JwtAuthGuard } from "src/services/auth/auth.guard";
import { ProjectSchema } from "@models/project.model";
import { RelationRequestRepository } from "@repositories/relation_request.repository";
import { RelationSchema } from "@models/relation_request.model";
import { RelationService } from "@services/relation.service";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Project', schema: ProjectSchema },
      { name: 'User', schema: UserSchema },
      { name: 'RelationRequest', schema: RelationSchema }
    ]),
  ],
  controllers: [ UserController ],
  providers: [
    UserRepository,
    RelationRequestRepository,
    RelationService,
    AuthService,
    JwtService,
    JwtAuthGuard ]
})
export class UserModule {}