import { Module } from '@nestjs/common'
import { AuthService } from './auth.service'
import { AuthCreateSessionRepository } from './repositories/auth-create-session.repository'
import { JwtModule } from '@nestjs/jwt'

import { AuthController } from './auth.controller'

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: 'sercret_temporary',
      signOptions: { expiresIn: '300s' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, AuthCreateSessionRepository],
})
export class AuthModule {}
