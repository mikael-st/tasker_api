import { Module } from '@nestjs/common';
import { AppController } from '../controller/app.controller';
import { AppService } from '../services/app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { DATABASE_URI } from 'src/config/env.config';
import { UserModule } from './user.module';
import { ProjectsModule } from './projects.module';

@Module({
  imports: [
    MongooseModule.forRoot(DATABASE_URI),
    UserModule,
    ProjectsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
