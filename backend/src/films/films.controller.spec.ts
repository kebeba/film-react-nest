import { Test } from '@nestjs/testing';

import { FilmsController } from './films.controller';
import { FilmsService } from './films.service';
import { FilmsDTO, ScheduledFilmsDTO } from './dto/films.dto';

describe('Films controller testing', () => {
  let controller: FilmsController;
  let service: jest.Mocked<FilmsService>;

  beforeEach(async () => {
    const filmsServiceMock = {
      getAvailableFilms: jest.fn(),
      getFilmSessions: jest.fn(),
    };

    const filmsModuleMock = await Test.createTestingModule({
      controllers: [FilmsController],
      providers: [
        {
          provide: FilmsService,
          useValue: filmsServiceMock,
        },
      ],
    }).compile();

    controller = filmsModuleMock.get<FilmsController>(FilmsController);
    service = filmsModuleMock.get(FilmsService);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should return available films properly', async () => {
    expect(controller).toBeDefined();

    const filmsRsp: FilmsDTO = {
      total: 1,
      items: [
        {
          id: 'Test Film ID',
          rating: 5.0,
          director: 'Test Director',
          tags: ['Test Tag'],
          title: 'Test Title',
          about: 'Test About Film',
          description: 'Test Description',
          image: 'Test Image Link',
          cover: 'Test Cover Link',
        },
      ],
    };
    service.getAvailableFilms.mockResolvedValue(filmsRsp);

    const films = await controller.getAvailableFilms();
    expect(service.getAvailableFilms).toHaveBeenCalled();
    expect(films).toEqual(filmsRsp);
  });

  it('should return film schedule properly', async () => {
    expect(controller).toBeDefined();

    const filmSchedule: ScheduledFilmsDTO = {
      total: 1,
      items: [
        {
          id: 'Test Film Session ID',
          daytime: '2026-04-20T21:00:00',
          hall: 1,
          rows: 1,
          seats: 1,
          price: 250,
          taken: [],
        },
      ],
    };
    service.getFilmSessions.mockResolvedValue(filmSchedule);

    const schedule = await controller.getFilmSchedule('Test Film Session ID');
    expect(service.getFilmSessions).toHaveBeenCalledWith(
      'Test Film Session ID',
    );
    expect(schedule).toEqual(filmSchedule);
  });

  it('should handle error properly', async () => {
    expect(controller).toBeDefined();
    service.getAvailableFilms.mockRejectedValue(new Error('Test error'));
    await expect(controller.getAvailableFilms()).rejects.toThrow('Test error');
  });
});
