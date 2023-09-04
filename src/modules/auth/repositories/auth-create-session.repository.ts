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
    const token = await this.jwtService.signAsync(payload)

    const session = await this.prisma.session.findUnique({
      where: {
        email,
      },
    })

    if (session) {
      await this.prisma.session.update({
        where: { email },
        data: { token },
      })
    } else {
      await this.prisma.session.create({
        data: {
          email,
          token,
        },
      })
    }

    return {
      access_token: token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        photoUrl: user.photoUrl,
        role: user.role,
      },
    }
  }
}
