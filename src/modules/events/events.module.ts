import { Module } from '@nestjs/common'
import { EventsGateway } from './events.gateway'
import { EventsService } from './events.service'
import { EventsController } from './events.controller'
import { OnlineEntity, OnlineSchema } from './entities/online.entity'
import { MongooseModule } from '@nestjs/mongoose'

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: OnlineEntity.name, schema: OnlineSchema },
    ]),
  ],
  controllers: [EventsController],
  providers: [EventsGateway, EventsService],
})
export class EventsModule {}
