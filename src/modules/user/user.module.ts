import { Module } from '@nestjs/common'
import { UserService } from './user.service'
import { UserController } from './user.controller'
import { UserCreateRepository } from './repositories/user-create.repository'
import { UserUpdateRepository } from './repositories/user-update.repository'
import { UserDeleteRepository } from './repositories/user-delete.repository'
import { UserFindRepository } from './repositories/user-find.repository'
import { UserFindAllRepository } from './repositories/user-find-all.repository'
import { UserFindByEmailRepository } from './repositories/user-find-by-email.repository'

@Module({
  controllers: [UserController],
  providers: [
    UserService,
    UserCreateRepository,
    UserUpdateRepository,
    UserDeleteRepository,
    UserFindRepository,
    UserFindAllRepository,
    UserFindByEmailRepository,
  ],
})
export class UserModule {}
