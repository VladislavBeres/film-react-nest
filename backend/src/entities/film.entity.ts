import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Schedule } from './schedule.entity';

@Entity('films')
export class Film {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'double precision' })
  rating: number;

  @Column({ type: 'varchar' })
  director: string;

  @Column('simple-array')
  tags: string[];

  @Column({ type: 'varchar' })
  title: string;

  @Column({ type: 'varchar' })
  about: string;

  @Column({ type: 'varchar' })
  description: string;

  @Column({ type: 'varchar' })
  image: string;

  @Column({ type: 'varchar' })
  cover: string;

  @OneToMany(() => Schedule, (schedule) => schedule.film, {
    cascade: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  schedules: Schedule[];
}
