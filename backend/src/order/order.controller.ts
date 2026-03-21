import { Controller, Post } from '@nestjs/common';

import { OrderDTO } from './dto/order.dto';
import { OrderService } from './order.service';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  async makeOrder(): Promise<OrderDTO> {
    return;
  }
}
