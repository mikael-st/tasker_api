import { Module } from '@nestjs/common';
import { AppController } from '../controller/app.controller';
import { AppService } from '../services/app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { DATABASE_URI } from 'src/config/env.config';
import { UserController } from 'src/controller/user.controller';
import { UserSevice } from 'src/services/user.service';
import { UserSchema } from 'src/config/database/models/user.model';
import { MongooseService } from 'src/config/mongoose.service';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      useFactory: () => ({
        uri: DATABASE_URI,
      })
    }),
    MongooseModule.forFeature([
      { name: 'user', schema: UserSchema }
    ])
  ],
  controllers: [AppController, UserController],
  providers: [AppService, UserSevice, MongooseService],
})
export class AppModule {}
