import { Controller, Get } from '@nestjs/common';

import { FilmsDTO, ScheduledFilmsDTO } from './dto/films.dto';
import { FilmsService } from './films.service';

@Controller('films')
export class FilmsController {
  constructor(private readonly filmsService: FilmsService) {}

  @Get()
  async getAvailableFilms(): Promise<FilmsDTO> {
    return;
  }

  @Get(':id/schedule')
  async getFilmSchedule(): Promise<ScheduledFilmsDTO> {
    return;
  }
}
