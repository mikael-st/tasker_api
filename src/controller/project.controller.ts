import { Controller, Get } from "@nestjs/common";
import { ProjectRepository } from "src/repositories/projects.repository";

@Controller('project')
export class ProjectController {
  constructor(
    private readonly repository: ProjectRepository
  ) {}

  @Get()
  async status() {
    return { status: 'OK' }
  }
}