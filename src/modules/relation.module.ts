import { Invite } from "@models/invite.model";
import { Relation } from "@models/relation.model";
import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { InvitesRepository } from "@repositories/invites.repository";
import { RelationRepository } from "@repositories/relation.repository";
import { RelationService } from "@services/relation.service";

@Module({
  imports: [
    SequelizeModule.forFeature([ Invite, Relation ])
  ],
  providers: [
    RelationService,
    InvitesRepository,
    RelationRepository
  ],
  exports: [ RelationService ]
})
export class RelationModule {}