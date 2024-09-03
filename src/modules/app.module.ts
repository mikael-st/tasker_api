import { Module } from '@nestjs/common';
import { AppController } from '../controller/app.controller';
import { AppService } from '../services/app.service';
import { UserModule } from './user.module';
import { DatabaseModule } from '@config/database/database.module';
import { RelationModule } from './relation.module';

@Module({
  imports: [
    DatabaseModule,
    UserModule,
    RelationModule
    // ProjectsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
