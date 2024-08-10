import { ProjectNotExistsException } from "@exceptions/project_not_exists.exception";
import { Repository } from "@interfaces/Repository";
import { Project } from "@models/project.model";
import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { CreateProjectDTO } from "src/DTO/create_project.dto";

@Injectable()
export class ProjectRepository implements Repository {
  constructor (
    @InjectModel('Project') private readonly Projects: Model<Project>
  ) {}
  
  async create(data: CreateProjectDTO) {
    const project = new this.Projects({
      title: data.title,
      description: data.description,
      owner: data.owner
    });

    // console.log(project);

    try {
      await project.save();

      return 'CREATED WITH SUCCESS'
    } catch (err) {
      throw new BadRequestException(err);
    }
  };

  async list() {  
    try {
      const projects = await this.Projects
                          .find()
                          .populate('owner')
                          .populate('members')
                          .exec();
      return projects;
    } catch (err) {
      throw new BadRequestException(err);
    }
  };
  
  async find(key: string) {
    try {
      const projects = await this.Projects
                          .findOne()
                          .where('_id')
                          .equals(key)
                          .populate('owner')
                          .populate('members')
                          .exec();

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
      const response = await this.Projects.deleteOne().where('_id').equals(id);
      
      return 'DELETED WITH SUCCESS';
    } catch (err) {
      throw new BadRequestException(err);
    }
  };
}