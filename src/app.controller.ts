import { Controller, Get } from '@nestjs/common'
import { PrismaService } from './database/prisma'

@Controller()
export class AppController {
  constructor(private prisma: PrismaService) {}

  @Get()
  async getHello() {
    // await this.prisma.user.create({
    //   data: {
    //     name: 'Evanderson Vasconcelos',
    //     email: 'evandersondev@gmail.com',
    //     role: 'admin',
    //     password: '123456',
    //   },
    // })

    const users = await this.prisma.user.findMany()

    return users
  }
}
