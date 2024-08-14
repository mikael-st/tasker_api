import { AlreadyExistsException } from "@exceptions/user_exists.error";
import { Repository } from "@interfaces/Repository";
import { Invite } from "@models/invite.model";
import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

export type SendRelationRequestDTO = {
  receiver: string;
  sender: string;
}

@Injectable()
export class InvitesRepository {
  constructor(
    @InjectModel('RelationRequest') private readonly RelationRequest: Model<Invite>
  ) {}

  async requestAlreadyExists(data: SendRelationRequestDTO) {
    const exists = await this.RelationRequest.findOne(
      {
        receiver: data.receiver,
        sender: data.sender
      }
    );

    if (exists) {
      throw new AlreadyExistsException('REQUEST WITH SENDER AND RECEIVER ALREADY EXISTS');
    }
  }

  async create(data: SendRelationRequestDTO) {
    await this.requestAlreadyExists(data);
    
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
        .find({
                          $or: [
                            { sender: key },
                            { receiver: key },
                            { $and: [{ peding: true }] }
                          ],
                        }).exec();
      
      if (!response || response.length === 0) {
        return 'WITHOUT RELATION REQUESTS';
      }

      return response;
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