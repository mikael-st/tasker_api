import { Injectable } from "@nestjs/common";
import { InvitesRepository, SendInvitesDTO } from "@repositories/invites.repository";
import { UserRepository } from "@repositories/user.repository";

@Injectable()
export class RelationService {
  constructor(
    private readonly inviteRepository: InvitesRepository,
    private readonly usersRepository: UserRepository
  ){}

  async send(data: SendInvitesDTO) {
    const request = await this.inviteRepository.create({
      receiver: data.receiver,
      sender: data.sender
    })

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
    const invite = await this.inviteRepository.edit(id, { pending: false });
    
    return invite;
  }

  async del(id: string) {
    // const response = await this.inviteRepository.delete(id);
    return 'to-do';
  }
}