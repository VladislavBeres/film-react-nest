import { Test, TestingModule } from '@nestjs/testing';
import { FilmsController } from './films.controller';
import { FilmsService } from './films.service';
import { FilmDto, SessionDto } from './dto/films.dto';

describe('FilmsController', () => {
  let controller: FilmsController;
  let filmsService: FilmsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FilmsController],
      providers: [
        {
          provide: FilmsService,
          useValue: {
            getAllFilms: jest.fn(),
            getFilmSchedule: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<FilmsController>(FilmsController);
    filmsService = module.get<FilmsService>(FilmsService);
  });

  it('GET /films should return films', async () => {
    const mockFilms: FilmDto[] = [
      {
        id: '1',
        title: 'Test Film',
        rating: 8.5,
        director: 'Director Name',
        tags: ['action', 'drama'],
        about: 'About film',
        description: 'Film description',
        image: 'image.jpg',
        cover: 'cover.jpg',
      },
    ];

    jest.spyOn(filmsService, 'getAllFilms').mockResolvedValue(mockFilms);

    const result = await controller.getFilms();

    expect(result).toEqual({ total: 1, items: mockFilms });
    expect(filmsService.getAllFilms).toHaveBeenCalled();
  });

  it('GET /films/:id/schedule should return schedule', async () => {
    const mockSchedule: SessionDto[] = [
      {
        id: '1',
        daytime: '10:00',
        hall: '1',
        rows: 10,
        seats: 20,
        price: 500,
        taken: [],
      },
    ];

    jest.spyOn(filmsService, 'getFilmSchedule').mockResolvedValue(mockSchedule);

    const result = await controller.getFilmSchedule('film-id');

    expect(result).toEqual({ total: 1, items: mockSchedule });
  });
});
