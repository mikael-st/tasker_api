import { Body, Controller, Delete, Get, Headers, Param, Post, Query } from "@nestjs/common";
import { ProjectService } from "@services/project.service";
import { CreateProjectDTO } from "src/DTO/create_project.dto";
import { ProjectRepository } from "src/repositories/projects.repository";

@Controller('project')
export class ProjectController {
  constructor(
    private readonly repository: ProjectRepository,
    private readonly service: ProjectService
  ) {}

  @Post()
  async create(
    @Body()   data: CreateProjectDTO,
    // @Headers('user') user: string
  ) {
    return await this.service.create(data); 
  }

  @Get('/list')
  async list() {
    return await this.repository.list();
  }

  @Get()
  async find(
    @Query() query: any
  ) {
    return await this.repository.find(query.id);
  }

  @Delete('/del/:id')
  async delete(
    @Param('id') id: string
  ){
    await this.repository.delete(id);
  }

  @Get('/status')
  async status() {
    return { status: 'OK' }
  }
}