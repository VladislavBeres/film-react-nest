import {
  Injectable,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { OrderRepository } from 'src/repository/order.repository';
import {
  OrderItemDto,
  OrderResponseDto,
  OrderResponseItemDto,
} from './dto/order.dto';
import { Film, FilmDocument } from '../films/films.schema';

@Injectable()
export class OrderService {
  constructor(
    private readonly orderRepository: OrderRepository,
    @InjectModel(Film.name) private filmModel: Model<FilmDocument>,
  ) {}

  async createOrder(orderItems: OrderItemDto[]): Promise<OrderResponseDto> {
    const orders: OrderResponseItemDto[] = [];

    for (const item of orderItems) {
      const film = await this.filmModel.findOne({ id: item.film }).exec();

      if (!film) {
        throw new NotFoundException(`Фильм с ID ${item.film} не найден`);
      }

      const session = film.schedule.find((s) => s.id === item.session);

      if (!session) {
        throw new NotFoundException(
          `Сеанс с ID ${item.session} не найден для фильма ${item.film}`,
        );
      }

      if (
        item.row < 1 ||
        item.row > session.rows ||
        item.seat < 1 ||
        item.seat > session.seats
      ) {
        throw new ConflictException(
          `Место ${item.row}:${item.seat} не существует в зале`,
        );
      }

      const seatKey = `${item.row}:${item.seat}`;

      if (session.taken.includes(seatKey)) {
        throw new ConflictException(`Место ${seatKey} уже занято`);
      }

      const order = await this.orderRepository.create({
        film: item.film,
        session: item.session,
        daytime: item.daytime,
        row: item.row,
        seat: item.seat,
        price: item.price,
      });

      session.taken.push(seatKey);
      await film.save();

      orders.push({
        ...item,
        id: order._id.toString(),
      });
    }

    return {
      total: orders.length,
      items: orders,
    };
  }
}
