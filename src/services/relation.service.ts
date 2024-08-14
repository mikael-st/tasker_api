import { Injectable } from "@nestjs/common";
import { InvitesRepository, SendRelationRequestDTO } from "@repositories/invites.repository";
import { UserRepository } from "@repositories/user.repository";

@Injectable()
export class RelationService {
  constructor(
    private readonly inviteRepository: InvitesRepository,
    private readonly usersRepository: UserRepository
  ){}

  async send(data: SendRelationRequestDTO) {
    const request = await this.inviteRepository.create({
      receiver: data.receiver,
      sender: data.sender
    })

    await this.usersRepository.edit(
      data.sender,
      { invites: request.id }
    );

    await this.usersRepository.edit(
      data.receiver,
      { invites: request.id }
    );

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
}