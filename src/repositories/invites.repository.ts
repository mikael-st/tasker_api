import { AlreadyExistsException } from "@exceptions/user_exists.error";
import { Repository } from "typeorm";
import { Invite } from "@models/invite.model";
import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { Result } from "@interfaces/Response";
import { InjectRepository } from "@nestjs/typeorm";

export type SendInvitesDTO = {
  receiver: string;
  sender: string;
}

@Injectable()
export class InvitesRepository {
  constructor(
    @InjectRepository(Invite) private readonly Invites: Repository<Invite>
  ) {}

  async create(data: SendInvitesDTO) {
    try {
      const result = await this.Invites.save(
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
      const response = await this.Invites.find(
        {
          where: [
            { sender: key },
            { receiver: key }
          ],
          relations: ['sender', 'receiver']
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

  async delete(id: string) {
    try {
      const response = await this.Invites.delete(
        {
          id: id
        }
      );
    
      if (!response) {
        throw new NotFoundException();
      }

      return 'REMOVED';
    } catch (err) {
      throw new BadRequestException(err);
    }
  }
}