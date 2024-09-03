import { AlreadyExistsException } from "@exceptions/user_exists.error";
import { Relation } from "@models/relation.model";
import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";

export type RelationDTO = {
  user: string;
  related: string;
}

@Injectable()
export class RelationRepository {
  constructor (
    @InjectModel(Relation) private readonly Relations: typeof Relation
  ) {}

  async create(data: RelationDTO) {
    await this.relationAlreadyExists(data);
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

  async relationAlreadyExists(data: RelationDTO) {
    const relation = await this.Relations.findOne({
      where: {
        user: data.user,
        related: data.related
      }
    });

    if (relation) {
      throw new AlreadyExistsException(`RELATION BETWEEN ${relation.user} AND ${relation.related} ALREADY EXISTS`)
    }
  }
}