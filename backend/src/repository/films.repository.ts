import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Film } from '../entities/film.entity';
import { Schedule } from '../entities/schedule.entity';

@Injectable()
export class FilmsRepository {
  constructor(
    @InjectRepository(Film)
    private filmRepository: Repository<Film>,
    @InjectRepository(Schedule)
    private scheduleRepository: Repository<Schedule>,
  ) {}

  async findAll(): Promise<Film[]> {
    return this.filmRepository.find({ relations: ['schedules'] });
  }

  async findById(id: string): Promise<Film | null> {
    return this.filmRepository.findOne({
      where: { id },
      relations: ['schedules'],
    });
  }

  async updateSessionTaken(
    filmId: string,
    sessionId: string,
    takenSeats: string[],
  ): Promise<Film | null> {
    const schedule = await this.scheduleRepository.findOne({
      where: { id: sessionId, filmId },
    });
    if (!schedule) return null;

    schedule.taken = takenSeats;
    await this.scheduleRepository.save(schedule);

    return this.findById(filmId);
  }

  async addTakenSeat(
    filmId: string,
    sessionId: string,
    seatKey: string,
  ): Promise<Film | null> {
    const schedule = await this.scheduleRepository.findOne({
      where: { id: sessionId, filmId },
    });
    if (!schedule) return null;

    if (!schedule.taken) {
      schedule.taken = [];
    }

    if (schedule.taken.includes(seatKey)) {
      return null;
    }

    schedule.taken.push(seatKey);
    await this.scheduleRepository.save(schedule);

    return this.findById(filmId);
  }
}
