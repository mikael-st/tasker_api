import { Body, Controller, Delete, Get, Headers, Param, Post } from "@nestjs/common";
import { CreateProjectDTO } from "src/DTO/create_project.dto";
import { ProjectRepository } from "src/repositories/projects.repository";

@Controller('project')
export class ProjectController {
  constructor(
    private readonly repository: ProjectRepository
  ) {}

  @Post()
  async create(
    @Body()   data: CreateProjectDTO,
    // @Headers('user') user: string
  ) {
    return await this.repository.create(data); 
  }

  @Get()
  async list() {
    return await this.repository.list();
  }

  @Get(':id')
  async find(
    @Param('id') id: string
  ) {
    return await this.repository.find(id);
  }

  @Delete('/del/:id')
  async delete(
    @Param('id') id: string
  ){
    await this.repository.delete(id);
  }

  @Get()
  async status() {
    return { status: 'OK' }
  }
}