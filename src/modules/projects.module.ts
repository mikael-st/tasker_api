import { Project } from "@models/project.model";
import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { ProjectController } from "src/controller/project.controller";
import { ProjectRepository } from "src/repositories/projects.repository";

@Module({
  imports: [
    SequelizeModule.forFeature([ Project ]),
  ],
  controllers: [ ProjectController ],
  providers: [ ProjectRepository ]
})
export class ProjectsModule {}