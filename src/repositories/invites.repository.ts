import { AlreadyExistsException } from "@exceptions/user_exists.error";
import { Invite } from "@models/invite.model";
import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { Result } from "@interfaces/Response";
import { InjectModel } from "@nestjs/sequelize";
import { Op } from "sequelize";

export type SendInvitesDTO = {
  receiver: string;
  sender: string;
}

@Injectable()
export class InvitesRepository {
  constructor(
    @InjectModel(Invite) private readonly Invites: typeof Invite
  ) {}

  async create(data: SendInvitesDTO) {
    try {
      const result = await this.Invites.create(
        {
          sender: data.sender,
          receiver: data.receiver
        }
      );

      return {
        data: result,
        error: false,
        message: 'CREATED'
      } as Result;
    } catch (err) {
      throw new BadRequestException(err);
    }
  }

  async list(key: string) {
    try {
      const response = await this.Invites.findAll(
        {
          where: {
            [ Op.and ]: [
              { pending: true },
              {
                [ Op.or ]: [
                  { sender: key },
                  { receiver: key }
                ]
              }
            ]
          }
        }
      )
      
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
      const response = await this.Invites.update(
        {
          id: id
        },
        data
      );
      
      return {
        data: response,
        error: false,
        message: "CHANGED"
      } as Result;
    } catch (err) {
      throw new BadRequestException(err);
    }
  }

  // async delete(id: string) {
  //   try {
  //     const response = await this.Invites.delete(
  //       {
  //         id: id
  //       }
  //     );
    
  //     if (!response) {
  //       throw new NotFoundException();
  //     }

  //     return 'REMOVED';
  //   } catch (err) {
  //     throw new BadRequestException(err);
  //   }
  // }
}