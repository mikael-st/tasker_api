import { Module } from '@nestjs/common';
import { AppController } from '../controller/app.controller';
import { AppService } from '../services/app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { DATABASE_URI } from 'src/config/env.config';
import { UserController } from 'src/controller/user.controller';
import { UserRepository } from 'src/repositories/user.repository';
import { UserSchema } from 'src/config/database/models/user.model';
import { UserModule } from './user.module';

@Module({
  imports: [
    MongooseModule.forRoot(DATABASE_URI),
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
