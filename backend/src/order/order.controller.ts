import { Body, Controller, Post } from '@nestjs/common';

import { OrderDTO, OrderRequestDTO } from './dto/order.dto';
import { OrderService } from './order.service';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  async makeOrder(@Body() orderData: OrderRequestDTO[]): Promise<OrderDTO> {
    return this.orderService.processOrder(orderData);
  }
}
