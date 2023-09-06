import { Test, TestingModule } from '@nestjs/testing'
import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'
import { ZodError } from 'zod'
import { UnauthorizedException } from '@nestjs/common'

const request = {
  headers: {
    authorization: 'Bearer <token>',
  },
}

describe('AuthController', () => {
  let controller: AuthController
  let service: AuthService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: {
            createSession: jest.fn(),
            verifyToken: jest.fn().mockResolvedValue(request),
          },
        },
      ],
    }).compile()

    controller = module.get<AuthController>(AuthController)
    service = module.get<AuthService>(AuthService)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
    expect(service).toBeDefined()
  })

  describe('Create: ', () => {
    it('should be createSession with valid data', async () => {
      const body = {
        email: 'test@example.com',
        password: 'password',
      }

      await controller.createSession(body)

      expect(service.createSession).toHaveBeenCalledWith({
        email: body.email,
        password: body.password,
      })
    })

    it('should be throw with invalid data', async () => {
      const body = {
        password: 'password',
      }

      await expect(controller.createSession(body)).rejects.toBeInstanceOf(
        ZodError,
      )
    })
  })

  describe('Verify: ', () => {
    it('should call verifyToken in AuthService', async () => {
      await expect(controller.verifyToken(request)).resolves.not.toThrow()
    })

    it('should be return error with invalid token', async () => {
      jest
        .spyOn(service, 'verifyToken')
        .mockRejectedValue(new UnauthorizedException())

      await expect(
        controller.verifyToken({
          headers: { authorization: 'Bearer <invalid token>' },
        }),
      ).rejects.toBeInstanceOf(UnauthorizedException)
    })
  })
})
