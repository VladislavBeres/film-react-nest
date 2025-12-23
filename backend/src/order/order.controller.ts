import { Controller, Post, Body, HttpCode, Logger } from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto, OrderResponseDto } from './dto/order.dto';

@Controller('order')
export class OrderController {
  private readonly logger = new Logger(OrderController.name);

  constructor(private readonly orderService: OrderService) {}

  @Post()
  @HttpCode(200)
  async createOrder(@Body() dto: CreateOrderDto): Promise<OrderResponseDto> {
    this.logger.debug(`Получены данные заказа: ${JSON.stringify(dto)}`);

    return this.orderService.createOrder(dto.tickets);
  }
}
