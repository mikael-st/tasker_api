import { Body, Controller, Get, Param, Post, Query } from "@nestjs/common";
import { TasksRepository } from "@repositories/tasks.repository";
import { TaskCreateDTO } from "src/DTO/task.create.dto";
import { TaskListDTO } from "src/DTO/task.dto";

@Controller('tasks')
export class TasksController {
  constructor (
    private readonly repository: TasksRepository
  ) {}

  @Post()
  async create(
    @Body()  data: TaskCreateDTO
  ) {
    return await this.repository.create(data);
  }

  @Get('/:project')
  async list(
    @Param('project') project: string,
    @Query() queries: TaskListDTO
  ) {
    return await this.repository.list(project);
  }

  @Get()
  async find(
    @Query() queries: any
  ) {
    return await this.repository.find(queries);
  }
}