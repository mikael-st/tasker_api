import { Body, Controller, Delete, Get, Param, Post, Put, Query } from "@nestjs/common";
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

  @Get()
  async list(
    @Query() queries: TaskListDTO
  ) {
    console.log(queries);
    
    return await this.repository.list(queries);
  }

  @Get('/:code')
  async find(
    @Param('code') code: string
  ) {
    return await this.repository.find(code);
  }

  @Put('/:code')
  async update(
    @Param('code') code: string,
    @Body()        update: any
  ) {
    return await this.repository.edit(code, update);
  }

  @Delete('/:id')
  async delete(
    @Param('id') id: string,
  ) {
    return await this.repository.delete(id);
  }
}