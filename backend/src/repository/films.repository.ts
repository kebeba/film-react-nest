import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { plainToInstance } from 'class-transformer';

import { FilmDTO, ScheduledFilmDTO } from 'src/films/dto/films.dto';
import { FilmEntity } from 'src/films/entities/film.entity';
import { ScheduleEntity } from 'src/films/entities/schedule.entity';

@Injectable()
export class FilmsRepository {
  constructor(
    @InjectRepository(FilmEntity)
    private filmRepo: Repository<FilmEntity>,
    @InjectRepository(ScheduleEntity)
    private scheduleRepo: Repository<ScheduleEntity>,
  ) {}

  async getAvailableFilms(): Promise<FilmDTO[]> {
    const films = await this.filmRepo.find();
    return films.map((film) => plainToInstance(FilmDTO, film));
  }

  async getFilmSessions(filmId: string): Promise<ScheduledFilmDTO[] | null> {
    const film = await this.filmRepo.findOne({
      where: { id: filmId },
      relations: ['schedule'],
    });

    if (film !== null) {
      const schedules = [];
      film.schedule.forEach((schedule) => {
        schedules.push(plainToInstance(ScheduledFilmDTO, schedule));
      });
      return schedules;
    }

    return null;
  }

  async getSepcifiedSession(
    filmId: string,
    sessionId: string,
  ): Promise<ScheduledFilmDTO> {
    const desiredSession = await this.scheduleRepo.findOne({
      where: { filmId: filmId, id: sessionId },
    });

    if (desiredSession !== null) {
      return plainToInstance(ScheduledFilmDTO, desiredSession);
    }

    return null;
  }

  async takeSessionSeat(
    filmId: string,
    sessionId: string,
    seatKey: string,
  ): Promise<number> {
    const changedData = await this.scheduleRepo
      .createQueryBuilder()
      .update(ScheduleEntity)
      .set({ taken: () => `taken || ',${seatKey}'` })
      .where('id = :sessionId', { sessionId })
      .andWhere('filmId = :filmId', { filmId })
      .execute();

    return changedData.affected;
  }
}
