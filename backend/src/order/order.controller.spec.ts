import { Test } from '@nestjs/testing';

import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { OrderDTO, OrderRequestDTO } from './dto/order.dto';

describe('Ordering controller testing', () => {
  let controller: OrderController;
  let service: jest.Mocked<OrderService>;

  beforeEach(async () => {
    const orderServiceMock = {
      processOrder: jest.fn(),
    };

    const orderModuleMock = await Test.createTestingModule({
      controllers: [OrderController],
      providers: [
        {
          provide: OrderService,
          useValue: orderServiceMock,
        },
      ],
    }).compile();

    controller = orderModuleMock.get<OrderController>(OrderController);
    service = orderModuleMock.get(OrderService);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should make order properly', async () => {
    expect(controller).toBeDefined();

    const makeOrderReq: OrderRequestDTO[] = [
      {
        film: 'Test Film ID',
        session: 'Test Session ID',
        daytime: '2026-04-20T21:00:00',
        row: 1,
        seat: 1,
        price: 250,
      },
    ];
    const makeOrderRsp: OrderDTO = {
      total: 1,
      items: [
        {
          id: 'Test Order ID',
          film: 'Test Film ID',
          session: 'Test Session ID',
          daytime: '2026-04-20T21:00:00',
          row: 1,
          seat: 1,
          price: 250,
        },
      ],
    };
    service.processOrder.mockResolvedValue(makeOrderRsp);

    const order = await controller.makeOrder(makeOrderReq);
    expect(service.processOrder).toHaveBeenCalledWith(makeOrderReq);
    expect(order).toEqual(makeOrderRsp);
  });

  it('should handle error properly', async () => {
    expect(controller).toBeDefined();

    const makeOrderReq: OrderRequestDTO[] = [
      {
        film: 'Test Film ID',
        session: 'Test Session ID',
        daytime: '2026-04-20T21:00:00',
        row: 1,
        seat: 1,
        price: 250,
      },
    ];

    service.processOrder.mockRejectedValue(new Error('Test error'));
    await expect(controller.makeOrder(makeOrderReq)).rejects.toThrow(
      'Test error',
    );
  });
});
