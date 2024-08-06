import { Controller, Get } from '@nestjs/common';
import { AppService } from '../services/app.service';

@Controller()
export class AppController {
  constructor(private readonly service: AppService) {}

  @Get()
  status() {
    return this.service.status();
  }
}
