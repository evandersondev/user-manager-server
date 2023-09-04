import { Injectable } from '@nestjs/common'
import { EventOnlineUserRemoveRepository } from './repositories/event-online-user-remove.repository'
import { EventOnlineUserRepository } from './repositories/event-online-user-add.repository'
import { EventOnlineUsersAllRepository } from './repositories/event-online-users-all.repository'
import { EventOnlineUserFindRepository } from './repositories/event-online-user-find.repository'

@Injectable()
export class EventsService {
  constructor(
    private eventOnlineUserRemoveRepository: EventOnlineUserRemoveRepository,
    private eventOnlineAddUserRepository: EventOnlineUserRepository,
    private eventOnlineUsersAllRepository: EventOnlineUsersAllRepository,
    private eventOnlineUserFindRepository: EventOnlineUserFindRepository,
  ) {}

  async add(email: string) {
    const user = await this.find(email)

    if (!user) {
      await this.eventOnlineAddUserRepository.hanlde(email)
    }
  }

  async remove(email: string) {
    await this.eventOnlineUserRemoveRepository.hanlde(email)
  }

  async all() {
    return await this.eventOnlineUsersAllRepository.hanlde()
  }

  async find(email: string) {
    return await this.eventOnlineUserFindRepository.hanlde(email)
  }
}
