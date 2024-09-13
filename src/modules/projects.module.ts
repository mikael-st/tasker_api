import { Checkpoint } from "@models/checkpoint.model";
import { Project } from "@models/project.model";
import { ProjectInvite } from "@models/project_invite.model";
import { ProjectMember } from "@models/project_member.model";
import { Task } from "@models/task.model";
import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { CheckpointsRepository } from "@repositories/checkpoints.repository";
import { ProjectMemberRepository } from "@repositories/project_member.repository";
import { TasksRepository } from "@repositories/tasks.repository";
import { ProjectService } from "@services/project.service";
import { CheckpointsController } from "src/controller/checkpoint.controller";
import { ProjectController } from "src/controller/project.controller";
import { TasksController } from "src/controller/task.controller";
import { ProjectRepository } from "src/repositories/projects.repository";

@Module({
  imports: [
    SequelizeModule.forFeature([
      Project,
      Task,
      ProjectMember,
      ProjectInvite,
      Checkpoint
    ]),
  ],
  controllers: [
    ProjectController,
    TasksController,
    CheckpointsController
  ],
  providers: [
    ProjectRepository,
    TasksRepository,
    CheckpointsRepository,
    ProjectMemberRepository,
    ProjectService
  ]
})
export class ProjectsModule {}