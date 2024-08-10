import { Injectable } from "@nestjs/common";
import { RelationRequestRepository, SendRelationRequestDTO } from "@repositories/relation_request.repository";

@Injectable()
export class RelationService {
  constructor( private readonly repository: RelationRequestRepository){}

  async send(data: SendRelationRequestDTO) {
    const request = await this.repository.create({
      receiver: data.receiver,
      sender: data.sender
    })
  }
}