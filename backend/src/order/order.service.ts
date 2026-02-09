import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { FilmsRepository } from '../repository/films.repository';
import { randomUUID } from 'crypto';

import {
  OrderItemDto,
  OrderResponseDto,
  OrderResponseItemDto,
} from './dto/order.dto';

@Injectable()
export class OrderService {
  constructor(private readonly filmsRepository: FilmsRepository) {}

  async createOrder(orderItems: OrderItemDto[]): Promise<OrderResponseDto> {
    const orders: OrderResponseItemDto[] = [];

    for (const item of orderItems) {
      const film = await this.filmsRepository.findById(item.film);
      if (!film) {
        throw new NotFoundException(`Фильм с ID ${item.film} не найден`);
      }

      const session = film.schedules.find((s) => s.id === item.session);
      if (!session) {
        throw new NotFoundException(`Сеанс с ID ${item.session} не найден`);
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

      const updatedFilm = await this.filmsRepository.addTakenSeat(
        item.film,
        item.session,
        seatKey,
      );

      if (!updatedFilm) {
        throw new ConflictException(`Место ${seatKey} уже занято`);
      }

      orders.push({
        ...item,
        id: randomUUID(),
      });
    }

    return { total: orders.length, items: orders };
  }
}
