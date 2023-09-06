import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common'
import { Model } from 'mongoose'
import { SessionDocument, SessionEntity } from './entities/session.entity'
import { InjectModel } from '@nestjs/mongoose'
import { UserDocument, UserEntity } from '../user/entities/user.entity'
import { compare } from 'bcryptjs'
import { JwtService } from '@nestjs/jwt'
import { CreateSessionDto } from './dtos/create-session.dto'

interface Request {
  headers?: {
    authorization?: string
  }
}

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(SessionEntity.name)
    private sessionModel: Model<SessionDocument>,
    @InjectModel(UserEntity.name)
    private userModel: Model<UserDocument>,
    private jwtService: JwtService,
  ) {}

  async createSession({ email, password }: CreateSessionDto) {
    const user = await this.userModel.findOne({ email }).exec()

    if (!user) {
      throw new NotFoundException('User with email not found.')
    }

    const passwordCompare = await compare(password, user.password)

    if (!passwordCompare) {
      throw new UnauthorizedException()
    }

    const payload = { sub: user.id, username: user.name }
    const token = await this.jwtService.signAsync(payload)

    const session = await this.sessionModel.findOne({ email }).exec()

    if (session) {
      await this.sessionModel
        .findByIdAndUpdate(
          { _id: session._id },
          { $set: { token } },
          { new: true },
        )
        .exec()
    } else {
      await this.sessionModel.create({
        email,
        token,
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

  async verifyToken(request: Request) {
    const [, token] = request.headers.authorization?.split(' ')

    const session = await this.sessionModel.findOne({ token }).exec()

    if (!session) {
      throw new UnauthorizedException('User not unauthorized.')
    }

    const isValid = await this.jwtService.verifyAsync(token, {
      secret: 'sercret_temporary',
    })

    return {
      isValid,
    }
  }
}
