import { Result } from "@interfaces/Response";
import { Task } from "@models/task.model";
import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { TaskCreateDTO } from "src/DTO/task.create.dto";

@Injectable()
export class TasksRepository {
  constructor (
    @InjectModel(Task) private readonly Tasks: typeof Task
  ) {}

  async create(data: TaskCreateDTO) {
    try {
      const task = await this.Tasks.create(
        {
          code: data.code,
          name: data.name,
          description: data.description,
          project: data.project,
          owner: data.owner,
          priority: data.priority,
          due_date: data.due_date
        }
      );

      return {
        data: task,
        error: false,
        message: `NEW TASK CREATED TO PROJECT`
      } as Result;
    } catch (err) {
      throw new BadRequestException(err);
    }
  }

  async list(project_id: string) {
    try {
      const tasks = await this.Tasks.findAll({
        where: {
          project: project_id
        }
      });

      return tasks;
    } catch (err) {
      throw new BadRequestException(err);
    }
  }

  async find(queries: {[ key: string ]: string}) {
    try {
      const task = await this.Tasks.findOne({
        where: {
          queries
        }
      });

      if (!task) {
        throw new NotFoundException();
      }

      return task;
    } catch (err) {
      throw new BadRequestException(err);
    }
  }

  async edit(id: string, update: any): Promise<any> {
    try {
      const response = await this.Tasks.update(
        update,
        {
          where: {
            id: id
          },
          returning: true
        },
      );
      
      return {
        data: response,
        error: false,
        message: "CHANGED"
      } as Result;
    } catch (err) {
      throw new BadRequestException(err);
    }
  }

  async delete(key: string): Promise<any> {
    try {
      const result = await this.Tasks.destroy({
        where: {
          id: key
        }
      });

      if (!result) {
        throw new NotFoundException();
      }

      return {
        data: result,
        error: false,
        message: 'REMOVED'
      } as Result;
    } catch (err) {
      throw new BadRequestException(err);
    }
  }
}