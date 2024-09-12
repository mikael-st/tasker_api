import { MemberRole, ProjectMember } from "@models/project_member.model";
import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";

export type DefineProjectMember = {
  user: string,
  project: string,
  role: MemberRole
}

@Injectable()
export class name {
  constructor(
    @InjectModel(ProjectMember) private readonly ProjectMembers: typeof ProjectMember
  ) {}

  async create(data: DefineProjectMember) {
    try {
      const result = await this.ProjectMembers.create({

      })
    } catch (err) {
      throw new BadRequestException(err);
    }
  }
}