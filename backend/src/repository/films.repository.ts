import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { IFilm, IFilmSession, filmModel } from './repository.models';
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
  
  private _transform2FilmDTO(film: FilmEntity): FilmDTO {
    return {
      id: film.id,
      rating: film.rating,
      director: film.director,
      tags: film.tags.split(','),
      title: film.title,
      about: film.about,
      description: film.description,
      image: film.image,
      cover: film.cover,
    };
  }

  private _transform2SessionDTO(session: ScheduleEntity): ScheduledFilmDTO {
    return {
      id: session.id,
      daytime: session.daytime,
      hall: session.hall,
      rows: session.rows,
      seats: session.seats,
      price: session.price,
      taken: session.taken.split(','),
    };
  }

  async getAvailableFilms(): Promise<FilmDTO[]> {
    const films = await this.filmRepo.find();
    return films.map((film) => this._transform2FilmDTO(film));
  }

  async getFilmSessions(filmId: string): Promise<ScheduledFilmDTO[] | null> {
    const film = await this.filmRepo.findOne({ where: { id: filmId }, relations: ['schedule'] });

    if (film !== null) {
      const schedules = [];
      film.schedule.forEach((schedule) => {
        schedules.push(this._transform2SessionDTO(schedule));
      });
      return schedules;
    }

    return null;
  }

  async getSepcifiedSession(
    filmId: string,
    sessionId: string,
  ): Promise<ScheduledFilmDTO> {
    const desiredSession = await this.scheduleRepo.findOne(
      {where: {filmId: filmId, id: sessionId}}
    )
    
    if (desiredSession !== null) {
      return this._transform2SessionDTO(desiredSession);
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
      .set({taken: () => `taken || ',${seatKey}'`})
      .where('id = :sessionId', { sessionId })
      .andWhere('filmId = :filmId', { filmId })
      .execute();

    return changedData.affected;
  }
}
