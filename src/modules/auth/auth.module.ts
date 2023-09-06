import { SessionEntity, SessionSchema } from './entities/session.entity'
import { Module } from '@nestjs/common'
import { AuthService } from './auth.service'
import { JwtModule } from '@nestjs/jwt'

import { AuthController } from './auth.controller'
import { UserEntity, UserSchema } from '../user/entities/user.entity'
import { MongooseModule } from '@nestjs/mongoose'

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: 'sercret_temporary',
      signOptions: { expiresIn: '1 day' },
    }),
    MongooseModule.forFeature([
      { name: UserEntity.name, schema: UserSchema },
      { name: SessionEntity.name, schema: SessionSchema },
    ]),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
