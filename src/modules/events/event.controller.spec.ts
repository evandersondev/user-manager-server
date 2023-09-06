import { Test, TestingModule } from '@nestjs/testing'
import { EventsController } from './events.controller'
import { EventsService } from './events.service'

const eventsList = [
  {
    email: 'user1@mail.com',
  },
]

describe('EventsController', () => {
  let controller: EventsController
  let service: EventsService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EventsController],
      providers: [
        {
          provide: EventsService,
          useValue: {
            create: jest.fn(),
            delete: jest.fn(),
            findAll: jest.fn().mockResolvedValue(eventsList),
            find: jest.fn(),
          },
        },
      ],
    }).compile()

    controller = module.get<EventsController>(EventsController)
    service = module.get<EventsService>(EventsService)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
    expect(service).toBeDefined()
  })

  it('should be return all events', async () => {
    const result = await controller.findAll()

    expect(result).toEqual(eventsList)
  })
})
