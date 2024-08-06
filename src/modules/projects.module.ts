import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { ProjectSchema } from "@models/project.model";
import { ProjectController } from "src/controller/project.controller";
import { ProjectRepository } from "src/repositories/projects.repository";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Project', schema: ProjectSchema }
    ]),
  ],
  controllers: [ ProjectController ],
  providers: [ ProjectRepository ]
})
export class ProjectsModule {}