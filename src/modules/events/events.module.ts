import { Module } from '@nestjs/common'
import { EventsGateway } from './events.gateway'
import { EventOnlineUsersAllRepository } from './repositories/event-online-users-all.repository'
import { EventOnlineUserRepository } from './repositories/event-online-user-add.repository'
import { EventOnlineUserRemoveRepository } from './repositories/event-online-user-remove.repository'
import { EventOnlineUserFindRepository } from './repositories/event-online-user-find.repository'
import { EventsService } from './events.service'
import { EventsController } from './event.controller'

@Module({
  controllers: [EventsController],
  providers: [
    EventsGateway,
    EventOnlineUsersAllRepository,
    EventOnlineUserRepository,
    EventOnlineUserRemoveRepository,
    EventOnlineUserFindRepository,
    EventsService,
  ],
})
export class EventsModule {}
