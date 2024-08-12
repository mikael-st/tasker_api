import { Injectable } from "@nestjs/common";
import { RelationRequestRepository, SendRelationRequestDTO } from "@repositories/relation_request.repository";
import { UserRepository } from "@repositories/user.repository";

@Injectable()
export class RelationService {
  constructor(
    private readonly relationsRepository: RelationRequestRepository,
    private readonly usersRepository: UserRepository
  ){}

  async send(data: SendRelationRequestDTO) {
    const request = await this.relationsRepository.create({
      receiver: data.receiver,
      sender: data.sender
    })

    await this.usersRepository.edit(
      data.sender,
      { relation_requests: request.id }
    );

    await this.usersRepository.edit(
      data.receiver,
      { relation_requests: request.id }
    );

    return {
      obj: request,
      error: false,
      message: `SEND BY ${data.sender} TO ${data.receiver}`
    }
  }
}