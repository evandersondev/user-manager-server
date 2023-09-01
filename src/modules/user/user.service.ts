import { ConflictException, Injectable } from '@nestjs/common'
import { hash } from 'bcryptjs'
import { UserCreateRepository } from './repositories/user-create.repository'
import { UserUpdateRepository } from './repositories/user-update.repository'
import { UserDeleteRepository } from './repositories/user-delete.repository'
import { UserFindRepository } from './repositories/user-find.repository'
import { UserFindAllRepository } from './repositories/user-find-all.repository'
import { UserFindByEmailRepository } from './repositories/user-find-by-email.repository'

interface CreateUserBodyType {
  name: string
  email: string
  password: string
  photoUrl?: string
  role: 'employee' | 'admin' | 'owner'
}

interface UpdateUserBodyType {
  id: string
  photoUrl?: string
  role: 'employee' | 'admin' | 'owner'
}

@Injectable()
export class UserService {
  constructor(
    private userCreateRepository: UserCreateRepository,
    private userUpdateRepository: UserUpdateRepository,
    private userDeleteRepository: UserDeleteRepository,
    private userFindRepository: UserFindRepository,
    private userFindAllRepository: UserFindAllRepository,
    private userFindByEmailRepository: UserFindByEmailRepository,
  ) {}

  async findAll() {
    const users = await this.userFindAllRepository.hanlde()

    return users.map((user) => ({
      id: user.id,
      name: user.name,
      email: user.email,
      photoUrl: user.photoUrl,
      role: user.role,
    }))
  }

  async find(id: string) {
    const user = await this.userFindRepository.hanlde(id)

    return {
      name: user.name,
      email: user.email,
      photoUrl: user.photoUrl,
      role: user.role,
    }
  }

  async create({ name, email, password, photoUrl, role }: CreateUserBodyType) {
    const userExists = await this.userFindByEmailRepository.hanlde(email)

    if (userExists) {
      throw new ConflictException('User already exists with the same email.')
    }

    const passwordHashed = await hash(password, 8)

    await this.userCreateRepository.hanlde({
      name,
      email,
      role,
      photoUrl,
      password: passwordHashed,
    })
  }

  async update({ id, photoUrl, role }: UpdateUserBodyType) {
    await this.userUpdateRepository.hanlde(id, { photoUrl, role })
  }

  async delete(id: string) {
    await this.userDeleteRepository.hanlde(id)
  }
}
