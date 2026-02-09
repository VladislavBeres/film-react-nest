import { Injectable } from '@nestjs/common';
import { FilmDto, SessionDto } from './dto/films.dto';
import { FilmsRepository } from '../repository/films.repository';

@Injectable()
export class FilmsService {
  constructor(private readonly filmsRepository: FilmsRepository) {}

  async getAllFilms(): Promise<FilmDto[]> {
    const films = await this.filmsRepository.findAll();
    return films.map((film) => this.convertToFilmDto(film));
  }

  async getFilmSchedule(id: string): Promise<SessionDto[]> {
    const film = await this.filmsRepository.findById(id);
    if (!film) return [];
    return film.schedules.map((session) => this.convertToSessionDto(session));
  }

  private convertToFilmDto(film: any): FilmDto {
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

  private convertToSessionDto(session: any): SessionDto {
    return {
      id: session.id,
      daytime: session.daytime,
      hall: session.hall,
      rows: session.rows,
      seats: session.seats,
      price: session.price,
      taken: session.taken || [],
    };
  }
}
