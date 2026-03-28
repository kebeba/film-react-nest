import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { FilmEntity } from './film.entity'


@Entity('schedules')
export class ScheduleEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('varchar')
    daytime: string;

    @Column('int4')
    hall: number;

    @Column('int4')
    rows: number;

    @Column('int4')
    seats: number;

    @Column('float8')
    price: number;

    @Column('text')
    taken: string;

    @Column({name: 'film_id', type: 'uuid'})
    filmId: string;

    @ManyToOne(() => FilmEntity, (film) => film.schedule)
    film: FilmEntity;
}
