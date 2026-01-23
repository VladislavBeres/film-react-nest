import { Injectable, ConflictException } from '@nestjs/common';
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

    schedule.taken = JSON.stringify(takenSeats);
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

    let takenArray: string[] = [];
    if (schedule.taken && schedule.taken.trim() !== '') {
      try {
        takenArray = JSON.parse(schedule.taken);
      } catch {
        takenArray = schedule.taken.split(',').map((s) => s.trim());
      }
    }

    if (takenArray.includes(seatKey)) {
      throw new ConflictException(`Место ${seatKey} уже занято`);
    }

    takenArray.push(seatKey);
    schedule.taken = JSON.stringify(takenArray);
    await this.scheduleRepository.save(schedule);

    return this.findById(filmId);
  }
}
