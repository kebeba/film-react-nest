import { Injectable, NotFoundException } from '@nestjs/common';

import { FilmsRepository } from 'src/repository/films.repository';
import { FilmsDTO, ScheduledFilmsDTO } from './dto/films.dto';

@Injectable()
export class FilmsService {
  constructor(private readonly filmsRepository: FilmsRepository) {}

  async getAvailableFilms(): Promise<FilmsDTO> {
    const films = await this.filmsRepository.getAvailableFilms();
    return { total: films.length, items: films };
  }

  async getFilmSessions(filmId: string): Promise<ScheduledFilmsDTO> {
    const sessions = await this.filmsRepository.getFilmSessions(filmId);
    
    if (sessions == null) {
        throw new NotFoundException(`Фильм с идентификатором ${filmId} отсутствует в базе данных`)
    }

    return { total: sessions.length, items: sessions }
  }
}
