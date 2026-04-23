import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { randomUUID } from 'crypto';

import { FilmsRepository } from '../repository/films.repository';
import { OrderedFilmDTO, OrderRequestDTO, OrderDTO } from './dto/order.dto';

@Injectable()
export class OrderService {
  constructor(private readonly filmsRepository: FilmsRepository) {}

  async bookSession(order: OrderRequestDTO): Promise<OrderedFilmDTO> {
    const resultingSession = await this.filmsRepository.getSepcifiedSession(
      order.film,
      order.session,
    );
    if (resultingSession === null) {
      throw new NotFoundException(
        `Сеанс ${order.session} для фильма ${order.film} отсутствует в базе данных`,
      );
    }

    const seatKey = `${order.row}:${order.seat}`;
    if (resultingSession.taken.includes(seatKey)) {
      throw new BadRequestException(
        `Место ${order.seat} на ряду ${order.row} уже занято`,
      );
    }

    const changedData = await this.filmsRepository.takeSessionSeat(
      order.film,
      order.session,
      seatKey,
    );
    if (changedData === 0) {
      throw new BadRequestException(`Не удалось зарезервировать место`);
    }

    return {
      film: order.film,
      session: resultingSession.id,
      daytime: resultingSession.daytime,
      row: order.row,
      seat: order.seat,
      price: order.price,
      id: randomUUID(),
    };
  }

  async processOrder(orders: OrderRequestDTO[]): Promise<OrderDTO> {
    const orderingResult = await Promise.all(
      orders.map(async (order) => {
        return await this.bookSession(order);
      }),
    );
    return { total: orderingResult.length, items: orderingResult };
  }
}
