import { MemberRole } from "@models/project_member.model";
import { Injectable } from "@nestjs/common";
import { ProjectMemberRepository } from "@repositories/project_member.repository";
import { ProjectRepository } from "@repositories/projects.repository";
import { CreateProjectDTO } from "src/DTO/create_project.dto";

@Injectable()
export class ProjectService {
  constructor(
    private readonly projectRepository: ProjectRepository,
    private readonly projectMemberRepository: ProjectMemberRepository
  ) {}

  async create(data: CreateProjectDTO) {
    this.projectRepository.create(data).then(
      async (result) => {
        const { id, owner } = result.data;

        const member = await this.projectMemberRepository.create({
          user: owner,
          project: id,
          role: MemberRole.OWNER
        });

        return member;
      }
    )
  }
}