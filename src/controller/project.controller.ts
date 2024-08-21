/* import { Body, Controller, Delete, Get, Headers, Param, Post, Query } from "@nestjs/common";
import { CreateProjectDTO } from "src/DTO/create_project.dto";
// import { ProjectRepository } from "src/repositories/projects.repository";

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
} */