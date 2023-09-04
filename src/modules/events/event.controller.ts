import { Controller, Get } from '@nestjs/common'
import { EventsService } from './events.service'

@Controller('events')
export class EventsController {
  constructor(private service: EventsService) {}

  @Get()
  async findAll() {
    return await this.service.all()
  }
}
