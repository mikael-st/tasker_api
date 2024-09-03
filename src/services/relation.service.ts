import { Injectable } from "@nestjs/common";
import { InvitesRepository, SendInvitesDTO } from "@repositories/invites.repository";
import { RelationRepository } from "@repositories/relation.repository";

@Injectable()
export class RelationService {
  constructor(
    private readonly relationRepository: RelationRepository,
    private readonly inviteRepository: InvitesRepository,
  ){}

  async send(data: SendInvitesDTO) {
    const request = await this.inviteRepository.create({
      receiver: data.receiver,
      sender: data.sender
    });

    return {
      obj: request,
      error: false,
      message: `SEND BY ${data.sender} TO ${data.receiver}`
    }
  }

  async list(username: string) {
    const invites = await this.inviteRepository.list(username);
    
    return invites;
  }

  async accept(id: string) {
    const invite = (await this.inviteRepository.edit(id, { pending: false })).data[1][0].dataValues;

    console.log('INVITE: ', invite);
    

    const result = await this.relationRepository.create({
      user: invite.sender,
      related: invite.receiver
    });

    return result;
  }

  async del(id: string) {
    const response = await this.inviteRepository.delete(id);
    return response;
  }
}