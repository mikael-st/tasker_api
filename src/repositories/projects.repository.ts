import { ProjectNotExistsException } from "@exceptions/project_not_exists.exception";
import { Repository } from "@interfaces/Repository";
import { Result } from "@interfaces/Response";
import { Project } from "@models/project.model";
import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { CreateProjectDTO } from "src/DTO/create_project.dto";

@Injectable()
export class ProjectRepository {
  constructor (
    @InjectModel(Project) private readonly Projects: typeof Project
  ) {}
  
  async create(data: CreateProjectDTO) {
    try {
      await this.Projects.create(
        {
          title: data.title,
          description: data.description,
          owner: data.owner,
          due_date: data.due_date
        }
      );

      return 'CREATED WITH SUCCESS';
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
        }
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
    console.log('hi from repository');
    
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