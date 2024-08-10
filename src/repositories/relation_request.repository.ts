import { Repository } from "@interfaces/Repository";
import { RelationRequest } from "@models/relation_request.model";
import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

export type SendRelationRequestDTO = {
  receiver: string;
  sender: string;
}

@Injectable()
export class RelationRequestRepository {
  constructor(
    @InjectModel('RelationRequest') private readonly RelationRequest: Model<RelationRequest>
  ) {}

  async create(data: SendRelationRequestDTO) {
    const request = new this.RelationRequest(data);

    try {
      await request.save();

      return request;
    } catch (err) {
      throw new BadRequestException(err);
    }
  }

  async list(key: string) {
    try {
      const response = await this.RelationRequest
                          .find()
                          .where('pending').equals(true)
                          .exec();
    
      if (!response) {
        throw new BadRequestException('WITHOUT RELATION REQUESTS');
      }
    } catch (err) {
      throw new BadRequestException(err);
    }
  }
  
  async edit(id: string, data: any) {
    try {
      const response = this.RelationRequest.findOneAndUpdate(
        {
          _id: id
        },
        data
      )

      return 'CHANGED';
    } catch (err) {
      throw new BadRequestException(err);
    }
  }

  async delete(id: string) {
    try {
      const response = await this.RelationRequest.deleteOne().where('_id').equals(id);
    
      if (!response) {
        throw new NotFoundException();
      }

      return 'REMOVED';
    } catch (err) {
      throw new BadRequestException(err);
    }
  }
}