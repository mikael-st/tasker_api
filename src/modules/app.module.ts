import { Module } from '@nestjs/common';
import { AppController } from '../controller/app.controller';
import { AppService } from '../services/app.service';
import { DATABASE_URI } from 'src/config/env.config';
import { User, Invite, Project } from '@models/index';
import { UserModule } from './user.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: DATABASE_URI,
      entities: [ User, Invite, Project],
      migrations: ['src/config/database/migrations'],
      synchronize: true,
      autoLoadEntities: true,
    }),
    UserModule,
    // ProjectsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
