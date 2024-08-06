import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Project } from "src/config/database/models/project.model";

@Injectable()
export class ProjectRepository {
  constructor (
    @InjectModel('Project') private readonly Projects: Model<Project>
  ) {}
}