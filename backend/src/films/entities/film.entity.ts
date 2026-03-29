import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { ScheduleEntity } from './schedule.entity';

@Entity('films')
export class FilmEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('float8')
  rating: number;

  @Column('varchar')
  director: string;

  @Column('text')
  tags: string;

  @Column('varchar')
  image: string;

  @Column('varchar')
  cover: string;

  @Column('varchar')
  title: string;

  @Column('varchar')
  about: string;

  @Column('varchar')
  description: string;

  @OneToMany(() => ScheduleEntity, (schedule) => schedule.film)
  schedule: ScheduleEntity[];
}
