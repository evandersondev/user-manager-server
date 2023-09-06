import { Test, TestingModule } from '@nestjs/testing'
import { UsersService } from './users.service'
import { UsersController } from './users.controller'
import { CanActivate, ConflictException } from '@nestjs/common'
import { AuthGuard } from '../auth/auth.guard'
import { UserEntity } from './entities/user.entity'
import { CreateUserDto } from './dtos/create-user.dto'

const usersEntityList: UserEntity[] = [
  new UserEntity({
    name: 'User number #1',
    email: 'user1@mail.com',
    password: '123456',
    role: 'owner',
  }),
]

const usersListResponse = [
  {
    id: '1',
    name: 'User number #1',
    email: 'user1@mail.com',
    role: 'owner',
    photoUrl: null,
  },
]

const userUpdated = {
  id: '1',
  name: 'User updated',
  email: 'user1@mail.com',
  role: 'owner',
  photoUrl: null,
}

describe('UsersController', () => {
  let controller: UsersController
  let service: UsersService

  beforeEach(async () => {
    const guard: CanActivate = {
      canActivate: jest.fn(() => true),
    }

    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: {
            findAll: jest.fn().mockResolvedValue(usersEntityList),
            find: jest.fn().mockResolvedValue(usersListResponse[0]),
            create: jest.fn(),
            update: jest.fn().mockResolvedValue(userUpdated),
            delete: jest.fn(),
          },
        },
      ],
    })
      .overrideGuard(AuthGuard)
      .useValue(guard)
      .compile()

    controller = module.get<UsersController>(UsersController)
    service = module.get<UsersService>(UsersService)
  })

  it('Should be defined controller', () => {
    expect(controller).toBeDefined()
    expect(service).toBeDefined()
  })

  it('Should be return a list user', async () => {
    const result = await controller.findAll()

    expect(result.length).toBe(1)
  })

  describe('Create: ', () => {
    it('Should be create user', async () => {
      const body: CreateUserDto = {
        name: 'User number #1',
        email: 'user1@mail.com',
        password: '123456',
        role: 'owner',
      }

      await expect(controller.create(body)).resolves.not.toThrow()
    })

    it('Should be throw if user email already exists', async () => {
      const body: CreateUserDto = {
        name: 'User number #1',
        email: 'user1@mail.com',
        password: '123456',
        role: 'owner',
      }

      jest.spyOn(service, 'create').mockRejectedValue(new ConflictException())

      await expect(controller.create(body)).rejects.toBeInstanceOf(
        ConflictException,
      )
    })
  })

  it('Should be find user by id', async () => {
    const result = await controller.find({ id: '1' })

    expect(result).toEqual(usersListResponse[0])
  })

  it('Should be update user by id', async () => {
    const body = {
      id: '1',
      name: 'User updated',
      role: 'owner',
      photoUrl: null,
    }

    await expect(controller.update({ id: '1' }, body)).resolves.not.toThrow()
  })

  it('Should be delete user by id', async () => {
    await expect(controller.delete({ id: '1' })).resolves.not.toThrow()
  })
})
