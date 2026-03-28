import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { ScheduleEntity } from './schedule.entity';


@Entity('schedules')
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
    decription: string;

    @OneToMany(() => ScheduleEntity, (schedule) => schedule.film)
    schedule: ScheduleEntity[];
}
