import { Module } from '@nestjs/common';
import { AppController } from '../controller/app.controller';
import { AppService } from '../services/app.service';
import { UserModule } from './user.module';
import { DatabaseModule } from '@config/database/database.module';

@Module({
  imports: [
    DatabaseModule,
    UserModule,
    // ProjectsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
