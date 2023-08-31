import { Injectable } from '@nestjs/common'
import { PrismaService } from './database/prisma'

@Injectable()
export class AppService {
  constructor(private prisma: PrismaService) {}

  async getHello() {
    return { count: await this.prisma.user.count() }
  }
}
