import { Test, TestingModule } from '@nestjs/testing';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';

describe('OrderController', () => {
  let controller: OrderController;
  let orderService: OrderService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrderController],
      providers: [
        {
          provide: OrderService,
          useValue: {
            createOrder: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<OrderController>(OrderController);
    orderService = module.get<OrderService>(OrderService);
  });

  it('POST /order should create order', async () => {
    const mockOrderDto = {
      email: 'test@test.com',
      phone: '1234567890',
      tickets: [],
    };
    const mockResponse = { total: 0, items: [] };

    jest.spyOn(orderService, 'createOrder').mockResolvedValue(mockResponse);

    const result = await controller.createOrder(mockOrderDto);

    expect(result).toEqual(mockResponse);
    expect(orderService.createOrder).toHaveBeenCalledWith(mockOrderDto.tickets);
  });
});
