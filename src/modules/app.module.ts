import { Module } from '@nestjs/common';
import { AppController } from '../controller/app.controller';
import { AppService } from '../model/app.model';
import { MongooseModule } from '@nestjs/mongoose';
import { DATABASE_URI } from 'config/env.config';

@Module({
  imports: [
    MongooseModule.forRoot(DATABASE_URI)
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
