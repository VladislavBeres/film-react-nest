import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { Order, OrderSchema } from './order.schema';
import { Film, FilmSchema } from '../films/films.schema';
import { OrderRepository } from 'src/repository/order.repository';
import { FilmsModule } from 'src/films/films.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Order.name, schema: OrderSchema },
      { name: Film.name, schema: FilmSchema },
    ]),
    FilmsModule,
  ],
  controllers: [OrderController],
  providers: [OrderService, OrderRepository],
  exports: [OrderService],
})
export class OrderModule {}
