import { SubscribeMessage, WebSocketGateway } from '@nestjs/websockets'
import { Socket } from 'socket.io'
import { EventsService } from './events.service'

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class EventsGateway {
  constructor(private service: EventsService) {}

  @SubscribeMessage('users')
  async handleUpdateUser(client: Socket) {
    client.emit('update-users')
    client.broadcast.emit('update-users')
  }

  @SubscribeMessage('users-online')
  async addUser(client: Socket, email: string) {
    await this.service.create(email)

    client.emit('add-users')
    client.broadcast.emit('add-users')
  }

  @SubscribeMessage('users-offline')
  async removeUser(client: Socket, email: string) {
    await this.service.delete(email)

    client.emit('remove-users')
    client.broadcast.emit('remove-users')
  }
}
