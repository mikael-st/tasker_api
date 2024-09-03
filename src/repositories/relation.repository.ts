import { Relation } from "@models/relation.model";
import { BadRequestException } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";

export type RelationDTO = {
  user: string;
  related: string;
}

export class RelationRepository {
  constructor (
    @InjectModel(Relation) private readonly Relations: typeof Relation
  ) {}

  async create(data: RelationDTO) {
    console.log(data);
    
    try {
      const response = await this.Relations.create(
        {
          user: data.user,
          related: data.related
        },{
          hooks: true
        }
      );

      return response;
    } catch (err) {
      throw new BadRequestException(err);
    }
  }
}