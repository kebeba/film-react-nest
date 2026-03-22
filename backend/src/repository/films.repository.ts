import { Injectable } from '@nestjs/common';

import { IFilm, IFilmSession, filmModel } from './repository.models';
import { FilmDTO, ScheduledFilmDTO } from 'src/films/dto/films.dto';

@Injectable()
export class FilmsRepository {
  private _transform2FilmDTO(film: IFilm): FilmDTO {
    return {
      id: film.id,
      rating: film.rating,
      director: film.director,
      tags: film.tags,
      title: film.title,
      about: film.about,
      description: film.description,
      image: film.image,
      cover: film.cover,
    };
  }

  private _transform2SessionDTO(session: IFilmSession): ScheduledFilmDTO {
    return {
      id: session.id,
      daytime: session.daytime,
      hall: session.hall,
      rows: session.rows,
      seats: session.seats,
      price: session.price,
      taken: session.taken,
    };
  }

  async getAvailableFilms(): Promise<FilmDTO[]> {
    const films = await filmModel.find({}).exec();
    return films.map((film) => this._transform2FilmDTO(film));
  }

  async getFilmSessions(filmId: string): Promise<ScheduledFilmDTO[] | null> {
    const film = await filmModel.findOne({ id: filmId }).exec();

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
    const matchingFilm = await filmModel
      .findOne({
        id: filmId,
        schedule: {
          $elemMatch: { id: sessionId },
        },
      })
      .exec();

    if (matchingFilm !== null) {
      const desiredSession = matchingFilm.schedule.find(
        (item) => item.id == sessionId,
      );
      return this._transform2SessionDTO(desiredSession);
    }

    return null;
  }

  async takeSessionSeat(
    filmId: string,
    sessionId: string,
    seatKey: string,
  ): Promise<number> {
    const changedData = await filmModel.updateOne(
      {
        id: filmId,
        schedule: {
          $elemMatch: {
            id: sessionId,
            taken: { $ne: seatKey },
          },
        },
      },
      { $push: { 'schedule.$.taken': seatKey } },
    );

    return changedData.modifiedCount;
  }
}
