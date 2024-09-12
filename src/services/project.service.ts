import { Injectable } from "@nestjs/common";
import { ProjectRepository } from "@repositories/projects.repository";
import { CreateProjectDTO } from "src/DTO/create_project.dto";

@Injectable()
export class ProjectService {
  constructor(
    private readonly projectRepository: ProjectRepository
  ) {}

  async create(data: CreateProjectDTO) {

  }
}