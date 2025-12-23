import { Controller, Get, Param } from '@nestjs/common';
import { FilmsService } from './films.service';
import { FilmScheduleResponseDto, FilmsResponseDto } from './dto/films.dto';

@Controller('films')
export class FilmsController {
  constructor(private readonly filmsService: FilmsService) {}

  @Get()
  async getFilms(): Promise<FilmsResponseDto> {
    const films = await this.filmsService.getAllFilms();
    return {
      total: films.length,
      items: films,
    };
  }

  @Get(':id/schedule')
  async getFilmSchedule(
    @Param('id') id: string,
  ): Promise<FilmScheduleResponseDto> {
    const sessions = await this.filmsService.getFilmSchedule(id);
    return {
      total: sessions.length,
      items: sessions,
    };
  }
}
