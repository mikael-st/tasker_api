import { DB_URL } from "@config/env.config";
import { Invite } from "@models/invite.model";
import { Project, ProjectProgress } from "@models/project.model";
import { Relation } from "@models/relation.model";
import { Task } from "@models/task.model";
import { User } from "@models/user.model";
import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'postgres',
      uri: DB_URL,
      models: [
        User,
        Invite,
        Project,
        Relation,
        Task
      ],
      autoLoadModels: true,
      synchronize: true,
    })
  ]
})
export class DatabaseModule {}