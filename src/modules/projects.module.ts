import { Project } from "@models/project.model";
import { ProjectInvite } from "@models/project_invite.model";
import { ProjectMember } from "@models/project_member.model";
import { Task } from "@models/task.model";
import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { TasksRepository } from "@repositories/tasks.repository";
import { ProjectController } from "src/controller/project.controller";
import { TasksController } from "src/controller/task.controller";
import { ProjectRepository } from "src/repositories/projects.repository";

@Module({
  imports: [
    SequelizeModule.forFeature([
      Project,
      Task,
      ProjectMember,
      ProjectInvite
    ]),
  ],
  controllers: [ ProjectController, TasksController ],
  providers: [ ProjectRepository, TasksRepository ]
})
export class ProjectsModule {}