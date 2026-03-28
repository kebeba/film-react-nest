import { Controller, Get, Param } from '@nestjs/common';

import { FilmsDTO, ScheduledFilmsDTO } from './dto/films.dto';
import { FilmsService } from './films.service';

@Controller('films')
export class FilmsController {
  constructor(private readonly filmsService: FilmsService) {}

  @Get()
  async getAvailableFilms(): Promise<FilmsDTO> {
    return this.filmsService.getAvailableFilms();
  }

  @Get(':id/schedule')
  async getFilmSchedule(@Param('id') id: string): Promise<ScheduledFilmsDTO> {
    return this.filmsService.getFilmSessions(id);
  }
}
