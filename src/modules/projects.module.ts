import { ProjectSchema } from "@models/project.model";
import { UserSchema } from "@models/user.model";
import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { ProjectController } from "src/controller/project.controller";
import { ProjectRepository } from "src/repositories/projects.repository";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Project', schema: ProjectSchema },
      { name: 'User', schema: UserSchema }
    ]),
  ],
  controllers: [ ProjectController ],
  providers: [ ProjectRepository ]
})
export class ProjectsModule {}