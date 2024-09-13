import { ProjectNotExistsException } from "@exceptions/project_not_exists.exception";
import { Result } from "@interfaces/Response";
import { Checkpoint } from "@models/checkpoint.model";
import { Project } from "@models/project.model";
import { ProjectMember } from "@models/project_member.model";
import { Task } from "@models/task.model";
import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { CreateProjectDTO } from "src/DTO/project.create.dto";

@Injectable()
export class ProjectRepository {
  constructor (
    @InjectModel(Project) private readonly Projects: typeof Project
  ) {}
  
  async create(data: CreateProjectDTO) {
    try {
      const result = await this.Projects.create(
        {
          title: data.title,
          description: data.description,
          owner: data.owner,
          due_date: data.due_date
        }
      );

      return {
        data: result,
        error: false,
        message: 'CREATED WITH SUCCESS'
      } as Result;
    } catch (err) {
      throw new BadRequestException(err);
    }
  };

  async list() {  
    try {
      const projects = await this.Projects.findAll();
      return projects;
    } catch (err) {
      throw new BadRequestException(err);
    }
  };
  
  async find(key: string) {
    try {
      const projects = await this.Projects.findOne({
        where: {
          id: key
        },
        include: [
          {
            model: Task,
            as: 'tasks'
          },{
            model: ProjectMember,
            as: 'members'
          },{
            model: Checkpoint,
            as: 'checkpoints'
          },
        ]
      })

      if (!projects) {
        throw new ProjectNotExistsException();
      }

      return projects;
    } catch (err) {
      throw new BadRequestException(err);
    }
  };

  async edit(data: any) {};
  
  async delete(id: string) {
    try {
      const response = await this.Projects.destroy({
        where: {
          id: id
        }
      });
    
      if (!response) {
        throw new NotFoundException();
      }

      return {
        data: response,
        error: false,
        message: 'REMOVED'
      } as Result;
    } catch (err) {
      throw new BadRequestException(err);
    }
  };
}