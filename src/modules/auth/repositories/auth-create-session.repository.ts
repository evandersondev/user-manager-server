import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { compare } from 'bcryptjs'
import { PrismaService } from 'src/modules/prisma/prisma.service'

@Injectable()
export class AuthCreateSessionRepository {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async handle(email: string, password: string) {
    const user = await this.prisma.user.findUnique({
      where: { email },
    })

    if (!user) {
      throw new NotFoundException('User with email not found.')
    }

    const passwordCompare = await compare(password, user.password)

    if (!passwordCompare) {
      throw new UnauthorizedException()
    }

    const payload = { sub: user.id, username: user.name }

    return {
      access_token: await this.jwtService.signAsync(payload),
    }
  }
}
